from typing import Optional

from app.schemas.base import CustomBaseModel as BaseModel


class SubjectCreateSchema(BaseModel):
    name: str
    category_id: int


class CategoryCreateSchema(BaseModel):
    name: str


class DocumentTypeCreateSchema(BaseModel):
    name: str


class CategorySchema(CategoryCreateSchema):
    id: int


class SubjectSchema(BaseModel):
    id: int
    name: str
    category: CategorySchema


class DocumentTypeSchema(DocumentTypeCreateSchema):
    id: int


class SubjectUpdateSchema(SubjectCreateSchema):
    name: Optional[str]


class CategoryUpdateSchema(CategoryCreateSchema):
    name: Optional[str]


class DocumentTypeUpdateSchema(DocumentTypeCreateSchema):
    name: Optional[str]
