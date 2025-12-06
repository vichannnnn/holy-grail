from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.crud.base import CRUD
from app.db.base_class import Base
from app.utils.exceptions import AppError

if TYPE_CHECKING:
    from app.models.auth import Account
    from app.models.library import Library


class UserFavourites(Base, CRUD["favourites"]):
    __tablename__ = "user_favourites"
    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    user_id: Mapped[int] = mapped_column(
        ForeignKey("account.user_id"),
        nullable=False,
        index=True,
    )
    file_id: Mapped[int] = mapped_column(
        ForeignKey("library.id"),
        nullable=False,
        index=True,
    )

    user: Mapped["Account"] = relationship("Account", back_populates='favourites')
    library_file: Mapped["Library"] = relationship("Library", back_populates='favourited_by')

    @classmethod
    async def add_favourite(cls, session: AsyncSession, data: dict) -> "UserFavourites":
        stmt = select(cls).where(
            cls.user_id == data["user_id"],
            cls.file_id == data["file_id"],
        )
        result = await session.execute(stmt)
        existing_fav = result.scalar_one_or_none()
        if existing_fav:
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR(
                detail="This file is already in your favourites."
            )
        return await super().create(session, data)

    @classmethod
    async def remove_favourite(cls, session: AsyncSession, data:dict) -> None:
        stmt = delete(cls).where(
            cls.user_id == data["user_id"],
            cls.file_id == data["file_id"],
        ).returning(cls.id)
        result = await session.execute(stmt)
        removed_fav_id = result.scalar_one_or_none()
        if not removed_fav_id:
            raise AppError.RESOURCES_NOT_FOUND_ERROR
        await session.commit()

    @classmethod
    async def get_favourites(cls, session: AsyncSession, data: dict) -> list["UserFavourites"]:
        stmt = select(cls).where(
            cls.user_id == data["user_id"],
        )
        result = await session.execute(stmt)
        favourites = result.scalars().all()
        return favourites