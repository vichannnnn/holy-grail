"""
Celery task for sending new password emails.

This module contains a background task that sends emails with
temporary passwords after a password reset.
"""
from pydantic import EmailStr

from app.utils.email_handler import EmailClient
from app.utils.worker import celery_app


@celery_app.task
def send_new_password_email_task(email: EmailStr, username: str, password: str) -> dict:
    """
    Send new password email to user.

    Sends an email containing a temporary password after
    the user's password has been reset.

    Args:
        email: Recipient's email address.
        username: User's username for personalization.
        password: Temporary password to send to user.

    Returns:
        dict: Success message if email sent, None on error.
    """
    try:
        email_client = EmailClient()
        email_client.send_new_password_mail(
            sender_name="Holy Grail",
            username=username,
            from_email="do-not-reply@grail.moe",
            to_email=email,
            password=password,
        )
        return {"success": f"new password email sent to {username}"}

    except Exception as e:
        print(str(e))
