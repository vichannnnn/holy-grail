from app.schemas.base import CustomBaseModel as BaseModel


class SubjectSchema(BaseModel):
    id: int
    name: str


class CategorySchema(BaseModel):
    id: int
    name: str


class DocumentTypeSchema(BaseModel):
    id: int
    name: str
