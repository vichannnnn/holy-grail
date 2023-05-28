from datetime import datetime, timedelta
from os import environ
from typing import TYPE_CHECKING, Union

from fastapi import Depends, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
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

ACCESS_TOKEN_EXPIRE_MINUTES = int(environ["ACCESS_TOKEN_EXPIRE_MINUTES"])
ALGORITHM = environ["ALGORITHM"]
SECRET_KEY = environ["SECRET_KEY"]


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
                        # email=user.email,
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
                            # email=user.email,
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
                            # email=user.email,
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

    async def register(
        self, session: AsyncSession, data: AccountRegisterSchema
    ) -> CurrentUserSchema:
        self.username = data.username
        self.password = Authenticator.pwd_context.hash(data.password)
        # self.email = data.email

        try:
            session.add(self)
            await session.commit()
            await session.refresh(self)

            user_data = {
                "user_id": self.user_id,
                "username": self.username,
                # "email": self.email,
                "role": self.role,
            }

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
            # "email": credentials.email,
            "role": credentials.role,
        }
        current_user = CurrentUserSchema(**user_data)
        return current_user

    @classmethod
    async def update_password(
        cls, session: AsyncSession, user_id: int, data: AccountUpdatePasswordSchema
    ):
        curr_cred = await Account.get_one_by_filter(session, [("user_id", user_id)])
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
