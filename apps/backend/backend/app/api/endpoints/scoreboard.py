from typing import List

from fastapi import APIRouter

from app.api.deps import CurrentSession, SessionUser
from app.models.scoreboard import Scoreboard
from app.schemas.scoreboard import AuthenticatedScoreboardUser, ScoreboardUser

router = APIRouter()


@router.get("")
async def top_approved_note_users(session: CurrentSession) -> List[ScoreboardUser]:
    resp = await Scoreboard.get_top_n_approved_users(
        session, top_n=20, exclude_ids=[1, 4, 9]
    )
    return resp


@router.get("/user")
async def get_user_approved_note_count(
    session: CurrentSession, authenticated: SessionUser
) -> AuthenticatedScoreboardUser:
    resp = await Scoreboard.get_authenticated_approved_user(
        session, authenticated.user_id
    )
    return resp
