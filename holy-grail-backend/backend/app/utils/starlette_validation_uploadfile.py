from enum import Enum

from starlette import status
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import PlainTextResponse, Response
from starlette.types import ASGIApp, Message

_unsupported_media_type = PlainTextResponse(
    content="Unsupported Media Type", status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
)
_length_required = PlainTextResponse(
    content="Length Required", status_code=status.HTTP_411_LENGTH_REQUIRED
)
_request_entity_too_large = PlainTextResponse(
    content="Request Entity Too Large",
    status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
)


class FileTypeName(str, Enum):
    JPEG = "image/jpeg"
    JPG = "image/jpeg"
    PNG = "image/png"
    GIF = "image/gif"
    WEBP = "image/webp"
    PDF = "application/pdf"
    ZIP = "application/zip"
    TXT = "text/plain"


class ValidateUploadFileMiddleware(BaseHTTPMiddleware):
    def __init__(
        self,
        app: ASGIApp,
        app_path=None,
        max_size: int = 16777216,  # 16MB
        file_type=None,
    ) -> None:
        super().__init__(app)
        if app_path is None:
            app_path = []
        if file_type is None:
            file_type = []
        self.app_path = app_path
        self.max_size = max_size
        self.file_type = file_type

    async def set_body(self, request: Request):
        """
        This function is required for accessing form data of request
        during FastAPI or Starlette's request handling.

        Ref: https://github.com/tiangolo/fastapi/discussions/8187
        """
        receive_ = await request._receive()

        async def receive() -> Message:
            return receive_

        request._receive = receive

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        scope = request.scope

        if scope["type"] not in ("http",):
            return await call_next(request)

        if scope["method"] not in ("POST", "PUT"):
            return await call_next(request)

        # Check app paths
        if scope["path"] in self.app_path:
            # Check content-type
            if self.file_type:
                await self.set_body(request)
                form = await request.form()
                content_type = form[next(iter(form))].content_type
                if content_type not in self.file_type:
                    return _unsupported_media_type

            headers = request.headers
            if "content-length" not in headers:
                return _length_required
            # Check content-size
            if int(headers["content-length"]) > self.max_size:
                return _request_entity_too_large

        return await call_next(request)
