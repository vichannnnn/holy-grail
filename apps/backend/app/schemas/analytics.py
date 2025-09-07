"""
Analytics schemas for platform usage metrics.

This module defines Pydantic models for analytics data responses
including user activity and file download statistics.
"""
from datetime import datetime

from app.schemas.base import CustomBaseModel as BaseModel


class AnalyticsResponse(BaseModel):
    """
    Schema for analytics data response.
    
    Contains platform usage metrics from Google Analytics
    and internal database statistics.
    """
    file_download_count: int
    unique_active_users: int
    user_count: int
    timestamp: datetime
