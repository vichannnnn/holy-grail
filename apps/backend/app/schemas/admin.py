"""
Admin schemas for administrative operations.

This module defines Pydantic models for admin-specific operations
such as user role management.
"""
from app.schemas.auth import RoleEnum
from app.schemas.base import CustomBaseModel as BaseModel


class UpdateRoleSchema(BaseModel):
    """
    Schema for updating user roles.
    
    Used by developers to modify user access levels.
    """
    user_id: int
    role: RoleEnum
