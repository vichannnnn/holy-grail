import datetime
import os
from typing import Optional, Tuple

import pytz
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    RunReportRequest,
    RunReportResponse,
)
from sqlalchemy import DateTime, func, select
from sqlalchemy.orm import Mapped, mapped_column

from app.crud.base import CRUD, ModelType
from app.db.base_class import Base
from app.db.database import AsyncSession
from app.models.auth import Account
from app.utils.exceptions import AppError


def extract_metrics(response: RunReportResponse) -> Tuple[Optional[int], Optional[int]]:
    event_name_position = next(
        (
            i
            for i, header in enumerate(response.dimension_headers)
            if header.name == "eventName"
        ),
        None,
    )

    active_users_position = next(
        (
            i
            for i, header in enumerate(response.metric_headers)
            if header.name == "activeUsers"
        ),
        None,
    )
    event_count_position = next(
        (
            i
            for i, header in enumerate(response.metric_headers)
            if header.name == "eventCount"
        ),
        None,
    )

    file_download_event_count, page_view_active_user = None, None

    for row in response.rows:
        if row.dimension_values[event_name_position].value == "file_download":
            file_download_event_count = row.metric_values[event_count_position].value
        elif row.dimension_values[event_name_position].value == "page_view":
            page_view_active_user = row.metric_values[active_users_position].value

    return file_download_event_count, page_view_active_user


class Analytics(Base, CRUD["analytics"]):
    __tablename__ = "analytics"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    file_download_count: Mapped[int] = mapped_column(nullable=False)
    unique_active_users: Mapped[int] = mapped_column(nullable=False)
    user_count: Mapped[int] = mapped_column(nullable=False)
    timestamp: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now(), index=True
    )

    @classmethod
    async def get_latest_analytics(cls, session: AsyncSession) -> ModelType:
        stmt = select(cls).order_by(cls.timestamp.desc()).limit(1)
        result = await session.execute(stmt)
        instance = result.scalar()

        if instance is None:
            raise AppError.RESOURCES_NOT_FOUND_ERROR
        return instance

    @classmethod
    async def fetch_google_analytics_async(cls, session: AsyncSession) -> None:
        starting_date = "2023-06-14"
        ending_date = "today"
        client = BetaAnalyticsDataClient()

        request_api = RunReportRequest(
            property=f"properties/{os.getenv('GOOGLE_APPLICATION_PROPERTY_ID', '')}",
            dimensions=[Dimension(name="eventName")],
            metrics=[Metric(name="activeUsers"), Metric(name="eventCount")],
            date_ranges=[DateRange(start_date=starting_date, end_date=ending_date)],
        )
        resp = client.run_report(request=request_api)

        user_count = await Account.get_users_count(session=session)
        file_download_event_count, page_view_active_user = extract_metrics(resp)

        tz = pytz.timezone("Asia/Singapore")
        now = datetime.datetime.now(tz)

        data = {
            "file_download_count": int(file_download_event_count),
            "unique_active_users": int(page_view_active_user),
            "user_count": user_count,
            "timestamp": now,
        }
        await Analytics.create(session=session, data=data)

        return
