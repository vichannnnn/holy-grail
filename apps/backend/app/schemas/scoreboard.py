"""
Scoreboard schemas for user contribution rankings.

This module defines Pydantic models for displaying user rankings
based on their educational content contributions.
"""
from pydantic import BaseModel


class User(BaseModel):
    """
    Basic user information for scoreboard display.
    """
    user_id: int
    username: str


class ScoreboardUser(BaseModel):
    """
    Schema for scoreboard user entry.
    
    Contains user info and their contribution count.
    """
    user: User
    upload_count: int


class AuthenticatedScoreboardUser(ScoreboardUser):
    """
    Extended scoreboard schema for authenticated users.
    
    Includes the user's rank position on the leaderboard.
    """
    rank: int
