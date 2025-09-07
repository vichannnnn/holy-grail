"""
Advertisement analytics endpoints for tracking ad interactions.

This module provides endpoints for recording advertisement views and clicks
to measure ad performance and user engagement with promotional content.
"""
from fastapi import APIRouter, Request, Response

from app.api.deps import CurrentSession
from app.models.ad_analytics import AdAnalytics
from app.utils.limiter import conditional_rate_limit

router = APIRouter()


@router.post("/ad_click", status_code=204)
async def ad_click(request: Request, session: CurrentSession) -> Response:
    """
    Record an advertisement click event.
    
    Tracks when a user clicks on an advertisement for analytics purposes.
    No rate limiting applied as each click is a valuable engagement metric.
    
    Args:
        request: FastAPI request object
        session: Active database session
        
    Returns:
        Response: 204 No Content on success
    """
    await AdAnalytics.ad_click(session)
    return Response(status_code=204)


@router.post("/ad_view", status_code=204)
@conditional_rate_limit("1/day")
async def ad_view(request: Request, session: CurrentSession) -> Response:
    """
    Record an advertisement view/impression event.
    
    Tracks when an advertisement is displayed to a user. Rate limited to
    prevent artificial inflation of view counts.
    
    Args:
        request: FastAPI request object for rate limiting
        session: Active database session
        
    Returns:
        Response: 204 No Content on success
        
    Raises:
        HTTPException(429): If rate limit exceeded (1 view per day)
    """
    await AdAnalytics.ad_view(session)
    return Response(status_code=204)
