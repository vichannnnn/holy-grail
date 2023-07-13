from typing import TypeVar, Generic, Optional

from sqlalchemy import update, delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import declared_attr
from sqlalchemy.orm.decl_api import DeclarativeMeta
from sqlalchemy import exc as SQLAlchemyExceptions, and_

from app.db.base_class import Base
from app.exceptions import AppError

ModelType = TypeVar("ModelType")


class CRUD(Generic[ModelType]):
    @declared_attr
    def __tablename__(self) -> str:
        return self.__class__.__name__.lower()

    @classmethod
    async def create(
        cls: DeclarativeMeta, session: AsyncSession, data: dict
    ) -> ModelType:
        try:
            obj = cls(**data)
            session.add(obj)
            await session.commit()

        except SQLAlchemyExceptions.IntegrityError:
            await session.rollback()
            raise SQLAlchemyExceptions.IntegrityError

        return obj

    @classmethod
    async def get(cls: Base, session: AsyncSession, id: int) -> ModelType:
        stmt = select(cls).where(cls.id == id)
        result = await session.execute(stmt)
        instance = result.scalar()

        if instance is None:
            raise AppError.GENERIC_ITEM_NOT_FOUND_ERROR
        return instance

    @classmethod
    async def update(
        cls: Base, session: AsyncSession, id: int, data: dict
    ) -> ModelType:
        stmt = update(cls).returning(cls).where(cls.id == id).values(**data)
        res = await session.execute(stmt)
        await session.commit()
        res_fetchone = res.fetchone()
        return res_fetchone[0]

    @classmethod
    async def delete(cls: Base, session: AsyncSession, id: int) -> ModelType:
        stmt = delete(cls).where(cls.id == id)
        fetch_stmt = select(cls).where(cls.id == id)

        res = await session.execute(fetch_stmt)
        await session.execute(stmt)
        res_scalar = res.scalar()
        await session.commit()
        return res_scalar

    @classmethod
    async def get_all(cls: Base, session: AsyncSession, filter_: Optional[dict] = None):
        stmt = select(cls)
        if filter_:
            conditions = [getattr(cls, key) == value for key, value in filter_.items()]
            stmt = stmt.where(and_(*conditions))
        result = await session.execute(stmt)
        return result.scalars().all()
