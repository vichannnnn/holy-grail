from os import environ
from pydantic import PostgresDsn

from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

DATABASE_URL = environ["DATABASE_URL"]
TESTING = environ.get("TESTING")

SQLALCHEMY_DATABASE_URL = PostgresDsn.build(
    scheme="postgresql+asyncpg",
    user=environ["POSTGRES_USER"] if not TESTING else "postgres",
    password=environ["POSTGRES_PASSWORD"] if not TESTING else "postgres",
    host=environ["POSTGRES_HOST"],
    port="5432",
    path="/" + environ["POSTGRES_DB"] if not TESTING else "/test",
)


engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL, future=True, poolclass=NullPool if TESTING else None
)
async_session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

sync_engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=sync_engine)
