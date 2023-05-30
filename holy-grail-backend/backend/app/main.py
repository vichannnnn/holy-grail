import os

from fastapi import FastAPI
from fastapi.middleware import cors
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from starlette_validation_uploadfile import ValidateUploadFileMiddleware

from app.api.api import api_router
from app.limiter import limiter

app = FastAPI(
    root_path="/api/v1",
    docs_url=None if os.getenv("PRODUCTION") == "true" else "/docs",
    redoc_url=None if os.getenv("PRODUCTION") == "true" else "/redoc",
)
app.state.limiter = limiter
app.add_middleware(ValidateUploadFileMiddleware, app_path="/note/", max_size=104857600)
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    cors.CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.on_event("startup")
async def on_startup() -> None:
    pass


@app.on_event("shutdown")
async def shutdown_event() -> None:
    pass
