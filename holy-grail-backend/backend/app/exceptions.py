from fastapi import HTTPException, status


class AppError:
    PASSWORD_MISMATCH_ERROR = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Password and repeat password are not identical",
        headers={"WWW-Authenticate": "Bearer"},
    )

    USER_EMAIL_ALREADY_VERIFIED_ERROR = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="User email is already verified",
        headers={"WWW-Authenticate": "Bearer"},
    )

    INVALID_EMAIL_VERIFICATION_TOKEN = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Email verification token is invalid",
        headers={"WWW-Authenticate": "Bearer"},
    )

    INVALID_PASSWORD_RESET_TOKEN = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Password reset token is invalid",
        headers={"WWW-Authenticate": "Bearer"},
    )

    ACCOUNT_ALREADY_VERIFIED = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Account is already verified",
        headers={"WWW-Authenticate": "Bearer"},
    )

    INVALID_CREDENTIALS_ERROR = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    USER_EMAIL_NOT_VERIFIED_ERROR = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="User email not verified yet",
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

    DOCUMENT_NAME_ALREADY_EXISTS_ERROR = HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail="Document name already exists",
        headers={"WWW-Authenticate": "Bearer"},
    )
