import os

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

if os.getenv("PRODUCTION") != "local" or os.getenv("TESTING"):

    @router.post("/create", response_model=CurrentUserWithJWTSchema)
    @conditional_rate_limit("10/5minute")
    async def create_account(
        request: Request,  # pylint: disable=W0613
        session: CurrentSession,
        data: AccountRegisterSchema,
    ):
        created_user = await Account.register(session, data)
        return created_user

else:

    @router.post("/create", response_model=CurrentUserSchema)
    @conditional_rate_limit("10/5minute")
    async def create_account_development(
        request: Request,  # pylint: disable=W0613
        session: CurrentSession,
        data: AccountRegisterSchema,
    ):
        created_user = await Account.register_development(session, data)
        return created_user


@router.post("/update_password")
async def user_update_password(
    session: CurrentSession,
    authenticated: SessionUser,
    data: AccountUpdatePasswordSchema,
):
    credentials = await Account.update_password(session, authenticated.user_id, data)
    return credentials


@router.post("/update_email")
async def user_update_email(
    session: CurrentSession,
    authenticated: SessionUser,
    data: AccountUpdateEmailSchema,
):
    credentials = await Account.update_email(session, authenticated.user_id, data)
    return credentials


@router.get("/get", response_model=CurrentUserSchema)
async def get_account_name(
    session: CurrentSession,  # pylint: disable=unused-argument
    current_user: SessionUser,
) -> CurrentUserSchema:
    return current_user


@router.post("/login", response_model=CurrentUserWithJWTSchema)
async def user_login(
    session: CurrentSession, data: AuthSchema
) -> CurrentUserWithJWTSchema:
    res = await Account.login(session, data)
    return res


@router.post("/verify")
async def verify_email(session: CurrentSession, data: VerifyEmailSchema):
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
):
    await Account.resend_email_verification_token(session, authenticated.user_id)
    return {"message": "Email verification resent to your email."}


@router.post("/send_reset_password_mail")
@conditional_rate_limit("5/10minute")
async def send_reset_password_mail(
    request: Request,  # pylint: disable=W0613
    session: CurrentSession,
    data: SendPasswordResetEmailSchema,
):
    await Account.send_reset_email(session, data.email)
    return {"message": "Password reset mail sent to your email."}


@router.post("/reset_password")
async def reset_password(
    session: CurrentSession,
    data: SendNewPasswordSchema,
):
    await Account.reset_password(session, data.token)
    return status.HTTP_200_OK
