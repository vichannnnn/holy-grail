from app.schemas.base import CustomBaseModel as BaseModel
from app.schemas.auth import RoleEnum


class UpdateRoleSchema(BaseModel):
    user_id: int
    role: RoleEnum
