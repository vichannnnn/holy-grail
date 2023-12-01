import asyncio

from app.api.deps import async_session
from app.models.scoreboard import Scoreboard
from app.utils.worker import celery_app

loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)


@celery_app.task(name="update_scoreboard_users", bind=True, ignore_result=True)
def update_scoreboard_users(self) -> None:
    loop.run_until_complete(update_scoreboard_users_async())


async def update_scoreboard_users_async() -> None:
    async with async_session() as session:
        await Scoreboard.update_scoreboard_users(session=session)
    return
