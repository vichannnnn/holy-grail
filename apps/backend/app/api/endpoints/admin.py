"""
Administrative endpoints for platform management.

This module provides endpoints for admin and developer operations including
content approval, user management, role updates, and search index management.
Access is restricted based on user roles (admin/developer).
"""
from fastapi import APIRouter, Query

from app.api.deps import CurrentSession, SessionAdmin, SessionDeveloper
from app.models.auth import Account
from app.models.library import Library
from app.schemas.auth import CurrentUserSchema, PaginatedUsersSchema, UpdateUserRoleSchema
from app.schemas.library import NoteSchema, SearchIndexStatsSchema
from app.services import search_service, task_client

router = APIRouter()


@router.put("/approve/{id}", response_model=NoteSchema)
async def approve_note(
    session: CurrentSession,
    authenticated: SessionAdmin,  # pylint: disable=W0613
    id: int,  # pylint: disable=W0622, C0103
) -> NoteSchema:
    """
    Approve a pending educational note for public access.

    Admin-only endpoint that marks a note as approved, making it visible
    to all users in the library. This is the final step in the content
    moderation workflow. The document is automatically queued for indexing
    to OpenSearch via a background Celery task.

    Args:
        session: Active database session
        authenticated: Admin user with approval permissions
        id: Unique identifier of the note to approve

    Returns:
        NoteSchema: Approved note with updated status

    Raises:
        HTTPException(404): If note not found
        HTTPException(403): If user is not an admin
        HTTPException(400): If note is already approved
    """
    note = await Library.approve_note(session, id)

    await task_client.trigger_index_document(
        doc_id=note.id,
        document_name=note.document_name,
        category=note.doc_category.name,
        subject=note.doc_subject.name,
        doc_type=note.doc_type.name,
        year=note.year,
        uploaded_by=note.account.username,
        uploaded_on=note.uploaded_on,
        file_name=note.file_name,
        extension=note.extension,
    )

    return note


@router.get("/users", response_model=PaginatedUsersSchema)
async def get_all_account(
    session: CurrentSession,
    authenticated: SessionDeveloper,  # pylint: disable=W0613
    page: int = Query(1, title="Page number", gt=0),
    size: int = Query(20, title="Page size", gt=0, le=50),
    search: str | None = Query(None, title="Search by username"),
) -> PaginatedUsersSchema:
    """
    Get paginated list of all registered users.

    Developer-only endpoint that returns paginated user accounts sorted by role
    (descending: Developer > Admin > User). Supports optional username search.

    Args:
        session: Active database session
        authenticated: Developer user with access permissions
        page: Page number (1-indexed)
        size: Number of items per page (max 50)
        search: Optional username search filter (case-insensitive partial match)

    Returns:
        PaginatedUsersSchema: Paginated list of users with metadata

    Raises:
        HTTPException(403): If user is not a developer
    """
    res = await Account.get_all_users_paginated(session, page=page, size=size, search=search)
    return res


@router.get("/user/{id}", response_model=CurrentUserSchema)
async def get_account(
    session: CurrentSession,
    authenticated: SessionDeveloper,  # pylint: disable=W0613
    id: int,  # pylint: disable=W0622, C0103
) -> CurrentUserSchema:
    """
    Get a specific user's account details.

    Developer-only endpoint for retrieving detailed information about
    a specific user account.

    Args:
        session: Active database session
        authenticated: Developer user with access permissions
        id: Unique identifier of the user

    Returns:
        CurrentUserSchema: User account details

    Raises:
        HTTPException(404): If user not found
        HTTPException(403): If requester is not a developer
    """
    res = await Account.get(session, id=id)
    return res


@router.put("/user/{id}", response_model=CurrentUserSchema)
async def update_account(
    session: CurrentSession,
    authenticated: SessionDeveloper,  # pylint: disable=W0613
    id: int,  # pylint: disable=W0622, C0103
    data: UpdateUserRoleSchema,
) -> CurrentUserSchema:
    """
    Update a user's role and permissions.

    Developer-only endpoint for modifying user roles (e.g., promoting
    to admin, developer status). Critical for access control management.

    Args:
        session: Active database session
        authenticated: Developer user with update permissions
        id: Unique identifier of the user to update
        data: New role information

    Returns:
        CurrentUserSchema: Updated user information

    Raises:
        HTTPException(404): If user not found
        HTTPException(403): If requester is not a developer
        HTTPException(400): If role update is invalid
    """
    res = await Account.update(session, id=id, data=dict(data))
    return res


@router.get("/search/status", response_model=SearchIndexStatsSchema)
async def get_search_index_status(
    authenticated: SessionDeveloper,
) -> SearchIndexStatsSchema:
    """
    Get OpenSearch index status and statistics.

    Developer-only endpoint that returns information about the search index
    including availability, document count, and storage size.

    Args:
        authenticated: Developer user with access permissions

    Returns:
        SearchIndexStatsSchema: Index statistics and health status
    """
    available = search_service.is_available()
    if not available:
        return SearchIndexStatsSchema(available=False)

    stats = search_service.get_index_stats()
    if stats is None:
        return SearchIndexStatsSchema(available=True, exists=False)

    return SearchIndexStatsSchema(
        available=True,
        exists=stats.get("exists", False),
        doc_count=stats.get("doc_count", 0),
        size_mb=stats.get("size_mb", 0.0),
    )


@router.post("/search/reindex")
async def reindex_search(
    session: CurrentSession,
    authenticated: SessionDeveloper,  # noqa: ARG001
    recreate_index: bool = Query(False, title="Delete and recreate index"),
) -> dict:
    """
    Trigger a full reindex of all approved documents to OpenSearch.

    Developer-only endpoint that queues Celery tasks for each approved document,
    ensuring full PDF text extraction. Can optionally delete and recreate the
    index before queuing tasks.

    Args:
        session: Active database session
        authenticated: Developer user with reindex permissions
        recreate_index: If True, delete existing index before reindexing

    Returns:
        dict: Status message with count of queued tasks
    """
    if recreate_index and search_service.is_available():
        search_service.create_index(delete_existing=True)

    from sqlalchemy import select
    from sqlalchemy.orm import selectinload

    stmt = (
        select(Library)
        .where(Library.approved == True)  # noqa: E712
        .options(
            selectinload(Library.account),
            selectinload(Library.doc_category),
            selectinload(Library.doc_subject),
            selectinload(Library.doc_type),
        )
    )
    result = await session.execute(stmt)
    documents = result.scalars().all()

    docs_to_index = [
        {
            "doc_id": doc.id,
            "document_name": doc.document_name,
            "category": doc.doc_category.name,
            "subject": doc.doc_subject.name,
            "doc_type": doc.doc_type.name,
            "year": doc.year,
            "uploaded_by": doc.account.username,
            "uploaded_on": doc.uploaded_on,
            "file_name": doc.file_name,
            "extension": doc.extension,
        }
        for doc in documents
    ]

    queued, failed = await task_client.trigger_bulk_index(docs_to_index)

    return {
        "status": "started",
        "message": f"Queued {queued} documents for indexing",
        "total_documents": len(docs_to_index),
        "queued": queued,
        "failed": failed,
        "recreate_index": recreate_index,
    }
