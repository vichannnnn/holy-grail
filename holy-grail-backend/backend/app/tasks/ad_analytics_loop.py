import os

import requests

from app.utils.worker import celery_app


@celery_app.task(name="ad_analytics_loop")
def ad_analytics_loop() -> None:
    resp = requests.post(
        f"http://{os.environ['BACKEND_CONTAINER_URL']}/ad_analytics/new_day"
    )

    return resp.json()


ad_analytics_loop()
