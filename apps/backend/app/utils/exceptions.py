"""
Application-specific HTTP exceptions.

This module defines standardized HTTP exceptions used throughout the
application for consistent error handling and API responses.
"""
from fastapi import HTTPException, status


class AppError:
    """
    Container class for application-specific HTTP exceptions.

    Provides pre-configured HTTP exceptions for common error scenarios
    with appropriate status codes and messages.
    """

    BAD_REQUEST_ERROR = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Resources provided is invalid.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    INVALID_CREDENTIALS_ERROR = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not authenticate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    PERMISSION_DENIED_ERROR = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Could not authorize the action",
        headers={"WWW-Authenticate": "Bearer"},
    )

    RESOURCES_NOT_FOUND_ERROR: HTTPException = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Resource does not exists",
    )

    RESOURCES_ALREADY_EXISTS_ERROR = HTTPException(
        status_code=status.HTTP_409_CONFLICT, detail="Resource already exists"
    )

    @staticmethod
    def MULTIPLE_GENERIC_ERRORS(**kwargs) -> HTTPException:
        """
        Create an HTTP exception with multiple error details.

        Args:
            **kwargs: Key-value pairs of error details.

        Returns:
            HTTPException: 400 Bad Request with multiple error details.
        """
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=kwargs,
            headers={"WWW-Authenticate": "Bearer"},
        )
