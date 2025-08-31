from enum import IntEnum
from typing import Annotated, Optional

from pydantic import EmailStr, StringConstraints

from app.schemas.base import CustomBaseModel as BaseModel

password_validator = Annotated[
    str,
    StringConstraints(
        strip_whitespace=True, pattern=r"^(?=.*[A-Z])(?=.*\W)[^\s]{8,30}$"
    ),
]
username_validator = Annotated[
    str, StringConstraints(strip_whitespace=True, pattern="^[a-zA-Z0-9]{4,20}$")
]


class RoleEnum(IntEnum):
    USER = 1  # pylint: disable=invalid-name
    ADMIN = 2  # pylint: disable=invalid-name
    DEVELOPER = 3  # pylint: disable=invalid-name


class AccountRegisterSchema(BaseModel):
    username: username_validator  # type: ignore
    email: EmailStr  # type: ignore
    password: password_validator  # type: ignore
    repeat_password: password_validator  # type: ignore


class AccountSchema(AccountRegisterSchema):
    user_id: Optional[int] = None
    repeat_password: Optional[str] = None


class AccountCreateSchema(BaseModel):
    username: username_validator  # type: ignore
    password: str
    email: EmailStr


class AccountUpdatePasswordSchema(BaseModel):
    before_password: password_validator  # type: ignore
    password: password_validator  # type: ignore
    repeat_password: password_validator  # type: ignore


class AccountUpdateEmailSchema(BaseModel):
    new_email: EmailStr  # type: ignore


class CurrentUserSchema(BaseModel):
    user_id: int
    email: Optional[EmailStr]  # type: ignore
    username: username_validator  # type: ignore
    role: RoleEnum
    verified: bool


class UpdateUserRoleSchema(BaseModel):
    role: Optional[RoleEnum] = None


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
