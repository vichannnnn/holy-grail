from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_session
from app.models.categories import Subjects, CategoryLevel, DocumentTypes
from app.schemas.categories import CategorySchema, SubjectSchema, DocumentTypeSchema
from typing import List

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
