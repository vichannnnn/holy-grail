from fastapi import APIRouter, Request

from app.api.deps import CurrentSession
from app.models.ad_analytics import AdAnalytics
from app.utils.limiter import conditional_rate_limit

router = APIRouter()


@router.post("/ad_click")
async def ad_click(request: Request, session: CurrentSession):
    resp = await AdAnalytics.ad_click(session)
    return resp


@router.post("/ad_view")
@conditional_rate_limit("1/day")
async def ad_view(request: Request, session: CurrentSession):
    resp = await AdAnalytics.ad_view(session)
    return resp
