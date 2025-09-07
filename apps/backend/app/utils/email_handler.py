"""
Email client for sending templated emails via Mailtrap.

This module provides functionality to send HTML emails using Jinja2
templates and the Mailtrap API service for production email delivery.
"""
from os import environ

import httpx
from jinja2 import Environment, FileSystemLoader
from pydantic import EmailStr

env = Environment(loader=FileSystemLoader("./app/email_templates/"))


class EmailClient:
    """
    Client for sending emails through Mailtrap API.

    Handles email template rendering with Jinja2 and sending emails
    via Mailtrap's REST API for production environments.
    """

    def __init__(self) -> None:
        """
        Initialize email client with Mailtrap configuration.

        Reads API key from environment and sets up HTTP client.
        """
        self.MAILTRAP_API_KEY = environ["MAILTRAP_API_KEY"]
        self.MAILTRAP_API_SEND_URL = "https://send.api.mailtrap.io/api/send"
        self.client = httpx.Client()
        self.headers = {
            "Accept": "application/json",
            "Api-Token": self.MAILTRAP_API_KEY,
            "Content-Type": "application/json",
        }

    def _render_template(self, template_name: str, **template_params) -> str:
        """
        Renders an email template.

        Args:
            template_name: The name of the template file.
            **template_params: Parameters for rendering the template.

        Returns:
            Rendered HTML string.
        """
        template = env.get_template(template_name)
        return template.render(**template_params)

    def _send_email(
        self,
        sender_name: str,
        from_email: str,
        to_email: EmailStr,
        subject: str,
        html_content: str,
    ) -> int:
        """
        Sends an email using Mailtrap.

        Args:
            sender_name: The name of the sender.
            from_email: The sender's email address.
            to_email: The recipient's email address.
            subject: The subject of the email.
            html_content: The email content as an HTML string.

        Returns:
            The HTTP status code of the email sending request.
        """
        payload = {
            "to": [{"email": to_email}],
            "from": {"email": from_email, "name": sender_name},
            "subject": subject,
            "html": html_content,
        }

        response = httpx.post(self.MAILTRAP_API_SEND_URL, headers=self.headers, json=payload)
        response.raise_for_status()
        return response.status_code

    def send_email_verification_mail(
        self,
        sender_name: str,
        from_email: str,
        to_email: EmailStr,
        confirm_url: str,
        username: str,
    ) -> int:
        """
        Sends an email verification email.

        Args:
            sender_name: The name of the sender.
            from_email: The sender's email address.
            to_email: The recipient's email address.
            confirm_url: The confirmation URL for verification.
            username: The recipient's username.

        Returns:
            The HTTP status code of the email sending request.
        """
        html_content = self._render_template(
            "verify_email.html", username=username, confirm_url=confirm_url
        )
        return self._send_email(
            sender_name,
            from_email,
            to_email,
            "Email Verification for Holy Grail",
            html_content,
        )

    def send_reset_password_email(
        self,
        sender_name: str,
        from_email: str,
        to_email: EmailStr,
        confirm_url: str,
        username: str,
    ) -> int:
        """
        Sends a password reset email.

        Args:
            sender_name: The name of the sender.
            from_email: The sender's email address.
            to_email: The recipient's email address.
            confirm_url: The password reset URL.
            username: The recipient's username.

        Returns:
            The HTTP status code of the email sending request.
        """
        html_content = self._render_template(
            "reset_password.html", username=username, confirm_url=confirm_url
        )
        return self._send_email(
            sender_name,
            from_email,
            to_email,
            "Password Reset for Holy Grail",
            html_content,
        )

    def send_new_password_mail(
        self,
        sender_name: str,
        from_email: str,
        to_email: EmailStr,
        username: str,
        password: str,
    ) -> int:
        """
        Sends a new password email.

        Args:
            sender_name: The name of the sender.
            from_email: The sender's email address.
            to_email: The recipient's email address.
            username: The recipient's username.
            password: The new temporary password.

        Returns:
            The HTTP status code of the email sending request.
        """
        html_content = self._render_template(
            "new_password.html", username=username, password=password
        )
        return self._send_email(
            sender_name,
            from_email,
            to_email,
            "New Password for Holy Grail",
            html_content,
        )


async def send_email_via_mailtrap(to: str, subject: str, body: str) -> bool:
    """
    Send a plain text email via Mailtrap.

    This is a simple async wrapper for sending basic emails without templates.
    Used by the production email service.

    Args:
        to: Recipient email address.
        subject: Email subject line.
        body: Plain text email body.

    Returns:
        bool: True if email sent successfully (status 200), False otherwise.
    """
    try:
        client = EmailClient()
        status_code = client._send_email(
            sender_name="Holy Grail",
            from_email="noreply@holygrail.sg",
            to_email=to,
            subject=subject,
            html_content=f"<pre>{body}</pre>",
        )
        return status_code == 200
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False
