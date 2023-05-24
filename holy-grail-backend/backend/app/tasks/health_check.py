from app.worker import celery_app
import requests


@celery_app.task(name="ping")
def ping() -> None:
    resp = requests.get("http://backend:8000/ping")
    return resp.json()
