import os

import requests

from app.utils.worker import celery_app


@celery_app.task(name="fetch_google_analytics")
def fetch_google_analytics() -> None:
    resp = requests.post(
        f"http://{os.environ['BACKEND_CONTAINER_URL']}/analytics/fetch_google_analytics"
    )
    return resp.json()
