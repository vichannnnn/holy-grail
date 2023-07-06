import os

from celery import Celery  # type: ignore

celery_app = Celery(
    "tasks",
    include=[
        "app.tasks.health_check",
        "app.tasks.verify_email",
        "app.tasks.reset_password_email",
        "app.tasks.new_password_email",
    ],
)
celery_app.conf.timezone = "Asia/Singapore"

celery_app.conf.broker_url = os.environ.get("CELERY_BROKER_URL")
celery_app.conf.result_backend = os.environ.get("CELERY_RESULT_BACKEND")

celery_app.conf.beat_schedule = {
    "ping": {
        "task": "ping",
        "schedule": 120.0,
    },
}