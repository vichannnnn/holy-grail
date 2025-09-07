"""
Email service abstraction for sending notifications.

This module provides an abstract interface for email services with concrete
implementations for local development (console logging) and production (Celery/Mailtrap).
The service is automatically selected based on environment configuration.
"""
import logging
from abc import ABC, abstractmethod
from typing import Any, Dict, Optional

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


class CeleryEmailService(EmailService):
    """
    Celery-based email service for production environments.

    Sends emails asynchronously via Celery task queue to avoid blocking
    the main application. Uses Mailtrap or configured SMTP service.
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
        Send email via Mailtrap using async handler.

        Args:
            to: Recipient email address.
            subject: Email subject line.
            body: Plain text email body.
            template: Optional template name (not used).
            context: Optional context data (not used).

        Returns:
            bool: True if email sent successfully, False otherwise.
        """
        # Import here to avoid issues when Celery is not available
        from app.utils.email_handler import send_email_via_mailtrap

        return await send_email_via_mailtrap(to, subject, body)

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
        from app.tasks.verify_email import send_verification_email_task

        send_verification_email_task.delay(to, username, verification_url)
        return True

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
        from app.tasks.reset_password_email import send_reset_password_email_task

        send_reset_password_email_task.delay(to, username, reset_url)
        return True

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
        from app.tasks.new_password_email import send_new_password_email_task

        send_new_password_email_task.delay(to, username, new_password)
        return True


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
    logger.info("📧 Email service running in production mode - using Celery/Mailtrap")
    return CeleryEmailService()


# Singleton instance
email_service = get_email_service()
