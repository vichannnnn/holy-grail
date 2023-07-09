from fastapi import status
from fastapi.testclient import TestClient
from fastapi.encoders import jsonable_encoder
from app import schemas
from app.tests.conftest import (
    override_get_admin,
    override_get_current_user,
    override_get_developer,
)
import pytest

SUBJECT_URL = "/subject"
DOCUMENT_TYPE_URL = "/document_type"
CATEGORY_LEVEL_URL = "/category"
GET_ALL_SUBJECT_URL = "/all_subjects"
GET_ALL_CATEGORY_LEVEL_URL = "/all_category_level"
GET_ALL_DOCUMENT_TYPE_URL = "/all_document_type"

# ----------------- INSERT TESTS -----------------


@pytest.mark.parametrize(
    "test_client, user_type, test_add_subject",
    [
        (
            "test_client_user",
            override_get_current_user,
            "test_subject_insert_mathematics",
        ),
        (
            "test_client_verified_user",
            override_get_current_user,
            "test_subject_insert_mathematics",
        ),
        ("test_client_admin", override_get_admin, "test_subject_insert_mathematics"),
        (
            "test_client_developer",
            override_get_developer,
            "test_subject_insert_mathematics",
        ),
    ],
    indirect=["test_client", "test_add_subject"],
)
def test_add_subjects(
    test_client: TestClient,
    user_type: schemas.auth.CurrentUserSchema,
    test_add_subject: schemas.categories.SubjectCreateSchema,
):
    payload = jsonable_encoder(test_add_subject)
    response = test_client.post(SUBJECT_URL, json=payload)

    if user_type == override_get_developer:
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {"name": test_add_subject.name, "id": res["id"]}
        response = test_client.get(GET_ALL_SUBJECT_URL)
        resp = response.json()
        assert response.status_code == status.HTTP_200_OK
        assert len(resp) == 1
        assert resp[0]["name"] == test_add_subject.name
        assert resp[0]["id"] == res["id"]
    else:
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.parametrize(
    "test_client, user_type, test_add_doc_types",
    [
        (
            "test_client_user",
            override_get_current_user,
            "test_doc_type_insert_practice_paper",
        ),
        (
            "test_client_verified_user",
            override_get_current_user,
            "test_doc_type_insert_practice_paper",
        ),
        (
            "test_client_admin",
            override_get_admin,
            "test_doc_type_insert_practice_paper",
        ),
        (
            "test_client_developer",
            override_get_developer,
            "test_doc_type_insert_practice_paper",
        ),
    ],
    indirect=["test_client", "test_add_doc_types"],
)
def test_add_doc_types(
    test_client: TestClient,
    user_type: schemas.auth.CurrentUserSchema,
    test_add_doc_types: schemas.categories.DocumentTypeCreateSchema,
):
    payload = jsonable_encoder(test_add_doc_types)
    response = test_client.post(DOCUMENT_TYPE_URL, json=payload)

    if user_type == override_get_developer:
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {"name": test_add_doc_types.name, "id": res["id"]}
        response = test_client.get(GET_ALL_DOCUMENT_TYPE_URL)
        resp = response.json()
        assert response.status_code == status.HTTP_200_OK
        assert len(resp) == 1
        assert resp[0]["name"] == test_add_doc_types.name
        assert resp[0]["id"] == res["id"]

    else:
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.parametrize(
    "test_client, user_type, test_add_category_level",
    [
        (
            "test_client_user",
            override_get_current_user,
            "test_category_insert_gce_a_level",
        ),
        (
            "test_client_verified_user",
            override_get_current_user,
            "test_category_insert_gce_a_level",
        ),
        ("test_client_admin", override_get_admin, "test_category_insert_gce_a_level"),
        (
            "test_client_developer",
            override_get_developer,
            "test_category_insert_gce_a_level",
        ),
    ],
    indirect=["test_client", "test_add_category_level"],
)
def test_add_category_level(
    test_client: TestClient,
    user_type: schemas.auth.CurrentUserSchema,
    test_add_category_level: schemas.categories.CategoryCreateSchema,
):
    payload = jsonable_encoder(test_add_category_level)
    response = test_client.post(CATEGORY_LEVEL_URL, json=payload)

    if user_type == override_get_developer:
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {"name": test_add_category_level.name, "id": res["id"]}
        response = test_client.get(GET_ALL_CATEGORY_LEVEL_URL)
        resp = response.json()
        assert response.status_code == status.HTTP_200_OK
        assert len(resp) == 1
        assert resp[0]["name"] == test_add_category_level.name
        assert resp[0]["id"] == res["id"]
    else:
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_add_repeat_subject_twice(
    test_client_developer: TestClient,
    test_subject_insert_physics: schemas.categories.SubjectCreateSchema,
):
    payload = jsonable_encoder(test_subject_insert_physics)
    response = test_client_developer.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK

    res = response.json()
    assert res == {"name": test_subject_insert_physics.name, "id": res["id"]}

    response = test_client_developer.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_409_CONFLICT


def test_add_repeat_doc_types_twice(
    test_client_developer: TestClient,
    test_doc_type_insert_practice_answer: schemas.categories.SubjectCreateSchema,
):
    payload = jsonable_encoder(test_doc_type_insert_practice_answer)
    response = test_client_developer.post(DOCUMENT_TYPE_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK

    res = response.json()
    assert res == {"name": test_doc_type_insert_practice_answer.name, "id": res["id"]}

    response = test_client_developer.post(DOCUMENT_TYPE_URL, json=payload)
    assert response.status_code == status.HTTP_409_CONFLICT


def test_add_repeat_category_twice(
    test_client_developer: TestClient,
    test_category_insert_gce_o_level: schemas.categories.SubjectCreateSchema,
):
    payload = jsonable_encoder(test_category_insert_gce_o_level)
    response = test_client_developer.post(CATEGORY_LEVEL_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK

    res = response.json()
    assert res == {"name": test_category_insert_gce_o_level.name, "id": res["id"]}

    response = test_client_developer.post(CATEGORY_LEVEL_URL, json=payload)
    assert response.status_code == status.HTTP_409_CONFLICT


def test_add_subject_math(
    test_client_developer: TestClient,
    test_subject_insert_mathematics: schemas.categories.SubjectCreateSchema,
):
    payload = jsonable_encoder(test_subject_insert_mathematics)
    response = test_client_developer.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK

    res = response.json()
    assert res == {"name": test_subject_insert_mathematics.name, "id": res["id"]}


# ----------------- UPDATE TESTS -----------------


@pytest.mark.parametrize(
    "test_client, user_type, test_add_subject, test_update_subject",
    [
        (
            "test_client_user",
            override_get_current_user,
            "test_subject_insert_mathematics",
            "test_subject_update_chemistry",
        ),
        (
            "test_client_verified_user",
            override_get_current_user,
            "test_subject_insert_mathematics",
            "test_subject_update_chemistry",
        ),
        (
            "test_client_admin",
            override_get_admin,
            "test_subject_insert_mathematics",
            "test_subject_update_chemistry",
        ),
        (
            "test_client_developer",
            override_get_developer,
            "test_subject_insert_mathematics",
            "test_subject_update_chemistry",
        ),
    ],
    indirect=["test_client", "test_add_subject", "test_update_subject"],
)
def test_add_and_update_subjects(
    test_client: TestClient,
    user_type: schemas.auth.CurrentUserSchema,
    test_add_subject: schemas.categories.SubjectCreateSchema,
    test_update_subject: schemas.categories.SubjectUpdateSchema,
):
    payload = jsonable_encoder(test_add_subject)
    response = test_client.post(SUBJECT_URL, json=payload)

    if user_type == override_get_developer:
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {"name": test_add_subject.name, "id": res["id"]}

        payload = jsonable_encoder(test_update_subject)
        response = test_client.put(SUBJECT_URL, json=payload, params={"id": res["id"]})
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {"name": test_update_subject.name, "id": res["id"]}
    else:
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.parametrize(
    "test_client, user_type, test_add_doc_types, test_update_doc_types",
    [
        (
            "test_client_user",
            override_get_current_user,
            "test_doc_type_insert_practice_paper",
            "test_doc_type_update_practice_answer",
        ),
        (
            "test_client_verified_user",
            override_get_current_user,
            "test_doc_type_insert_practice_paper",
            "test_doc_type_update_practice_answer",
        ),
        (
            "test_client_admin",
            override_get_admin,
            "test_doc_type_insert_practice_paper",
            "test_doc_type_update_practice_answer",
        ),
        (
            "test_client_developer",
            override_get_developer,
            "test_doc_type_insert_practice_paper",
            "test_doc_type_update_practice_answer",
        ),
    ],
    indirect=["test_client", "test_add_doc_types", "test_update_doc_types"],
)
def test_add_and_update_doc_types(
    test_client: TestClient,
    user_type: schemas.auth.CurrentUserSchema,
    test_add_doc_types: schemas.categories.DocumentTypeCreateSchema,
    test_update_doc_types: schemas.categories.DocumentTypeUpdateSchema,
):
    payload = jsonable_encoder(test_add_doc_types)
    response = test_client.post(SUBJECT_URL, json=payload)

    if user_type == override_get_developer:
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {"name": test_add_doc_types.name, "id": res["id"]}

        payload = jsonable_encoder(test_update_doc_types)
        response = test_client.put(SUBJECT_URL, json=payload, params={"id": res["id"]})
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {"name": test_update_doc_types.name, "id": res["id"]}
    else:
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.parametrize(
    "test_client, user_type, test_add_category_level, test_update_category_level",
    [
        (
            "test_client_user",
            override_get_current_user,
            "test_category_insert_gce_a_level",
            "test_category_update_gce_o_level",
        ),
        (
            "test_client_verified_user",
            override_get_current_user,
            "test_category_insert_gce_a_level",
            "test_category_update_gce_o_level",
        ),
        (
            "test_client_admin",
            override_get_admin,
            "test_category_insert_gce_a_level",
            "test_category_update_gce_o_level",
        ),
        (
            "test_client_developer",
            override_get_developer,
            "test_category_insert_gce_a_level",
            "test_category_update_gce_o_level",
        ),
    ],
    indirect=["test_client", "test_add_category_level", "test_update_category_level"],
)
def test_add_and_update_category_level(
    test_client: TestClient,
    user_type: schemas.auth.CurrentUserSchema,
    test_add_category_level: schemas.categories.DocumentTypeCreateSchema,
    test_update_category_level: schemas.categories.DocumentTypeUpdateSchema,
):
    payload = jsonable_encoder(test_add_category_level)
    response = test_client.post(SUBJECT_URL, json=payload)

    if user_type == override_get_developer:
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {"name": test_add_category_level.name, "id": res["id"]}

        payload = jsonable_encoder(test_update_category_level)
        response = test_client.put(SUBJECT_URL, json=payload, params={"id": res["id"]})
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {"name": test_update_category_level.name, "id": res["id"]}
    else:
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
