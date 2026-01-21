"""
Dependency injection functions for FastAPI endpoints.

This module provides reusable dependencies for database sessions,
authentication, authorization, and external service clients (S3).
All dependencies follow FastAPI's dependency injection pattern.
"""
from typing import Annotated
from collections.abc import AsyncGenerator, Generator

import boto3
from fastapi import Depends
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session

from app.core import Environment, settings
from app.db.database import SessionLocal, async_session
from app.models.auth import (
    ALGORITHM,
    SECRET_KEY,
    Account,
    AppError,
    Authenticator,
    CurrentUserSchema,
)
from app.utils.file_handler import s3_app_client


def get_db() -> Generator[Session, None, None]:
    """
    Provide a synchronous database session.

    Yields:
        Session: SQLAlchemy database session
    """
    with SessionLocal() as session:
        yield session


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Provide an asynchronous database session.

    This is the primary database dependency for async endpoints.

    Yields:
        AsyncSession: Async SQLAlchemy database session
    """
    async with async_session() as session:
        yield session


def get_s3_client() -> boto3.Session:
    """
    Provide an S3 client for file storage operations.

    In local environment, attempts to use moto for mocking.
    In production, uses real AWS S3 client.

    Yields:
        boto3.Session: S3 client for file operations
    """
    if settings.environment == Environment.LOCAL:
        try:
            from moto import mock_s3

            with mock_s3():
                s3_client = boto3.client("s3", region_name="us-east-1")
                s3_client.create_bucket(Bucket="test-bucket")
                yield s3_client
        except ImportError:
            # If moto is not installed (production), fall back to real S3
            yield s3_app_client
    else:
        yield s3_app_client


CurrentSession = Annotated[AsyncSession, Depends(get_session)]
OAuth2Session = Annotated[Authenticator.oauth2_scheme, Depends(Authenticator.oauth2_scheme)]


async def get_verified_user(
    session: CurrentSession,
    token: OAuth2Session,
) -> CurrentUserSchema:
    """
    Get current user from JWT token, ensuring email is verified.

    Validates JWT token and checks that user's email is verified
    before granting access.

    Args:
        session: Database session
        token: JWT token from request

    Returns:
        CurrentUserSchema: Verified user information

    Raises:
        AppError.PERMISSION_DENIED_ERROR: If user not verified
        AppError.INVALID_CREDENTIALS_ERROR: If token is invalid
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)

        username = payload.get("sub")
        user = await Account.select_from_username(session, username) if username else None

        if username and user and user.verified:
            return CurrentUserSchema(
                user_id=user.user_id,
                username=username,
                role=user.role,
                email=user.email,
                verified=user.verified,
            )

        else:
            raise AppError.PERMISSION_DENIED_ERROR

    except JWTError as exc:
        raise AppError.INVALID_CREDENTIALS_ERROR from exc


async def get_current_user(
    session: CurrentSession,
    token: OAuth2Session,
) -> CurrentUserSchema:
    """
    Get current user from JWT token without verification check.

    Validates JWT token and returns user information regardless
    of email verification status.

    Args:
        session: Database session
        token: JWT token from request

    Returns:
        CurrentUserSchema: Current user information

    Raises:
        AppError.PERMISSION_DENIED_ERROR: If user not found
        AppError.INVALID_CREDENTIALS_ERROR: If token is invalid
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        username = payload.get("sub")
        user = await Account.select_from_username(session, username) if username else None

        if username and user:
            return CurrentUserSchema(
                user_id=user.user_id,
                username=username,
                role=user.role,
                email=user.email,
                verified=user.verified,
            )

        else:
            raise AppError.PERMISSION_DENIED_ERROR

    except JWTError as exc:
        raise AppError.INVALID_CREDENTIALS_ERROR from exc


async def get_admin(
    session: CurrentSession,
    token: OAuth2Session,
) -> CurrentUserSchema:
    """
    Get current user ensuring admin privileges.

    Validates JWT token and checks that user has admin role
    (role >= 2) before granting access.

    Args:
        session: Database session
        token: JWT token from request

    Returns:
        CurrentUserSchema: Admin user information

    Raises:
        AppError.PERMISSION_DENIED_ERROR: If user not admin
        AppError.INVALID_CREDENTIALS_ERROR: If token is invalid
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        username = payload.get("sub")
        user = await Account.select_from_username(session, username) if username else None

        if username and user and user.role >= 2:
            return CurrentUserSchema(
                user_id=user.user_id,
                username=username,
                role=user.role,
                email=user.email,
                verified=user.verified,
            )

        else:
            raise AppError.PERMISSION_DENIED_ERROR

    except JWTError as exc:
        raise AppError.INVALID_CREDENTIALS_ERROR from exc


async def get_developer(
    session: CurrentSession,
    token: OAuth2Session,
) -> CurrentUserSchema:
    """
    Get current user ensuring developer privileges.

    Validates JWT token and checks that user has developer role
    (role >= 3) before granting access.

    Args:
        session: Database session
        token: JWT token from request

    Returns:
        CurrentUserSchema: Developer user information

    Raises:
        AppError.PERMISSION_DENIED_ERROR: If user not developer
        AppError.INVALID_CREDENTIALS_ERROR: If token is invalid
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        username = payload.get("sub")
        user = await Account.select_from_username(session, username) if username else None

        if username and user and user.role >= 3:
            return CurrentUserSchema(
                user_id=user.user_id,
                username=username,
                role=user.role,
                email=user.email,
                verified=user.verified,
            )

        else:
            raise AppError.PERMISSION_DENIED_ERROR

    except JWTError as exc:
        raise AppError.INVALID_CREDENTIALS_ERROR from exc


SessionUser = Annotated[CurrentUserSchema, Depends(get_current_user)]
SessionVerifiedUser = Annotated[CurrentUserSchema, Depends(get_verified_user)]
SessionAdmin = Annotated[CurrentUserSchema, Depends(get_admin)]
SessionDeveloper = Annotated[CurrentUserSchema, Depends(get_developer)]
SessionBucket = Annotated[boto3.Session, Depends(get_s3_client)]
