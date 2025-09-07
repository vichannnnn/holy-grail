"""
Database base module exports.

This module re-exports the SQLAlchemy declarative base for use
throughout the application.
"""
from app.db.base_class import Base

__all__ = ["Base"]
