import logging

from celery import Task
from pydantic import EmailStr

from email_service.email_task_client import EmailTaskClient
from worker import celery_app

logger = logging.getLogger(__name__)


class EmailTask(Task):
    autoretry_for = (Exception,)
    retry_backoff = True
    retry_backoff_max = 60
    retry_jitter = True
    max_retries = 3


@celery_app.task(bind=True, base=EmailTask)
def send_new_password_email_task(_self, email: EmailStr, username: str, password: str) -> dict:
    logger.info(f"Sending new password email to {email}")
    email_client = EmailTaskClient()
    email_client.send_new_password_mail(
        sender_name="Holy Grail",
        username=username,
        from_email="do-not-reply@grail.moe",
        to_email=email,
        password=password,
    )
    logger.info(f"New password email sent to {email}")
    return {"success": f"new password email sent to {username}"}
