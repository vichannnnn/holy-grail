from enum import IntEnum
from typing import Optional, Annotated
from pydantic import StringConstraints, EmailStr
from app.schemas.base import CustomBaseModel as BaseModel

valid_username = Annotated[
    str, StringConstraints(strip_whitespace=True, pattern="^[a-zA-Z0-9]{4," "20}$")
]
valid_password = Annotated[
    str,
    StringConstraints(
        strip_whitespace=True, pattern=r"^(?=.*[A-Z])(?=.*\W)[^\s]{8,20}$"
    ),
]


class RoleEnum(IntEnum):
    USER = 1  # pylint: disable=invalid-name
    ADMIN = 2  # pylint: disable=invalid-name
    DEVELOPER = 3  # pylint: disable=invalid-name


class AccountRegisterSchema(BaseModel):
    username: valid_username  # type: ignore
    email: EmailStr  # type: ignore
    password: valid_password  # type: ignore
    repeat_password: valid_password  # type: ignore


class AccountCreateSchema(BaseModel):
    username: valid_username  # type: ignore
    password: str
    email: EmailStr


class AccountUpdatePasswordSchema(BaseModel):
    before_password: valid_password  # type: ignore
    password: valid_password  # type: ignore
    repeat_password: valid_password  # type: ignore


class AccountUpdateEmailSchema(BaseModel):
    new_email: EmailStr  # type: ignore


class AccountSchema(AccountRegisterSchema):
    user_id: Optional[int] = None
    repeat_password: Optional[valid_password]


class CurrentUserSchema(BaseModel):
    user_id: int
    email: Optional[EmailStr] = None  # type: ignore
    username: valid_username  # type: ignore
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
    username: valid_username  # type: ignore
    password: valid_password  # type: ignore


class UploaderSchema(BaseModel):
    user_id: int
    username: valid_username


class SendPasswordResetEmailSchema(BaseModel):
    email: EmailStr


class SendNewPasswordSchema(BaseModel):
    token: str


class VerifyEmailSchema(BaseModel):
    token: str
