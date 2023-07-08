from typing import TypeVar, Generic

from sqlalchemy import update, delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import declared_attr
from sqlalchemy.orm.decl_api import DeclarativeMeta
from sqlalchemy import exc as SQLAlchemyExceptions

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

        except SQLAlchemyExceptions.IntegrityError as exc:
            await session.rollback()
            raise AppError.CATEGORY_ALREADY_EXISTS_ERROR from exc

        return obj

    @classmethod
    async def get(cls: Base, session: AsyncSession, id: int) -> ModelType:
        stmt = select(cls).where(cls.id == id)
        result = await session.execute(stmt)
        return result.scalar()

    @classmethod
    async def update(
        cls: Base, session: AsyncSession, id: int, data: dict
    ) -> ModelType:
        stmt = update(cls).returning(cls).where(cls.id == id).values(**data)
        res = await session.execute(stmt)
        await session.commit()
        updated_object = res.fetchone()
        return updated_object[0]

    @classmethod
    async def delete(cls: Base, session: AsyncSession, id: int) -> ModelType:
        stmt = delete(cls).where(cls.id == id)
        fetch_stmt = select(cls).where(cls.id == id)

        res = await session.execute(fetch_stmt)
        await session.execute(stmt)
        deleted_note = res.scalar()
        await session.commit()
        return deleted_note

    @classmethod
    async def get_all(cls: Base, session: AsyncSession):
        stmt = select(cls)
        result = await session.execute(stmt)
        return result.scalars().all()
