from pydantic import EmailStr

from app.utils.email_handler import EmailClient
from app.utils.worker import celery_app


@celery_app.task
def send_new_password_email_task(email: EmailStr, username: str, password: str):
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
