from datetime import datetime

from app.schemas.base import CustomBaseModel as BaseModel


class AnalyticsResponse(BaseModel):
    file_download_count: int
    unique_active_users: int
    user_count: int
    timestamp: datetime
