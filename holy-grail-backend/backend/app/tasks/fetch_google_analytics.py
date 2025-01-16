import os

import requests

from app.utils.worker import celery_app

BACKEND_CONTAINER_URL = os.getenv("BACKEND_CONTAINER_URL", "http://localhost:8000")

@celery_app.task(name="fetch_google_analytics")
def fetch_google_analytics() -> None:
    resp = requests.post(
        f"{BACKEND_CONTAINER_URL}/analytics/fetch_google_analytics"
    )
    return resp.json()
