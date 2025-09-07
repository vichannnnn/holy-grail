"""
Category management endpoints for educational content organization.

This module provides endpoints for managing categories (education levels),
subjects, and document types. These form the taxonomy for organizing
educational resources in the library system.
"""
from typing import List

from fastapi import APIRouter
from sqlalchemy.orm import joinedload

from app.api.deps import CurrentSession, SessionDeveloper
from app.models.categories import CategoryLevel, DocumentTypes, Subjects
from app.schemas.categories import (
    CategoryCreateSchema,
    CategorySchema,
    CategoryUpdateSchema,
    DocumentTypeCreateSchema,
    DocumentTypeSchema,
    DocumentTypeUpdateSchema,
    SubjectCreateSchema,
    SubjectSchema,
    SubjectUpdateSchema,
)

router = APIRouter()


@router.get("/all_subjects", response_model=List[SubjectSchema])
async def get_subjects_list(
    session: CurrentSession,
    category_id: int = None,
) -> List[SubjectSchema]:
    """
    Get list of all available subjects with optional category filtering.
    
    Returns all subjects in the system, optionally filtered by education level
    (category). Includes category information for each subject.
    
    Args:
        session: Active database session
        category_id: Optional filter by category/education level ID
        
    Returns:
        List[SubjectSchema]: List of subjects with their associated categories
        
    Example:
        GET /all_subjects?category_id=1 returns all O-Level subjects
    """
    filter_ = {"category_id": category_id} if category_id is not None else None
    data = await Subjects.get_all(session, filter_=filter_, options=[joinedload(Subjects.category)])
    return data


@router.get("/all_category_level", response_model=List[CategorySchema])
async def get_category_level_list(
    session: CurrentSession,
) -> List[CategorySchema]:
    """
    Get list of all education levels/categories.
    
    Returns all available education levels in the system
    (e.g., O-Level, A-Level, IB).
    
    Args:
        session: Active database session
        
    Returns:
        List[CategorySchema]: List of all education level categories
    """
    data = await CategoryLevel.get_all(session)
    return data


@router.get("/category", response_model=CategorySchema)
async def get_category(
    category_id: int,
    session: CurrentSession,
) -> CategorySchema:
    """
    Get a specific education level/category by ID.
    
    Returns detailed information about a single education level.
    
    Args:
        category_id: Unique identifier of the category
        session: Active database session
        
    Returns:
        CategorySchema: Category information
        
    Raises:
        HTTPException(404): If category not found
    """
    data = await CategoryLevel.get(session, category_id)
    return data


@router.get("/all_document_type", response_model=List[DocumentTypeSchema])
async def get_notes_type_list(
    session: CurrentSession,
) -> List[DocumentTypeSchema]:
    """
    Get list of all document types.
    
    Returns all available document types for educational resources
    (e.g., Summary Notes, Practice Papers, Past Year Papers).
    
    Args:
        session: Active database session
        
    Returns:
        List[DocumentTypeSchema]: List of all document types
    """
    data = await DocumentTypes.get_all(session)
    return data


@router.post("/subject", response_model=SubjectSchema)
async def add_subject(
    data: SubjectCreateSchema,
    session: CurrentSession,
    is_developer: SessionDeveloper,  # pylint: disable=W0613
) -> SubjectSchema:
    """
    Create a new subject.
    
    Developer-only endpoint for adding new subjects to the system.
    Subjects must be associated with a category/education level.
    
    Args:
        data: Subject creation data including name and category
        session: Active database session
        is_developer: Developer authentication dependency
        
    Returns:
        SubjectSchema: Created subject information
        
    Raises:
        HTTPException(403): If user is not a developer
        HTTPException(400): If subject already exists or invalid data
    """
    data = await Subjects.create(session, dict(data))
    return data


@router.post("/category", response_model=CategorySchema)
async def add_category(
    data: CategoryCreateSchema,
    session: CurrentSession,
    is_developer: SessionDeveloper,  # pylint: disable=W0613
) -> CategorySchema:
    """
    Create a new education level/category.
    
    Developer-only endpoint for adding new education levels
    (e.g., new curriculum types).
    
    Args:
        data: Category creation data including name
        session: Active database session
        is_developer: Developer authentication dependency
        
    Returns:
        CategorySchema: Created category information
        
    Raises:
        HTTPException(403): If user is not a developer
        HTTPException(400): If category already exists
    """
    data = await CategoryLevel.create(session, dict(data))
    return data


@router.post("/document_type", response_model=DocumentTypeSchema)
async def add_notes_type(
    data: DocumentTypeCreateSchema,
    session: CurrentSession,
    is_developer: SessionDeveloper,  # pylint: disable=W0613
) -> DocumentTypeSchema:
    """
    Create a new document type.
    
    Developer-only endpoint for adding new types of educational documents.
    
    Args:
        data: Document type creation data including name
        session: Active database session
        is_developer: Developer authentication dependency
        
    Returns:
        DocumentTypeSchema: Created document type information
        
    Raises:
        HTTPException(403): If user is not a developer
        HTTPException(400): If document type already exists
    """
    data = await DocumentTypes.create(session, dict(data))
    return data


@router.put("/subject", response_model=SubjectSchema)
async def update_subject(
    id: int,  # pylint: disable=W0622, C0103
    data: SubjectUpdateSchema,
    session: CurrentSession,
    is_developer: SessionDeveloper,  # pylint: disable=W0613
) -> SubjectSchema:
    """
    Update an existing subject.
    
    Developer-only endpoint for modifying subject information.
    
    Args:
        id: Unique identifier of the subject to update
        data: Updated subject data
        session: Active database session
        is_developer: Developer authentication dependency
        
    Returns:
        SubjectSchema: Updated subject information
        
    Raises:
        HTTPException(404): If subject not found
        HTTPException(403): If user is not a developer
    """
    data = await Subjects.update(session, id, dict(data))
    return data


@router.put("/category", response_model=CategorySchema)
async def update_category(
    id: int,  # pylint: disable=W0622, C0103
    data: CategoryUpdateSchema,
    session: CurrentSession,
    is_developer: SessionDeveloper,  # pylint: disable=W0613
) -> CategorySchema:
    """
    Update an existing education level/category.
    
    Developer-only endpoint for modifying category information.
    
    Args:
        id: Unique identifier of the category to update
        data: Updated category data
        session: Active database session
        is_developer: Developer authentication dependency
        
    Returns:
        CategorySchema: Updated category information
        
    Raises:
        HTTPException(404): If category not found
        HTTPException(403): If user is not a developer
    """
    data = await CategoryLevel.update(session, id, dict(data))
    return data


@router.put("/document_type", response_model=DocumentTypeSchema)
async def update_notes_type(
    id: int,  # pylint: disable=W0622, C0103
    data: DocumentTypeUpdateSchema,
    session: CurrentSession,
    is_developer: SessionDeveloper,  # pylint: disable=W0613
) -> DocumentTypeSchema:
    """
    Update an existing document type.
    
    Developer-only endpoint for modifying document type information.
    
    Args:
        id: Unique identifier of the document type to update
        data: Updated document type data
        session: Active database session
        is_developer: Developer authentication dependency
        
    Returns:
        DocumentTypeSchema: Updated document type information
        
    Raises:
        HTTPException(404): If document type not found
        HTTPException(403): If user is not a developer
    """
    data = await DocumentTypes.update(session, id, dict(data))
    return data
