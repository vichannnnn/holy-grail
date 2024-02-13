import ast
import os
import time
import json
import logging

from fastapi import FastAPI, Request, Response
from fastapi.middleware import cors
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.api.api import api_router
from app.tasks.fetch_google_analytics import fetch_google_analytics
from app.tasks.update_scoreboard_users import update_scoreboard_users
from app.utils.limiter import limiter
from app.utils.starlette_validation_uploadfile import ValidateUploadFileMiddleware

from app.utils.observability import PrometheusMiddleware, setting_otlp, uvicorn_logger

from prometheus_client import REGISTRY
from prometheus_client.openmetrics.exposition import (
    CONTENT_TYPE_LATEST,
    generate_latest,
)

APP_NAME = os.environ.get("APP_NAME", "holy-grail-backend")
EXPOSE_PORT = os.environ.get("EXPOSE_PORT", 8000)
OTLP_GRPC_ENDPOINT = os.environ.get("OTLP_GRPC_ENDPOINT", "http://tempo:4317")


class LoggingMiddleware:
    @staticmethod
    async def log_request(request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time_seconds = time.time() - start_time
        process_time_ms = round(
            process_time_seconds * 1000, 6
        )  # Convert to milliseconds and round to 6 decimal places
        process_time_str = f"{process_time_ms} ms"

        log_data = {
            "request_method": request.method,
            "request_url": request.url.path,
            "response_status": response.status_code,
            "process_time_ms": process_time_str,
        }
        uvicorn_logger.info(json.dumps(log_data))
        return response


app = FastAPI(
    root_path="/api/v1" if os.getenv("PRODUCTION") in ["true", "dev"] else None,
    docs_url=None if os.getenv("PRODUCTION") == "true" else "/docs",
    redoc_url=None if os.getenv("PRODUCTION") == "true" else "/redoc",
)


@app.middleware("http")
async def logging_middleware(request: Request, call_next):
    return await LoggingMiddleware.log_request(request, call_next)


app.state.limiter = limiter

app.add_middleware(ValidateUploadFileMiddleware, app_path="/note/", max_size=1048576000)
app.add_middleware(PrometheusMiddleware, app_name=APP_NAME)
app.add_middleware(
    cors.CORSMiddleware,
    allow_origins=ast.literal_eval(os.getenv("ORIGINS"))
    if os.getenv("PRODUCTION") == "true"
    else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def metrics(request: Request) -> Response:
    return Response(
        generate_latest(REGISTRY), headers={"Content-Type": CONTENT_TYPE_LATEST}
    )


app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_route("/metrics", metrics)

setting_otlp(app, APP_NAME, OTLP_GRPC_ENDPOINT)

app.include_router(api_router)


class EndpointFilter(logging.Filter):
    # Uvicorn endpoint access log filter
    def filter(self, record: logging.LogRecord) -> bool:
        return record.getMessage().find("GET /metrics") == -1


logging.getLogger("uvicorn.access").addFilter(EndpointFilter())

# Force runs the google analytics and update scoreboard job once on app start up.

fetch_google_analytics.delay()
update_scoreboard_users.delay()
