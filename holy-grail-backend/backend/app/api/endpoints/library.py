from typing import Optional, List

from fastapi import APIRouter, Depends, UploadFile, File, Query, Request
from fastapi_pagination import Page
from app.api.deps import (
    SessionBucket,
    SessionVerifiedUser,
    SessionAdmin,
    CurrentSession,
)
from app.utils.limiter import conditional_rate_limit
from app.models.library import Library
from app.schemas.library import NoteCreateSchema, NoteUpdateSchema, NoteSchema


router = APIRouter()
notes_router = APIRouter()


@router.post("/", response_model=List[NoteSchema])
@conditional_rate_limit("5/minute")
async def create_note(
    request: Request,
    authenticated: Account = Depends(Authenticator.get_verified_user),
    session: AsyncSession = Depends(get_session),
    s3_bucket: boto3.client = Depends(get_s3_client),
):

    async with request.form() as form:
        max_index = int(form["maxIndex"])

        note_datas = [
            NoteCreateSchema(
                category=form[f"category {i}"],
                subject=form[f"subject {i}"],
                type=form[f"type {i}"],
                document_name=form[f"document_name {i}"],
            )
            for i in range(max_index + 1)
        ]

        notes = await Library.create_many(
            session,
            uploaded_files=[form[f"file {i}"] for i in range(max_index + 1)],
            uploaded_by=authenticated.user_id,
            datas=note_datas,
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


@notes_router.get("/approved", response_model=Page[NoteSchema])
async def get_all_approved_notes(
    session: CurrentSession,
    page: int = Query(1, title="Page number", gt=0),
    size: int = Query(50, title="Page size", gt=0, le=50),
    category: Optional[str] = None,
    subject: Optional[str] = None,
    doc_type: Optional[str] = None,
):
    notes = await Library.get_all_notes_paginated(
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
    session: CurrentSession,
    authenticated: SessionAdmin,
    page: int = Query(1, title="Page number", gt=0),
    size: int = Query(50, title="Page size", gt=0, le=50),
    category: Optional[str] = None,
    subject: Optional[str] = None,
    doc_type: Optional[str] = None,
):
    notes = await Library.get_all_notes_paginated(
        session,
        page=page,
        size=size,
        approved=False,
        category=category,
        subject=subject,
        doc_type=doc_type,
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
