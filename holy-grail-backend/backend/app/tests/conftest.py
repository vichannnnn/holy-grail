import asyncio
from typing import AsyncGenerator

import pytest

from fastapi.testclient import TestClient
from pydantic import PostgresDsn
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

from app import schemas
from app.api.deps import get_session
from app.db.base_class import Base
from app.main import app
from app.models.auth import Authenticator

SQLALCHEMY_DATABASE_URL = PostgresDsn.build(
    scheme="postgresql+asyncpg",
    user="postgres",
    password="postgres",
    host="holy-grail-db",
    port="5432",
    path="/test",
)

test_engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL, future=True, poolclass=NullPool
)
TestingSessionLocal = sessionmaker(
    test_engine, autoflush=False, expire_on_commit=False, class_=AsyncSession
)


@pytest.fixture(scope="session")
def loop():
    return asyncio.get_event_loop()


@pytest.fixture(scope="function", autouse=True)
async def init_models(loop):
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    app.dependency_overrides[get_session] = override_session


async def override_session() -> AsyncGenerator[AsyncSession, None]:
    async with TestingSessionLocal() as session:
        try:
            yield session
        finally:
            await session.rollback()
        await session.close()


async def override_get_current_user():
    return schemas.auth.CurrentUserSchema(
        user_id=1,
        username="testuser",
        role=1,
        email="testuser@gmail.com",
        verified=True,
    )


async def override_get_admin():
    return schemas.auth.CurrentUserSchema(
        user_id=1,
        username="testadmin",
        role=2,
        email="testadmin@gmail.com",
        verified=True,
    )


async def override_get_developer():
    return schemas.auth.CurrentUserSchema(
        user_id=1,
        username="testdeveloper",
        role=3,
        email="testdeveloper@gmail.com",
        verified=True,
    )


@pytest.fixture
def test_client(request):
    return request.getfixturevalue(request.param)


@pytest.fixture
def test_subject(request):
    return request.getfixturevalue(request.param)


@pytest.fixture
def test_category_level(request):
    return request.getfixturevalue(request.param)


@pytest.fixture
def test_doc_types(request):
    return request.getfixturevalue(request.param)


@pytest.fixture(name="test_not_logged_in_client", scope="function")
def test_authentication_client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(name="test_client_user", scope="function")
def test_client_user():
    app.dependency_overrides[Authenticator.get_current_user] = override_get_current_user
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides = {}


@pytest.fixture(name="test_client_verified_user", scope="function")
def test_client_verified_user():
    app.dependency_overrides[Authenticator.get_current_user] = override_get_current_user
    app.dependency_overrides[
        Authenticator.get_verified_user
    ] = override_get_current_user
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides = {}


@pytest.fixture(name="test_client_admin", scope="function")
def test_client_admin():
    app.dependency_overrides[Authenticator.get_current_user] = override_get_admin
    app.dependency_overrides[Authenticator.get_verified_user] = override_get_admin
    app.dependency_overrides[Authenticator.get_admin] = override_get_admin
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides = {}


@pytest.fixture(name="test_client_developer", scope="function")
def test_client_developer():
    app.dependency_overrides[Authenticator.get_current_user] = override_get_developer
    app.dependency_overrides[Authenticator.get_verified_user] = override_get_developer
    app.dependency_overrides[Authenticator.get_admin] = override_get_developer
    app.dependency_overrides[Authenticator.get_developer] = override_get_developer
    yield TestClient(app)
    app.dependency_overrides = {}


@pytest.fixture(name="test_valid_user", scope="function")
def test_valid_user():
    yield schemas.auth.AccountSchema(
        username="username",
        password="Password123!",
        repeat_password="Password123!",
        email="test@gmail.com",
    )


@pytest.fixture(name="test_subject_insert_mathematics", scope="function")
def test_subject_insert_math():
    yield schemas.categories.SubjectCreateSchema(name="Mathematics")


@pytest.fixture(name="test_subject_insert_chemistry", scope="function")
def test_subject_insert_chem():
    yield schemas.categories.SubjectCreateSchema(name="Chemistry")


@pytest.fixture(name="test_subject_insert_biology", scope="function")
def test_subject_insert_bio():
    yield schemas.categories.SubjectCreateSchema(name="Biology")


@pytest.fixture(name="test_subject_insert_physics", scope="function")
def test_subject_insert_physics():
    yield schemas.categories.SubjectCreateSchema(name="Physics")


@pytest.fixture(name="test_doc_type_insert_practice_paper", scope="function")
def test_doc_type_insert_practice_paper():
    yield schemas.categories.DocumentTypeCreateSchema(name="Practice Paper")


@pytest.fixture(name="test_doc_type_insert_practice_answer", scope="function")
def test_doc_type_insert_practice_answer():
    yield schemas.categories.DocumentTypeCreateSchema(name="Practice Answer")


@pytest.fixture(name="test_doc_type_insert_insert_notes", scope="function")
def test_doc_type_insert_notes():
    yield schemas.categories.DocumentTypeCreateSchema(name="Notes")


@pytest.fixture(name="test_doc_type_insert_extra_notes", scope="function")
def test_doc_type_insert_extra_notes():
    yield schemas.categories.DocumentTypeCreateSchema(name="Extra Notes")


@pytest.fixture(name="test_category_insert_gce_a_level", scope="function")
def test_category_insert_gce_a_level():
    yield schemas.categories.CategoryCreateSchema(name="GCE 'A' Levels")


@pytest.fixture(name="test_category_insert_gce_o_level", scope="function")
def test_category_insert_gce_o_level():
    yield schemas.categories.CategoryCreateSchema(name="GCE 'O' Levels")


@pytest.fixture(name="test_category_insert_gce_n_level", scope="function")
def test_category_insert_gce_n_level():
    yield schemas.categories.CategoryCreateSchema(name="GCE 'N' Levels")


@pytest.fixture(name="test_category_insert_university", scope="function")
def test_category_insert_university():
    yield schemas.categories.CategoryCreateSchema(name="University")


@pytest.fixture(name="test_note_insert", scope="function")
def test_note_insert():
    yield schemas.library.NoteCreateSchema(
        category=1, subject=1, type=1, document_name="Document"
    )


@pytest.fixture(name="test_note_update", scope="function")
def test_note_update():
    yield schemas.library.NoteUpdateSchema(
        category=1, subject=1, type=1, document_name="Document"
    )
