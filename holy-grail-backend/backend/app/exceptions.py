from fastapi import HTTPException, status


class AppError:
    INVALID_CREDENTIALS_ERROR = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    PERMISSION_ERROR = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You do not have the required permission to run this action.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    INVALID_FILE_TYPE_ERROR = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You have uploaded an invalid file type.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    USERNAME_ALREADY_EXISTS_ERROR = HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail="Username already exists",
        headers={"WWW-Authenticate": "Bearer"},
    )

    PASSWORD_MISMATCH_ERROR = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Password and repeat password are not identical",
        headers={"WWW-Authenticate": "Bearer"},
    )
