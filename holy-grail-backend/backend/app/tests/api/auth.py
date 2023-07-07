from fastapi import status
from fastapi.encoders import jsonable_encoder
from fastapi.testclient import TestClient

from app import schemas

CREATE_URL = "/auth/create"
GET_USER_URL = "/auth/get"
LOGIN_URL = "/auth/login"


def test_create_valid_user(
    test_not_logged_in_client: TestClient, test_valid_user: schemas.auth.AccountSchema
):
    payload = jsonable_encoder(test_valid_user)
    response = test_not_logged_in_client.post(CREATE_URL, json=payload)
    resp_data = response.json()
    assert response.status_code == status.HTTP_200_OK
    assert resp_data["username"] == test_valid_user.username
    assert resp_data == {
        "username": test_valid_user.username,
        "role": 1,
        "verified": False,
        "user_id": 1,
        "email": test_valid_user.email,
    }


def test_login(
    test_not_logged_in_client: TestClient, test_valid_user: schemas.auth.AccountSchema
):
    payload = jsonable_encoder(test_valid_user)
    response = test_not_logged_in_client.post(LOGIN_URL, json=payload)

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["data"]["username"] == test_valid_user.username
