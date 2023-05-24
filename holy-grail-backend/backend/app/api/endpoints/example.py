from fastapi import APIRouter

router = APIRouter()


@router.get("/hello")
async def sanity_check():
    return {"Hello": "World!"}
