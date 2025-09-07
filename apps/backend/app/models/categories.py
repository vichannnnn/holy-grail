"""
Category models for organizing educational content.

This module defines models for categorizing educational resources by
education level (O-Level, A-Level, IB), subjects (Math, Physics, etc.),
and document types (Summary Notes, Practice Papers, etc.).
"""
from typing import TYPE_CHECKING, List

from sqlalchemy import ForeignKey, Integer, UniqueConstraint, exc as SQLAlchemyExceptions, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.crud.base import CRUD
from app.db.base_class import Base
from app.utils.exceptions import AppError

if TYPE_CHECKING:
    from app.models.library import Library


class CategoryLevel(Base, CRUD["category_level"]):
    """
    Education level categories (O-Level, A-Level, IB).

    Represents the top-level educational system categorization
    for organizing study materials.

    Attributes:
        id: Primary key identifier
        name: Category name (e.g., 'O-Level', 'A-Level', 'IB')
        documents: Related library documents
        subjects: Subjects available in this education level
    """

    __tablename__ = "category_level"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    name: Mapped[str] = mapped_column(nullable=False, unique=True)
    documents: Mapped["Library"] = relationship(
        "Library", back_populates="doc_category", uselist=True
    )
    subjects: Mapped[List["Subjects"]] = relationship(
        "Subjects", back_populates="category", cascade="all, delete-orphan"
    )

    @classmethod
    async def create(cls, session: AsyncSession, data: dict) -> "CategoryLevel":
        """
        Create a new category level with duplicate checking.

        Args:
            session: Active database session
            data: Category data including name

        Returns:
            CategoryLevel: Created category instance

        Raises:
            AppError.RESOURCES_ALREADY_EXISTS_ERROR: If category name exists
        """
        stmt = select(cls).where(cls.name == data["name"])
        result = await session.execute(stmt)
        category = result.scalar()

        if category:
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR
        return await super().create(session, data)


class Subjects(Base, CRUD["subjects"]):
    """
    Subject areas within education levels.

    Represents academic subjects (Math, Physics, Chemistry, etc.)
    specific to each education level.

    Attributes:
        id: Primary key identifier
        name: Subject name
        category_id: Associated education level
        documents: Related library documents for this subject
        category: Parent education level
    """

    __tablename__ = "subjects"
    __table_args__ = (
        UniqueConstraint("name", "category_id", name="category_level_name_unique"),
        UniqueConstraint("id", "category_id", name="subject_id_category_id_unique"),
    )

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    name: Mapped[str] = mapped_column(nullable=False)
    category_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("category_level.id"), nullable=False, index=True
    )
    documents: Mapped["Library"] = relationship(
        "Library",
        back_populates="doc_subject",
        uselist=True,
        foreign_keys="Library.subject",
    )
    category: Mapped[CategoryLevel] = relationship(
        "CategoryLevel", back_populates="subjects", uselist=False
    )

    @classmethod
    async def create(cls, session: AsyncSession, data: dict) -> "Subjects":
        """
        Create a new subject with category validation.

        Args:
            session: Active database session
            data: Subject data including name and category_id

        Returns:
            Subjects: Created subject instance with category loaded

        Raises:
            AppError.RESOURCES_NOT_FOUND_ERROR: If category doesn't exist
            AppError.RESOURCES_ALREADY_EXISTS_ERROR: If subject name exists in category
        """
        try:
            res = await super().create(session, data)
            await session.refresh(res, ["category"])
            return res

        except SQLAlchemyExceptions.IntegrityError as exc:
            await session.rollback()
            if str(exc).find("ForeignKeyViolationError") != -1:
                raise AppError.RESOURCES_NOT_FOUND_ERROR from exc
            elif str(exc).find("UniqueViolationError") != -1:
                raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc

    @classmethod
    async def update(
        cls,
        session: AsyncSession,
        id: int,
        data: dict,  # pylint: disable=W0622, C0103
    ) -> "Subjects":
        try:
            res = await super().update(session, id, data)
            await session.refresh(res, ["category"])
            return res

        except SQLAlchemyExceptions.IntegrityError as exc:
            await session.rollback()
            if str(exc).find("ForeignKeyViolationError") != -1:
                raise AppError.RESOURCES_NOT_FOUND_ERROR from exc
            elif str(exc).find("UniqueViolationError") != -1:
                raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc


class DocumentTypes(Base, CRUD["documents"]):
    """
    Types of educational documents.

    Categorizes documents by their purpose (Summary Notes,
    Practice Papers, Past Year Papers, etc.).

    Attributes:
        id: Primary key identifier
        name: Document type name
        documents: Related library documents of this type
    """

    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    name: Mapped[str] = mapped_column(nullable=False, unique=True)
    documents: Mapped["Library"] = relationship(back_populates="doc_type", uselist=True)

    @classmethod
    async def create(cls, session: AsyncSession, data: dict) -> "DocumentTypes":
        """
        Create a new document type with duplicate checking.

        Args:
            session: Active database session
            data: Document type data including name

        Returns:
            DocumentTypes: Created document type instance

        Raises:
            AppError.RESOURCES_ALREADY_EXISTS_ERROR: If document type name exists
        """
        stmt = select(cls).where(cls.name == data["name"])
        result = await session.execute(stmt)
        document_type = result.scalar()

        if document_type:
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR
        return await super().create(session, data)
