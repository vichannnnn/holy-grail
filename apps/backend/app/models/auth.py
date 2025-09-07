"""
Account model for user authentication and management.

This module defines the Account model which handles user registration,
authentication, email verification, password management, and role-based
access control. It integrates with JWT for token-based authentication
and provides comprehensive user lifecycle management.
"""
from typing import TYPE_CHECKING
from uuid import uuid4

import jwt
from pydantic import EmailStr
from sqlalchemy import Index, asc, exc as SQLAlchemyExceptions, func, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column, relationship, synonym
from sqlalchemy.sql.expression import text

from app.core import settings
from app.crud.base import CRUD
from app.db.base_class import Base
from app.schemas.admin import UpdateRoleSchema
from app.schemas.auth import (
    AccountCreateSchema,
    AccountRegisterSchema,
    AccountUpdateEmailSchema,
    AccountUpdatePasswordSchema,
    AuthSchema,
    CurrentUserSchema,
    CurrentUserWithJWTSchema,
)
from app.services.email import email_service
from app.utils.auth import Authenticator, generate_password
from app.utils.exceptions import AppError

if TYPE_CHECKING:
    from app.models.library import Library
    from app.models.scoreboard import Scoreboard

FRONTEND_URL = settings.frontend_url
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes
ALGORITHM = settings.algorithm
SECRET_KEY = settings.secret_key


class Account(Base, CRUD["Account"]):
    """
    User account model for authentication and authorization.
    
    This model manages user accounts with features including:
    - Case-insensitive username matching
    - Email verification workflow
    - Password reset functionality
    - Role-based access control (1=user, 2=admin, 3=developer)
    - Integration with scoreboard and library systems
    
    Attributes:
        user_id: Primary key identifier for the account
        username: Unique username (case-insensitive)
        email: Email address (optional during registration)
        password: Hashed password using bcrypt
        role: User role level (1=normal, 2=admin, 3=developer)
        verified: Email verification status
        email_verification_token: Token for email verification
        reset_password_token: Token for password reset
        scoreboard: One-to-one relationship with user's scoreboard
        documents: One-to-many relationship with uploaded documents
    """
    __tablename__ = "account"
    __table_args__ = (Index("username_case_sensitive_index", text("upper(username)"), unique=True),)

    user_id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    username: Mapped[str] = mapped_column(nullable=False, index=True, unique=True)
    email: Mapped[str] = mapped_column(nullable=True, unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    role: Mapped[int] = mapped_column(nullable=False, server_default=text("1"))
    verified: Mapped[bool] = mapped_column(nullable=False, server_default="f")
    email_verification_token: Mapped[str] = mapped_column(nullable=True)
    reset_password_token: Mapped[str] = mapped_column(nullable=True)

    scoreboard: Mapped["Scoreboard"] = relationship(
        "Scoreboard", back_populates="account", uselist=False
    )
    documents: Mapped["Library"] = relationship(back_populates="account", uselist=True)

    id: Mapped[int] = synonym("user_id")

    @classmethod
    async def get_users_count(cls, session: AsyncSession) -> int:
        """
        Get the total count of registered users.
        
        Args:
            session: Active database session
            
        Returns:
            int: Total number of user accounts
        """
        stmt = select(func.count(cls.user_id))
        result = await session.execute(stmt)
        return result.scalar_one()

    @classmethod
    async def register(
        cls,
        session: AsyncSession,
        data: AccountRegisterSchema,
    ) -> CurrentUserWithJWTSchema:
        """
        Register a new user account with email verification.
        
        Creates a new user account, hashes the password, sends a verification
        email, and returns user data with JWT access token.
        
        Args:
            session: Active database session
            data: Registration data including username, email, and password
            
        Returns:
            CurrentUserWithJWTSchema: User data with JWT access token
            
        Raises:
            AppError.BAD_REQUEST_ERROR: If passwords don't match
            AppError.RESOURCES_ALREADY_EXISTS_ERROR: If username/email exists
        """
        if data.password != data.repeat_password:
            raise AppError.BAD_REQUEST_ERROR

        hashed_password = Authenticator.pwd_context.hash(data.password)
        insert_data = AccountCreateSchema(
            username=data.username, password=hashed_password, email=data.email
        )

        try:
            res = await super().create(session, insert_data.model_dump())

        except SQLAlchemyExceptions.IntegrityError as exc:
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc

        await session.refresh(res)

        created_user = CurrentUserSchema(**res.__dict__)
        email_verification_token = uuid4().hex
        await email_service.send_verification_email(
            to=data.email,
            username=data.username,
            verification_url=f"{FRONTEND_URL}/verify-account?token={email_verification_token}",
        )

        stmt = (
            update(Account)
            .returning(Account)
            .where(Account.user_id == created_user.user_id)
            .values({"email_verification_token": email_verification_token})
        )
        res = await session.execute(stmt)
        await session.commit()

        access_token = Authenticator.create_access_token(data={"sub": data.username})
        decoded_token = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])

        user = res.scalar_one()

        res = CurrentUserWithJWTSchema(
            data=CurrentUserSchema(
                user_id=user.user_id,
                email=user.email,
                username=user.username,
                role=user.role,
                verified=user.verified,
            ),
            access_token=access_token,
            token_type="bearer",
            exp=decoded_token["exp"],
        )

        return res

    @classmethod
    async def login(cls, session: AsyncSession, data: AuthSchema) -> CurrentUserWithJWTSchema:
        """
        Authenticate user and generate access token.
        
        Validates credentials and returns user data with JWT token for
        accessing protected endpoints.
        
        Args:
            session: Active database session
            data: Login credentials (username and password)
            
        Returns:
            CurrentUserWithJWTSchema: User data with JWT access token
            
        Raises:
            AppError.INVALID_CREDENTIALS_ERROR: If credentials are invalid
        """
        if not (credentials := await cls.select_from_username(session, data.username)):
            raise AppError.INVALID_CREDENTIALS_ERROR
        if not Authenticator.pwd_context.verify(data.password, credentials.password):
            raise AppError.INVALID_CREDENTIALS_ERROR

        access_token = Authenticator.create_access_token(data={"sub": data.username})
        decoded_token = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])

        current_user = CurrentUserSchema(**credentials.__dict__)
        res = CurrentUserWithJWTSchema(
            data=current_user,
            access_token=access_token,
            token_type="bearer",
            exp=decoded_token["exp"],
        )

        return res

    @classmethod
    async def update_password(
        cls, session: AsyncSession, user_id: int, data: AccountUpdatePasswordSchema
    ) -> None:
        """
        Update user password with current password verification.
        
        Args:
            session: Active database session
            user_id: ID of the user updating password
            data: Current and new password information
            
        Raises:
            AppError.INVALID_CREDENTIALS_ERROR: If user not found
            AppError.PERMISSION_DENIED_ERROR: If current password incorrect
            AppError.BAD_REQUEST_ERROR: If new passwords don't match
        """
        curr = await Account.get(session, id=user_id)

        if not curr:
            raise AppError.INVALID_CREDENTIALS_ERROR

        if not Authenticator.pwd_context.verify(data.before_password, curr.password):
            raise AppError.PERMISSION_DENIED_ERROR

        if data.password != data.repeat_password:
            raise AppError.BAD_REQUEST_ERROR

        hashed_updated_password = Authenticator.pwd_context.hash(data.password)

        stmt = (
            update(Account)
            .returning(Account)
            .where(Account.user_id == user_id)
            .values({"password": hashed_updated_password})
        )
        await session.execute(stmt)
        await session.commit()

    @classmethod
    async def update_email(
        cls, session: AsyncSession, user_id: int, data: AccountUpdateEmailSchema
    ) -> None:
        """
        Update user email address and trigger verification.
        
        Changes email address and marks account as unverified until
        the new email is confirmed.
        
        Args:
            session: Active database session
            user_id: ID of the user updating email
            data: New email address
            
        Raises:
            AppError.INVALID_CREDENTIALS_ERROR: If user not found
            AppError.BAD_REQUEST_ERROR: If new email same as current
        """
        stmt = select(cls).where(cls.user_id == user_id)
        result = await session.execute(stmt)
        account = result.scalar()

        if not account:
            raise AppError.INVALID_CREDENTIALS_ERROR

        if account.email == data.new_email:
            raise AppError.BAD_REQUEST_ERROR

        stmt = (
            update(Account)
            .returning(Account)
            .where(Account.user_id == user_id)
            .values({"email": data.new_email, "verified": False})
        )
        res = await session.execute(stmt)
        updated_account = res.scalars().first()
        await session.commit()
        await cls.send_verification_email(
            session, user_id, updated_account.email, updated_account.username
        )

    @classmethod
    async def update_role(cls, session: AsyncSession, data: UpdateRoleSchema) -> None:
        """
        Update user role for access control.
        
        Args:
            session: Active database session
            data: Role update data including user_id and new role
        """
        data_dict = data.dict()
        to_update = {key: value for key, value in data_dict.items() if value is not None}

        stmt = (
            update(Account)
            .returning(Account)
            .where(Account.user_id == data.user_id)
            .values(to_update)
        )
        await session.execute(stmt)
        await session.commit()

    @classmethod
    async def select_from_username(cls, session: AsyncSession, username: str) -> "Account | None":
        """
        Find user by username (case-insensitive).
        
        Args:
            session: Active database session
            username: Username to search for
            
        Returns:
            Account | None: User account if found, None otherwise
        """
        try:
            stmt = select(Account).where(Account.username.ilike(username))
            result = await session.execute(stmt)
            return result.scalars().one()

        except SQLAlchemyExceptions.NoResultFound:
            return None

    @classmethod
    async def verify_email(cls, session: AsyncSession, token: str) -> None:
        """
        Verify user email using verification token.
        
        Marks account as verified and clears the verification token.
        
        Args:
            session: Active database session
            token: Email verification token from email link
            
        Raises:
            AppError.BAD_REQUEST_ERROR: If token invalid or already verified
        """
        try:
            stmt = select(Account).where(Account.email_verification_token == token)
            res = await session.execute(stmt)
            account = res.scalars().one()

        except SQLAlchemyExceptions.NoResultFound as e:  # pylint: disable=C0103
            raise AppError.BAD_REQUEST_ERROR from e

        if account.verified:
            raise AppError.BAD_REQUEST_ERROR

        account.verified = True
        account.email_verification_token = None
        await session.commit()

    @classmethod
    async def send_verification_email(
        cls,
        session: AsyncSession,
        user_id: int,
        email: EmailStr,
        username: str,
    ) -> None:
        """
        Send email verification link to user.
        
        Generates verification token and sends email with verification URL.
        
        Args:
            session: Active database session
            user_id: ID of the user to verify
            email: Email address to send verification to
            username: Username for email personalization
        """
        email_verification_token = uuid4().hex

        await email_service.send_verification_email(
            to=email,
            username=username,
            verification_url=f"{FRONTEND_URL}/verify-account?token={email_verification_token}",
        )

        stmt = (
            update(Account)
            .returning(Account)
            .where(Account.user_id == user_id)
            .values({"email_verification_token": email_verification_token})
        )
        await session.execute(stmt)
        await session.commit()

    @classmethod
    async def resend_email_verification_token(cls, session: AsyncSession, user_id: int) -> None:
        """
        Resend email verification token to unverified users.
        
        Args:
            session: Active database session
            user_id: ID of the user requesting new verification email
            
        Raises:
            AppError.BAD_REQUEST_ERROR: If user already verified
        """
        res = await cls.get(session=session, id=user_id)

        if not res.verified:
            email_verification_token = uuid4().hex
            await email_service.send_verification_email(
                to=res.email,
                username=res.username,
                verification_url=f"{FRONTEND_URL}/verify-account?token={email_verification_token}",
            )

            stmt = (
                update(Account)
                .returning(Account)
                .where(Account.user_id == user_id)
                .values({"email_verification_token": email_verification_token})
            )
            await session.execute(stmt)
            await session.commit()

        else:
            raise AppError.BAD_REQUEST_ERROR

    @classmethod
    async def send_reset_email(cls, session: AsyncSession, email: EmailStr) -> None:
        """
        Send password reset email to user.
        
        Generates reset token and sends email with reset link. Silently
        fails if email not found to prevent email enumeration.
        
        Args:
            session: Active database session
            email: Email address to send reset link
        """
        token = uuid4().hex

        stmt = select(cls).where(cls.email == email)
        result = await session.execute(stmt)
        account = result.scalar()

        try:
            await email_service.send_reset_password_email(
                to=email,
                username=account.username,
                reset_url=f"{FRONTEND_URL}/reset-password?token={token}",
            )
        except Exception as e:  # pylint: disable=C0103, W0612, W0703
            return

        stmt = (
            update(Account)
            .returning(Account)
            .where(Account.user_id == account.user_id)
            .values({"reset_password_token": token})
        )
        await session.execute(stmt)
        await session.commit()

    @classmethod
    async def reset_password(cls, session: AsyncSession, token: str) -> None:
        """
        Reset password using reset token.
        
        Generates a new random password and emails it to the user.
        Clears the reset token after use.
        
        Args:
            session: Active database session
            token: Password reset token from email link
            
        Raises:
            AppError.RESOURCES_NOT_FOUND_ERROR: If token invalid
        """
        try:
            stmt = select(Account).where(Account.reset_password_token == token)
            res = await session.execute(stmt)
            account = res.scalars().one()

        except SQLAlchemyExceptions.NoResultFound as e:  # pylint: disable=C0103
            raise AppError.RESOURCES_NOT_FOUND_ERROR from e

        password = generate_password()

        await email_service.send_new_password_email(
            to=account.email,
            username=account.username,
            new_password=password,
        )

        account.password = Authenticator.pwd_context.hash(password)
        account.reset_password_token = None
        await session.commit()

    @classmethod
    async def get_all_users_ascending_by_id(cls, session: AsyncSession) -> list["Account"]:
        """
        Get all users sorted by ID in ascending order.
        
        Args:
            session: Active database session
            
        Returns:
            list[Account]: List of all user accounts sorted by ID
        """
        stmt = select(cls).order_by(asc(cls.id))
        result = await session.execute(stmt)
        return result.scalars().all()
