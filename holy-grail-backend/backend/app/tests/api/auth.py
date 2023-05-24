from fastapi import status
from fastapi.testclient import TestClient
from fastapi.encoders import jsonable_encoder
from app import schemas


CREATE_URL = "/auth/create"
GET_USER_URL = "/auth/get"
LOGIN_URL = "/auth/login"


def test_create_valid_user(
    client: TestClient, test_valid_user: schemas.auth.AccountSchema
):
    payload = jsonable_encoder(test_valid_user)
    response = client.post(CREATE_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"username": test_valid_user.username}


def test_login(client: TestClient, test_valid_user: schemas.auth.AccountSchema):
    payload = jsonable_encoder(test_valid_user)
    response = client.post(LOGIN_URL, json=payload)

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["data"]["username"] == test_valid_user.username
