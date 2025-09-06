import os

import requests

from app.utils.worker import celery_app

BACKEND_CONTAINER_URL = os.getenv("BACKEND_CONTAINER_URL", "http://localhost:8000")


@celery_app.task(name="ping")
def ping() -> None:
    resp = requests.get(f"{BACKEND_CONTAINER_URL}/hello")
    return resp.json()
