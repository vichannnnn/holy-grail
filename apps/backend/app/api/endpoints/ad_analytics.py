from fastapi import APIRouter, Request, Response

from app.api.deps import CurrentSession
from app.models.ad_analytics import AdAnalytics
from app.utils.limiter import conditional_rate_limit

router = APIRouter()


@router.post("/ad_click", status_code=204)
async def ad_click(request: Request, session: CurrentSession):
    await AdAnalytics.ad_click(session)
    return Response(status_code=204)


@router.post("/ad_view", status_code=204)
@conditional_rate_limit("1/day")
async def ad_view(request: Request, session: CurrentSession):
    await AdAnalytics.ad_view(session)
    return Response(status_code=204)
