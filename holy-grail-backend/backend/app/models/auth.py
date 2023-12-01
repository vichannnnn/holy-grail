from os import environ  # pylint: disable=E0611
from typing import TYPE_CHECKING
from uuid import uuid4

import jwt
from fastapi import Response as FastAPIResponse
from pydantic import EmailStr
from sqlalchemy import Index, asc, func
from sqlalchemy import exc as SQLAlchemyExceptions
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import relationship, Mapped, mapped_column, synonym
from sqlalchemy.sql.expression import text

from app.crud.base import CRUD
from app.db.base_class import Base
from app.schemas.admin import UpdateRoleSchema
from app.schemas.auth import (
    AccountRegisterSchema,
    AccountCreateSchema,
    AccountUpdatePasswordSchema,
    CurrentUserSchema,
    AuthSchema,
    CurrentUserWithJWTSchema,
    AccountUpdateEmailSchema,
)
from app.tasks.new_password_email import send_new_password_email_task
from app.tasks.reset_password_email import send_reset_password_email_task
from app.tasks.verify_email import send_verification_email_task
from app.utils.auth import Authenticator, generate_password
from app.utils.exceptions import AppError

if TYPE_CHECKING:
    from app.models.library import Library
    from app.models.scoreboard import Scoreboard

BACKEND_URL = environ["BACKEND_URL"]
FRONTEND_URL = environ["FRONTEND_URL"]
ACCESS_TOKEN_EXPIRE_MINUTES = int(environ["ACCESS_TOKEN_EXPIRE_MINUTES"])
ALGORITHM = environ["ALGORITHM"]
SECRET_KEY = environ["SECRET_KEY"]


class Account(Base, CRUD["Account"]):
    __tablename__ = "account"
    __table_args__ = (
        Index("username_case_sensitive_index", text("upper(username)"), unique=True),
    )

    user_id: Mapped[int] = mapped_column(
        primary_key=True, index=True, autoincrement=True
    )
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
    async def get_users_count(cls, session: AsyncSession):
        stmt = select(func.count(cls.user_id))
        result = await session.execute(stmt)
        return result.scalar_one()

    @classmethod
    async def register_development(
        cls, session: AsyncSession, data: AccountRegisterSchema
    ) -> CurrentUserSchema:
        if data.password != data.repeat_password:
            raise AppError.BAD_REQUEST_ERROR
        hashed_password = Authenticator.pwd_context.hash(data.password)
        insert_data = AccountCreateSchema(
            username=data.username, password=hashed_password, email=data.email
        )
        try:
            res = await super().create(session, insert_data.dict())

        except SQLAlchemyExceptions.IntegrityError as exc:
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc
        await session.refresh(res)

        return CurrentUserSchema(**res.__dict__)

    @classmethod
    async def register(
        cls, session: AsyncSession, data: AccountRegisterSchema
    ) -> CurrentUserWithJWTSchema:
        if data.password != data.repeat_password:
            raise AppError.BAD_REQUEST_ERROR

        hashed_password = Authenticator.pwd_context.hash(data.password)
        insert_data = AccountCreateSchema(
            username=data.username, password=hashed_password, email=data.email
        )

        try:
            res = await super().create(session, insert_data.dict())

        except SQLAlchemyExceptions.IntegrityError as exc:
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc

        await session.refresh(res)

        created_user = CurrentUserSchema(**res.__dict__)

        email_verification_token = uuid4().hex
        confirm_url = f"{FRONTEND_URL}/verify-account?token={email_verification_token}"
        send_verification_email_task.delay(data.email, data.username, confirm_url)

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
    async def login(
        cls, session: AsyncSession, data: AuthSchema
    ) -> CurrentUserWithJWTSchema:
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
    ) -> FastAPIResponse:
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
        return FastAPIResponse(status_code=204)

    @classmethod
    async def update_email(
        cls, session: AsyncSession, user_id: int, data: AccountUpdateEmailSchema
    ) -> FastAPIResponse:
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
        return FastAPIResponse(status_code=204)

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
        return FastAPIResponse(status_code=204)

    @classmethod
    async def select_from_username(cls, session: AsyncSession, username: str):
        try:
            stmt = select(Account).where(Account.username.ilike(username))
            result = await session.execute(stmt)
            return result.scalars().one()

        except SQLAlchemyExceptions.NoResultFound:
            return None

    @classmethod
    async def verify_email(cls, session: AsyncSession, token: str):
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
        cls, session: AsyncSession, user_id: int, email: EmailStr, username: str
    ):
        email_verification_token = uuid4().hex
        confirm_url = f"{FRONTEND_URL}/verify-account?token={email_verification_token}"
        send_verification_email_task.delay(email, username, confirm_url)

        stmt = (
            update(Account)
            .returning(Account)
            .where(Account.user_id == user_id)
            .values({"email_verification_token": email_verification_token})
        )
        await session.execute(stmt)
        await session.commit()

    @classmethod
    async def resend_email_verification_token(cls, session: AsyncSession, user_id: int):
        res = await cls.get(session=session, id=user_id)

        if not res.verified:
            email_verification_token = uuid4().hex
            confirm_url = (
                f"{FRONTEND_URL}/verify-account?token={email_verification_token}"
            )
            send_verification_email_task.delay(res.email, res.username, confirm_url)

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
    async def send_reset_email(cls, session: AsyncSession, email: EmailStr):
        token = uuid4().hex
        confirm_url = f"{FRONTEND_URL}/reset-password?token={token}"

        stmt = select(cls).where(cls.email == email)
        result = await session.execute(stmt)
        account = result.scalar()

        try:
            send_reset_password_email_task.delay(email, account.username, confirm_url)
        except Exception as e:  # pylint: disable=C0103, W0612, W0703
            print(str(e))
            return FastAPIResponse(status_code=200)

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

        except SQLAlchemyExceptions.NoResultFound as e:  # pylint: disable=C0103
            raise AppError.RESOURCES_NOT_FOUND_ERROR from e

        password = generate_password()

        send_new_password_email_task.delay(
            username=account.username,
            email=account.email,
            password=password,
        )

        account.password = Authenticator.pwd_context.hash(password)
        account.reset_password_token = None
        await session.commit()
        return FastAPIResponse(status_code=200)

    @classmethod
    async def get_all_users_ascending_by_id(cls, session: AsyncSession):
        stmt = select(cls).order_by(asc(cls.id))
        result = await session.execute(stmt)
        return result.scalars().all()
