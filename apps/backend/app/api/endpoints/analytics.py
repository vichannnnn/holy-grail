"""
Analytics endpoints for tracking platform usage and engagement.

This module provides endpoints for retrieving Google Analytics data
and other platform usage metrics to monitor user engagement and
content performance.
"""
from fastapi import APIRouter

from app.api.deps import CurrentSession
from app.models.analytics import Analytics
from app.schemas.analytics import AnalyticsResponse

router = APIRouter()


@router.post("/fetch_google_analytics")
async def fetch_google_analytics(session: CurrentSession):
    """
    Fetch Google Analytics data.

    This endpoint is called by the task service to update analytics data.
    It fetches the latest data from Google Analytics API and stores it
    in the database.

    Args:
        session: Active database session

    Returns:
        dict: Success status and message
    """
    resp = await Analytics.fetch_google_analytics_async(session)
    return resp


@router.post("/update_scoreboard")
async def update_scoreboard(session: CurrentSession):
    """
    Update scoreboard rankings for all users.

    This endpoint is called by the task service to recalculate user
    rankings based on their upload count and contribution metrics.

    Args:
        session: Active database session

    Returns:
        dict: Success status and message
    """
    from app.models.scoreboard import Scoreboard

    await Scoreboard.update_scoreboard_users(session=session)
    return {"status": "success", "message": "Scoreboard updated"}


@router.get("/get_latest_analytics", response_model=AnalyticsResponse)
async def ad_view(session: CurrentSession) -> AnalyticsResponse:
    """
    Get the latest analytics data for the platform.

    Returns the most recent analytics snapshot including page views,
    user counts, engagement metrics, and popular content. Data is
    automatically updated via scheduled background tasks.

    Args:
        session: Active database session

    Returns:
        AnalyticsResponse: Latest analytics data with metrics and timestamps

    Note:
        Analytics data is fetched from Google Analytics API daily
    """
    resp = await Analytics.get_latest_analytics(session)
    return resp
