"""
Email service abstraction for sending notifications.

This module provides an abstract interface for email services with concrete
implementations for local development (console logging) and production (Celery/Mailtrap).
The service is automatically selected based on environment configuration.
"""
import logging
from abc import ABC, abstractmethod
from typing import Any, Dict, Optional

import httpx

from app.core import Environment, settings

logger = logging.getLogger(__name__)


class EmailService(ABC):
    """
    Abstract base class for email service implementations.

    Defines the interface for sending various types of emails including
    verification, password reset, and custom emails.
    """

    @abstractmethod
    async def send_email(
        self,
        to: str,
        subject: str,
        body: str,
        template: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
    ) -> bool:
        """
        Send a generic email.

        Args:
            to: Recipient email address.
            subject: Email subject line.
            body: Plain text email body.
            template: Optional template name for future use.
            context: Optional context data for template rendering.

        Returns:
            bool: True if email sent successfully, False otherwise.
        """
        pass

    @abstractmethod
    async def send_verification_email(self, to: str, username: str, verification_url: str) -> bool:
        """
        Send email verification link to new user.

        Args:
            to: Recipient email address.
            username: User's username for personalization.
            verification_url: Unique verification URL.

        Returns:
            bool: True if email sent successfully, False otherwise.
        """
        pass

    @abstractmethod
    async def send_reset_password_email(self, to: str, username: str, reset_url: str) -> bool:
        """
        Send password reset link to user.

        Args:
            to: Recipient email address.
            username: User's username for personalization.
            reset_url: Unique password reset URL.

        Returns:
            bool: True if email sent successfully, False otherwise.
        """
        pass

    @abstractmethod
    async def send_new_password_email(self, to: str, username: str, new_password: str) -> bool:
        """
        Send new password to user after reset.

        Args:
            to: Recipient email address.
            username: User's username for personalization.
            new_password: Temporary new password.

        Returns:
            bool: True if email sent successfully, False otherwise.
        """
        pass


class ConsoleEmailService(EmailService):
    """
    Console-based email service for local development.

    Logs emails to the console in a formatted box layout instead of
    actually sending them. This allows developers to see email content
    during development without configuring SMTP.
    """

    async def send_email(
        self,
        to: str,
        subject: str,
        body: str,
        template: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
    ) -> bool:
        """
        Log email to console in formatted box.

        Args:
            to: Recipient email address.
            subject: Email subject line.
            body: Plain text email body.
            template: Optional template name (logged for debugging).
            context: Optional context data (not used in console).

        Returns:
            bool: Always returns True.
        """
        email_output = f"""
╔══════════════════════════════════════════════════════════╗
║                    📧 EMAIL PREVIEW                       ║
╠══════════════════════════════════════════════════════════╣
║ To: {to:<52} ║
║ Subject: {subject:<47} ║
╠══════════════════════════════════════════════════════════╣
║ Template: {template or "None":<46} ║
╠══════════════════════════════════════════════════════════╣
║ Body:                                                     ║
║ {self._format_body(body)}
╚══════════════════════════════════════════════════════════╝
        """
        logger.info(email_output)
        return True

    async def send_verification_email(self, to: str, username: str, verification_url: str) -> bool:
        """
        Send email verification with formatted template.

        Args:
            to: Recipient email address.
            username: User's username for personalization.
            verification_url: Unique verification URL.

        Returns:
            bool: Result from send_email method.
        """
        return await self.send_email(
            to=to,
            subject="Verify your email address",
            body=f"""
Hi {username},

Please verify your email address by clicking the link below:
{verification_url}

This link will expire in 24 hours.

Thanks,
The Holy Grail Team
            """,
            template="verification",
            context={"username": username, "verification_url": verification_url},
        )

    async def send_reset_password_email(self, to: str, username: str, reset_url: str) -> bool:
        """
        Send password reset email with formatted template.

        Args:
            to: Recipient email address.
            username: User's username for personalization.
            reset_url: Unique password reset URL.

        Returns:
            bool: Result from send_email method.
        """
        return await self.send_email(
            to=to,
            subject="Password Reset Request",
            body=f"""
Hi {username},

We received a request to reset your password. Click the link below to reset it:
{reset_url}

This link will expire in 1 hour. If you didn't request this, please ignore this email.

Thanks,
The Holy Grail Team
            """,
            template="password_reset",
            context={"username": username, "reset_url": reset_url},
        )

    async def send_new_password_email(self, to: str, username: str, new_password: str) -> bool:
        """
        Send new password email with formatted template.

        Args:
            to: Recipient email address.
            username: User's username for personalization.
            new_password: Temporary new password.

        Returns:
            bool: Result from send_email method.
        """
        return await self.send_email(
            to=to,
            subject="Your new password",
            body=f"""
Hi {username},

Your password has been reset. Your new temporary password is:
{new_password}

Please log in and change this password immediately.

Thanks,
The Holy Grail Team
            """,
            template="new_password",
            context={"username": username, "new_password": new_password},
        )

    def _format_body(self, body: str) -> str:
        """
        Format email body for console display.

        Truncates long lines and limits to 5 lines for readability.

        Args:
            body: Email body text to format.

        Returns:
            str: Formatted body with box drawing characters.
        """
        lines = body.strip().split("\n")
        formatted_lines = []
        for line in lines[:5]:  # Show first 5 lines
            if len(line) > 50:
                formatted_lines.append(f"║ {line[:50]}... ║")
            else:
                formatted_lines.append(f"║ {line:<55} ║")
        if len(lines) > 5:
            formatted_lines.append(f"║ ... ({len(lines) - 5} more lines) ...{' ' * 33} ║")
        return "\n".join(formatted_lines)


class HTTPEmailService(EmailService):
    """
    HTTP-based email service for production environments.

    Sends emails by making HTTP requests to the task service API,
    which handles the async processing via Celery.
    """

    def __init__(self):
        """Initialize with task service URL."""
        self.task_api_url = settings.task_api_url
        self.client = httpx.AsyncClient()

    async def send_email(
        self,
        to: str,
        subject: str,
        body: str,
        template: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
    ) -> bool:
        """
        Generic email sending is not implemented for HTTP service.

        All emails should be sent through specific methods like
        send_verification_email, send_reset_password_email, etc.

        Args:
            to: Recipient email address.
            subject: Email subject line.
            body: Plain text email body.
            template: Optional template name (not used).
            context: Optional context data (not used).

        Returns:
            bool: Always returns False as this method is not implemented.
        """
        logger.warning(
            "Generic send_email called on HTTPEmailService. "
            "Use specific methods like send_verification_email instead."
        )
        return False

    async def send_verification_email(self, to: str, username: str, verification_url: str) -> bool:
        """
        Queue verification email via Celery task.

        Args:
            to: Recipient email address.
            username: User's username for personalization.
            verification_url: Unique verification URL.

        Returns:
            bool: Always returns True after queuing.
        """
        try:
            response = await self.client.post(
                f"{self.task_api_url}/tasks/send-verify-email",
                json={
                    "email": to,
                    "username": username,
                    "confirm_url": verification_url,
                },
            )
            response.raise_for_status()
            return True
        except Exception as e:
            logger.error(f"Failed to send verification email: {e}")
            return False

    async def send_reset_password_email(self, to: str, username: str, reset_url: str) -> bool:
        """
        Queue password reset email via Celery task.

        Args:
            to: Recipient email address.
            username: User's username for personalization.
            reset_url: Unique password reset URL.

        Returns:
            bool: Always returns True after queuing.
        """
        try:
            response = await self.client.post(
                f"{self.task_api_url}/tasks/send-reset-password-email",
                json={
                    "email": to,
                    "username": username,
                    "confirm_url": reset_url,
                },
            )
            response.raise_for_status()
            return True
        except Exception as e:
            logger.error(f"Failed to send reset password email: {e}")
            return False

    async def send_new_password_email(self, to: str, username: str, new_password: str) -> bool:
        """
        Queue new password email via Celery task.

        Args:
            to: Recipient email address.
            username: User's username for personalization.
            new_password: Temporary new password.

        Returns:
            bool: Always returns True after queuing.
        """
        try:
            response = await self.client.post(
                f"{self.task_api_url}/tasks/send-new-password-email",
                json={
                    "email": to,
                    "username": username,
                    "password": new_password,
                },
            )
            response.raise_for_status()
            return True
        except Exception as e:
            logger.error(f"Failed to send new password email: {e}")
            return False


def get_email_service() -> EmailService:
    """
    Factory function to get appropriate email service.

    Returns console service for local development, Celery service for
    production. Service is selected based on environment and email_enabled settings.

    Returns:
        EmailService: Concrete email service instance.
    """
    if settings.environment == Environment.LOCAL or not settings.email_enabled:
        logger.info("📧 Email service running in console mode - emails will be logged")
        return ConsoleEmailService()
    logger.info("📧 Email service running in production mode - using Task API/Mailtrap")
    return HTTPEmailService()


# Singleton instance
email_service = get_email_service()
