from pydantic import EmailStr

from app.utils.email_handler import EmailClient
from app.utils.worker import celery_app


@celery_app.task
def send_reset_password_email_task(email: EmailStr, username: str, confirm_url: str):
    try:
        email_client = EmailClient()
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
