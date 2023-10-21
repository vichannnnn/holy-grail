from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Mapped, mapped_column

from app.crud.base import CRUD, ModelType
from app.db.base_class import Base
from app.db.database import AsyncSession
from app.utils.exceptions import AppError


class Analytics(Base, CRUD["analytics"]):
    __tablename__ = "analytics"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    file_download_count: Mapped[int] = mapped_column(nullable=False)
    unique_active_users: Mapped[int] = mapped_column(nullable=False)
    user_count: Mapped[int] = mapped_column(nullable=False)
    timestamp: Mapped[datetime] = mapped_column(
        nullable=False, default=datetime.utcnow()
    )

    @classmethod
    async def get_latest_analytics(cls, session: AsyncSession) -> ModelType:
        stmt = select(cls).order_by(cls.timestamp.desc()).limit(1)
        result = await session.execute(stmt)
        instance = result.scalar()

        if instance is None:
            raise AppError.RESOURCES_NOT_FOUND_ERROR
        return instance
