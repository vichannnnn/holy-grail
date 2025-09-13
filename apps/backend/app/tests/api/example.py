from fastapi import status
from fastapi.testclient import TestClient

HELLO_WORLD_URL = "/hello"


def test_example(test_not_logged_in_client: TestClient):
    response = test_not_logged_in_client.get(HELLO_WORLD_URL)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"Hello": "World!"}
