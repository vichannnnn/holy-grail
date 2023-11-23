from fastapi import APIRouter

from app.api.deps import CurrentSession
from app.models.ad_analytics import AdAnalytics

router = APIRouter()


@router.post("/new_day")
async def new_day(session: CurrentSession):
    await AdAnalytics.new_day(session)
    return {"status": "success"}


@router.patch("/ad_click")
async def ad_click(session: CurrentSession):
    await AdAnalytics.ad_click(session)
    return {"status": "success"}


@router.patch("/ad_view")
async def ad_view(session: CurrentSession):
    await AdAnalytics.ad_view(session)
    return {"status": "success"}


@router.get("/get_latest_ad_analytics")
async def get_latest_ad_analytics(session: CurrentSession):
    latest_ad_analytics = await AdAnalytics.get_latest_ad_analytics(session)
    return {"status": "success", "data": latest_ad_analytics}
