"""
Category schemas for educational content organization.

This module defines Pydantic models for managing education levels,
subjects, and document types used to categorize educational resources.
"""
from typing import Optional

from app.schemas.base import CustomBaseModel as BaseModel


class SubjectCreateSchema(BaseModel):
    """
    Schema for creating a new subject.
    
    Associates a subject with a specific education level/category.
    """
    name: str
    category_id: int


class CategoryCreateSchema(BaseModel):
    """
    Schema for creating a new education level category.
    """
    name: str


class DocumentTypeCreateSchema(BaseModel):
    """
    Schema for creating a new document type.
    """
    name: str


class CategorySchema(CategoryCreateSchema):
    """
    Complete category schema with ID.
    
    Used for API responses.
    """
    id: int


class SubjectSchema(BaseModel):
    """
    Complete subject schema with category relationship.
    
    Includes the associated education level information.
    """
    id: int
    name: str
    category: CategorySchema


class DocumentTypeSchema(DocumentTypeCreateSchema):
    """
    Complete document type schema with ID.
    
    Used for API responses.
    """
    id: int


class SubjectUpdateSchema(SubjectCreateSchema):
    """
    Schema for updating subject information.
    
    All fields are optional for partial updates.
    """
    name: Optional[str] = None


class CategoryUpdateSchema(CategoryCreateSchema):
    """
    Schema for updating category information.
    
    All fields are optional for partial updates.
    """
    name: Optional[str] = None


class DocumentTypeUpdateSchema(DocumentTypeCreateSchema):
    """
    Schema for updating document type information.
    
    All fields are optional for partial updates.
    """
    name: Optional[str] = None
