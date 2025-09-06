from app.schemas.auth import RoleEnum
from app.schemas.base import CustomBaseModel as BaseModel


class UpdateRoleSchema(BaseModel):
    user_id: int
    role: RoleEnum
