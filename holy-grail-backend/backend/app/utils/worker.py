import os

from celery import Celery  # type: ignore

celery_app = Celery(
    "tasks",
    include=[
        "app.tasks.fetch_google_analytics",
        "app.tasks.health_check",
        "app.tasks.verify_email",
        "app.tasks.reset_password_email",
        "app.tasks.new_password_email",
        "app.tasks.update_scoreboard_users",
    ],
)
celery_app.conf.timezone = "Asia/Singapore"

celery_app.conf.broker_url = os.environ.get(
    "CELERY_BROKER_URL", "redis://localhost:6379"
)
celery_app.conf.result_backend = os.environ.get(
    "CELERY_RESULT_BACKEND", "redis://localhost:6379"
)

celery_app.conf.beat_schedule = {
    "ping": {
        "task": "ping",
        "schedule": 120.0,
    },
    "fetch_google_analytics": {
        "task": "fetch_google_analytics",
        "schedule": 86400.0,
    },
    "update_scoreboard_users": {
        "task": "update_scoreboard_users",
        "schedule": 3600.0,
        "options": {"countdown": 0},
    },
}
