"""
Main FastAPI application entry point.

This module configures the FastAPI application with middleware, routes,
CORS settings, rate limiting, and production monitoring. It serves as
the central configuration point for the backend API.
"""
from fastapi import FastAPI
from fastapi.middleware import cors
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.api.api import api_router
from app.core.config import settings
from app.utils.limiter import limiter
from app.utils.starlette_validation_uploadfile import ValidateUploadFileMiddleware

app = FastAPI(
    docs_url=None if settings.environment.is_prod() else "/docs",
    redoc_url=None if settings.environment.is_prod() else "/redoc",
)
app.state.limiter = limiter
app.add_middleware(ValidateUploadFileMiddleware, app_path="/note/", max_size=1048576000)
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    cors.CORSMiddleware,
    allow_origins=["https://grail.moe", "http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

if settings.environment.is_prod():
    import logfire

    logfire.configure()
    logfire.instrument_fastapi(app)
