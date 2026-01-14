"""
Authentication utilities for JWT token management and password handling.

This module provides utilities for creating/verifying JWT tokens, password
generation, and password hashing using bcrypt.
"""
import random
import string
from datetime import datetime, timedelta
from typing import Any, Dict

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core import settings
from app.utils.exceptions import AppError

ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes
ALGORITHM = settings.algorithm
SECRET_KEY = settings.secret_key


def generate_password() -> str:
    """
    Generate a random 8-character password.

    Creates a password containing at least one letter, one digit,
    and one special character (@$!%*?&^).

    Returns:
        str: Random 8-character password.
    """
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
    """
    Authentication helper class for JWT and password operations.

    Provides class methods for creating/verifying JWT tokens and
    manages password hashing context with bcrypt.
    """

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

    @classmethod
    def create_access_token(cls, data: Dict[str, Any]) -> str:
        """
        Create a JWT access token.

        Args:
            data: Dictionary of claims to include in the token.

        Returns:
            str: Encoded JWT token with expiration.
        """
        expiry = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        expiry_timestamp = int(expiry.timestamp())
        return jwt.encode({**data, "exp": expiry_timestamp}, SECRET_KEY, algorithm=ALGORITHM)

    @classmethod
    async def verify(cls, token: str = Depends(oauth2_scheme)) -> bool:
        """
        Verify JWT token validity.

        Used as a dependency to protect endpoints.

        Args:
            token: JWT token from Authorization header.

        Returns:
            bool: True if token is valid.

        Raises:
            AppError: If token is invalid or expired.
        """
        try:
            jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
            return True
        except JWTError as exc:
            raise AppError.INVALID_CREDENTIALS_ERROR from exc
