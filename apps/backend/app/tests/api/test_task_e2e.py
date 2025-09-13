"""
End-to-end tests for task service integration.

These tests require both backend and task service to be running.
They test the actual HTTP communication between services.

To run these tests:
1. Start Redis: bun run db
2. Start task service: cd apps/task && npm run dev
3. Run tests with: pytest app/tests/api/test_task_e2e.py -m e2e
"""
import time

import httpx
import pytest
from fastapi import status
from fastapi.testclient import TestClient


@pytest.mark.e2e
class TestTaskServiceE2E:
    """
    End-to-end tests for task service integration.

    Note: These tests require the task service to be running on port 8001.
    """

    @pytest.fixture(autouse=True)
    def check_task_service(self):
        """Check if task service is available before running tests."""
        try:
            response = httpx.get("http://localhost:8001/ping", timeout=2)
            if response.status_code != 200:
                pytest.skip("Task service not available on port 8001")
        except (httpx.RequestError, httpx.TimeoutException):
            pytest.skip("Task service not available on port 8001")

    def test_ping_task_full_flow(self, test_not_logged_in_client: TestClient):
        """Test complete flow of triggering and checking a ping task."""
        # Trigger the ping task
        response = test_not_logged_in_client.post("/trigger_ping_task")
        assert response.status_code == status.HTTP_200_OK

        task_data = response.json()
        assert "task_id" in task_data
        assert "status" in task_data
        assert task_data["status"] == "queued"

        task_id = task_data["task_id"]

        # Give the task some time to process
        time.sleep(1)

        # Check the task status
        response = test_not_logged_in_client.get(f"/check_ping_task/{task_id}")
        assert response.status_code == status.HTTP_200_OK

        status_data = response.json()
        assert "status" in status_data
        # Task should either be pending or successful
        assert status_data["status"] in ["pending", "success"]

        # If successful, verify the result
        if status_data["status"] == "success":
            assert "result" in status_data

    def test_task_service_health_check(self):
        """Test direct communication with task service health endpoint."""
        response = httpx.get("http://localhost:8001/ping")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}

    def test_invalid_task_id(self, test_not_logged_in_client: TestClient):
        """Test checking status of non-existent task."""
        response = test_not_logged_in_client.get("/check_ping_task/invalid-task-id-123")
        assert response.status_code == status.HTTP_200_OK

        status_data = response.json()
        assert status_data["status"] == "pending"  # Unknown tasks show as pending


@pytest.mark.e2e
class TestEmailServiceE2E:
    """
    End-to-end tests for email service through task service.

    Note: These tests require both services running and will actually
    attempt to send emails (they will fail at the Mailtrap level if
    not configured, but will test the task queuing).
    """

    @pytest.fixture(autouse=True)
    def check_services(self):
        """Check if both services are available."""
        try:
            # Check task service
            response = httpx.get("http://localhost:8001/ping", timeout=2)
            if response.status_code != 200:
                pytest.skip("Task service not available on port 8001")
        except (httpx.RequestError, httpx.TimeoutException):
            pytest.skip("Task service not available on port 8001")

    @pytest.mark.asyncio
    async def test_email_verification_flow(self):
        """Test email verification through the complete flow."""
        from app.core import Environment, settings
        from app.services.email import get_email_service

        # Only run this test in non-local environments
        if settings.environment == Environment.LOCAL:
            pytest.skip("Email service runs in console mode locally")

        email_service = get_email_service()

        # This will queue the email task
        result = await email_service.send_verification_email(
            to="test@example.com",
            username="testuser",
            verification_url="http://example.com/verify?token=test123",
        )

        # Should return True indicating the task was queued
        assert result is True
