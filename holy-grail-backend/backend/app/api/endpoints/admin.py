from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_session
from app.models.auth import Account, Authenticator
from app.models.library import Library
from app.schemas.admin import UpdateRoleSchema
from app.schemas.auth import CurrentUserSchema, UpdateUserRoleSchema

router = APIRouter()


@router.put("/update_role")
async def admin_update_role(
    data: UpdateRoleSchema,
    session: AsyncSession = Depends(get_session),
    authenticated: Account = Depends(Authenticator.get_admin),
):
    credentials = await Account.update_role(session, data)
    return credentials


@router.put("/approve/{id}")
async def approve_note(
    id: int,
    authenticated: Account = Depends(Authenticator.get_admin),
    session: AsyncSession = Depends(get_session),
):
    note = await Library.approve_note(session, id)
    return note


@router.get("/users", response_model=List[CurrentUserSchema])
async def get_all_account(
    authenticated=Depends(Authenticator.get_developer),
    session: AsyncSession = Depends(get_session),
):
    res = await Account.get_all(session)
    return res


@router.get("/user/{id}", response_model=CurrentUserSchema)
async def get_account(
    id: int,
    authenticated=Depends(Authenticator.get_developer),
    session: AsyncSession = Depends(get_session),
):
    res = await Account.get(session, user_id=id)
    return res


@router.put("/user/{id}", response_model=CurrentUserSchema)
async def update_account(
    id: int,
    data: UpdateUserRoleSchema,
    authenticated=Depends(Authenticator.get_developer),
    session: AsyncSession = Depends(get_session),
):
    res = await Account.update(session, id=id, data=dict(data))
    return res
