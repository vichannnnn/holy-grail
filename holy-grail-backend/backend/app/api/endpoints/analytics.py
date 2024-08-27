from fastapi import APIRouter, Request

from app.api.deps import CurrentSession
from app.models.analytics import Analytics
from app.schemas.analytics import AnalyticsResponse
from app.utils.limiter import conditional_rate_limit

router = APIRouter()


@router.post("/fetch_google_analytics")
@conditional_rate_limit("1/day")
async def fetch_google_analytics(request: Request, session: CurrentSession):
    resp = await Analytics.fetch_google_analytics_async(session)
    return resp


@router.get("/get_latest_analytics", response_model=AnalyticsResponse)
async def ad_view(session: CurrentSession):
    resp = await Analytics.get_latest_analytics(session)
    return resp
