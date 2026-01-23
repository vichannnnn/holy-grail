"""
Analytics model for tracking platform usage metrics.

This module integrates with Google Analytics to track user engagement,
file downloads, and platform activity. It stores periodic snapshots
of analytics data for historical tracking and reporting.
"""
import base64
import datetime
import json
import logging
import os

logger = logging.getLogger(__name__)

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


def extract_metrics(response: RunReportResponse) -> tuple[int, int]:
    """
    Extract specific metrics from Google Analytics response.

    Parses the GA response to extract file download counts and active user metrics.

    Args:
        response: Google Analytics API response

    Returns:
        tuple[int, int]: File download count and active users (defaults to 0 if not found)
    """
    event_name_position = next(
        (i for i, header in enumerate(response.dimension_headers) if header.name == "eventName"),
        None,
    )

    active_users_position = next(
        (i for i, header in enumerate(response.metric_headers) if header.name == "activeUsers"),
        None,
    )
    event_count_position = next(
        (i for i, header in enumerate(response.metric_headers) if header.name == "eventCount"),
        None,
    )

    file_download_event_count, page_view_active_user = 0, 0

    if event_name_position is None:
        logger.warning("eventName dimension not found in GA response")
        return file_download_event_count, page_view_active_user

    for row in response.rows:
        event_name = row.dimension_values[event_name_position].value
        if event_name == "file_download" and event_count_position is not None:
            file_download_event_count = int(row.metric_values[event_count_position].value)
        elif event_name == "page_view" and active_users_position is not None:
            page_view_active_user = int(row.metric_values[active_users_position].value)

    return file_download_event_count, page_view_active_user


class Analytics(Base, CRUD["analytics"]):
    """
    Platform analytics snapshot model.

    Stores periodic snapshots of platform usage metrics fetched from
    Google Analytics and internal database statistics.

    Attributes:
        id: Primary key identifier
        file_download_count: Total file downloads from GA
        unique_active_users: Unique active users from GA
        user_count: Total registered users from database
        timestamp: Snapshot timestamp
    """

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
        """
        Get the most recent analytics snapshot.

        Args:
            session: Active database session

        Returns:
            Analytics: Latest analytics record

        Raises:
            AppError.RESOURCES_NOT_FOUND_ERROR: If no analytics data exists
        """
        stmt = select(cls).order_by(cls.timestamp.desc()).limit(1)
        result = await session.execute(stmt)
        instance = result.scalar()

        if instance is None:
            raise AppError.RESOURCES_NOT_FOUND_ERROR
        return instance

    @classmethod
    async def fetch_google_analytics_async(cls, session: AsyncSession) -> None:
        """
        Fetch and store latest analytics from Google Analytics.

        Retrieves metrics from GA API and combines with database statistics
        to create a new analytics snapshot. Typically run as a scheduled task.

        Args:
            session: Active database session
        """
        logger.info("Starting Google Analytics fetch")

        try:
            starting_date = "2023-06-14"
            ending_date = "today"

            credentials_json = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON", "")
            if credentials_json:
                credentials_info = json.loads(base64.b64decode(credentials_json))
                client = BetaAnalyticsDataClient.from_service_account_info(credentials_info)
            else:
                logger.warning("No GOOGLE_APPLICATION_CREDENTIALS_JSON found, using default credentials")
                client = BetaAnalyticsDataClient()

            property_id = os.getenv("GOOGLE_APPLICATION_PROPERTY_ID", "")
            if not property_id:
                logger.error("GOOGLE_APPLICATION_PROPERTY_ID not set")
                raise ValueError("GOOGLE_APPLICATION_PROPERTY_ID environment variable is required")

            request_api = RunReportRequest(
                property=f"properties/{property_id}",
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
                "file_download_count": file_download_event_count,
                "unique_active_users": page_view_active_user,
                "user_count": user_count,
                "timestamp": now,
            }
            await Analytics.create(session=session, data=data)

            logger.info(
                "Google Analytics fetch completed: downloads=%d, active_users=%d, user_count=%d",
                file_download_event_count,
                page_view_active_user,
                user_count,
            )
        except Exception as e:
            logger.exception("Failed to fetch Google Analytics data: %s", str(e))
            raise
