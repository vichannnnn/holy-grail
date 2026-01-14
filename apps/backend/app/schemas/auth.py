"""
Authentication schemas for user account management.

This module defines Pydantic models for user authentication, registration,
password management, and JWT token handling. Includes validators for
username and password security requirements.
"""
import re
from enum import IntEnum
from typing import Annotated, Optional

from pydantic import EmailStr, StringConstraints

from app.schemas.base import CustomBaseModel as BaseModel

password_validator = Annotated[
    str,
    StringConstraints(
        strip_whitespace=True,
        pattern=re.compile(r"^[A-Za-z0-9!@#$%^&*()\-_=+\[\]{}|;:'\",.<>?/]{8,30}$"),
    ),
]

username_validator = Annotated[
    str, StringConstraints(strip_whitespace=True, pattern=re.compile(r"^[a-zA-Z0-9]{4,20}$"))
]


class RoleEnum(IntEnum):
    """
    User role enumeration for access control.

    Defines three role levels with increasing privileges.
    """

    USER = 1  # pylint: disable=invalid-name
    ADMIN = 2  # pylint: disable=invalid-name
    DEVELOPER = 3  # pylint: disable=invalid-name


class AccountRegisterSchema(BaseModel):
    """
    Schema for user registration requests.

    Validates username format, email, and password requirements.
    Ensures password confirmation matches.
    """

    username: username_validator  # type: ignore
    email: EmailStr  # type: ignore
    password: password_validator  # type: ignore
    repeat_password: password_validator  # type: ignore


class AccountSchema(AccountRegisterSchema):
    """
    Extended account schema with optional fields.

    Used for internal operations where user_id may be present.
    """

    user_id: Optional[int] = None
    repeat_password: Optional[str] = None


class AccountCreateSchema(BaseModel):
    """
    Internal schema for account creation.

    Used after validation, password is already hashed.
    """

    username: username_validator  # type: ignore
    password: str
    email: EmailStr


class AccountUpdatePasswordSchema(BaseModel):
    """
    Schema for password update requests.

    Requires current password verification before update.
    """

    before_password: password_validator  # type: ignore
    password: password_validator  # type: ignore
    repeat_password: password_validator  # type: ignore


class AccountUpdateEmailSchema(BaseModel):
    new_email: EmailStr  # type: ignore


class CurrentUserSchema(BaseModel):
    """
    Schema for authenticated user information.

    Contains user details exposed to the frontend.
    """

    user_id: int
    email: Optional[EmailStr]  # type: ignore
    username: username_validator  # type: ignore
    role: RoleEnum
    verified: bool


class UpdateUserRoleSchema(BaseModel):
    role: Optional[RoleEnum] = None


class CurrentUserWithJWTSchema(BaseModel):
    """
    Schema for user data with JWT authentication token.

    Returned after successful login or registration.
    """

    data: CurrentUserSchema
    access_token: str
    token_type: str
    exp: int


class AuthSchema(BaseModel):
    """
    Schema for login credentials.

    Validates username and password format.
    """

    username: username_validator  # type: ignore
    password: password_validator  # type: ignore


class UploaderSchema(BaseModel):
    user_id: int
    username: username_validator


class SendPasswordResetEmailSchema(BaseModel):
    """
    Schema for password reset email requests.
    """

    email: EmailStr


class SendNewPasswordSchema(BaseModel):
    """
    Schema for password reset confirmation.

    Contains the reset token from email link.
    """

    token: str


class VerifyEmailSchema(BaseModel):
    """
    Schema for email verification.

    Contains the verification token from email link.
    """

    token: str


class PaginatedUsersSchema(BaseModel):
    """
    Schema for paginated user list responses.

    Used by admin endpoints to return paginated user data.
    """

    items: list[CurrentUserSchema]
    page: int
    pages: int
    size: int
    total: int
