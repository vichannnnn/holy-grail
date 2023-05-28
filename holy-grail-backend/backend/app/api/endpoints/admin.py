from app.api.deps import get_session
from app.models.library import Library
from app.models.auth import Account, Authenticator
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.admin import UpdateRoleSchema


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
