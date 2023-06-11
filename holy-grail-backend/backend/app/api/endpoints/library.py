from typing import Optional

from fastapi import APIRouter, Depends, UploadFile, File, Query, Request
from fastapi_pagination import Page
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_session
from app.limiter import limiter
from app.models.auth import Account, Authenticator
from app.models.library import Library
from app.schemas.library import NoteCreateSchema, NoteUpdateSchema, NoteSchema

router = APIRouter()
notes_router = APIRouter()


@router.post("/")
@limiter.limit("5/minute")
async def create_note(
    request: Request,
    data: NoteCreateSchema = Depends(),
    file: UploadFile = File(None),
    authenticated: Account = Depends(Authenticator.get_verified_user),
    session: AsyncSession = Depends(get_session),
):
    note = await Library.create(
        session, uploaded_file=file, uploaded_by=authenticated.user_id, data=data
    )
    new_note = await Library.get(session, note.id)
    return new_note


@router.get("/{id}")
async def read_note_by_id(
    id: int,
    session: AsyncSession = Depends(get_session),
):
    note = await Library.get(session, id)
    return note


@notes_router.get("/approved", response_model=Page[NoteSchema])
async def get_all_approved_notes(
    page: int = Query(1, title="Page number", gt=0),
    size: int = Query(50, title="Page size", gt=0, le=50),
    category: Optional[str] = None,
    subject: Optional[str] = None,
    doc_type: Optional[str] = None,
    session: AsyncSession = Depends(get_session),
):
    notes = await Library.get_all(
        session,
        page=page,
        size=size,
        approved=True,
        category=category,
        subject=subject,
        doc_type=doc_type,
    )
    return notes


@notes_router.get("/pending", response_model=Page[NoteSchema])
async def get_all_pending_approval_notes(
    page: int = Query(1, title="Page number", gt=0),
    size: int = Query(50, title="Page size", gt=0, le=50),
    category: Optional[str] = None,
    subject: Optional[str] = None,
    doc_type: Optional[str] = None,
    session: AsyncSession = Depends(get_session),
    authenticated: Account = Depends(Authenticator.get_admin),
):
    notes = await Library.get_all(
        session,
        page=page,
        size=size,
        approved=False,
        category=category,
        subject=subject,
        doc_type=doc_type,
    )
    return notes


@router.put("/{id}")
async def update_note_by_id(
    id: int,
    book: NoteUpdateSchema,
    authenticated: Account = Depends(Authenticator.get_admin),
    session: AsyncSession = Depends(get_session),
):
    updated_note = await Library.update(
        session, id, authenticated, data=book.dict(exclude_unset=True)
    )
    return updated_note


@router.delete("/{id}")
async def delete_book_by_id(
    id: int,
    authenticated: Account = Depends(Authenticator.get_admin),
    session: AsyncSession = Depends(get_session),
):
    deleted_note = await Library.delete(session, authenticated, id)
    return deleted_note
