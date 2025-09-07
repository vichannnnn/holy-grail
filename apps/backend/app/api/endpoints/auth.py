"""
Authentication endpoints for user account management.

This module provides endpoints for user registration, authentication, email verification,
password management, and account updates. All endpoints are rate-limited to prevent abuse.
"""
from fastapi import APIRouter, Request, status

from app.api.deps import CurrentSession, SessionUser
from app.models.auth import Account
from app.schemas.auth import (
    AccountRegisterSchema,
    AccountUpdateEmailSchema,
    AccountUpdatePasswordSchema,
    AuthSchema,
    CurrentUserSchema,
    CurrentUserWithJWTSchema,
    SendNewPasswordSchema,
    SendPasswordResetEmailSchema,
    VerifyEmailSchema,
)
from app.utils.limiter import conditional_rate_limit

router = APIRouter()


@router.post("/create", response_model=CurrentUserWithJWTSchema)
@conditional_rate_limit("10/5minute")
async def create_account(
    request: Request,  # pylint: disable=W0613
    session: CurrentSession,
    data: AccountRegisterSchema,
) -> CurrentUserWithJWTSchema:
    """
    Create a new user account with email verification.

    This endpoint registers a new user, hashes their password, and sends
    a verification email. The user must verify their email before accessing
    protected resources.

    Args:
        request: FastAPI request object for rate limiting
        session: Active database session
        data: User registration data including username, email, and password

    Returns:
        CurrentUserWithJWTSchema: Created user data with JWT access token

    Raises:
        HTTPException(400): If passwords don't match or validation fails
        HTTPException(409): If username or email already exists
        HTTPException(429): If rate limit exceeded
    """
    created_user = await Account.register(session=session, data=data)
    return created_user


@router.post("/update_password", status_code=status.HTTP_204_NO_CONTENT)
async def user_update_password(
    request: Request,  # pylint: disable=W0613
    session: CurrentSession,
    authenticated: SessionUser,
    data: AccountUpdatePasswordSchema,
) -> None:
    """
    Update the authenticated user's password.

    Requires the current password for verification before updating to the new password.
    The new password is hashed before storage.

    Args:
        request: FastAPI request object
        session: Active database session
        authenticated: Currently authenticated user
        data: Password update data containing current and new passwords

    Returns:
        None (204 No Content on success)

    Raises:
        HTTPException(401): If current password is incorrect
        HTTPException(400): If new password doesn't meet requirements
    """
    await Account.update_password(
        session=session,
        user_id=authenticated.user_id,
        data=data,
    )


@router.post("/update_email", status_code=status.HTTP_204_NO_CONTENT)
async def user_update_email(
    request: Request,  # pylint: disable=W0613
    session: CurrentSession,
    authenticated: SessionUser,
    data: AccountUpdateEmailSchema,
) -> None:
    """
    Update the authenticated user's email address.

    Sends a verification email to the new address. The email change is not
    applied until the new email is verified.

    Args:
        request: FastAPI request object
        session: Active database session
        authenticated: Currently authenticated user
        data: Email update data containing new email address

    Returns:
        None (204 No Content on success)

    Raises:
        HTTPException(409): If email already exists for another user
        HTTPException(400): If email format is invalid
    """
    await Account.update_email(
        session=session,
        user_id=authenticated.user_id,
        data=data,
    )


@router.get("/get", response_model=CurrentUserSchema)
async def get_account_name(
    session: CurrentSession,  # pylint: disable=unused-argument
    current_user: SessionUser,
) -> CurrentUserSchema:
    """
    Get the current authenticated user's information.

    Returns basic user information without sensitive data like password hash.

    Args:
        session: Active database session (unused but required by dependency)
        current_user: Currently authenticated user from JWT token

    Returns:
        CurrentUserSchema: User information including id, username, email, and status
    """
    return current_user


@router.post("/login", response_model=CurrentUserWithJWTSchema)
async def user_login(session: CurrentSession, data: AuthSchema) -> CurrentUserWithJWTSchema:
    """
    Authenticate a user and return an access token.

    Validates credentials and returns user data with a JWT token for accessing
    protected endpoints. Email must be verified for successful login.

    Args:
        session: Active database session
        data: Login credentials (username/email and password)

    Returns:
        CurrentUserWithJWTSchema: User data with JWT access token

    Raises:
        HTTPException(401): If credentials are invalid
        HTTPException(403): If email is not verified
    """
    res = await Account.login(session, data)
    return res


@router.post("/verify")
async def verify_email(session: CurrentSession, data: VerifyEmailSchema) -> dict[str, str]:
    """
    Verify a user's email address using a verification token.

    Completes the email verification process initiated during registration
    or email update. Once verified, the user gains full access to the platform.

    Args:
        session: Active database session
        data: Verification data containing the email token

    Returns:
        dict: Success message confirming email verification

    Raises:
        HTTPException(400): If token is invalid or expired
        HTTPException(404): If user not found
    """
    await Account.verify_email(session, data.token)
    return {
        "success": "Email verification successful. Your account can access all the features now."
    }


@router.post("/resend_email_verification_token")
@conditional_rate_limit("5/10minute")
async def resend_verify_email_token(
    request: Request,  # pylint: disable=W0613
    session: CurrentSession,
    authenticated: SessionUser,
) -> dict[str, str]:
    """
    Resend the email verification token to the authenticated user.

    Generates a new verification token and sends it to the user's registered
    email address. Rate limited to prevent spam.

    Args:
        request: FastAPI request object for rate limiting
        session: Active database session
        authenticated: Currently authenticated user requiring verification

    Returns:
        dict: Confirmation message that email was sent

    Raises:
        HTTPException(400): If email is already verified
        HTTPException(429): If rate limit exceeded
    """
    await Account.resend_email_verification_token(session=session, user_id=authenticated.user_id)
    return {"message": "Email verification resent to your email."}


@router.post("/send_reset_password_mail")
@conditional_rate_limit("5/10minute")
async def send_reset_password_mail(
    request: Request,  # pylint: disable=W0613
    session: CurrentSession,
    data: SendPasswordResetEmailSchema,
) -> dict[str, str]:
    """
    Send a password reset email to the specified email address.

    Generates a secure reset token and sends it via email. The token expires
    after a configured time period. Rate limited to prevent abuse.

    Args:
        request: FastAPI request object for rate limiting
        session: Active database session
        data: Email data containing the user's email address

    Returns:
        dict: Generic success message (doesn't reveal if email exists)

    Raises:
        HTTPException(429): If rate limit exceeded

    Note:
        Always returns success to prevent email enumeration attacks.
    """
    await Account.send_reset_email(session=session, email=data.email)
    return {"message": "Password reset mail sent to your email."}


@router.post("/reset_password")
async def reset_password(
    request: Request,  # pylint: disable=W0613
    session: CurrentSession,
    data: SendNewPasswordSchema,
) -> int:
    """
    Reset a user's password using a valid reset token.

    Completes the password reset process by validating the token and updating
    the user's password. The reset token is invalidated after use.

    Args:
        request: FastAPI request object
        session: Active database session
        data: Password reset data containing token and new password

    Returns:
        int: HTTP 200 status code on success

    Raises:
        HTTPException(400): If token is invalid, expired, or password is weak
        HTTPException(404): If user not found
    """
    await Account.reset_password(session=session, token=data.token)
    return status.HTTP_200_OK
