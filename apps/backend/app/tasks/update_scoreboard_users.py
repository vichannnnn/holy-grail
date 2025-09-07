"""
Celery task for updating user rankings on the scoreboard.

This module contains a periodic task that recalculates user rankings
based on their educational content contributions.
"""
import asyncio

from app.api.deps import async_session
from app.models.scoreboard import Scoreboard
from app.utils.worker import celery_app

loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)


@celery_app.task(name="update_scoreboard_users", bind=True, ignore_result=True)
def update_scoreboard_users(self) -> None:
    """
    Update scoreboard rankings for all users.

    Runs periodically to recalculate user rankings based on their
    upload count and other contribution metrics.

    Args:
        self: Celery task instance (bound task).
    """
    loop.run_until_complete(update_scoreboard_users_async())


async def update_scoreboard_users_async() -> None:
    """
    Async function to update scoreboard rankings.

    Creates a database session and calls the scoreboard model's
    update method to refresh user rankings.
    """
    async with async_session() as session:
        await Scoreboard.update_scoreboard_users(session=session)
    return
