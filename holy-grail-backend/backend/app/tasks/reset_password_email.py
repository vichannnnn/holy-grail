from os import environ

from pydantic import EmailStr

from app.utils.email_handler import send_reset_password_mail
from app.utils.worker import celery_app

FRONTEND_URL = environ["FRONTEND_URL"]


@celery_app.task
def send_reset_password_email_task(email: EmailStr, username: str, confirm_url: str):
    try:
        send_reset_password_mail(
            sender_name="Cute Bot",
            username=username,
            from_email="do-not-reply@grail.moe",
            to_email=email,
            confirm_url=confirm_url,
        )
        return {"success": f"reset password email sent to {username}"}

    except Exception as e:
        print(str(e))
