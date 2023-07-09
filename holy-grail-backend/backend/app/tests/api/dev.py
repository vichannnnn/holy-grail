from fastapi import status
from fastapi.testclient import TestClient

METRICS_URL = "/dev/metrics"


def test_metrics_user(test_client_user: TestClient):
    response = test_client_user.get(METRICS_URL)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_metrics_verified_user(test_client_verified_user: TestClient):
    response = test_client_verified_user.get(METRICS_URL)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_metrics_admin(test_client_admin: TestClient):
    response = test_client_admin.get(METRICS_URL)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_metrics_dev(test_client_developer: TestClient):
    response = test_client_developer.get(METRICS_URL)
    assert response.status_code == status.HTTP_200_OK
    res = response.json()
    for i in res:
        assert i["metric_name"]
