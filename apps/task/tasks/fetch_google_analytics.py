"""
Celery task for fetching Google Analytics data.

This module contains a background task that fetches analytics data
from Google Analytics API via the backend endpoint.
"""

import os

import requests

from worker import celery_app

BACKEND_CONTAINER_URL = os.getenv("BACKEND_CONTAINER_URL", "http://localhost:8000")


@celery_app.task(name="fetch_google_analytics")
def fetch_google_analytics() -> dict:
    """
    Fetch Google Analytics data via backend API.

    Makes an HTTP request to the analytics endpoint to trigger
    data fetching from Google Analytics.

    Returns:
        dict: Response data from the analytics endpoint.
    """
    resp = requests.post(f"{BACKEND_CONTAINER_URL}/analytics/fetch_google_analytics")
    return resp.json()
