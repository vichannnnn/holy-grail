from enum import IntEnum
from typing import Optional

from pydantic import constr, EmailStr

from app.schemas.base import CustomBaseModel as BaseModel

password_validator = constr(  # pylint: disable=C0103
    regex="^(?=.*[A-Z])(?=.*\W)[^\s]{8,30}$"  # pylint: disable= W1401
)  # pylint: disable=C0103
username_validator = constr(regex="^[a-zA-Z0-9]{4,20}$")  # pylint: disable=C0103, W1401


class RoleEnum(IntEnum):
    USER = 1  # pylint: disable=invalid-name
    ADMIN = 2  # pylint: disable=invalid-name
    DEVELOPER = 3  # pylint: disable=invalid-name


class AccountRegisterSchema(BaseModel):
    username: username_validator  # type: ignore
    email: EmailStr  # type: ignore
    password: password_validator  # type: ignore
    repeat_password: password_validator  # type: ignore


class AccountCreateSchema(BaseModel):
    username: username_validator  # type: ignore
    password: str
    email: EmailStr


class AccountUpdatePasswordSchema(BaseModel):
    before_password: password_validator  # type: ignore
    password: password_validator  # type: ignore
    repeat_password: password_validator  # type: ignore


class AccountUpdateEmailSchema(BaseModel):
    before_email: EmailStr  # type: ignore
    email: EmailStr  # type: ignore
    new_email: EmailStr


class AccountSchema(AccountRegisterSchema):
    user_id: Optional[int]
    repeat_password: Optional[str]


class CurrentUserSchema(BaseModel):
    user_id: int
    email: Optional[EmailStr]  # type: ignore
    username: username_validator  # type: ignore
    role: RoleEnum
    verified: bool


class UpdateUserRoleSchema(BaseModel):
    role: Optional[RoleEnum]


class CurrentUserWithJWTSchema(BaseModel):
    data: CurrentUserSchema
    access_token: str
    token_type: str
    exp: int


class AuthSchema(BaseModel):
    username: username_validator  # type: ignore
    password: password_validator  # type: ignore


class UploaderSchema(BaseModel):
    user_id: int
    username: username_validator


class SendPasswordResetEmailSchema(BaseModel):
    email: EmailStr


class SendNewPasswordSchema(BaseModel):
    token: str


class VerifyEmailSchema(BaseModel):
    token: str
