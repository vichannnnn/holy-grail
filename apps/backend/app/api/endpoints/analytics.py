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


# @router.post("/fetch_google_analytics")
# @conditional_rate_limit("1/day")
# async def fetch_google_analytics(request: Request, session: CurrentSession):
#     """
#     Manually trigger Google Analytics data fetch.
#
#     This endpoint is commented out as analytics fetching is now handled
#     by scheduled background tasks.
#     """
#     resp = await Analytics.fetch_google_analytics_async(session)
#     return resp


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
