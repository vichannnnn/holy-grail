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
            "test_subject_insert_mathematics_category_1",
        ),
        (
            "test_client_verified_user",
            override_get_current_user,
            "test_subject_insert_mathematics_category_1",
        ),
        (
            "test_client_admin",
            override_get_admin,
            "test_subject_insert_mathematics_category_1",
        ),
        (
            "test_client_developer",
            override_get_developer,
            "test_subject_insert_mathematics_category_1",
        ),
    ],
    indirect=["test_client", "test_add_subject"],
)
def test_add_subjects(
    create_education_level,
    test_client: TestClient,
    user_type: schemas.auth.CurrentUserSchema,
    test_add_subject: schemas.categories.SubjectCreateSchema,
):
    payload = jsonable_encoder(test_add_subject)
    response = test_client.post(SUBJECT_URL, json=payload)

    if user_type == override_get_developer:
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {
            "name": test_add_subject.name,
            "id": res["id"],
            "category_id": res["category_id"],
        }
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
    create_education_level,
    test_client_developer: TestClient,
    test_subject_insert_physics_category_1: schemas.categories.SubjectCreateSchema,
):
    payload = jsonable_encoder(test_subject_insert_physics_category_1)
    response = test_client_developer.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK

    res = response.json()
    assert res == {
        "name": test_subject_insert_physics_category_1.name,
        "id": res["id"],
        "category_id": res["category_id"],
    }

    response = test_client_developer.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_409_CONFLICT


def test_add_repeat_doc_types_twice(
    test_client_developer: TestClient,
    test_doc_type_insert_practice_answer: schemas.categories.DocumentTypeCreateSchema,
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
    create_education_level,
    test_client_developer: TestClient,
    test_subject_insert_mathematics_category_1: schemas.categories.SubjectCreateSchema,
):
    payload = jsonable_encoder(test_subject_insert_mathematics_category_1)
    response = test_client_developer.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK

    res = response.json()
    assert res == {
        "name": test_subject_insert_mathematics_category_1.name,
        "id": res["id"],
        "category_id": res["category_id"],
    }


# ----------------- READ TESTS ------------------


def test_get_subjects_from_category(
    test_client_developer: TestClient,
    test_category_insert_gce_a_level,
    test_category_insert_gce_o_level,
    test_subject_insert_biology_category_1,
    test_subject_insert_chemistry_category_1,
    test_subject_insert_chemistry_category_2,
):
    payload = jsonable_encoder(test_category_insert_gce_a_level)
    response = test_client_developer.post(CATEGORY_LEVEL_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK
    first_category = response.json()
    assert first_category["id"] == 1
    payload = jsonable_encoder(test_category_insert_gce_o_level)
    response = test_client_developer.post(CATEGORY_LEVEL_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK
    second_category = response.json()
    assert second_category["id"] == 2

    payload = jsonable_encoder(test_subject_insert_biology_category_1)
    response = test_client_developer.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK
    first_sub_cat_1 = response.json()
    assert first_sub_cat_1["name"] == test_subject_insert_biology_category_1.name

    payload = jsonable_encoder(test_subject_insert_chemistry_category_1)
    response = test_client_developer.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK
    second_sub_cat_1 = response.json()
    assert second_sub_cat_1["name"] == test_subject_insert_chemistry_category_1.name

    payload = jsonable_encoder(test_subject_insert_chemistry_category_2)
    response = test_client_developer.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK
    first_sub_cat_2 = response.json()
    assert first_sub_cat_2["name"] == test_subject_insert_chemistry_category_2.name

    response = test_client_developer.get(
        GET_ALL_SUBJECT_URL, params={"category_id": first_category["id"]}
    )
    assert response.status_code == status.HTTP_200_OK
    resp = response.json()
    assert len(resp) == 2

    assert resp[0]["name"] == first_sub_cat_1["name"]
    assert resp[1]["name"] == second_sub_cat_1["name"]

    response = test_client_developer.get(
        GET_ALL_SUBJECT_URL, params={"category_id": second_category["id"]}
    )
    assert response.status_code == status.HTTP_200_OK
    resp = response.json()
    assert len(resp) == 1
    assert resp[0]["name"] == second_sub_cat_1["name"]


# ----------------- UPDATE TESTS -----------------


@pytest.mark.parametrize(
    "test_client, user_type, test_add_subject, test_update_subject",
    [
        (
            "test_client_user",
            override_get_current_user,
            "test_subject_insert_mathematics_category_1",
            "test_subject_update_chemistry_category_2",
        ),
        (
            "test_client_verified_user",
            override_get_current_user,
            "test_subject_insert_mathematics_category_1",
            "test_subject_update_chemistry_category_2",
        ),
        (
            "test_client_admin",
            override_get_admin,
            "test_subject_insert_mathematics_category_1",
            "test_subject_update_chemistry_category_2",
        ),
        (
            "test_client_developer",
            override_get_developer,
            "test_subject_insert_mathematics_category_1",
            "test_subject_update_chemistry_category_2",
        ),
    ],
    indirect=["test_client", "test_add_subject", "test_update_subject"],
)
def test_add_and_update_two_subjects(
    create_two_education_level,
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
        assert res == {
            "name": test_add_subject.name,
            "id": res["id"],
            "category_id": res["category_id"],
        }

        payload = jsonable_encoder(test_update_subject)
        response = test_client.put(
            SUBJECT_URL,
            json=payload,
            params={"id": res["id"], "category_id": res["category_id"]},
        )
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {
            "name": test_update_subject.name,
            "id": res["id"],
            "category_id": res["category_id"],
        }
    else:
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.parametrize(
    "test_client, user_type, test_add_subject, test_update_subject",
    [
        (
            "test_client_user",
            override_get_current_user,
            "test_subject_insert_mathematics_category_1",
            "test_subject_update_chemistry_category_2",
        ),
        (
            "test_client_verified_user",
            override_get_current_user,
            "test_subject_insert_mathematics_category_1",
            "test_subject_update_chemistry_category_2",
        ),
        (
            "test_client_admin",
            override_get_admin,
            "test_subject_insert_mathematics_category_1",
            "test_subject_update_chemistry_category_2",
        ),
        (
            "test_client_developer",
            override_get_developer,
            "test_subject_insert_mathematics_category_1",
            "test_subject_update_chemistry_category_2",
        ),
    ],
    indirect=["test_client", "test_add_subject", "test_update_subject"],
)
def test_add_and_update_subjects_to_category_that_does_not_exist(
    create_education_level,
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
        assert res == {
            "name": test_add_subject.name,
            "id": res["id"],
            "category_id": res["id"],
        }

        payload = jsonable_encoder(test_update_subject)
        response = test_client.put(
            SUBJECT_URL,
            json=payload,
            params={"id": res["id"], "category_id": res["id"]},
        )
        assert response.status_code == status.HTTP_404_NOT_FOUND

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
    response = test_client.post(DOCUMENT_TYPE_URL, json=payload)

    if user_type == override_get_developer:
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {"name": test_add_doc_types.name, "id": res["id"]}

        payload = jsonable_encoder(test_update_doc_types)
        response = test_client.put(
            DOCUMENT_TYPE_URL, json=payload, params={"id": res["id"]}
        )
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
    response = test_client.post(CATEGORY_LEVEL_URL, json=payload)

    if user_type == override_get_developer:
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {"name": test_add_category_level.name, "id": res["id"]}

        payload = jsonable_encoder(test_update_category_level)
        response = test_client.put(
            CATEGORY_LEVEL_URL, json=payload, params={"id": res["id"]}
        )
        assert response.status_code == status.HTTP_200_OK
        res = response.json()
        assert res == {"name": test_update_category_level.name, "id": res["id"]}
    else:
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
