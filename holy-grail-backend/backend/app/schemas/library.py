from datetime import datetime
from typing import Optional, Any

from pydantic import constr, validator
from app.file_handler import accepted_doc_type_extensions
from app.schemas.auth import UploaderSchema
from app.schemas.base import CustomBaseModel as BaseModel
from app.schemas.categories import DocumentTypeSchema, CategorySchema, SubjectSchema
from app.exceptions import AppError
from starlette.datastructures import UploadFile as StarletteUploadFile


DocumentNameStr = constr(min_length=1, max_length=100)


class NoteCreateSchema(BaseModel):
    file: Any
    category: int
    subject: int
    type: int
    document_name: DocumentNameStr

    @validator("file")
    def validate_file_type(cls, v: StarletteUploadFile):
        if v.content_type not in accepted_doc_type_extensions.keys():
            raise AppError.INVALID_FILE_TYPE_ERROR
        return v


class NoteInsertSchema(BaseModel):
    category: int
    subject: int
    type: int
    document_name: str
    uploaded_by: int
    file_name: str


class NoteUpdateSchema(BaseModel):
    category: Optional[int]
    document_name: Optional[DocumentNameStr]
    subject: Optional[int]
    type: Optional[int]
    uploaded_by: Optional[int]


class NoteSchema(BaseModel):
    id: int
    category: int
    subject: int
    type: int
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
