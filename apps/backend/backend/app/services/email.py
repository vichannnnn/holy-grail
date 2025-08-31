import logging
from abc import ABC, abstractmethod
from typing import Any, Dict, Optional

from app.core import Environment, settings

logger = logging.getLogger(__name__)


class EmailService(ABC):
    @abstractmethod
    async def send_email(
        self,
        to: str,
        subject: str,
        body: str,
        template: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
    ) -> bool:
        pass

    @abstractmethod
    async def send_verification_email(
        self, to: str, username: str, verification_url: str
    ) -> bool:
        pass

    @abstractmethod
    async def send_reset_password_email(
        self, to: str, username: str, reset_url: str
    ) -> bool:
        pass

    @abstractmethod
    async def send_new_password_email(
        self, to: str, username: str, new_password: str
    ) -> bool:
        pass


class ConsoleEmailService(EmailService):
    """Logs emails to console for local development"""

    async def send_email(
        self,
        to: str,
        subject: str,
        body: str,
        template: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
    ) -> bool:
        email_output = f"""
╔══════════════════════════════════════════════════════════╗
║                    📧 EMAIL PREVIEW                       ║
╠══════════════════════════════════════════════════════════╣
║ To: {to:<52} ║
║ Subject: {subject:<47} ║
╠══════════════════════════════════════════════════════════╣
║ Template: {template or 'None':<46} ║
╠══════════════════════════════════════════════════════════╣
║ Body:                                                     ║
║ {self._format_body(body)}
╚══════════════════════════════════════════════════════════╝
        """
        logger.info(email_output)
        return True

    async def send_verification_email(
        self, to: str, username: str, verification_url: str
    ) -> bool:
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

    async def send_reset_password_email(
        self, to: str, username: str, reset_url: str
    ) -> bool:
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

    async def send_new_password_email(
        self, to: str, username: str, new_password: str
    ) -> bool:
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
    """Sends emails via Celery tasks for production"""

    async def send_email(
        self,
        to: str,
        subject: str,
        body: str,
        template: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
    ) -> bool:
        # Import here to avoid issues when Celery is not available
        from app.utils.email_handler import send_email_via_mailtrap

        return await send_email_via_mailtrap(to, subject, body)

    async def send_verification_email(
        self, to: str, username: str, verification_url: str
    ) -> bool:
        from app.tasks.verify_email import send_verification_email_task

        send_verification_email_task.delay(to, username, verification_url)
        return True

    async def send_reset_password_email(
        self, to: str, username: str, reset_url: str
    ) -> bool:
        from app.tasks.reset_password_email import send_reset_password_email_task

        send_reset_password_email_task.delay(to, username, reset_url)
        return True

    async def send_new_password_email(
        self, to: str, username: str, new_password: str
    ) -> bool:
        from app.tasks.new_password_email import send_new_password_email_task

        send_new_password_email_task.delay(to, username, new_password)
        return True


def get_email_service() -> EmailService:
    if settings.environment == Environment.LOCAL or not settings.email_enabled:
        logger.info("📧 Email service running in console mode - emails will be logged")
        return ConsoleEmailService()
    logger.info("📧 Email service running in production mode - using Celery/Mailtrap")
    return CeleryEmailService()


# Singleton instance
email_service = get_email_service()