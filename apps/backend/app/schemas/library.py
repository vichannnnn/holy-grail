"""
Library schemas for educational resource management.

This module defines Pydantic models for creating, updating, and retrieving
educational documents including validation for document metadata and
file upload handling.
"""
from datetime import datetime
from typing import Any, Optional

from pydantic import constr

from app.schemas.auth import UploaderSchema
from app.schemas.base import CustomBaseModel as BaseModel
from app.schemas.categories import CategorySchema, DocumentTypeSchema, SubjectSchema

DocumentNameStr = constr(min_length=1, max_length=100)


class NoteCreateSchema(BaseModel):
    """
    Schema for creating educational documents.

    Validates file upload and metadata for new documents.
    """

    file: Any
    category: int
    subject: int
    type: int
    year: Optional[int] = None
    document_name: DocumentNameStr


class NoteInsertSchema(BaseModel):
    """
    Internal schema for database insertion.

    Contains processed file information ready for storage.
    """

    category: int
    subject: int
    type: int
    year: Optional[int] = None
    document_name: str
    uploaded_by: int
    file_name: str
    extension: str


class NoteUpdateSchema(BaseModel):
    """
    Schema for updating document metadata.

    All fields are optional for partial updates.
    """

    category: Optional[int] = None
    document_name: Optional[DocumentNameStr] = None
    subject: Optional[int] = None
    type: Optional[int] = None
    year: Optional[int] = None
    uploaded_by: Optional[int] = None
    extension: Optional[str] = None


class NoteSchema(BaseModel):
    """
    Complete document schema with relationships.

    Includes all metadata and related category information
    for display and API responses.
    """

    id: int
    category: int
    subject: int
    type: int
    year: Optional[int] = None
    document_name: str
    file_name: str
    uploaded_by: int
    view_count: int
    uploaded_on: datetime
    approved: bool
    doc_type: DocumentTypeSchema
    doc_category: CategorySchema
    doc_subject: SubjectSchema
    account: UploaderSchema
    extension: str


class UserUploadCount(BaseModel):
    """
    Schema for user upload statistics.

    Used for scoreboard and analytics.
    """

    uploaded_by: int
    upload_count: int


class SearchResultSchema(BaseModel):
    """
    Schema for OpenSearch result items.

    Includes relevance score and optional highlights.
    """

    id: int
    document_name: str
    category: str
    subject: str
    doc_type: str
    year: Optional[int] = None
    uploaded_by: str
    uploaded_on: datetime
    score: float
    highlights: Optional[dict[str, list[str]]] = None


class SearchResponseSchema(BaseModel):
    """
    Schema for paginated search results from OpenSearch.

    Includes facets for filtering UI.
    """

    items: list[SearchResultSchema]
    total: int
    page: int
    pages: int
    size: int
    facets: Optional[dict[str, list[dict[str, Any]]]] = None


class SearchIndexStatsSchema(BaseModel):
    """
    Schema for search index statistics.
    """

    available: bool
    exists: bool = False
    doc_count: int = 0
    size_mb: float = 0.0


class SearchNoteSchema(BaseModel):
    """
    Schema for notes returned directly from OpenSearch.

    Matches NoteSchema structure but built from indexed data.
    """

    id: int
    category: int
    subject: int
    type: int
    year: Optional[int] = None
    document_name: str
    file_name: str
    uploaded_by: int
    view_count: int
    uploaded_on: datetime
    approved: bool
    doc_type: DocumentTypeSchema
    doc_category: CategorySchema
    doc_subject: SubjectSchema
    account: UploaderSchema
    extension: str
    score: Optional[float] = None
    highlights: Optional[dict[str, list[str]]] = None
