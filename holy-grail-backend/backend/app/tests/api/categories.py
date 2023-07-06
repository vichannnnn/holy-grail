from fastapi import status
from fastapi.testclient import TestClient
from fastapi.encoders import jsonable_encoder
from app import schemas

SUBJECT_URL = "/subject"


def test_add_subject_admin(
    client_admin: TestClient,
    test_subject_insert_mathematics: schemas.categories.SubjectCreateSchema,
):
    payload = jsonable_encoder(test_subject_insert_mathematics)
    response = client_admin.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK

    res = response.json()
    assert res == {"name": test_subject_insert_mathematics.name, "id": res["id"]}


def test_add_subject_developer(
    client_developer: TestClient,
    test_subject_insert_chemistry: schemas.categories.SubjectCreateSchema,
):
    payload = jsonable_encoder(test_subject_insert_chemistry)
    response = client_developer.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK

    res = response.json()
    assert res == {"name": test_subject_insert_chemistry.name, "id": res["id"]}


def test_add_subject_user(
    client_user: TestClient,
    test_subject_insert_biology: schemas.categories.SubjectCreateSchema,
):
    payload = jsonable_encoder(test_subject_insert_biology)
    response = client_user.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"name": test_subject_insert_biology.name, "id": 1}
