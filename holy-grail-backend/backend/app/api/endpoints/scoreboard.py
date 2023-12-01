from typing import List

from fastapi import APIRouter

from app.api.deps import CurrentSession
from app.models.scoreboard import Scoreboard
from app.schemas.library import UserUploadCount

router = APIRouter()


@router.post("/top_approved_note_users")
async def top_approved_note_users(session: CurrentSession) -> List[UserUploadCount]:
    resp = await Scoreboard.update_scoreboard_users(session)
    return resp
