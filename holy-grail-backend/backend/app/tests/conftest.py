import asyncio
from typing import AsyncGenerator

from fastapi.testclient import TestClient
from pydantic import PostgresDsn
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from app.schemas.auth import (
    AccountRegisterSchema,
    AccountUpdatePasswordSchema,
    AuthSchema,
)
from app import schemas
from app.api.deps import get_session
from app.db.base_class import Base
from app.main import app
from app.models.auth import Authenticator, Account
from app.models.categories import DocumentTypes, Subjects, CategoryLevel
import pytest

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
def test_add_subject(request):
    return request.getfixturevalue(request.param)


@pytest.fixture
def test_update_subject(request):
    return request.getfixturevalue(request.param)


@pytest.fixture
def test_add_category_level(request):
    return request.getfixturevalue(request.param)


@pytest.fixture
def test_update_category_level(request):
    return request.getfixturevalue(request.param)


@pytest.fixture
def test_add_doc_types(request):
    return request.getfixturevalue(request.param)


@pytest.fixture
def test_update_doc_types(request):
    return request.getfixturevalue(request.param)


@pytest.fixture(name="test_not_logged_in_client")
def test_authentication_client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(name="test_client_user")
def test_client_user():
    app.dependency_overrides[Authenticator.get_current_user] = override_get_current_user
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides = {}


@pytest.fixture(name="test_client_verified_user")
def test_client_verified_user():
    app.dependency_overrides[Authenticator.get_current_user] = override_get_current_user
    app.dependency_overrides[
        Authenticator.get_verified_user
    ] = override_get_current_user
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides = {}


@pytest.fixture(name="test_client_admin")
def test_client_admin():
    app.dependency_overrides[Authenticator.get_current_user] = override_get_admin
    app.dependency_overrides[Authenticator.get_verified_user] = override_get_admin
    app.dependency_overrides[Authenticator.get_admin] = override_get_admin
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides = {}


@pytest.fixture(name="test_client_developer")
def test_client_developer():
    app.dependency_overrides[Authenticator.get_current_user] = override_get_developer
    app.dependency_overrides[Authenticator.get_verified_user] = override_get_developer
    app.dependency_overrides[Authenticator.get_admin] = override_get_developer
    app.dependency_overrides[Authenticator.get_developer] = override_get_developer
    yield TestClient(app)
    app.dependency_overrides = {}


@pytest.fixture(name="test_valid_user")
def test_valid_user():
    yield schemas.auth.AccountSchema(
        username="username",
        password="Password123!",
        repeat_password="Password123!",
        email="test@gmail.com",
    )


@pytest.fixture(name="test_subject_insert_mathematics_category_1")
def test_subject_insert_math_category_1():
    yield schemas.categories.SubjectCreateSchema(name="Mathematics", category_id=1)


@pytest.fixture(name="test_subject_insert_chemistry_category_1")
def test_subject_insert_chem_category_1():
    yield schemas.categories.SubjectCreateSchema(name="Chemistry", category_id=1)


@pytest.fixture(name="test_subject_insert_physics_category_1")
def test_subject_insert_physics_category_1():
    yield schemas.categories.SubjectCreateSchema(name="Physics", category_id=1)


@pytest.fixture(name="test_subject_insert_biology_category_1")
def test_subject_insert_bio_category_1():
    yield schemas.categories.SubjectCreateSchema(name="Biology", category_id=1)


@pytest.fixture(name="test_subject_update_chemistry_category_2")
def test_subject_update_chem():
    yield schemas.categories.SubjectUpdateSchema(name="Chemistry", category_id=2)


@pytest.fixture(name="test_doc_type_insert_practice_paper")
def test_doc_type_insert_practice_paper():
    yield schemas.categories.DocumentTypeCreateSchema(name="Practice Paper")


@pytest.fixture(name="test_doc_type_update_practice_answer")
def test_doc_type_update_practice_answer():
    yield schemas.categories.DocumentTypeUpdateSchema(name="Practice Answer")


@pytest.fixture(name="test_doc_type_insert_practice_answer")
def test_doc_type_insert_practice_answer():
    yield schemas.categories.DocumentTypeCreateSchema(name="Practice Answer")


@pytest.fixture(name="test_doc_type_insert_notes")
def test_doc_type_insert_notes():
    yield schemas.categories.DocumentTypeCreateSchema(name="Notes")


@pytest.fixture(name="test_doc_type_insert_extra_notes")
def test_doc_type_insert_extra_notes():
    yield schemas.categories.DocumentTypeCreateSchema(name="Extra Notes")


@pytest.fixture(name="test_category_insert_gce_a_level")
def test_category_insert_gce_a_level():
    yield schemas.categories.CategoryCreateSchema(name="GCE 'A' Levels")


@pytest.fixture(name="test_category_insert_gce_o_level")
def test_category_insert_gce_o_level():
    yield schemas.categories.CategoryCreateSchema(name="GCE 'O' Levels")


@pytest.fixture(name="test_category_update_gce_o_level")
def test_category_update_gce_o_level():
    yield schemas.categories.CategoryUpdateSchema(name="GCE 'O' Levels")


@pytest.fixture(name="test_category_insert_gce_n_level")
def test_category_insert_gce_n_level():
    yield schemas.categories.CategoryCreateSchema(name="GCE 'N' Levels")


@pytest.fixture(name="test_category_insert_university")
def test_category_insert_university():
    yield schemas.categories.CategoryCreateSchema(name="University")


@pytest.fixture(name="test_note_insert")
def test_note_insert():
    yield schemas.library.NoteCreateSchema(
        category=1, subject=1, type=1, document_name="Document"
    )


@pytest.fixture(name="test_note_insert_2")
def test_note_insert_2():
    yield schemas.library.NoteCreateSchema(
        category=1, subject=1, type=1, document_name="Document2"
    )


@pytest.fixture(name="test_category_does_not_exist_note_insert")
def test_category_does_not_exist_note_insert():
    yield schemas.library.NoteCreateSchema(
        category=2, subject=2, type=2, document_name="DoesNotExist"
    )


@pytest.fixture(name="test_note_update")
def test_note_update():
    yield schemas.library.NoteUpdateSchema(
        category=1, subject=1, type=1, document_name="Updated_Document", uploaded_by=1
    )


@pytest.fixture(name="test_note_update_2")
def test_note_update_2():
    yield schemas.library.NoteUpdateSchema(
        category=1, subject=1, type=1, document_name="Updated_Document2", uploaded_by=1
    )


@pytest.fixture
async def create_education_level(loop):
    new_category = CategoryLevel(name="GCE 'A' Levels")
    session = TestingSessionLocal()
    session.add(new_category)
    await session.commit()
    yield new_category


@pytest.fixture
async def create_two_education_level(loop):
    new_category_1 = CategoryLevel(name="GCE 'A' Levels")
    new_category_2 = CategoryLevel(name="GCE 'O' Levels")
    session = TestingSessionLocal()
    session.add(new_category_1)
    session.add(new_category_2)
    await session.commit()
    yield new_category_1, new_category_2


@pytest.fixture
async def create_doc_type_subject_education_level(loop):
    new_doc_type = DocumentTypes(name="Notes")
    new_subject = Subjects(name="Mathematics", category_id=1)
    new_category = CategoryLevel(name="GCE 'A' Levels")
    new_valid_user = Account(
        username="testuser",
        password="123456",
        role=1,
        email="testuser@gmail.com",
        verified=True,
    )
    session = TestingSessionLocal()
    session.add(new_valid_user)
    session.add(new_doc_type)
    session.add(new_subject)
    session.add(new_category)
    await session.commit()

    yield new_valid_user, new_doc_type, new_subject, new_category


@pytest.fixture
def test_user_registration_data() -> AccountRegisterSchema:
    yield AccountRegisterSchema(
        username="TestUser",
        email="testuser@example.com",
        password="@Test1234",
        repeat_password="@Test1234",
    )


@pytest.fixture
def test_user_new_password_data() -> AccountUpdatePasswordSchema:
    yield AccountUpdatePasswordSchema(
        email="testuser@example.com",
        before_password="@Test1234",
        password="@NewTest1234",
        repeat_password="@NewTest1234",
    )


@pytest.fixture
def test_user() -> AuthSchema:
    yield AuthSchema(
        username="TestUser",
        password="@Test1234",
    )
