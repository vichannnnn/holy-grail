"""
Celery task for health checking the backend service.

This module contains a periodic task that pings the backend
to ensure the service is responsive.
"""
import os

import requests

from app.utils.worker import celery_app

BACKEND_CONTAINER_URL = os.getenv("BACKEND_CONTAINER_URL", "http://localhost:8000")


@celery_app.task(name="ping")
def ping() -> dict:
    """
    Ping the backend service to check health.

    Makes a GET request to the hello endpoint to verify
    the backend is running and responsive.

    Returns:
        dict: Response data from the hello endpoint.
    """
    resp = requests.get(f"{BACKEND_CONTAINER_URL}/hello")
    return resp.json()
