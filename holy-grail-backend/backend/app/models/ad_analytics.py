import datetime

from sqlalchemy import insert, select, update, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.exc import SQLAlchemyError

from app.crud.base import CRUD, ModelType
from app.db.base_class import Base
from app.db.database import AsyncSession
from app.utils.exceptions import AppError


class AdAnalytics(Base, CRUD["ad_analytics"]):
    __tablename__ = "ad_analytics"

    timestamp: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        index=True,
        primary_key=True,
    )
    views: Mapped[int] = mapped_column(nullable=False)
    clicks: Mapped[int] = mapped_column(nullable=False)

    @classmethod
    async def new_day(cls, session: AsyncSession):
        stmt = insert(cls).values(timestamp=datetime.datetime.now(), views=0, clicks=0)
        await session.execute(stmt)
        await session.commit()

    @classmethod
    async def ad_click(cls, session: AsyncSession):
        # update most recent row with new click
        stmt = (
            update(cls)
            .where(cls.timestamp == select(func.max(cls.timestamp)).scalar_subquery())
            .values(clicks=cls.clicks + 1)
        )
        try:
            await session.execute(stmt)
        except SQLAlchemyError:
            await session.rollback()
            raise AppError.RESOURCES_NOT_FOUND_ERROR

        await session.commit()
        return

    @classmethod
    async def ad_view(cls, session: AsyncSession):
        # update most recent row with new view
        stmt = (
            update(cls)
            .where(cls.timestamp == select(func.max(cls.timestamp)).scalar_subquery())
            .values(views=cls.views + 1)
        )
        try:
            await session.execute(stmt)
        except SQLAlchemyError:
            await session.rollback()
            raise AppError.RESOURCES_NOT_FOUND_ERROR

        await session.commit()
        return

    @classmethod
    async def get_latest_ad_analytics(cls, session: AsyncSession) -> ModelType:
        stmt = select(cls).order_by(cls.timestamp.desc()).limit(1)
        result = await session.execute(stmt)
        instance = result.scalar()

        if instance is None:
            raise AppError.RESOURCES_NOT_FOUND_ERROR
        return instance
