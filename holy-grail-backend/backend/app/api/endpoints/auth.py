import jwt
from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_session
from app.exceptions import AppError
from app.limiter import conditional_rate_limit
from app.models.auth import Account, Authenticator, ALGORITHM, SECRET_KEY
from app.schemas.auth import (
    AuthSchema,
    CurrentUserSchema,
    AccountRegisterSchema,
    AccountUpdatePasswordSchema,
    SendPasswordResetEmailSchema,
    SendNewPasswordSchema,
    VerifyEmailSchema,
)
import os

router = APIRouter()


if os.getenv("PRODUCTION") != "local" or os.getenv("TESTING"):

    @router.post("/create", response_model=CurrentUserSchema)
    @conditional_rate_limit("10/5minute")
    async def create_account(
        request: Request,
        data: AccountRegisterSchema,
        session: AsyncSession = Depends(get_session),
    ):
        if data.password != data.repeat_password:
            raise AppError.PASSWORD_MISMATCH_ERROR

        created_user = await Account().register(session, data)
        return created_user

else:

    @router.post("/create", response_model=CurrentUserSchema)
    async def create_account_development(
        data: AccountRegisterSchema,
        session: AsyncSession = Depends(get_session),
    ):
        if data.password != data.repeat_password:
            raise AppError.PASSWORD_MISMATCH_ERROR

        created_user = await Account().register_development(session, data)
        return created_user


@router.post("/update_password")
async def user_update_password(
    data: AccountUpdatePasswordSchema,
    session: AsyncSession = Depends(get_session),
    authenticated: Account = Depends(Authenticator.get_current_user),
):
    credentials = await Account.update_password(session, authenticated.user_id, data)
    return credentials


@router.get("/get", response_model=CurrentUserSchema)
async def get_account_name(
    user: AuthSchema = Depends(Authenticator.get_current_user),
):
    return user


@router.post("/login")
async def user_login(
    data: AuthSchema,
    session: AsyncSession = Depends(get_session),
):
    credentials = await Account.login(session, data.username, data.password)

    if not credentials:
        raise AppError.INVALID_CREDENTIALS_ERROR

    access_token = Authenticator.create_access_token(data={"sub": data.username})
    decoded_token = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
    return {
        "data": credentials,
        "access_token": access_token,
        "token_type": "bearer",
        "exp": decoded_token["exp"],
    }


@router.post("/verify")
async def verify_email(
    data: VerifyEmailSchema, session: AsyncSession = Depends(get_session)
):
    await Account.verify_email(session, data.token)
    return {
        "success": "Email verification successful. Your account can access all the features now."
    }


@router.post("/resend_email_verification_token")
@conditional_rate_limit("5/10minute")
async def resend_verify_email_token(
    request: Request,
    session: AsyncSession = Depends(get_session),
    authenticated: Account = Depends(Authenticator.get_current_user),
):
    await Account().resend_email_verification_token(
        session, authenticated.user_id, authenticated.username
    )
    return {"message": "Email verification resent to your email."}


@router.post("/send_reset_password_mail")
@conditional_rate_limit("5/10minute")
async def reset_password(
    request: Request,
    data: SendPasswordResetEmailSchema,
    session: AsyncSession = Depends(get_session),
):
    await Account().send_reset_email(session, data.email)
    return {"message": "Password reset mail sent to your email."}


@router.post("/reset_password")
async def reset_password(
    data: SendNewPasswordSchema,
    request: Request,
    session: AsyncSession = Depends(get_session),
):
    await Account().reset_password(session, data.token)
    return status.HTTP_200_OK
