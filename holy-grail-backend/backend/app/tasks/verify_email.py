from os import environ

from pydantic import EmailStr

from app.email_handler import send_email_verification_mail
from app.worker import celery_app

FRONTEND_URL = environ["FRONTEND_URL"]


@celery_app.task
def send_verification_email_task(email: EmailStr, username: str, confirm_url: str):
    try:
        send_email_verification_mail(
            sender_name="Cute Bot",
            username=username,
            from_email="do-not-reply@grail.moe",
            to_email=email,
            confirm_url=confirm_url,
        )
        return {"success": f"verification email sent to {username}"}

    except Exception as e:
        print(str(e))
