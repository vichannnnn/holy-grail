from typing import List

from fastapi import APIRouter
from sqlalchemy.orm import joinedload
from app.api.deps import CurrentSession, SessionDeveloper
from app.models.categories import Subjects, CategoryLevel, DocumentTypes
from app.schemas.categories import (
    CategorySchema,
    SubjectSchema,
    DocumentTypeSchema,
    SubjectCreateSchema,
    CategoryCreateSchema,
    DocumentTypeCreateSchema,
    SubjectUpdateSchema,
    DocumentTypeUpdateSchema,
    CategoryUpdateSchema,
)

router = APIRouter()


@router.get("/all_subjects", response_model=List[SubjectSchema])
async def get_subjects_list(
    session: CurrentSession,
    category_id: int = None,
):
    filter_ = {"category_id": category_id} if category_id is not None else None
    data = await Subjects.get_all(
        session, filter_=filter_, options=[joinedload(Subjects.category)]
    )
    return data


@router.get("/all_category_level", response_model=List[CategorySchema])
async def get_category_level_list(
    session: CurrentSession,
):
    data = await CategoryLevel.get_all(session)
    return data


@router.get("/category", response_model=CategorySchema)
async def get_category(
    category_id: int,
    session: CurrentSession,
):
    data = await CategoryLevel.get(session, category_id)
    return data


@router.get("/all_document_type", response_model=List[DocumentTypeSchema])
async def get_notes_type_list(
    session: CurrentSession,
):
    data = await DocumentTypes.get_all(session)
    return data


@router.post("/subject", response_model=SubjectSchema)
async def add_subject(
    data: SubjectCreateSchema,
    session: CurrentSession,
    is_developer: SessionDeveloper,  # pylint: disable=W0613
):
    data = await Subjects.create(session, dict(data))
    return data


@router.post("/category", response_model=CategorySchema)
async def add_category(
    data: CategoryCreateSchema,
    session: CurrentSession,
    is_developer: SessionDeveloper,  # pylint: disable=W0613
):
    data = await CategoryLevel.create(session, dict(data))
    return data


@router.post("/document_type", response_model=DocumentTypeSchema)
async def add_notes_type(
    data: DocumentTypeCreateSchema,
    session: CurrentSession,
    is_developer: SessionDeveloper,  # pylint: disable=W0613
):
    data = await DocumentTypes.create(session, dict(data))
    return data


@router.put("/subject", response_model=SubjectSchema)
async def update_subject(
    id: int,  # pylint: disable=W0622, C0103
    data: SubjectUpdateSchema,
    session: CurrentSession,
    is_developer: SessionDeveloper,  # pylint: disable=W0613
):
    data = await Subjects.update(session, id, dict(data))
    return data


@router.put("/category", response_model=CategorySchema)
async def update_category(
    id: int,  # pylint: disable=W0622, C0103
    data: CategoryUpdateSchema,
    session: CurrentSession,
    is_developer: SessionDeveloper,  # pylint: disable=W0613
):
    data = await CategoryLevel.update(session, id, dict(data))
    return data


@router.put("/document_type", response_model=DocumentTypeSchema)
async def update_notes_type(
    id: int,  # pylint: disable=W0622, C0103
    data: DocumentTypeUpdateSchema,
    session: CurrentSession,
    is_developer: SessionDeveloper,  # pylint: disable=W0613
):
    data = await DocumentTypes.update(session, id, dict(data))
    return data


#
# @router.delete("/subject", response_model=SubjectSchema)
# async def delete_subject(
#     id: int,
#     session: CurrentSession,
#     is_admin: SessionDeveloper,
# ):
#     data = await Subjects.delete(session, id)
#     return data
#
#
# @router.delete("/category", response_model=CategorySchema)
# async def delete_category(
#     id: int,
#     session: CurrentSession,
#     is_admin: SessionDeveloper,
# ):
#     data = await CategoryLevel.delete(session, id)
#     return data
#
#
# @router.delete("/document_type", response_model=DocumentTypeSchema)
# async def delete_notes_type(
#     id: int,
#     session: CurrentSession,
#     is_admin: SessionDeveloper,
# ):
#     data = await DocumentTypes.delete(session, id)
#     return data
