import string
import traceback
from datetime import datetime, timedelta
from os import environ
from typing import TYPE_CHECKING, Union
from uuid import uuid4

from fastapi import Depends, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import EmailStr
from sqlalchemy import Index
from sqlalchemy import exc as SQLAlchemyExceptions
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql.expression import text

from app.api.deps import get_session
from app.crud.base import CRUD
from app.db.base_class import Base
from app.exceptions import AppError
from app.schemas.admin import UpdateRoleSchema
from app.schemas.auth import (
    AccountRegisterSchema,
    AccountUpdatePasswordSchema,
    CurrentUserSchema,
)

if TYPE_CHECKING:
    from app.models.library import Library
import random
from app.tasks.verify_email import send_verification_email_task
from app.tasks.reset_password_email import send_reset_password_email_task
from app.tasks.new_password_email import send_new_password_email_task

BACKEND_URL = environ["BACKEND_URL"]
FRONTEND_URL = environ["FRONTEND_URL"]
ACCESS_TOKEN_EXPIRE_MINUTES = int(environ["ACCESS_TOKEN_EXPIRE_MINUTES"])
ALGORITHM = environ["ALGORITHM"]
SECRET_KEY = environ["SECRET_KEY"]


def generate_password():
    letter_group = string.ascii_letters
    digit_group = string.digits
    special_group = "@$!%*?&^"

    password = [
        random.choice(letter_group),
        random.choice(digit_group),
        random.choice(special_group),
    ]
    all_characters = letter_group + digit_group + special_group
    password += random.choices(all_characters, k=5)  # k=5 to make total length 8

    random.shuffle(password)

    return "".join(password)


class Authenticator:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

    @classmethod
    def create_access_token(cls, data: dict):
        expiry = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        expiry_timestamp = int(expiry.timestamp())
        return jwt.encode(
            {**data, "exp": expiry_timestamp}, SECRET_KEY, algorithm=ALGORITHM
        )

    @classmethod
    async def get_verified_user(
        cls,
        token: str = Depends(oauth2_scheme),
        session: AsyncSession = Depends(get_session),
    ) -> CurrentUserSchema:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
            if username := payload.get("sub"):
                if user := await Account.select_from_username(session, username):
                    if user.verified:
                        return CurrentUserSchema(
                            user_id=user.user_id,
                            username=username,
                            role=user.role,
                            email=user.email,
                            verified=user.verified,
                        )

        except JWTError as exc:
            raise AppError.INVALID_CREDENTIALS_ERROR from exc
        raise AppError.INVALID_CREDENTIALS_ERROR

    @classmethod
    async def get_current_user(
        cls,
        token: str = Depends(oauth2_scheme),
        session: AsyncSession = Depends(get_session),
    ) -> CurrentUserSchema:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
            if username := payload.get("sub"):
                if user := await Account.select_from_username(session, username):
                    return CurrentUserSchema(
                        user_id=user.user_id,
                        username=username,
                        role=user.role,
                        email=user.email,
                        verified=user.verified,
                    )

        except JWTError as exc:
            raise AppError.INVALID_CREDENTIALS_ERROR from exc
        raise AppError.INVALID_CREDENTIALS_ERROR

    @classmethod
    async def get_admin(
        cls,
        token: str = Depends(oauth2_scheme),
        session: AsyncSession = Depends(get_session),
    ) -> CurrentUserSchema:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
            if username := payload.get("sub"):
                if user := await Account.select_from_username(session, username):
                    if user.role >= 2:
                        return CurrentUserSchema(
                            user_id=user.user_id,
                            username=username,
                            role=user.role,
                            email=user.email,
                            verified=user.verified,
                        )

        except JWTError as exc:
            raise AppError.INVALID_CREDENTIALS_ERROR from exc
        raise AppError.INVALID_CREDENTIALS_ERROR

    @classmethod
    async def get_developer(
        cls,
        token: str = Depends(oauth2_scheme),
        session: AsyncSession = Depends(get_session),
    ) -> CurrentUserSchema:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
            if username := payload.get("sub"):
                if user := await Account.select_from_username(session, username):
                    if user.role >= 3:
                        return CurrentUserSchema(
                            user_id=user.user_id,
                            username=username,
                            role=user.role,
                            email=user.email,
                            verified=user.verified,
                        )

        except JWTError as exc:
            raise AppError.INVALID_CREDENTIALS_ERROR from exc
        raise AppError.INVALID_CREDENTIALS_ERROR

    @classmethod
    async def verify(cls, token: str = Depends(oauth2_scheme)):
        try:
            jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
            return True
        except JWTError as exc:
            raise AppError.INVALID_CREDENTIALS_ERROR from exc


class Account(Base, CRUD["Account"]):
    __tablename__ = "account"
    __table_args__ = (
        Index("username_case_sensitive_index", text("upper(username)"), unique=True),
    )

    user_id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(nullable=False, unique=True)
    email: Mapped[str] = mapped_column(nullable=True, unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    documents: Mapped["Library"] = relationship(back_populates="account", uselist=True)
    role: Mapped[int] = mapped_column(nullable=False, server_default=text("1"))
    verified: Mapped[bool] = mapped_column(nullable=False, server_default="f")
    email_verification_token: Mapped[str] = mapped_column(nullable=True)
    reset_password_token: Mapped[str] = mapped_column(nullable=True)

    async def register(
        self, session: AsyncSession, data: AccountRegisterSchema
    ) -> CurrentUserSchema:
        self.username = data.username
        self.password = Authenticator.pwd_context.hash(data.password)
        self.email = data.email

        try:
            session.add(self)
            await session.commit()
            await session.refresh(self)

            user_data = {
                "user_id": self.user_id,
                "username": self.username,
                "email": self.email,
                "role": self.role,
                "verified": self.verified,
            }

            self.email_verification_token = uuid4().hex
            confirm_url = (
                f"{FRONTEND_URL}/verify-account?token={self.email_verification_token}"
            )

            send_verification_email_task.delay(data.email, data.username, confirm_url)

            stmt = (
                update(Account)
                .returning(Account)
                .where(Account.user_id == self.user_id)
                .values({"email_verification_token": self.email_verification_token})
            )
            await session.execute(stmt)
            await session.commit()

            current_user = CurrentUserSchema(**user_data)
            return current_user

        except SQLAlchemyExceptions.IntegrityError as exc:
            await session.rollback()
            raise AppError.USERNAME_ALREADY_EXISTS_ERROR from exc

    @classmethod
    async def login(
        cls, session: AsyncSession, username: str, password: str
    ) -> Union[CurrentUserSchema, bool]:
        if not (credentials := await Account.select_from_username(session, username)):
            return False
        if not Authenticator.pwd_context.verify(password, credentials.password):
            return False

        user_data = {
            "user_id": credentials.user_id,
            "username": credentials.username,
            "email": credentials.email,
            "role": credentials.role,
            "verified": credentials.verified,
        }
        current_user = CurrentUserSchema(**user_data)
        return current_user

    @classmethod
    async def update_password(
        cls, session: AsyncSession, user_id: int, data: AccountUpdatePasswordSchema
    ):
        curr_cred = await Account.get(session, user_id=user_id)
        if not Authenticator.pwd_context.verify(
            data.before_password, curr_cred.password
        ):
            raise AppError.INVALID_CREDENTIALS_ERROR

        if not curr_cred:
            raise AppError.INVALID_CREDENTIALS_ERROR

        if data.password != data.repeat_password:
            raise AppError.PASSWORD_MISMATCH_ERROR

        data_dict = data.dict()
        data_dict.pop("before_password", None)
        data_dict.pop("repeat_password", None)
        data_dict["password"] = Authenticator.pwd_context.hash(data.password)
        to_update = {
            key: value for key, value in data_dict.items() if value is not None
        }

        stmt = (
            update(Account)
            .returning(Account)
            .where(Account.user_id == user_id)
            .values(to_update)
        )
        await session.execute(stmt)
        await session.commit()
        return status.HTTP_204_NO_CONTENT

    @classmethod
    async def update_role(cls, session: AsyncSession, data: UpdateRoleSchema):
        data_dict = data.dict()
        to_update = {
            key: value for key, value in data_dict.items() if value is not None
        }

        stmt = (
            update(Account)
            .returning(Account)
            .where(Account.user_id == data.user_id)
            .values(to_update)
        )
        await session.execute(stmt)
        await session.commit()
        return status.HTTP_204_NO_CONTENT

    @classmethod
    async def select_from_username(cls, session: AsyncSession, username: str):
        try:
            stmt = select(Account).where(Account.username.ilike(username))
            result = await session.execute(stmt)
            return result.scalars().one()

        except SQLAlchemyExceptions.NoResultFound:
            return None

    @classmethod
    async def get(cls: Base, session: AsyncSession, user_id: int):
        stmt = select(cls).where(cls.user_id == user_id)
        result = await session.execute(stmt)
        return result.scalar()

    @classmethod
    async def get_all(cls: Base, session: AsyncSession):
        stmt = select(cls).order_by(cls.user_id)
        result = await session.execute(stmt)
        return result.scalars().all()

    @classmethod
    async def update(cls: Base, session: AsyncSession, id: int, data: dict):
        stmt = update(cls).returning(cls).where(cls.user_id == id).values(**data)
        res = await session.execute(stmt)
        await session.commit()
        updated_object = res.fetchone()
        return updated_object[0]

    @classmethod
    async def verify_email(cls, session: AsyncSession, token: str):
        try:
            stmt = select(Account).where(Account.email_verification_token == token)
            res = await session.execute(stmt)
            account = res.scalars().one()

        except SQLAlchemyExceptions.NoResultFound:
            raise AppError.INVALID_EMAIL_VERIFICATION_TOKEN

        if account.verified:
            raise AppError.ACCOUNT_ALREADY_VERIFIED

        account.verified = True
        account.email_verification_token = None
        await session.commit()

    async def send_verification_email(
        self, session: AsyncSession, email: EmailStr, username: str
    ):
        self.email_verification_token = uuid4().hex
        confirm_url = (
            f"{FRONTEND_URL}/verify-account?token={self.email_verification_token}"
        )

        send_verification_email_task.delay(email, username, confirm_url)

        stmt = (
            update(Account)
            .returning(Account)
            .where(Account.user_id == self.user_id)
            .values({"email_verification_token": self.email_verification_token})
        )
        await session.execute(stmt)
        await session.commit()

    async def resend_email_verification_token(
        self, session: AsyncSession, user_id: int, username: str
    ):
        self.user_id = user_id
        self.username = username

        res = await self.get(session=session, user_id=user_id)

        if not res.verified:
            self.email_verification_token = uuid4().hex
            confirm_url = (
                f"{FRONTEND_URL}/verify-account?token={self.email_verification_token}"
            )
            send_verification_email_task.delay(res.email, res.username, confirm_url)

        else:
            raise AppError.USER_EMAIL_ALREADY_VERIFIED_ERROR

    @classmethod
    async def send_reset_email(cls: Base, session: AsyncSession, email: EmailStr):
        token = uuid4().hex
        confirm_url = f"{FRONTEND_URL}/reset-password?token={token}"

        stmt = select(cls).where(cls.email == email)
        result = await session.execute(stmt)
        account = result.scalar()

        try:
            send_reset_password_email_task.delay(email, account.username, confirm_url)

        except:
            traceback.print_exc()
            return status.HTTP_200_OK

        stmt = (
            update(Account)
            .returning(Account)
            .where(Account.user_id == account.user_id)
            .values({"reset_password_token": token})
        )
        await session.execute(stmt)
        await session.commit()

    @classmethod
    async def reset_password(cls, session: AsyncSession, token: str):
        try:
            stmt = select(Account).where(Account.reset_password_token == token)
            res = await session.execute(stmt)
            account = res.scalars().one()

        except SQLAlchemyExceptions.NoResultFound:
            raise AppError.INVALID_PASSWORD_RESET_TOKEN

        password = generate_password()

        send_new_password_email_task.delay(
            username=account.username,
            email=account.email,
            password=password,
        )

        account.password = Authenticator.pwd_context.hash(password)
        account.reset_password_token = None
        await session.commit()

        return status.HTTP_200_OK
