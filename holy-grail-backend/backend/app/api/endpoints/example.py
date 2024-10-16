from fastapi import APIRouter

from app.api.deps import CurrentSession
from app.models.analytics import Analytics
from app.schemas.analytics import AnalyticsResponse

router = APIRouter()


@router.get("/hello")
async def sanity_check():
    return {"Hello": "World!"}

