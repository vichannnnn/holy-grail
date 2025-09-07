"""
Celery task for sending email verification links.

This module contains a background task that sends verification emails
to new users for confirming their email addresses.
"""
from pydantic import EmailStr

from app.utils.email_handler import EmailClient
from app.utils.worker import celery_app


@celery_app.task
def send_verification_email_task(email: EmailStr, username: str, confirm_url: str) -> dict:
    """
    Send email verification link to new user.

    Sends an email containing a unique verification link
    that expires after 24 hours.

    Args:
        email: Recipient's email address.
        username: User's username for personalization.
        confirm_url: Unique email verification URL.

    Returns:
        dict: Success message if email sent, None on error.
    """
    try:
        email_client = EmailClient()
        email_client.send_email_verification_mail(
            sender_name="Holy Grail",
            username=username,
            from_email="do-not-reply@grail.moe",
            to_email=email,
            confirm_url=confirm_url,
        )
        return {"success": f"verification email sent to {username}"}

    except Exception as e:
        print(str(e))
