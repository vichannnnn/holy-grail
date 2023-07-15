from typing import Optional
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
import boto3

router = APIRouter()
notes_router = APIRouter()


@router.post("/", response_model=NoteSchema)
@conditional_rate_limit("5/minute")
async def create_note(
    request: Request,
    session: CurrentSession,
    s3_bucket: SessionBucket,
    authenticated: SessionVerifiedUser,
    data: NoteCreateSchema = Depends(),
    file: UploadFile = File(None),
):
    note = await Library.create(
        session,
        uploaded_file=file,
        uploaded_by=authenticated.user_id,
        data=data,
        s3_bucket=s3_bucket,
    )
    return note


@router.get("/{id}", response_model=NoteSchema)
async def read_note_by_id(
    session: CurrentSession,
    id: int,
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
    session: CurrentSession,
    authenticated: SessionAdmin,
    page: int = Query(1, title="Page number", gt=0),
    size: int = Query(50, title="Page size", gt=0, le=50),
    category: Optional[str] = None,
    subject: Optional[str] = None,
    doc_type: Optional[str] = None,
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


@router.put("/{id}", response_model=NoteSchema)
async def update_note_by_id(
    session: CurrentSession,
    authenticated: SessionAdmin,
    id: int,
    note: NoteUpdateSchema,
):
    updated_note = await Library.update(
        session, id, authenticated, data=note.dict(exclude_unset=True)
    )
    return updated_note


@router.delete("/{id}", response_model=NoteSchema)
async def delete_note_by_id(
    session: CurrentSession,
    authenticated: SessionAdmin,
    id: int,
):
    deleted_note = await Library.delete(session, authenticated, id)
    return deleted_note
