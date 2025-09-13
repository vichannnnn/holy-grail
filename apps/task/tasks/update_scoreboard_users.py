"""
Celery task for updating user rankings on the scoreboard.

This module contains a periodic task that recalculates user rankings
based on their educational content contributions.
"""
import os

import requests

from worker import celery_app

BACKEND_CONTAINER_URL = os.getenv("BACKEND_CONTAINER_URL", "http://localhost:8000")


@celery_app.task(name="update_scoreboard_users")
def update_scoreboard_users_task() -> dict:
    """
    Update scoreboard rankings for all users.

    Runs periodically to recalculate user rankings based on their
    upload count and other contribution metrics.

    Returns:
        dict: Response from the backend API.
    """
    resp = requests.post(f"{BACKEND_CONTAINER_URL}/analytics/update_scoreboard")
    return resp.json()
