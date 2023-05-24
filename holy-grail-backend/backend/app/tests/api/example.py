from fastapi import status
from fastapi.testclient import TestClient

HELLO_WORLD_URL = "/hello"
TRIGGER_TASK_URL = "/trigger_ping_task"
CHECK_PING_TASK_URL = "/check_ping_task"


def test_example(client: TestClient):
    response = client.get(HELLO_WORLD_URL)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"Hello": "World!"}


def test_trigger_ping_task(client: TestClient):
    response = client.post(TRIGGER_TASK_URL)
    assert response.status_code == status.HTTP_200_OK

    task_id = response.json()["task_id"]
    assert task_id

    response = client.get(f"{CHECK_PING_TASK_URL}/{task_id}")
    assert response.status_code == status.HTTP_200_OK
