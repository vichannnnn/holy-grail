import requests

from app.worker import celery_app


@celery_app.task(name="ping")
def ping() -> None:
    resp = requests.get("http://holy-grail-backend:8000/hello")
    return resp.json()
