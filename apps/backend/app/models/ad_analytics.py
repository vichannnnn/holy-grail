"""
Advertisement analytics model for tracking ad performance.

This module tracks daily advertisement impressions and clicks to measure
ad effectiveness and user engagement with promotional content.
"""
import datetime

import pytz
from fastapi import Response as FastAPIResponse
from sqlalchemy import Date, exc as SQLAlchemyExceptions, func, update
from sqlalchemy.orm import Mapped, mapped_column

from app.crud.base import CRUD
from app.db.base_class import Base
from app.db.database import AsyncSession


class AdAnalytics(Base, CRUD["ad_analytics"]):
    """
    Daily advertisement performance metrics.
    
    Tracks advertisement views and clicks on a daily basis using
    Singapore timezone for consistent reporting.
    
    Attributes:
        date: Date of the metrics (primary key)
        views: Number of ad impressions for the day
        clicks: Number of ad clicks for the day
    """
    __tablename__ = "ad_analytics"

    date: Mapped[datetime.date] = mapped_column(
        Date(),
        nullable=False,
        server_default=func.now(),
        index=True,
        primary_key=True,
    )
    views: Mapped[int] = mapped_column(nullable=False)
    clicks: Mapped[int] = mapped_column(nullable=False)

    @classmethod
    async def ad_click(cls, session: AsyncSession) -> None:
        """
        Record an advertisement click event.
        
        Increments the click counter for today or creates a new record
        if this is the first event of the day.
        
        Args:
            session: Active database session
        """
        today_date = datetime.datetime.now(pytz.timezone("Asia/Singapore")).date()
        try:
            await super().create(
                session,
                {
                    "date": today_date,
                    "views": 0,
                    "clicks": 1,
                },
            )

        except SQLAlchemyExceptions.IntegrityError:
            await session.rollback()
            stmt = update(cls).where(cls.date == today_date).values(clicks=cls.clicks + 1)
            await session.execute(stmt)

        await session.commit()

    @classmethod
    async def ad_view(cls, session: AsyncSession) -> None:
        """
        Record an advertisement view/impression event.
        
        Increments the view counter for today or creates a new record
        if this is the first event of the day.
        
        Args:
            session: Active database session
        """
        today_date = datetime.datetime.now(pytz.timezone("Asia/Singapore")).date()
        try:
            await super().create(
                session,
                {
                    "date": today_date,
                    "views": 1,
                    "clicks": 0,
                },
            )

        except SQLAlchemyExceptions.IntegrityError:
            await session.rollback()
            stmt = update(cls).where(cls.date == today_date).values(views=cls.views + 1)
            await session.execute(stmt)

        await session.commit()
