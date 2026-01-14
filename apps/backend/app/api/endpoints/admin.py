"""
Administrative endpoints for platform management.

This module provides endpoints for admin and developer operations including
content approval, user management, and role updates. Access is restricted
based on user roles (admin/developer).
"""
from fastapi import APIRouter, Query

from app.api.deps import CurrentSession, SessionAdmin, SessionDeveloper
from app.models.auth import Account
from app.models.library import Library
from app.schemas.auth import CurrentUserSchema, PaginatedUsersSchema, UpdateUserRoleSchema
from app.schemas.library import NoteSchema

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
    moderation workflow.

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
    return note


@router.get("/users", response_model=PaginatedUsersSchema)
async def get_all_account(
    session: CurrentSession,
    authenticated: SessionDeveloper,  # pylint: disable=W0613
    page: int = Query(1, title="Page number", gt=0),
    size: int = Query(20, title="Page size", gt=0, le=50),
) -> PaginatedUsersSchema:
    """
    Get paginated list of all registered users.

    Developer-only endpoint that returns paginated user accounts sorted by ID.
    Useful for user management and analytics.

    Args:
        session: Active database session
        authenticated: Developer user with access permissions
        page: Page number (1-indexed)
        size: Number of items per page (max 50)

    Returns:
        PaginatedUsersSchema: Paginated list of users with metadata

    Raises:
        HTTPException(403): If user is not a developer
    """
    res = await Account.get_all_users_paginated(session, page=page, size=size)
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
