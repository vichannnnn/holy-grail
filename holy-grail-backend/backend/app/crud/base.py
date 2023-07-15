from typing import TypeVar, Generic, Optional, Sequence, Type, Dict, Any
from fastapi import Response as FastAPIResponse
from sqlalchemy import update, delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import declared_attr
from sqlalchemy import exc as SQLAlchemyExceptions, and_

from app.db.base_class import Base
from app.utils.exceptions import AppError

ModelType = TypeVar("ModelType", bound=Base)


class CRUD(Generic[ModelType]):
    @declared_attr  # type: ignore
    def __tablename__(self) -> str:
        return self.__class__.__name__.lower()

    @classmethod
    async def create(  # type: ignore
        cls: Type[ModelType], session: AsyncSession, data: Dict[str, Any]
    ) -> ModelType:
        try:
            obj = cls(**data)
            session.add(obj)
            await session.commit()

        except SQLAlchemyExceptions.IntegrityError as exc:
            await session.rollback()
            if str(exc).find("ForeignKeyViolationError") != -1:
                raise AppError.RESOURCES_NOT_FOUND_ERROR
            elif str(exc).find("UniqueViolationError") != -1:
                raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc
            raise AppError.RESOURCES_ALREADY_EXISTS_ERROR from exc
        return obj

    @classmethod
    async def get(cls: Type[ModelType], session: AsyncSession, id: int) -> ModelType:  # type: ignore
        stmt = select(cls).where(cls.id == id)
        result = await session.execute(stmt)
        instance = result.scalar()

        if instance is None:
            raise AppError.RESOURCES_NOT_FOUND_ERROR
        return instance

    @classmethod
    async def update(  # type: ignore
        cls: Type[ModelType], session: AsyncSession, id: int, data: Dict[str, Any]
    ) -> ModelType:
        stmt = update(cls).returning(cls).where(cls.id == id).values(**data)
        res = await session.execute(stmt)
        await session.commit()
        updated_instance = res.scalar()

        if updated_instance is None:
            await session.rollback()
            raise AppError.RESOURCES_NOT_FOUND_ERROR
        return updated_instance

    @classmethod
    async def delete(  # type: ignore
        cls: Type[ModelType], session: AsyncSession, id: int
    ) -> FastAPIResponse:
        stmt = delete(cls).returning(cls).where(cls.id == id)
        res = await session.execute(stmt)
        await session.commit()
        deleted_instance = res.scalar()

        if not deleted_instance:
            await session.rollback()
            raise AppError.RESOURCES_NOT_FOUND_ERROR
        return FastAPIResponse(status_code=204)

    @classmethod
    async def get_all(  # type: ignore
        cls: Type[ModelType],
        session: AsyncSession,
        filter_: Optional[Dict[str, Any]] = None,
    ) -> Sequence[ModelType]:
        stmt = select(cls)
        if filter_:
            conditions = [getattr(cls, key) == value for key, value in filter_.items()]
            stmt = stmt.where(and_(*conditions))
        result = await session.execute(stmt)
        return result.scalars().all()
