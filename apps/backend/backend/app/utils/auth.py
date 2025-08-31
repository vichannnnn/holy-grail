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
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

    @classmethod
    def create_access_token(cls, data: Dict[str, Any]) -> str:
        expiry = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        expiry_timestamp = int(expiry.timestamp())
        return jwt.encode(
            {**data, "exp": expiry_timestamp}, SECRET_KEY, algorithm=ALGORITHM
        )

    @classmethod
    async def verify(cls, token: str = Depends(oauth2_scheme)) -> bool:
        try:
            jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
            return True
        except JWTError as exc:
            raise AppError.INVALID_CREDENTIALS_ERROR from exc
