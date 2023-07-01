import os

from fastapi import FastAPI
from fastapi.middleware import cors
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from starlette_validation_uploadfile import ValidateUploadFileMiddleware
from prometheus_fastapi_instrumentator import Instrumentator, metrics

from app.api.api import api_router
from app.limiter import limiter

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
    allow_origins=["https://grail.moe" if os.getenv("PRODUCTION") == "true" else "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


def exclude_metrics(metric):
    return metric.name != "http_requests_total"


Instrumentator(
    should_group=False,
    should_exclude=exclude_metrics,
).instrument(
    app
).expose(app)


@app.on_event("startup")
async def on_startup() -> None:
    pass


@app.on_event("shutdown")
async def shutdown_event() -> None:
    pass
