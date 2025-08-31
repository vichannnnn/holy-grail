import os

from pydantic import PostgresDsn
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

from app.utils.flags import TESTING_FLAG

SQLALCHEMY_DATABASE_URL = PostgresDsn.build(
    scheme="postgresql+asyncpg",
    username=os.environ["POSTGRES_USER"] if not TESTING_FLAG else "postgres",
    password=os.environ["POSTGRES_PASSWORD"] if not TESTING_FLAG else "postgres",
    host=os.getenv("POSTGRES_HOST", "db"),
    port=5432,
    path=os.environ["POSTGRES_DB"] if not TESTING_FLAG else "",
)

engine = create_async_engine(
    str(SQLALCHEMY_DATABASE_URL),
    future=True,
    poolclass=NullPool if TESTING_FLAG else None,
)
async_session = async_sessionmaker(
    bind=engine, expire_on_commit=False, autoflush=False, class_=AsyncSession
)

sync_engine = create_engine(str(SQLALCHEMY_DATABASE_URL), pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=sync_engine)
