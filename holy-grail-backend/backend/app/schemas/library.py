from datetime import datetime
from typing import Optional

from pydantic import constr

from app.schemas.auth import UploaderSchema
from app.schemas.base import CustomBaseModel as BaseModel
from app.schemas.categories import DocumentTypeSchema, CategorySchema, SubjectSchema

DocumentNameStr = constr(min_length=1, max_length=100)


class NoteCreateSchema(BaseModel):
    category: int
    subject: int
    type: int
    document_name: DocumentNameStr


class NoteInsertSchema(NoteCreateSchema):
    uploaded_by: int
    file_name: str


class NoteUpdateSchema(BaseModel):
    category: Optional[int]
    document_name: Optional[DocumentNameStr]
    subject: Optional[int]
    type: Optional[int]
    uploaded_by: Optional[int]


class NoteSchema(NoteCreateSchema):
    id: int
    file_name: str
    uploaded_by: int
    view_count: int
    uploaded_on: datetime
    approved: bool
    doc_type: DocumentTypeSchema
    doc_category: CategorySchema
    doc_subject: SubjectSchema
    account: UploaderSchema
