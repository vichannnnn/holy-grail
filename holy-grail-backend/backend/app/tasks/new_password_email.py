from os import environ

from pydantic import EmailStr

from app.email_handler import send_new_password_mail
from app.worker import celery_app

FRONTEND_URL = environ["FRONTEND_URL"]


@celery_app.task
def send_new_password_email_task(email: EmailStr, username: str, confirm_url: str, password: str):
    try:
        send_new_password_mail(
            sender_name="Cute Bot",
            username=username,
            from_email="do-not-reply@grail.moe",
            to_email=email,
            password=password
        )
        return {"success": f"new password email sent to {username}"}


    except Exception as e:
        print(str(e))
