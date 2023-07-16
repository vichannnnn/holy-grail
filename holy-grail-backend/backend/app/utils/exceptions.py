from fastapi import HTTPException, status


class AppError:
    BAD_REQUEST_ERROR = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Resources provided is invalid.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    INVALID_CREDENTIALS_ERROR = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    RESOURCES_NOT_FOUND_ERROR: HTTPException = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Resource does not exists",
    )

    RESOURCES_ALREADY_EXISTS_ERROR = HTTPException(
        status_code=status.HTTP_409_CONFLICT, detail="Resource already exists"
    )

    def MULTIPLE_GENERIC_ERRORS(**kwargs):
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=kwargs,
            headers={"WWW-Authenticate": "Bearer"},
        )
