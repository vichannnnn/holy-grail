"""
Library endpoints for managing educational resources.

This module provides endpoints for creating, reading, updating, and deleting
educational notes and practice papers. Includes functionality for file uploads,
downloads, approval workflows, and search/filtering capabilities.
"""
from typing import List, Optional

from fastapi import APIRouter, Query, Request
from fastapi_pagination import Page

from app.api.deps import (
    CurrentSession,
    SessionAdmin,
    SessionBucket,
    SessionVerifiedUser,
)
from app.models.library import Library
from app.schemas.library import NoteSchema, NoteUpdateSchema
from app.services import search_service, task_client
from app.utils.limiter import conditional_rate_limit

router = APIRouter()
notes_router = APIRouter()


@router.post("", response_model=list[NoteSchema])
@conditional_rate_limit("5/minute")
async def create_note(
    request: Request,
    session: CurrentSession,
    s3_bucket: SessionBucket,
    authenticated: SessionVerifiedUser,
) -> list[NoteSchema]:
    """
    Create new educational notes with file uploads.

    Handles multipart form upload of educational documents (PDF, images, etc.)
    with metadata. Files are uploaded to S3/local storage and require admin
    approval before becoming publicly available.

    Args:
        request: FastAPI request containing multipart form data
        session: Active database session
        s3_bucket: S3 bucket instance for file storage
        authenticated: Verified user uploading the notes

    Returns:
        List[NoteSchema]: List of created notes with their metadata

    Raises:
        HTTPException(400): If file validation fails or form data is invalid
        HTTPException(413): If file size exceeds limit
        HTTPException(429): If rate limit exceeded
    """
    async with request.form() as form:
        notes = await Library.create_many(
            session,
            uploader_role=authenticated.role,
            form_data=form,
            uploaded_by=authenticated.user_id,
            s3_bucket=s3_bucket,
        )
    return notes


@router.get("/{id}", response_model=NoteSchema)
async def read_note_by_id(
    session: CurrentSession,
    id: int,  # pylint: disable=W0622, C0103
) -> NoteSchema:
    """
    Get a specific note by its ID.

    Returns detailed information about a note including metadata,
    approval status, and download URLs.

    Args:
        session: Active database session
        id: Unique identifier of the note

    Returns:
        NoteSchema: Complete note information

    Raises:
        HTTPException(404): If note not found
    """
    note = await Library.get(session, id)
    return note


@router.get("/download/{id}")
@conditional_rate_limit("20/5minute")
async def download_note_by_id(
    request: Request,
    session: CurrentSession,
    id: int,  # pylint: disable=W0622, C0103
) -> dict:
    """
    Download a note file and track download statistics.

    Returns a pre-signed URL for downloading the file and increments
    the download counter. Only approved notes can be downloaded.

    Args:
        request: FastAPI request object for rate limiting
        session: Active database session
        id: Unique identifier of the note to download

    Returns:
        dict: Download URL and file metadata

    Raises:
        HTTPException(404): If note not found
        HTTPException(403): If note not approved for download
        HTTPException(429): If rate limit exceeded
    """
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
) -> Page[NoteSchema]:
    """
    Get paginated list of approved educational notes.

    Returns publicly available notes with advanced filtering and search
    capabilities. When a keyword is provided and OpenSearch is available,
    uses full-text search with fuzzy matching. Falls back to SQL ILIKE
    search when OpenSearch is unavailable.

    Args:
        session: Active database session
        page: Page number (1-indexed)
        size: Number of items per page (max 50)
        category: Filter by education level (O-LEVEL, A-LEVEL, IB)
        subject: Filter by subject (e.g., Mathematics, Physics)
        doc_type: Filter by document type (e.g., Summary Notes, Practice Papers)
        keyword: Search keyword (uses OpenSearch full-text when available)
        year: Filter by year of examination
        sorted_by_upload_date: Sort order ('asc' or 'desc')

    Returns:
        Page[NoteSchema]: Paginated list of approved notes

    Example:
        GET /notes/approved?category=O-LEVEL&subject=Mathematics&page=1&size=20
    """
    if keyword and await search_service.is_available():
        search_result = await search_service.search(
            keyword=keyword,
            category=category,
            subject=subject,
            doc_type=doc_type,
            year=year,
            page=page,
            size=size,
            fuzzy=True,
            include_facets=False,
        )

        if search_result and search_result.items:
            doc_ids = [item.id for item in search_result.items]
            notes = await Library.get_notes_by_ids(session, doc_ids)

            id_to_note = {note.id: note for note in notes}
            ordered_notes = [id_to_note[doc_id] for doc_id in doc_ids if doc_id in id_to_note]

            return {
                "items": ordered_notes,
                "page": search_result.page,
                "pages": search_result.pages,
                "size": search_result.size,
                "total": search_result.total,
            }

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
) -> Page[NoteSchema]:
    """
    Get paginated list of notes pending admin approval.

    Admin-only endpoint for reviewing uploaded notes before they become
    publicly available. Supports the same filtering options as approved notes.

    Args:
        session: Active database session
        authenticated: Admin user with approval permissions
        page: Page number (1-indexed)
        size: Number of items per page (max 50)
        category: Filter by education level
        subject: Filter by subject
        doc_type: Filter by document type
        keyword: Search keyword
        year: Filter by examination year
        sorted_by_upload_date: Sort order ('asc' or 'desc')

    Returns:
        Page[NoteSchema]: Paginated list of pending notes

    Raises:
        HTTPException(403): If user is not an admin
    """
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
) -> NoteSchema:
    """
    Update note metadata and approval status.

    Admin-only endpoint for editing note information and approving/rejecting
    uploaded content. Can update title, description, metadata, and approval status.

    Args:
        session: Active database session
        authenticated: Admin user with update permissions
        id: Unique identifier of the note to update
        note: Updated note data

    Returns:
        NoteSchema: Updated note information

    Raises:
        HTTPException(404): If note not found
        HTTPException(403): If user is not an admin
        HTTPException(400): If update data is invalid
    """
    updated_note = await Library.update_note(session, id, authenticated, data=note)
    return updated_note


@router.delete("/{id}", response_model=NoteSchema)
async def delete_note_by_id(
    session: CurrentSession,
    authenticated: SessionAdmin,
    id: int,  # pylint: disable=W0622, C0103
) -> NoteSchema:
    """
    Delete a note and its associated files.

    Admin-only endpoint that removes the note from the database and deletes
    the associated file from storage (S3/local). Also removes from search index.

    Args:
        session: Active database session
        authenticated: Admin user with delete permissions
        id: Unique identifier of the note to delete

    Returns:
        NoteSchema: Deleted note information

    Raises:
        HTTPException(404): If note not found
        HTTPException(403): If user is not an admin
    """
    deleted_note = await Library.delete_note(session, authenticated, id)

    await task_client.trigger_delete_document(id)

    return deleted_note
