from app.api.endpoints import example, auth, tasks, library, categories, admin
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(example.router, tags=["Example"])
api_router.include_router(library.router, tags=["Library"], prefix="/note")
api_router.include_router(library.notes_router, tags=["Library"], prefix="/notes")
api_router.include_router(categories.router, tags=["Categories"])
api_router.include_router(tasks.router, tags=["Tasks"])
api_router.include_router(auth.router, tags=["Authentication"], prefix="/auth")
api_router.include_router(admin.router, tags=["Admin"], prefix="/admin")
