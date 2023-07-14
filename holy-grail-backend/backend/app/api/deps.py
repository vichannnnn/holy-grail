from typing import AsyncGenerator, Generator
from fastapi import Depends
from app.db.database import SessionLocal, async_session
from app.file_handler import s3_app_client
from app.models.auth import (
    Authenticator,
    AppError,
    CurrentUserSchema,
    ALGORITHM,
    SECRET_KEY,
    Account,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session

import os
from moto import mock_s3
import boto3
from jose import JWTError, jwt


def get_db() -> Generator[Session, None, None]:
    with SessionLocal() as session:
        yield session


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session


def get_s3_client():
    if os.environ.get("TESTING"):
        with mock_s3():
            s3_client = boto3.client("s3", region_name="us-east-1")
            s3_client.create_bucket(Bucket="test-bucket")
            yield s3_client

    else:
        yield s3_app_client


async def get_verified_user(
    token: str = Depends(Authenticator.oauth2_scheme),
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


async def get_current_user(
    token: str = Depends(Authenticator.oauth2_scheme),
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


async def get_admin(
    token: str = Depends(Authenticator.oauth2_scheme),
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


async def get_developer(
    token: str = Depends(Authenticator.oauth2_scheme),
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
