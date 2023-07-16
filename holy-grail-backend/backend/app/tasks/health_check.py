import requests

from app.utils.worker import celery_app


@celery_app.task(name="ping")
def ping() -> None:
    resp = requests.get("http://holy-grail-backend:8005/hello")
    return resp.json()
