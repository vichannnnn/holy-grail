from fastapi import FastAPI
from fastapi.middleware import cors
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.api.api import api_router
from app.tasks.fetch_google_analytics import fetch_google_analytics
from app.tasks.update_scoreboard_users import update_scoreboard_users
from app.utils.flags import PRODUCTION_FLAG
from app.utils.limiter import limiter
from app.utils.starlette_validation_uploadfile import ValidateUploadFileMiddleware

app = FastAPI(
    docs_url=None if PRODUCTION_FLAG else "/docs",
    redoc_url=None if PRODUCTION_FLAG else "/redoc",
)
app.state.limiter = limiter
app.add_middleware(ValidateUploadFileMiddleware, app_path="/note/", max_size=1048576000)
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    cors.CORSMiddleware,
    allow_origins=["*"],  # TODO: Placeholder with wildcard for infrastructure testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

if PRODUCTION_FLAG:
    import logfire

    logfire.configure()
    logfire.instrument_fastapi(app)


# Force runs the google analytics and update scoreboard job once on app start up.
update_scoreboard_users.delay()
# fetch_google_analytics.delay()
