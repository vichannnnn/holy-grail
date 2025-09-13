from unittest.mock import MagicMock, patch

import pytest
from fastapi import status
from fastapi.testclient import TestClient


class TestTaskEndpoints:
    """Test suite for task API endpoints."""

    def test_root(self, test_client: TestClient):
        """Test root endpoint returns correct message."""
        response = test_client.get("/")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"message": "Holy Grail Celery Task API"}

    def test_health_check(self, test_client: TestClient):
        """Test health check endpoint."""
        response = test_client.get("/ping")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"status": "ok"}

    @patch("tasks.health_check.ping.delay")
    def test_trigger_ping_task(self, mock_delay, test_client: TestClient):
        """Test triggering a ping task."""
        # Mock the Celery task
        mock_task = MagicMock()
        mock_task.id = "test-ping-task-123"
        mock_delay.return_value = mock_task

        response = test_client.post("/tasks/ping")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"task_id": "test-ping-task-123", "status": "queued"}
        mock_delay.assert_called_once()

    @patch("tasks.verify_email.send_verification_email_task.delay")
    def test_send_verify_email(self, mock_delay, test_client: TestClient):
        """Test sending verification email task."""
        # Mock the Celery task
        mock_task = MagicMock()
        mock_task.id = "test-verify-email-task-123"
        mock_delay.return_value = mock_task

        request_data = {
            "email": "test@example.com",
            "username": "testuser",
            "confirm_url": "http://example.com/verify?token=abc123",
        }

        response = test_client.post("/tasks/send-verify-email", json=request_data)
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"task_id": "test-verify-email-task-123", "status": "queued"}
        mock_delay.assert_called_once_with(
            email="test@example.com",
            username="testuser",
            confirm_url="http://example.com/verify?token=abc123",
        )

    @patch("tasks.reset_password_email.send_reset_password_email_task.delay")
    def test_send_reset_password_email(self, mock_delay, test_client: TestClient):
        """Test sending password reset email task."""
        # Mock the Celery task
        mock_task = MagicMock()
        mock_task.id = "test-reset-password-task-123"
        mock_delay.return_value = mock_task

        request_data = {
            "email": "test@example.com",
            "username": "testuser",
            "confirm_url": "http://example.com/reset?token=xyz789",
        }

        response = test_client.post("/tasks/send-reset-password-email", json=request_data)
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"task_id": "test-reset-password-task-123", "status": "queued"}
        mock_delay.assert_called_once_with(
            email="test@example.com",
            username="testuser",
            confirm_url="http://example.com/reset?token=xyz789",
        )

    @patch("tasks.new_password_email.send_new_password_email_task.delay")
    def test_send_new_password_email(self, mock_delay, test_client: TestClient):
        """Test sending new password email task."""
        # Mock the Celery task
        mock_task = MagicMock()
        mock_task.id = "test-new-password-task-123"
        mock_delay.return_value = mock_task

        request_data = {
            "email": "test@example.com",
            "username": "testuser",
            "password": "TempPassword123!",
        }

        response = test_client.post("/tasks/send-new-password-email", json=request_data)
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"task_id": "test-new-password-task-123", "status": "queued"}
        mock_delay.assert_called_once_with(
            email="test@example.com", username="testuser", password="TempPassword123!"
        )

    @patch("tasks.update_scoreboard_users.update_scoreboard_users_task.delay")
    def test_update_scoreboard_users(self, mock_delay, test_client: TestClient):
        """Test updating scoreboard users task."""
        # Mock the Celery task
        mock_task = MagicMock()
        mock_task.id = "test-scoreboard-task-123"
        mock_delay.return_value = mock_task

        response = test_client.post("/tasks/update-scoreboard-users")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"task_id": "test-scoreboard-task-123", "status": "queued"}
        mock_delay.assert_called_once()

    @patch("tasks.fetch_google_analytics.fetch_google_analytics_task.delay")
    def test_fetch_google_analytics(self, mock_delay, test_client: TestClient):
        """Test fetching Google Analytics task."""
        # Mock the Celery task
        mock_task = MagicMock()
        mock_task.id = "test-analytics-task-123"
        mock_delay.return_value = mock_task

        response = test_client.post("/tasks/fetch-google-analytics")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"task_id": "test-analytics-task-123", "status": "queued"}
        mock_delay.assert_called_once()

    @patch("worker.celery_app.AsyncResult")
    def test_get_task_status_pending(self, mock_async_result, test_client: TestClient):
        """Test getting status of a pending task."""
        # Mock the task result
        mock_result = MagicMock()
        mock_result.status = "PENDING"
        mock_result.state = "PENDING"
        mock_result.result = None
        mock_async_result.return_value = mock_result

        response = test_client.get("/tasks/test-task-id-123/status")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {
            "task_id": "test-task-id-123",
            "status": "PENDING",
            "result": None,
        }

    @patch("worker.celery_app.AsyncResult")
    def test_get_task_status_success(self, mock_async_result, test_client: TestClient):
        """Test getting status of a successful task."""
        # Mock the task result
        mock_result = MagicMock()
        mock_result.status = "SUCCESS"
        mock_result.state = "SUCCESS"
        mock_result.result = {"message": "Task completed successfully"}
        mock_async_result.return_value = mock_result

        response = test_client.get("/tasks/test-task-id-123/status")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {
            "task_id": "test-task-id-123",
            "status": "SUCCESS",
            "result": {"message": "Task completed successfully"},
        }


class TestEmailValidation:
    """Test email validation for task endpoints."""

    def test_invalid_email_format(self, test_client: TestClient):
        """Test that invalid email format is rejected."""
        request_data = {
            "email": "invalid-email",
            "username": "testuser",
            "confirm_url": "http://example.com/verify?token=abc123",
        }

        response = test_client.post("/tasks/send-verify-email", json=request_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
