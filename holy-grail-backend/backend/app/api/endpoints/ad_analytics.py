from fastapi import APIRouter, Request

from app.api.deps import CurrentSession, SessionDeveloper
from app.models.ad_analytics import AdAnalytics
from app.utils.limiter import conditional_rate_limit

router = APIRouter()


@router.post("/new_day")
@conditional_rate_limit("1/23hour")
async def new_day(request: Request, session: CurrentSession):
    await AdAnalytics.new_day(session)
    return {"status": "success"}


@router.patch("/ad_click")
@conditional_rate_limit("1/day")
async def ad_click(request: Request, session: CurrentSession):
    await AdAnalytics.ad_click(session)
    return {"status": "success"}


@router.patch("/ad_view")
@conditional_rate_limit("1/day")
async def ad_view(request: Request, session: CurrentSession):
    await AdAnalytics.ad_view(session)
    return {"status": "success"}


@router.get("/get_latest_ad_analytics")
async def get_latest_ad_analytics(session: SessionDeveloper):
    latest_ad_analytics = await AdAnalytics.get_latest_ad_analytics(session)
    return {"status": "success", "data": latest_ad_analytics}
