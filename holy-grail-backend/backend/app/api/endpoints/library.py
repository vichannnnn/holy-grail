from typing import Optional, List

from fastapi import APIRouter, Query, Request
from fastapi_pagination import Page

from app.api.deps import (
    SessionBucket,
    SessionVerifiedUser,
    SessionAdmin,
    CurrentSession,
)
from app.models.library import Library
from app.schemas.library import NoteUpdateSchema, NoteSchema
from app.utils.limiter import conditional_rate_limit

router = APIRouter()
notes_router = APIRouter()


@router.post("", response_model=List[NoteSchema])
@conditional_rate_limit("5/minute")
async def create_note(
    request: Request,
    session: CurrentSession,
    s3_bucket: SessionBucket,
    authenticated: SessionVerifiedUser,
):
    async with request.form() as form:
        notes = await Library.create_many(
            session,
            form_data=form,
            uploaded_by=authenticated.user_id,
            s3_bucket=s3_bucket,
        )
    return notes


@router.get("/{id}", response_model=NoteSchema)
async def read_note_by_id(
    session: CurrentSession,
    id: int,  # pylint: disable=W0622, C0103
):
    note = await Library.get(session, id)
    return note


@router.get("/download/{id}")
async def download_note_by_id(
    session: CurrentSession,
    id: int,  # pylint: disable=W0622, C0103
):
    note = await Library.download(session, id)
    return note


@notes_router.get("/approved", response_model=Page[NoteSchema])
async def get_all_approved_notes(
    session: CurrentSession,
    page: int = Query(1, title="Page number", gt=0),
    size: int = Query(50, title="Page size", gt=0, le=50),
    category: Optional[str] = None,
    subject: Optional[str] = None,
    doc_type: Optional[str] = None,
    keyword: Optional[str] = None,
    year: Optional[int] = None,
    sorted_by_upload_date: Optional[str] = "desc",
):
    notes = await Library.get_all_notes_paginated(
        session,
        page=page,
        size=size,
        approved=True,
        category=category,
        subject=subject,
        doc_type=doc_type,
        keyword=keyword,
        year=year,
        sorted_by_upload_date=sorted_by_upload_date,
    )
    return notes


@notes_router.get("/pending", response_model=Page[NoteSchema])
async def get_all_pending_approval_notes(
    session: CurrentSession,
    authenticated: SessionAdmin,
    page: int = Query(1, title="Page number", gt=0),
    size: int = Query(50, title="Page size", gt=0, le=50),
    category: Optional[str] = None,
    subject: Optional[str] = None,
    doc_type: Optional[str] = None,
    keyword: Optional[str] = None,
    year: Optional[int] = None,
    sorted_by_upload_date: Optional[str] = "desc",
):
    notes = await Library.get_all_notes_paginated(
        session,
        page=page,
        size=size,
        approved=False,
        category=category,
        subject=subject,
        doc_type=doc_type,
        keyword=keyword,
        year=year,
        sorted_by_upload_date=sorted_by_upload_date,
    )
    return notes


@router.put("/{id}", response_model=NoteSchema)
async def update_note_by_id(
    session: CurrentSession,
    authenticated: SessionAdmin,
    id: int,  # pylint: disable=W0622, C0103
    note: NoteUpdateSchema,
):
    updated_note = await Library.update_note(
        session, id, authenticated, data=note.dict(exclude_unset=True)
    )
    return updated_note


@router.delete("/{id}", response_model=NoteSchema)
async def delete_note_by_id(
    session: CurrentSession,
    authenticated: SessionAdmin,
    id: int,  # pylint: disable=W0622, C0103
):
    deleted_note = await Library.delete_note(session, authenticated, id)
    return deleted_note
