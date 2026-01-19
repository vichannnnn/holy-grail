"""
Middleware for validating file uploads.

This module provides a Starlette middleware that validates file uploads
based on content type and file size before they reach the application
endpoints.
"""
from enum import Enum

from starlette import status
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import PlainTextResponse, Response
from starlette.types import ASGIApp, Message

_unsupported_media_type = PlainTextResponse(
    content="Unsupported Media Type", status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
)
_request_entity_too_large = PlainTextResponse(
    content="Request Entity Too Large",
    status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
)


class FileTypeName(str, Enum):
    """
    Enumeration of allowed file MIME types.

    Defines the content types that can be accepted for file uploads.
    """

    JPEG = "image/jpeg"
    JPG = "image/jpeg"
    PNG = "image/png"
    GIF = "image/gif"
    WEBP = "image/webp"
    PDF = "application/pdf"
    ZIP = "application/zip"
    TXT = "text/plain"


class ValidateUploadFileMiddleware(BaseHTTPMiddleware):
    """
    Middleware for validating file uploads before processing.

    Validates file uploads based on:
    - File size (configurable maximum)
    - Content type (if specified)
    - Applied only to specific paths

    Returns appropriate HTTP error responses for invalid uploads.
    """

    def __init__(
        self,
        app: ASGIApp,
        app_path=None,
        max_size: int = 16777216,  # 16MB
        file_type=None,
    ) -> None:
        """
        Initialize the validation middleware.

        Args:
            app: The ASGI application.
            app_path: List of paths to apply validation to.
            max_size: Maximum allowed file size in bytes (default 16MB).
            file_type: List of allowed content types.
        """
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

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        """
        Process the request and validate file uploads.

        Checks file size and content type for POST/PUT requests on
        configured paths. Returns error responses for invalid uploads.

        Args:
            request: The incoming HTTP request.
            call_next: The next middleware/endpoint in the chain.

        Returns:
            Response: Either an error response or the result of call_next.
        """
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
            if "content-length" in headers and int(headers["content-length"]) > self.max_size:
                return _request_entity_too_large

        return await call_next(request)
