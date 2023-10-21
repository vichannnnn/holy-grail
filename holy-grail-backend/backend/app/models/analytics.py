from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column

from app.crud.base import CRUD
from app.db.base_class import Base


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
