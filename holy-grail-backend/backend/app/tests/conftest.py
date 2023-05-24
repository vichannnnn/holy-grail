import asyncio
from typing import AsyncGenerator
from app.api.deps import get_session
from app.main import app
from app.db.base_class import Base

from app import models
from app import schemas

from fastapi.testclient import TestClient
from pydantic import PostgresDsn
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
import pytest


SQLALCHEMY_DATABASE_URL = PostgresDsn.build(
    scheme="postgresql+asyncpg",
    user="postgres",
    password="postgres",
    host="db",
    port="5432",
    path="/test",
)

test_engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL, echo=True, future=True, poolclass=NullPool
)
TestingSessionLocal = sessionmaker(
    test_engine, autoflush=False, expire_on_commit=False, class_=AsyncSession
)


async def init_models():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


asyncio.run(init_models())


async def override_session() -> AsyncGenerator[AsyncSession, None]:
    async with TestingSessionLocal() as session:
        try:
            yield session
        finally:
            await session.rollback()
        await session.close()


app.dependency_overrides[get_session] = override_session


@pytest.fixture(name="test_authentication_client", scope="function")
def test_authentication_client():
    yield TestClient(app)


@pytest.fixture(name="client", scope="function")
def not_authenticated_client():
    app.dependency_overrides = {get_session: override_session}
    yield TestClient(app)


@pytest.fixture(name="test_valid_user", scope="function")
def test_valid_user():
    yield schemas.auth.AccountSchema(username="username", password="password")


@pytest.fixture(name="test_book_insert", scope="function")
def test_book_insert():
    yield schemas.core.BookCreateSchema(
        title="Testing Book 1", content="This is the content.", pages=2
    )


@pytest.fixture(name="test_book_update", scope="function")
def test_book_update():
    yield schemas.core.BookUpdateSchema(
        title="Updated Testing Book 1", content="This is the updated content.", pages=2
    )
