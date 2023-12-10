import ast
import os

from fastapi import FastAPI
from fastapi.middleware import cors
from prometheus_fastapi_instrumentator import Instrumentator
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.api.api import api_router
from app.tasks.fetch_google_analytics import fetch_google_analytics
from app.tasks.update_scoreboard_users import update_scoreboard_users
from app.utils.limiter import limiter
from app.utils.starlette_validation_uploadfile import ValidateUploadFileMiddleware

app = FastAPI(
    root_path="/api/v1" if os.getenv("PRODUCTION") in ["true", "dev"] else None,
    docs_url=None if os.getenv("PRODUCTION") == "true" else "/docs",
    redoc_url=None if os.getenv("PRODUCTION") == "true" else "/redoc",
)
app.state.limiter = limiter
app.add_middleware(ValidateUploadFileMiddleware, app_path="/note/", max_size=1048576000)
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    cors.CORSMiddleware,
    allow_origins=ast.literal_eval(os.getenv("ORIGINS"))
    if os.getenv("PRODUCTION") == "true"
    else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
Instrumentator().instrument(app)

# Force runs the google analytics and update scoreboard job once on app start up.

fetch_google_analytics.delay()
update_scoreboard_users.delay()
