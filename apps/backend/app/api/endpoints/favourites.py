from typing import List

from fastapi import APIRouter

from app.models.favourites import UserFavourites
from app.schemas.favourites import FavouritesSchema, AddFavouritesSchema, RemoveFavouritesSchema

from app.api.deps import CurrentSession, SessionUser

router = APIRouter()

@router.post("/add", response_model=FavouritesSchema)
async def add_favourite(session: CurrentSession, data: AddFavouritesSchema, current_user: SessionUser) -> FavouritesSchema:
    """
    Create a favourite association between the current user and the specified file.
    
    Parameters:
        data (AddFavouritesSchema): Input containing the `file_id` to be favourited.
    
    Returns:
        FavouritesSchema: The created favourite record for the current user and file.
    """
    user_id = current_user.user_id
    full_data = {
        "user_id": user_id,
        "file_id": data.file_id,
    }
    data = await UserFavourites.add_favourite(session, full_data)
    return data

@router.post("/remove", status_code=204)
async def remove_favourite(session: CurrentSession, data: RemoveFavouritesSchema, current_user: SessionUser):
    """
    Remove the specified file from the current user's favourites.
    
    Parameters:
        data (RemoveFavouritesSchema): Object containing the `file_id` of the favourite to remove.
    """
    user_id = current_user.user_id
    full_data = {
        "user_id": user_id,
        "file_id": data.file_id,
    }
    await UserFavourites.remove_favourite(session, full_data)
    return None

@router.get("/", response_model=List[FavouritesSchema])
async def get_favourites(session: CurrentSession, current_user: SessionUser) -> list[FavouritesSchema]:
    """
    Retrieve the authenticated user's favourite items.
    
    Parameters:
        current_user (SessionUser): Authenticated user whose `user_id` is used to filter favourites.
    
    Returns:
        list[FavouritesSchema]: List of favourite records belonging to the user.
    """
    user_id = current_user.user_id
    data = {
        "user_id": user_id,
    }
    result = await UserFavourites.get_favourites(session, data)
    return result