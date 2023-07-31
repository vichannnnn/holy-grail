from typing import TYPE_CHECKING, List

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, ForeignKey, select, UniqueConstraint
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import exc as SQLAlchemyExceptions

from app.crud.base import CRUD
from app.db.base_class import Base
from app.utils.exceptions import AppError

if TYPE_CHECKING:
    from app.models.library import Library


class CategoryLevel(Base, CRUD["category_level"]):
    __tablename__ = "category_level"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    name: Mapped[str] = mapped_column(nullable=False, unique=True)
    documents: Mapped["Library"] = relationship(
        back_populates="doc_category", uselist=True
    )
    subjects: Mapped[List["Subjects"]] = relationship(
        "Subjects", back_populates="category", cascade="all, delete-orphan"
    )

    @classmethod
    async def create(cls, session: AsyncSession, data: dict) -> "DocumentTypes":
        stmt = select(cls).where(cls.name == data["name"])
        result = await session.execute(stmt)
        category = result.scalar()

        if category:
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR
        return await super().create(session, data)


class Subjects(Base, CRUD["subjects"]):
    __tablename__ = "subjects"
    __table_args__ = (
        UniqueConstraint("name", "category_id", name="category_level_name_unique"),
    )

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    name: Mapped[str] = mapped_column(nullable=False)
    documents: Mapped["Library"] = relationship(
        back_populates="doc_subject", uselist=True
    )
    category_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("category_level.id"), nullable=False, index=True
    )
    category: Mapped[CategoryLevel] = relationship(
        "CategoryLevel", back_populates="subjects"
    )

    @classmethod
    async def create(cls, session: AsyncSession, data: dict) -> "Subjects":
        try:
            res = await super().create(session, data)
            await session.refresh(res, ["category"])
            return res

        except SQLAlchemyExceptions.IntegrityError as exc:
            await session.rollback()
            if str(exc).find("ForeignKeyViolationError") != -1:
                raise AppError.RESOURCES_NOT_FOUND_ERROR
            elif str(exc).find("UniqueViolationError") != -1:
                raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc

    @classmethod
    async def update(
        cls, session: AsyncSession, id: int, data: dict  # pylint: disable=W0622, C0103
    ) -> "Subjects":
        try:
            res = await super().update(session, id, data)
            await session.refresh(res, ["category"])
            return res

        except SQLAlchemyExceptions.IntegrityError as exc:
            await session.rollback()
            if str(exc).find("ForeignKeyViolationError") != -1:
                raise AppError.RESOURCES_NOT_FOUND_ERROR
            elif str(exc).find("UniqueViolationError") != -1:
                raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc


class DocumentTypes(Base, CRUD["documents"]):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    name: Mapped[str] = mapped_column(nullable=False, unique=True)
    documents: Mapped["Library"] = relationship(back_populates="doc_type", uselist=True)

    @classmethod
    async def create(cls, session: AsyncSession, data: dict) -> "DocumentTypes":
        stmt = select(cls).where(cls.name == data["name"])
        result = await session.execute(stmt)
        document_type = result.scalar()

        if document_type:
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR
        return await super().create(session, data)
