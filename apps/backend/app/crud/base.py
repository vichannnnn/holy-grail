"""
Base CRUD operations for database models.

This module provides a generic CRUD mixin class that can be inherited
by SQLAlchemy models to gain common database operations like create,
read, update, and delete.
"""
from collections.abc import Sequence
from typing import Any, Generic, Optional, TypeVar

from sqlalchemy import and_, asc, delete, exc as SQLAlchemyExceptions, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Load, declared_attr

from app.db.base_class import Base
from app.utils.exceptions import AppError

ModelType = TypeVar("ModelType", bound=Base)


class CRUD(Generic[ModelType]):
    """
    Generic CRUD mixin for SQLAlchemy models.

    Provides async methods for common database operations with
    proper error handling and automatic session management.
    Models should inherit from this class to gain CRUD functionality.
    """

    @declared_attr  # type: ignore
    def __tablename__(self) -> str:
        return self.__class__.__name__.lower()

    @classmethod
    async def create(  # type: ignore
        cls: type[ModelType], session: AsyncSession, data: dict[str, Any]
    ) -> ModelType:
        """
        Create a new record in the database.

        Args:
            session: Async database session.
            data: Dictionary of field values for the new record.

        Returns:
            ModelType: The created model instance.

        Raises:
            AppError: On integrity constraint violations.
        """
        try:
            obj = cls(**data)
            session.add(obj)

        except SQLAlchemyExceptions.IntegrityError as exc:
            await session.rollback()
            if str(exc).find("ForeignKeyViolationError") != -1:
                raise AppError.RESOURCES_NOT_FOUND_ERROR from exc
            elif str(exc).find("UniqueViolationError") != -1:
                raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc
        await session.commit()
        return obj

    @classmethod
    async def get(
        cls: type[ModelType],  # type: ignore
        session: AsyncSession,
        id: int,  # pylint: disable=W0622
    ) -> ModelType:
        """
        Get a single record by ID.

        Args:
            session: Async database session.
            id: Primary key of the record.

        Returns:
            ModelType: The found model instance.

        Raises:
            AppError: If record not found.
        """
        stmt = select(cls).where(cls.id == id)
        result = await session.execute(stmt)
        instance = result.scalar()

        if instance is None:
            raise AppError.RESOURCES_NOT_FOUND_ERROR
        return instance

    @classmethod
    async def update(  # type: ignore
        cls: type[ModelType],
        session: AsyncSession,
        id: int,  # pylint: disable=W0622
        data: dict[str, Any],
    ) -> ModelType:
        """
        Update an existing record.

        Args:
            session: Async database session.
            id: Primary key of the record.
            data: Dictionary of fields to update.

        Returns:
            ModelType: The updated model instance.

        Raises:
            AppError: If record not found or constraint violation.
        """
        stmt = update(cls).returning(cls).where(cls.id == id).values(**data)
        try:
            res = await session.execute(stmt)

        except SQLAlchemyExceptions.IntegrityError as exc:
            await session.rollback()
            if str(exc).find("ForeignKeyViolationError") != -1:
                raise AppError.RESOURCES_NOT_FOUND_ERROR from exc
            elif str(exc).find("UniqueViolationError") != -1:
                raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc

        updated_instance = res.scalar()

        if updated_instance is None:
            await session.rollback()
            raise AppError.RESOURCES_NOT_FOUND_ERROR
        await session.commit()
        return updated_instance

    @classmethod
    async def upsert(  # type: ignore
        cls: type[ModelType],
        session: AsyncSession,
        id: int,  # pylint: disable=W0622
        data: dict[str, Any],
    ) -> ModelType:
        """
        Update or insert a record.

        Attempts to update an existing record, creates a new one if not found.

        Args:
            session: Async database session.
            id: Primary key of the record.
            data: Dictionary of field values.

        Returns:
            ModelType: The updated or created model instance.
        """
        stmt = update(cls).returning(cls).where(cls.id == id).values(**data)

        res = await session.execute(stmt)
        instance = res.scalar()

        if instance is None:
            await session.rollback()
            data["id"] = id
            instance = await cls.create(session, data)

        else:
            await session.commit()
        return instance

    @classmethod
    async def delete(  # type: ignore
        cls: type[ModelType],
        session: AsyncSession,
        id: int,  # pylint: disable=W0622
    ) -> bool:
        """
        Delete a record by ID.

        Args:
            session: Async database session.
            id: Primary key of the record to delete.

        Returns:
            bool: True if successfully deleted.

        Raises:
            AppError: If record not found.
        """
        stmt = delete(cls).returning(cls).where(cls.id == id)
        res = await session.execute(stmt)
        deleted_instance = res.scalar()

        if not deleted_instance:
            await session.rollback()
            raise AppError.RESOURCES_NOT_FOUND_ERROR
        await session.commit()
        return True

    @classmethod
    async def get_all(  # type: ignore
        cls: type[ModelType],
        session: AsyncSession,
        filter_: dict[str, Any] | None = None,
        options: list[Load] = None,
    ) -> Sequence[ModelType]:
        """
        Get all records with optional filtering.

        Args:
            session: Async database session.
            filter_: Dictionary of field=value pairs to filter by.
            options: SQLAlchemy load options for eager loading.

        Returns:
            Sequence[ModelType]: List of matching model instances.
        """
        stmt = select(cls)
        if filter_:
            conditions = [getattr(cls, key) == value for key, value in filter_.items()]
            stmt = stmt.where(and_(*conditions))

        if options:
            stmt = stmt.options(*options)

        stmt = stmt.order_by(asc(cls.id))

        result = await session.execute(stmt)
        return result.scalars().all()
