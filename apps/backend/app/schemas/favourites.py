from app.schemas.base import CustomBaseModel as BaseModel

class FavouritesSchema(BaseModel):
    id: int
    user_id: int
    file_id: int

class AddFavouritesSchema(BaseModel):
    file_id: int

class RemoveFavouritesSchema(BaseModel):
    file_id: int