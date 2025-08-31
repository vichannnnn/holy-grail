from fastapi import status
from fastapi.encoders import jsonable_encoder
from fastapi.testclient import TestClient

from app import schemas

CREATE_URL = "/auth/create"
GET_USER_URL = "/auth/get"
LOGIN_URL = "/auth/login"


def test_create_valid_user_and_login(
    test_not_logged_in_client: TestClient, test_valid_user: schemas.auth.AccountSchema
):
    payload = jsonable_encoder(test_valid_user)
    response = test_not_logged_in_client.post(CREATE_URL, json=payload)
    resp_data = response.json()
    assert response.status_code == status.HTTP_200_OK
    assert resp_data["data"]["username"] == test_valid_user.username
    assert resp_data["data"] == {
        "username": test_valid_user.username,
        "role": 1,
        "verified": False,
        "user_id": 1,
        "email": test_valid_user.email,
    }
    response = test_not_logged_in_client.post(LOGIN_URL, json=payload)

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["data"]["username"] == test_valid_user.username


def test_create_account(test_not_logged_in_client, test_user_registration_data):
    response = test_not_logged_in_client.post(
        CREATE_URL, json=jsonable_encoder(test_user_registration_data)
    )
    assert response.status_code == 200
    assert "username" in response.json()["data"]


def test_create_account_password_mismatch(test_not_logged_in_client, test_user_registration_data):
    test_user_registration_data.repeat_password = "mismatch_password"
    response = test_not_logged_in_client.post(
        CREATE_URL, json=jsonable_encoder(test_user_registration_data)
    )
    assert response.status_code == 422


def test_update_password(
    test_not_logged_in_client,
    test_user,
    test_user_new_password_data,
    test_user_registration_data,
):
    response = test_not_logged_in_client.post(
        CREATE_URL, json=jsonable_encoder(test_user_registration_data)
    )
    assert response.status_code == 200
    assert "username" in response.json()["data"]

    login_response = test_not_logged_in_client.post(LOGIN_URL, json=jsonable_encoder(test_user))
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    response = test_not_logged_in_client.post(
        "/auth/update_password",
        json=jsonable_encoder(test_user_new_password_data),
        headers=headers,
    )
    assert response.status_code == 204


def test_get_account_name(test_not_logged_in_client, test_user, test_user_registration_data):
    response = test_not_logged_in_client.post(
        CREATE_URL, json=jsonable_encoder(test_user_registration_data)
    )
    assert response.status_code == 200
    assert "username" in response.json()["data"]
    # first login to get the auth token
    login_response = test_not_logged_in_client.post(LOGIN_URL, json=jsonable_encoder(test_user))
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    response = test_not_logged_in_client.get("/auth/get", headers=headers)
    assert response.status_code == 200
    assert response.json()["username"]


def test_login_invalid_credentials(test_not_logged_in_client, test_user):
    test_user.password = "invalid_password"
    response = test_not_logged_in_client.post(LOGIN_URL, json=jsonable_encoder(test_user))
    assert response.status_code == 422
