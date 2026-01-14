"""
Database connection and session management.

This module configures both async and sync database engines and
session factories for the application. Uses connection pooling
appropriate for the deployment environment.
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

from app.core import Environment, settings

# Async engine for main application use
engine = create_async_engine(
    settings.database_url,
    future=True,
    poolclass=NullPool if settings.environment == Environment.LOCAL else None,
)
async_session = async_sessionmaker(
    bind=engine, expire_on_commit=False, autoflush=False, class_=AsyncSession
)

# Sync engine for migrations and admin operations
sync_engine = create_engine(settings.sync_database_url, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=sync_engine)
