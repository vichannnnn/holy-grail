"""
Celery task for sending password reset emails.

This module contains a background task that sends emails with
password reset links to users who request a password reset.
"""
from pydantic import EmailStr

from email_service.email_task_client import EmailTaskClient
from worker import celery_app


@celery_app.task
def send_reset_password_email_task(email: EmailStr, username: str, confirm_url: str) -> dict:
    """
    Send password reset email to user.

    Sends an email containing a unique password reset link
    that expires after a specified time.

    Args:
        email: Recipient's email address.
        username: User's username for personalization.
        confirm_url: Unique password reset URL.

    Returns:
        dict: Success message if email sent, None on error.
    """
    try:
        email_client = EmailTaskClient()
        email_client.send_reset_password_email(
            sender_name="Holy Grail",
            username=username,
            from_email="do-not-reply@grail.moe",
            to_email=email,
            confirm_url=confirm_url,
        )
        return {"success": f"reset password email sent to {username}"}

    except Exception as e:
        print(str(e))
