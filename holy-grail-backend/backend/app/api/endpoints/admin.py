from typing import List
from fastapi import APIRouter
from app.api.deps import CurrentSession, SessionAdmin, SessionDeveloper
from app.models.auth import Account
from app.models.library import Library
from app.schemas.admin import UpdateRoleSchema
from app.schemas.auth import CurrentUserSchema, UpdateUserRoleSchema
from app.schemas.library import NoteSchema

router = APIRouter()


@router.put("/update_role")
async def admin_update_role(
    session: CurrentSession,
    authenticated: SessionAdmin,  # pylint: disable=W0613
    data: UpdateRoleSchema,
):
    credentials = await Account.update_role(session, data)
    return credentials


@router.put("/approve/{id}", response_model=NoteSchema)
async def approve_note(
    session: CurrentSession,
    authenticated: SessionAdmin,  # pylint: disable=W0613
    id: int,  # pylint: disable=W0622, C0103
):
    note = await Library.approve_note(session, id)
    return note


@router.get("/users", response_model=List[CurrentUserSchema])
async def get_all_account(
    session: CurrentSession, authenticated: SessionDeveloper  # pylint: disable=W0613
):
    res = await Account.get_all_users_ascending_by_id(session)
    return res


@router.get("/user/{id}", response_model=CurrentUserSchema)
async def get_account(
    session: CurrentSession,
    authenticated: SessionDeveloper,  # pylint: disable=W0613
    id: int,  # pylint: disable=W0622, C0103
):
    res = await Account.get(session, id=id)
    return res


@router.put("/user/{id}", response_model=CurrentUserSchema)
async def update_account(
    session: SessionAdmin,
    authenticated: SessionDeveloper,  # pylint: disable=W0613
    id: int,  # pylint: disable=W0622, C0103
    data: UpdateUserRoleSchema,
):
    res = await Account.update(session, id=id, data=dict(data))
    return res
