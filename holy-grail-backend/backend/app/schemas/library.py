from app.schemas.base import CustomBaseModel as BaseModel
from typing import Optional
from datetime import datetime
from app.schemas.categories import DocumentTypeSchema, CategorySchema, SubjectSchema
from app.schemas.auth import UploaderSchema


class NoteCreateSchema(BaseModel):
    category: int
    subject: int
    type: int


class NoteUpdateSchema(BaseModel):
    category: Optional[int]
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
