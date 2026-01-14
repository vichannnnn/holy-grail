"""
Integration tests for task service communication.

Tests the integration between backend and task service, ensuring
proper HTTP communication and error handling.
"""
from unittest.mock import AsyncMock, MagicMock, patch

import httpx
import pytest
from fastapi import status
from fastapi.testclient import TestClient


class TestTaskServiceIntegration:
    """Test suite for backend-to-task service integration."""

    @patch("httpx.AsyncClient.post", new_callable=AsyncMock)
    async def test_trigger_ping_task_success(
        self, mock_post, test_not_logged_in_client: TestClient
    ):
        """Test successful ping task triggering through backend."""
        # Mock successful response from task service
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"task_id": "test-task-123", "status": "queued"}
        mock_response.raise_for_status = MagicMock()
        mock_post.return_value = mock_response

        response = test_not_logged_in_client.post("/trigger_ping_task")

        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"task_id": "test-task-123", "status": "queued"}

        # Verify the backend called the task service correctly
        mock_post.assert_called_once()
        call_args = mock_post.call_args
        assert "http://localhost:8001/tasks/ping" in str(call_args)

    @patch("httpx.AsyncClient.post", new_callable=AsyncMock)
    async def test_trigger_ping_task_service_unavailable(
        self, mock_post, test_not_logged_in_client: TestClient
    ):
        """Test handling when task service is unavailable."""
        # Mock connection error
        mock_post.side_effect = httpx.RequestError("Connection refused")

        response = test_not_logged_in_client.post("/trigger_ping_task")

        assert response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE
        assert "Task service unavailable" in response.json()["detail"]

    @patch("httpx.AsyncClient.get", new_callable=AsyncMock)
    async def test_check_task_status_pending(self, mock_get, test_not_logged_in_client: TestClient):
        """Test checking status of a pending task."""
        # Mock pending task response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "task_id": "test-task-123",
            "status": "PENDING",
            "result": None,
        }
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        response = test_not_logged_in_client.get("/check_ping_task/test-task-123")

        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"status": "pending"}

    @patch("httpx.AsyncClient.get", new_callable=AsyncMock)
    async def test_check_task_status_failure(self, mock_get, test_not_logged_in_client: TestClient):
        """Test checking status of a failed task."""
        # Mock failed task response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "task_id": "test-task-123",
            "status": "FAILURE",
            "result": "Task execution failed",
        }
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        response = test_not_logged_in_client.get("/check_ping_task/test-task-123")

        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"status": "failure", "error": "Task execution failed"}


class TestEmailServiceIntegration:
    """Test email service integration with task service."""

    @pytest.mark.asyncio
    @patch("httpx.AsyncClient.post", new_callable=AsyncMock)
    async def test_send_verification_email(self, mock_post):
        """Test sending verification email through HTTP service."""
        from app.services.email import HTTPEmailService

        # Mock successful response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"task_id": "email-task-123", "status": "queued"}
        mock_response.raise_for_status = MagicMock()
        mock_post.return_value = mock_response

        email_service = HTTPEmailService()
        result = await email_service.send_verification_email(
            to="test@example.com",
            username="testuser",
            verification_url="http://example.com/verify?token=abc123",
        )

        assert result is True

        # Verify the correct endpoint was called
        mock_post.assert_called_once()
        call_args = mock_post.call_args
        assert "/tasks/send-verify-email" in str(call_args)

        # Verify the request payload
        _, kwargs = mock_post.call_args
        assert kwargs["json"]["email"] == "test@example.com"
        assert kwargs["json"]["username"] == "testuser"
        assert kwargs["json"]["confirm_url"] == "http://example.com/verify?token=abc123"

    @pytest.mark.asyncio
    @patch("httpx.AsyncClient.post", new_callable=AsyncMock)
    async def test_send_reset_password_email(self, mock_post):
        """Test sending password reset email through HTTP service."""
        from app.services.email import HTTPEmailService

        # Mock successful response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"task_id": "reset-task-123", "status": "queued"}
        mock_response.raise_for_status = MagicMock()
        mock_post.return_value = mock_response

        email_service = HTTPEmailService()
        result = await email_service.send_reset_password_email(
            to="test@example.com",
            username="testuser",
            reset_url="http://example.com/reset?token=xyz789",
        )

        assert result is True

        # Verify the request payload
        _, kwargs = mock_post.call_args
        assert kwargs["json"]["email"] == "test@example.com"
        assert kwargs["json"]["username"] == "testuser"
        assert kwargs["json"]["confirm_url"] == "http://example.com/reset?token=xyz789"

    @pytest.mark.asyncio
    @patch("httpx.AsyncClient.post", new_callable=AsyncMock)
    async def test_email_service_error_handling(self, mock_post):
        """Test email service handles task service errors gracefully."""
        from app.services.email import HTTPEmailService

        # Mock connection error
        mock_post.side_effect = httpx.RequestError("Connection refused")

        email_service = HTTPEmailService()
        result = await email_service.send_verification_email(
            to="test@example.com", username="testuser", verification_url="http://example.com/verify"
        )

        # Should return False on error
        assert result is False


class TestAnalyticsIntegration:
    """Test analytics endpoint integration with task service."""

    @patch("httpx.AsyncClient.post", new_callable=AsyncMock)
    async def test_fetch_google_analytics_endpoint(self, mock_post, test_client_admin: TestClient):
        """Test the analytics fetch endpoint calls task service."""
        # Mock successful response from backend
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"status": "success", "data": "analytics data"}
        mock_response.raise_for_status = MagicMock()
        mock_post.return_value = mock_response

        response = test_client_admin.post("/analytics/fetch_google_analytics")

        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"status": "success", "data": "analytics data"}

    @patch("httpx.AsyncClient.post", new_callable=AsyncMock)
    async def test_update_scoreboard_endpoint(self, mock_post, test_client_admin: TestClient):
        """Test the scoreboard update endpoint calls task service."""
        # Mock successful response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"status": "success", "message": "Scoreboard updated"}
        mock_response.raise_for_status = MagicMock()
        mock_post.return_value = mock_response

        response = test_client_admin.post("/analytics/update_scoreboard")

        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"status": "success", "message": "Scoreboard updated"}
