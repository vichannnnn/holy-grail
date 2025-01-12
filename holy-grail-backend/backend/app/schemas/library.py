from datetime import datetime
from typing import Any, Optional

from pydantic import constr

from app.schemas.auth import UploaderSchema
from app.schemas.base import CustomBaseModel as BaseModel
from app.schemas.categories import CategorySchema, DocumentTypeSchema, SubjectSchema

DocumentNameStr = constr(min_length=1, max_length=100)


class NoteCreateSchema(BaseModel):
    file: Any
    category: int
    subject: int
    type: int
    year: Optional[int] = None
    document_name: DocumentNameStr


class NoteInsertSchema(BaseModel):
    category: int
    subject: int
    type: int
    year: Optional[int] = None
    document_name: str
    uploaded_by: int
    file_name: str
    extension: str


class NoteUpdateSchema(BaseModel):
    category: Optional[int] = None
    document_name: Optional[DocumentNameStr] = None
    subject: Optional[int] = None
    type: Optional[int] = None
    year: Optional[int] = None
    uploaded_by: Optional[int] = None
    extension: Optional[str] = None


class NoteSchema(BaseModel):
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
    uploaded_by: int
    upload_count: int
