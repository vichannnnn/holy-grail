"""
SQLAlchemy declarative base class.

This module defines the base class for all SQLAlchemy models
in the application.
"""
from typing import Any

from sqlalchemy.orm import as_declarative


@as_declarative()
class Base:
    """
    Base class for all database models.

    All model classes should inherit from this base class to gain
    SQLAlchemy ORM functionality. Table names must be explicitly
    defined in each model.
    """

    id: Any
    __name__: str

    # Generate __tablename__ automatically
    # @declared_attr
    # def __tablename__(cls) -> str:
    #     return cls.__name__.lower()
