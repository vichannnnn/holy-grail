from os import environ
from uuid import uuid4

from pydantic import EmailStr
from sqlalchemy import update

from app.email_handler import send_email_verification_mail
from app.worker import celery_app

FRONTEND_URL = environ["FRONTEND_URL"]


@celery_app.task
def send_verification_email_task(user_id: int, email: EmailStr, username: str):
    try:

        from app.api.deps import get_db
        from app.models import Account

        token = uuid4().hex
        confirm_url = f"{FRONTEND_URL}/verify-account?token={token}"

        send_email_verification_mail(
            sender_name="Cute Bot",
            username=username,
            from_email="do-not-reply@grail.moe",
            to_email=email,
            confirm_url=confirm_url,
        )

        with get_db() as session:
            stmt = (
                update(Account)
                .returning(Account)
                .where(Account.user_id == user_id)
                .values({"email_verification_token": token})
            )
            session.execute(stmt)
            session.commit()


    except Exception as e:
        print(str(e))
