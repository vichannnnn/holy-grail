import os

from celery import Celery
from dotenv import load_dotenv

load_dotenv()

celery_app = Celery(
    "tasks",
    include=[
        "tasks.health_check",
        "tasks.verify_email",
        "tasks.reset_password_email",
        "tasks.new_password_email",
        "tasks.update_scoreboard_users",
        "tasks.fetch_google_analytics",
        "tasks.index_document",
        "tasks.delete_document",
    ],
)

celery_app.conf.timezone = "Asia/Singapore"
celery_app.conf.broker_url = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
celery_app.conf.result_backend = os.getenv("CELERY_RESULT_BACKEND", "redis://redis:6379/0")

# Apply configuration from celeryconfig
celery_app.config_from_object("celeryconfig")

celery_app.conf.beat_schedule = {
    "ping": {
        "task": "ping",
        "schedule": 3600.0,
    },
    "update_scoreboard_users": {
        "task": "update_scoreboard_users",
        "schedule": 43200.0,
        "options": {"countdown": 0},
    },
    "fetch_google_analytics": {
        "task": "fetch_google_analytics",
        "schedule": 86400.0,
    },
}
