from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_session
from app.models.auth import Authenticator
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
        session: AsyncSession = Depends(get_session),
):
    data = await Subjects.get_all(session)
    return data


@router.get("/all_category_level", response_model=List[CategorySchema])
async def get_category_level_list(
        session: AsyncSession = Depends(get_session),
):
    data = await CategoryLevel.get_all(session)
    return data


@router.get("/all_document_type", response_model=List[DocumentTypeSchema])
async def get_notes_type_list(
        session: AsyncSession = Depends(get_session),
):
    data = await DocumentTypes.get_all(session)
    return data


@router.post("/subject", response_model=SubjectSchema)
async def add_subject(
        data: SubjectCreateSchema,
        session: AsyncSession = Depends(get_session),
        is_admin: bool = Depends(Authenticator.get_developer),
):
    data = await Subjects.create(session, dict(data))
    return data


@router.post("/category", response_model=CategorySchema)
async def add_category(
        data: CategoryCreateSchema,
        session: AsyncSession = Depends(get_session),
        is_admin: bool = Depends(Authenticator.get_developer),
):
    data = await CategoryLevel.create(session, dict(data))
    return data


@router.post("/document_type", response_model=DocumentTypeSchema)
async def add_notes_type(
        data: DocumentTypeCreateSchema,
        session: AsyncSession = Depends(get_session),
        is_admin: bool = Depends(Authenticator.get_developer),
):
    data = await DocumentTypes.create(session, dict(data))
    return data


@router.put("/subject", response_model=SubjectSchema)
async def update_subject(
        id: int,
        data: SubjectUpdateSchema,
        session: AsyncSession = Depends(get_session),
        is_admin: bool = Depends(Authenticator.get_developer),
):
    data = await Subjects.update(session, id, dict(data))
    return data


@router.put("/category", response_model=CategorySchema)
async def update_category(
        id: int,
        data: CategoryUpdateSchema,
        session: AsyncSession = Depends(get_session),
        is_admin: bool = Depends(Authenticator.get_developer),
):
    data = await CategoryLevel.update(session, id, dict(data))
    return data


@router.put("/document_type", response_model=DocumentTypeSchema)
async def update_notes_type(
        id: int,
        data: DocumentTypeUpdateSchema,
        session: AsyncSession = Depends(get_session),
        is_admin: bool = Depends(Authenticator.get_developer),
):
    data = await DocumentTypes.update(session, id, dict(data))
    return data

#
# @router.delete("/subject", response_model=SubjectSchema)
# async def delete_subject(
#     id: int,
#     session: AsyncSession = Depends(get_session),
#     is_admin: bool = Depends(Authenticator.get_developer),
# ):
#     data = await Subjects.delete(session, id)
#     return data
#
#
# @router.delete("/category", response_model=CategorySchema)
# async def delete_category(
#     id: int,
#     session: AsyncSession = Depends(get_session),
#     is_admin: bool = Depends(Authenticator.get_developer),
# ):
#     data = await CategoryLevel.delete(session, id)
#     return data
#
#
# @router.delete("/document_type", response_model=DocumentTypeSchema)
# async def delete_notes_type(
#     id: int,
#     session: AsyncSession = Depends(get_session),
#     is_admin: bool = Depends(Authenticator.get_developer),
# ):
#     data = await DocumentTypes.delete(session, id)
#     return data
