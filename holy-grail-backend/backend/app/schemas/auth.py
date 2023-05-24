from enum import IntEnum
from typing import Optional

from pydantic import constr

from app.schemas.base import CustomBaseModel as BaseModel

password_validator = constr(regex="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&^])[^\s]{8,20}$")
username_validator = constr(regex="^[a-zA-Z0-9]{4,20}$")


class RoleEnum(IntEnum):
    USER = 1  # pylint: disable=invalid-name
    ADMIN = 2  # pylint: disable=invalid-name
    DEVELOPER = 3  # pylint: disable=invalid-name


class AccountRegisterSchema(BaseModel):
    username: username_validator  # type: ignore
    # email: EmailStr
    password: password_validator  # type: ignore
    repeat_password: password_validator  # type: ignore


class AccountUpdatePasswordSchema(BaseModel):
    # email: Optional[EmailStr]
    before_password: Optional[password_validator]  # type: ignore
    password: Optional[password_validator]  # type: ignore
    repeat_password: Optional[password_validator]  # type: ignore


class AccountSchema(AccountRegisterSchema):
    user_id: Optional[int]
    repeat_password: Optional[str]


class CurrentUserSchema(BaseModel):
    user_id: int
    # email: EmailStr
    username: username_validator  # type: ignore
    role: RoleEnum


class AuthSchema(BaseModel):
    username: username_validator  # type: ignore
    password: password_validator  # type: ignore


class UploaderSchema(BaseModel):
    user_id: int
    username: username_validator
