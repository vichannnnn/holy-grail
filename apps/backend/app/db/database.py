from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

from app.core import Environment, settings

engine = create_async_engine(
    settings.database_url,
    future=True,
    poolclass=NullPool if settings.environment == Environment.LOCAL else None,
)
async_session = async_sessionmaker(
    bind=engine, expire_on_commit=False, autoflush=False, class_=AsyncSession
)

sync_engine = create_engine(settings.sync_database_url, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=sync_engine)
