import asyncio
from app.models.ad_analytics import AdAnalytics
from app.db.database import async_session

from app.utils.worker import celery_app


@celery_app.task(name="ad_analytics_loop")
def ad_analytics_loop() -> None:
    asyncio.get_event_loop().run_until_complete(AdAnalytics.new_day(async_session()))
