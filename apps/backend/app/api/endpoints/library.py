"""
Library endpoints for managing educational resources.

This module provides endpoints for creating, reading, updating, and deleting
educational notes and practice papers. Includes functionality for file uploads,
downloads, approval workflows, and search/filtering capabilities.
"""
from typing import Optional

from fastapi import APIRouter, Query, Request
from fastapi_pagination import Page

from app.api.deps import (
    CurrentSession,
    SessionAdmin,
    SessionBucket,
    SessionVerifiedUser,
)
from app.models.library import Library
from app.schemas.library import NoteSchema, NoteUpdateSchema, SearchNoteSchema
from app.services import cache_service, search_service, task_client
from app.services.cache import (
    deserialize_search_results,
    generate_search_cache_key,
    serialize_search_results,
)
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


@notes_router.get("/approved", response_model=Page[NoteSchema], deprecated=True)
async def get_all_approved_notes(
    session: CurrentSession,
    page: int = Query(1, title="Page number", gt=0),
    size: int = Query(50, title="Page size", gt=0, le=50),
    category: str | None = None,
    subject: str | None = None,
    doc_type: str | None = None,
    keyword: str | None = None,
    year: int | None = None,
    sorted_by_upload_date: str | None = "desc",
) -> Page[NoteSchema]:
    """
    [DEPRECATED] Get paginated list of approved educational notes using PostgreSQL.

    **This endpoint is deprecated. Use /notes/search instead for better
    full-text search with fuzzy matching and content search.**

    Returns publicly available notes with filtering and ILIKE search.
    For full-text search with OpenSearch, use the /search endpoint.

    Args:
        session: Active database session
        page: Page number (1-indexed)
        size: Number of items per page (max 50)
        category: Filter by education level (O-LEVEL, A-LEVEL, IB)
        subject: Filter by subject (e.g., Mathematics, Physics)
        doc_type: Filter by document type (e.g., Summary Notes, Practice Papers)
        keyword: Search keyword (uses PostgreSQL ILIKE)
        year: Filter by year of examination
        sorted_by_upload_date: Sort order ('asc' or 'desc')

    Returns:
        Page[NoteSchema]: Paginated list of approved notes

    Example:
        GET /notes/approved?category=O-LEVEL&subject=Mathematics&page=1&size=20
    """
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


@notes_router.get("/search", response_model=Page[SearchNoteSchema])
async def search_notes_opensearch(
    page: int = Query(1, title="Page number", gt=0),
    size: int = Query(50, title="Page size", gt=0, le=50),
    category: str | None = None,
    subject: str | None = None,
    doc_type: str | None = None,
    keyword: str | None = None,
    year: int | None = None,
) -> Page[SearchNoteSchema]:
    """
    Search documents using OpenSearch full-text search with Redis caching.

    This endpoint exclusively uses OpenSearch for searching indexed documents
    and caches results in Redis for improved performance. Returns data directly
    from OpenSearch without querying PostgreSQL.

    Args:
        page: Page number (1-indexed)
        size: Number of items per page (max 50)
        category: Filter by education level (O-LEVEL, A-LEVEL, IB)
        subject: Filter by subject (e.g., Mathematics, Physics)
        doc_type: Filter by document type (e.g., Summary Notes, Practice Papers)
        keyword: Search keyword for full-text search
        year: Filter by year of examination

    Returns:
        Page[SearchNoteSchema]: Paginated list of matching notes
    """
    empty_response = {
        "items": [],
        "page": page,
        "pages": 0,
        "size": size,
        "total": 0,
    }

    if not await search_service.is_available():
        return empty_response

    cache_key = generate_search_cache_key(
        keyword=keyword,
        category=category,
        subject=subject,
        doc_type=doc_type,
        year=year,
        page=page,
        size=size,
    )

    cached_result = await cache_service.get(cache_key)
    if cached_result:
        return deserialize_search_results(cached_result)

    search_result = await search_service.search_full(
        keyword=keyword,
        category=category,
        subject=subject,
        doc_type=doc_type,
        year=year,
        page=page,
        size=size,
        fuzzy=True,
    )

    if not search_result or not search_result.get("items"):
        return empty_response

    await cache_service.set(cache_key, serialize_search_results(search_result))

    return search_result


@notes_router.get("/pending", response_model=Page[NoteSchema])
async def get_all_pending_approval_notes(
    session: CurrentSession,
    authenticated: SessionAdmin,
    page: int = Query(1, title="Page number", gt=0),
    size: int = Query(50, title="Page size", gt=0, le=50),
    category: str | None = None,
    subject: str | None = None,
    doc_type: str | None = None,
    keyword: str | None = None,
    year: int | None = None,
    sorted_by_upload_date: str | None = "desc",
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

    await cache_service.delete_pattern("search:*")

    return deleted_note
