from typing import AsyncGenerator, Generator

from app.db.database import SessionLocal, async_session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from app.app_s3_client import s3_app_client
import os
from moto import mock_s3
import boto3


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
