"""
Celery task for fetching Google Analytics data.

This module contains a background task that fetches analytics data
from Google Analytics API via the backend endpoint.
"""

import logging
import os

import requests

from worker import celery_app

logger = logging.getLogger(__name__)

BACKEND_CONTAINER_URL = os.getenv("BACKEND_CONTAINER_URL", "http://localhost:8000")
REQUEST_TIMEOUT_SECONDS = 60


@celery_app.task(
    name="fetch_google_analytics",
    bind=True,
    autoretry_for=(requests.RequestException,),
    retry_backoff=True,
    retry_backoff_max=300,
    max_retries=3,
)
def fetch_google_analytics(self) -> dict:
    """
    Fetch Google Analytics data via backend API.

    Makes an HTTP request to the analytics endpoint to trigger
    data fetching from Google Analytics.

    Returns:
        dict: Response data from the analytics endpoint.

    Raises:
        requests.RequestException: On network or HTTP errors (will auto-retry).
    """
    url = f"{BACKEND_CONTAINER_URL}/analytics/fetch_google_analytics"
    logger.info(
        "Fetching Google Analytics data from %s (attempt %d/%d)",
        url,
        self.request.retries + 1,
        self.max_retries + 1,
    )

    try:
        resp = requests.post(url, timeout=REQUEST_TIMEOUT_SECONDS)
        resp.raise_for_status()
        data = resp.json()
        logger.info("Successfully fetched Google Analytics data: %s", data)
        return data
    except requests.Timeout:
        logger.error("Request to %s timed out after %d seconds", url, REQUEST_TIMEOUT_SECONDS)
        raise
    except requests.HTTPError as e:
        logger.error("HTTP error from analytics endpoint: %s (status: %d)", str(e), resp.status_code)
        raise
    except requests.RequestException as e:
        logger.error("Request error fetching Google Analytics: %s", str(e))
        raise
