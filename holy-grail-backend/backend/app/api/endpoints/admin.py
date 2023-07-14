from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_session, get_admin, get_developer
from app.models.auth import Account
from app.models.library import Library
from app.schemas.admin import UpdateRoleSchema
from app.schemas.auth import CurrentUserSchema, UpdateUserRoleSchema
from app.schemas.library import NoteSchema

router = APIRouter()


@router.put("/update_role")
async def admin_update_role(
    data: UpdateRoleSchema,
    session: AsyncSession = Depends(get_session),
    authenticated: Account = Depends(get_admin),
):
    credentials = await Account.update_role(session, data)
    return credentials


@router.put("/approve/{id}", response_model=NoteSchema)
async def approve_note(
    id: int,
    session: AsyncSession = Depends(get_session),
    authenticated: Account = Depends(get_admin),
):
    note = await Library.approve_note(session, id)
    return note


@router.get("/users", response_model=List[CurrentUserSchema])
async def get_all_account(
    session: AsyncSession = Depends(get_session),
    authenticated=Depends(get_developer),
):
    res = await Account.get_all(session)
    return res


@router.get("/user/{id}", response_model=CurrentUserSchema)
async def get_account(
    id: int,
    session: AsyncSession = Depends(get_session),
    authenticated=Depends(get_developer),
):
    res = await Account.get(session, user_id=id)
    return res


@router.put("/user/{id}", response_model=CurrentUserSchema)
async def update_account(
    id: int,
    data: UpdateUserRoleSchema,
    session: AsyncSession = Depends(get_session),
    authenticated=Depends(get_developer),
):
    res = await Account.update(session, id=id, data=dict(data))
    return res
