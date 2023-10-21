import os

import requests

from app.utils.worker import celery_app


@celery_app.task(name="ping")
def ping() -> None:
    resp = requests.get(f"http://{os.environ['BACKEND_CONTAINER_URL']}/hello")
    return resp.json()
