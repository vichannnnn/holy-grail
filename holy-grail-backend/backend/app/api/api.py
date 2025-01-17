from fastapi import APIRouter

from app.api.endpoints import (
    ad_analytics,
    admin,
    analytics,
    auth,
    categories,
    dev,
    example,
    library,
    scoreboard,
    tasks,
)

api_router = APIRouter()
api_router.include_router(
    ad_analytics.router, tags=["Ad Analytics"], prefix="/ad_analytics"
)
api_router.include_router(admin.router, tags=["Admin"], prefix="/admin")
api_router.include_router(analytics.router, tags=["Analytics"], prefix="/analytics")
api_router.include_router(auth.router, tags=["Authentication"], prefix="/auth")
api_router.include_router(categories.router, tags=["Categories"])
# api_router.include_router(dev.router, tags=["Dev"], prefix="/dev")
api_router.include_router(example.router, tags=["Example"])
api_router.include_router(library.router, tags=["Library"], prefix="/note")
api_router.include_router(library.notes_router, tags=["Library"], prefix="/notes")
api_router.include_router(scoreboard.router, tags=["Scoreboard"], prefix="/scoreboard")
api_router.include_router(tasks.router, tags=["Tasks"])
