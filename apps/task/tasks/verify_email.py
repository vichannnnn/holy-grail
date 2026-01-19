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
def send_verification_email_task(_self, email: EmailStr, username: str, confirm_url: str) -> dict:
    logger.info(f"Sending verification email to {email}")
    email_client = EmailTaskClient()
    email_client.send_verify_account_email(
        sender_name="Holy Grail",
        username=username,
        from_email="do-not-reply@grail.moe",
        to_email=email,
        confirm_url=confirm_url,
    )
    logger.info(f"Verification email sent to {email}")
    return {"success": f"verification email sent to {username}"}
