"""
Scoreboard endpoints for user contribution rankings.

This module provides endpoints for displaying user contributions and rankings
based on approved educational content submissions. Encourages community
participation through gamification.
"""
from typing import List

from fastapi import APIRouter

from app.api.deps import CurrentSession, SessionUser
from app.models.scoreboard import Scoreboard
from app.schemas.scoreboard import AuthenticatedScoreboardUser, ScoreboardUser

router = APIRouter()


@router.get("")
async def top_approved_note_users(session: CurrentSession) -> List[ScoreboardUser]:
    """
    Get the top contributors leaderboard.

    Returns a ranked list of users with the most approved educational
    content contributions. System accounts and test users are excluded
    from the rankings.

    Args:
        session: Active database session

    Returns:
        List[ScoreboardUser]: Top 20 users ranked by approved contributions

    Note:
        Excludes system accounts (IDs: 1, 4, 9) from rankings
    """
    resp = await Scoreboard.get_top_n_approved_users(session, top_n=20, exclude_ids=[1, 4, 9])
    return resp


@router.get("/user")
async def get_user_approved_note_count(
    session: CurrentSession, authenticated: SessionUser
) -> AuthenticatedScoreboardUser:
    """
    Get the authenticated user's contribution statistics.

    Returns the current user's approved note count and their ranking
    position on the leaderboard. Useful for showing personalized
    progress and encouraging more contributions.

    Args:
        session: Active database session
        authenticated: Currently authenticated user

    Returns:
        AuthenticatedScoreboardUser: User's contribution stats and ranking
    """
    resp = await Scoreboard.get_authenticated_approved_user(session, authenticated.user_id)
    return resp
