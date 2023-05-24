from os import environ

from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = environ["DATABASE_URL"]
engine = create_async_engine(DATABASE_URL, future=True)
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

sync_engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=sync_engine)
