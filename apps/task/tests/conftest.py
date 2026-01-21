import asyncio
import os

import pytest
from fastapi.testclient import TestClient
from httpx import AsyncClient

from api import app

# Set test environment
os.environ["ENVIRONMENT"] = "test"
os.environ["CELERY_BROKER_URL"] = "redis://localhost:6379/1"
os.environ["CELERY_RESULT_BACKEND"] = "redis://localhost:6379/1"
os.environ["BACKEND_CONTAINER_URL"] = "http://localhost:8000"


@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(name="test_client")
def test_client_fixture():
    """Create a test client for the FastAPI app."""
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
async def async_client():
    """Create an async test client for the FastAPI app."""
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac


@pytest.fixture
def mock_celery_task(_monkeypatch):
    """Mock Celery task execution for testing."""

    class MockTaskResult:
        def __init__(self, task_id: str):
            self.id = task_id
            self.state = "PENDING"
            self.result = None

    def mock_delay(*_args, **_kwargs):
        return MockTaskResult("test-task-id-123")

    # This fixture can be used to mock specific tasks in tests
    return mock_delay
