"""
Library model for educational resource management.

This module defines the Library model for storing and managing educational
documents including summary notes, practice papers, and other study materials.
It handles file uploads, categorization, approval workflows, and download tracking.
"""
import datetime
import uuid
from typing import TYPE_CHECKING, List, Optional, Tuple, Union

import boto3
import httpx
from fastapi import HTTPException, Response, UploadFile
from pydantic import ValidationError
from sqlalchemy import (
    DateTime,
    ForeignKey,
    ForeignKeyConstraint,
    delete,
    exc as SQLAlchemyExceptions,
    func,
    select,
    update,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column, relationship, selectinload
from sqlalchemy.sql.expression import text
from starlette.datastructures import FormData

from app.crud.base import CRUD
from app.db.base_class import Base
from app.models.auth import Account
from app.schemas.auth import RoleEnum
from app.schemas.library import (
    NoteCreateSchema,
    NoteInsertSchema,
    NoteSchema,
    NoteUpdateSchema,
    UserUploadCount,
)
from app.utils.exceptions import AppError
from app.utils.file_handler import (
    AWS_CLOUDFRONT_URL,
    accepted_doc_type_extensions,
    developer_accepted_doc_type_extensions,
    save_file,
)
from app.utils.upload_errors import UploadError

if TYPE_CHECKING:
    from app.models.categories import CategoryLevel, DocumentTypes, Subjects
    from app.models.favourites import UserFavourites


def form_data_note_parser(
    form_data: FormData, idx: int
) -> Union[bool, Tuple[NoteCreateSchema, int]]:
    """
    Parse and validate a single note's fields from multipart form data for batch uploads.
    
    Parameters:
        form_data (FormData): The multipart form data containing file and metadata fields keyed by index (e.g. "0[file]", "0[category]").
        idx (int): The numeric index identifying which note's fields to parse.
    
    Returns:
        Union[bool, Tuple[NoteCreateSchema, int]]: A tuple (NoteCreateSchema, idx) when parsing and validation succeed, or `False` if validation fails.
    """
    try:
        note_ds = NoteCreateSchema(
            file=form_data[f"{idx}[file]"],
            category=int(form_data[f"{idx}[category]"]),
            subject=int(form_data[f"{idx}[subject]"]),
            type=int(form_data[f"{idx}[type]"]),
            year=int(form_data[f"{idx}[year]"]) if form_data[f"{idx}[year]"] != 0 else None,
            document_name=form_data[f"{idx}[name]"],
        )

    except ValidationError:
        return False

    return note_ds, idx


class Library(Base, CRUD["Library"]):
    """
    Educational document library model.

    Manages educational resources with features including:
    - Multi-category organization (O-Level, A-Level, IB)
    - Subject and document type categorization
    - File upload and storage management
    - Approval workflow for quality control
    - Download tracking and analytics
    - Support for various file formats (PDF, images, etc.)

    Attributes:
        id: Primary key identifier
        category: Education level (foreign key to category_level)
        subject: Subject area (foreign key to subjects)
        type: Document type (foreign key to documents)
        document_name: Display name for the document
        file_name: Unique stored filename
        view_count: Number of downloads/views
        uploaded_by: User who uploaded the document
        uploaded_on: Upload timestamp
        approved: Admin approval status
        year: Year of examination (optional)
        extension: File extension
        account: Relationship to uploader account
        doc_category: Relationship to category level
        doc_subject: Relationship to subject
        doc_type: Relationship to document type
    """

    __tablename__ = "library"
    __table_args__ = (
        ForeignKeyConstraint(["subject", "category"], ["subjects.id", "subjects.category_id"]),
    )

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    category: Mapped[int] = mapped_column(
        ForeignKey("category_level.id", onupdate="CASCADE"),
        nullable=False,
        index=True,
    )
    subject: Mapped[int] = mapped_column(
        ForeignKey("subjects.id", onupdate="CASCADE"),
        nullable=False,
        index=True,
    )
    type: Mapped[int] = mapped_column(
        ForeignKey("documents.id", onupdate="CASCADE"),
        nullable=False,
        index=True,
    )
    document_name: Mapped[str] = mapped_column(nullable=False, index=True)
    file_name: Mapped[str] = mapped_column(nullable=False, unique=True)
    view_count: Mapped[int] = mapped_column(server_default=text("0"), nullable=False)
    uploaded_by: Mapped[int] = mapped_column(ForeignKey("account.user_id"), nullable=False)
    uploaded_on: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now(), index=True
    )
    approved: Mapped[bool] = mapped_column(index=True, nullable=False, server_default="f")
    year: Mapped[int] = mapped_column(nullable=True, index=True)
    extension: Mapped[str] = mapped_column(server_default=".pdf", nullable=False)

    account: Mapped["Account"] = relationship("Account", back_populates="documents")
    doc_category: Mapped["CategoryLevel"] = relationship(
        "CategoryLevel", back_populates="documents"
    )
    doc_subject: Mapped["Subjects"] = relationship(
        "Subjects", back_populates="documents", foreign_keys=[subject]
    )
    doc_type: Mapped["DocumentTypes"] = relationship("DocumentTypes", back_populates="documents")
    favourited_by: Mapped[List["UserFavourites"]] = relationship("UserFavourites", back_populates="library_file", cascade="all, delete-orphan")

    @classmethod
    async def create_many(
        cls,
        session: AsyncSession,
        uploader_role: RoleEnum,
        form_data: FormData,
        uploaded_by: int,
        s3_bucket: boto3.client,
    ) -> List[NoteSchema]:
        """
        Create multiple Library records from multipart form data and upload their files to S3.
        
        Parses and validates each note in the provided multipart form data, enforces per-role allowed file types, saves files to the given S3 bucket, and inserts corresponding Library records in the database as a single transaction.
        
        Parameters:
            session (AsyncSession): Active async database session used for inserts and refreshes.
            uploader_role (RoleEnum): Role of the uploader; determines which file extensions are accepted.
            form_data (FormData): Multipart form data containing note metadata and file uploads.
            uploaded_by (int): ID of the user performing the upload; assigned to each created record.
            s3_bucket (boto3.client): S3 client used to store uploaded files.
        
        Returns:
            List[Library]: List of created Library model instances (refreshed with related entities).
        
        Raises:
            AppError.BAD_REQUEST_ERROR: If the multipart form contains more fields than the allowed limit.
            AppError.MULTIPLE_GENERIC_ERRORS: If one or more notes fail schema validation or have invalid file types.
            AppError.RESOURCES_NOT_FOUND_ERROR: If a database integrity error occurs during insertion.
        """
        # A form has 6 fields, we have 25 limits so it should be 25 * 6
        if len(form_data) > 25 * 6:
            raise AppError.BAD_REQUEST_ERROR

        valid_notes: List[tuple[NoteCreateSchema, int]] = []
        failed_notes = {
            UploadError.SCHEMA_VALIDATION_ERROR.name: [],
            UploadError.INVALID_FILE_TYPE.name: [],
        }

        document_names = [(form_data[f"{i}[name]"], i) for i in range(len(form_data) // 6)]

        for _, idx in document_names:
            res, idx = form_data_note_parser(form_data, idx)
            if res:
                valid_notes.append((res, idx))
            else:
                failed_notes[UploadError.SCHEMA_VALIDATION_ERROR.name].append(idx)

        idxes_to_remove = []
        for note, idx in valid_notes:
            try:
                if uploader_role == uploader_role.DEVELOPER:
                    developer_accepted_doc_type_extensions[note.file.content_type]
                else:
                    accepted_doc_type_extensions[note.file.content_type]

            except KeyError:
                failed_notes[UploadError.INVALID_FILE_TYPE.name].append(idx)
                idxes_to_remove.append(idx)

        valid_notes: List[tuple[NoteCreateSchema, int]] = [
            (elem[0], elem[1]) for elem in valid_notes if elem[1] not in idxes_to_remove
        ]

        # Check if there are any note input field that are not valid, if so, raise an error for them to fix.
        if len([e for sub in failed_notes.values() for e in sub]) != 0:
            raise AppError.MULTIPLE_GENERIC_ERRORS(**failed_notes)

        objs = []
        files: List[Tuple[UploadFile, str]] = []
        for note, _ in valid_notes:
            if uploader_role.DEVELOPER:
                extension = developer_accepted_doc_type_extensions[note.file.content_type]
            else:
                extension = accepted_doc_type_extensions[note.file.content_type]

            file_id = uuid.uuid4().hex
            file_name = file_id
            data_insert = NoteInsertSchema(
                **note.dict(),
                uploaded_by=uploaded_by,
                file_name=file_name + extension,
                extension=extension,
            )
            obj = Library(**data_insert.dict())
            objs.append(obj)
            files.append((note.file, file_name + extension))

        try:
            session.add_all(objs)

            for file, file_name in files:
                await save_file(file, file_name, s3_bucket)

            await session.commit()
            for obj in objs:
                await session.refresh(obj, ["doc_category", "doc_type", "doc_subject", "account"])

        except SQLAlchemyExceptions.IntegrityError as exc:
            await session.rollback()
            raise AppError.RESOURCES_NOT_FOUND_ERROR from exc
        return objs

    @classmethod
    async def get_all_notes_paginated(
        cls,
        session: AsyncSession,
        page: int,
        size: int,
        approved: bool = True,
        category: Optional[str] = None,
        subject: Optional[str] = None,
        doc_type: Optional[str] = None,
        keyword: Optional[str] = None,
        year: Optional[int] = None,
        sorted_by_upload_date: Optional[str] = "desc",
        favourites_only: Optional[str] = None,
        user_id: Optional[int] = None,
    ):
        """
        Retrieve paginated library notes with optional filters, sorting, and favourite-only filtering.
        
        Parameters:
            session (AsyncSession): Database session used to run queries.
            page (int): 1-based page number.
            size (int): Number of items per page.
            approved (bool): If True, only include notes marked approved.
            category (Optional[str]): Filter by category name.
            subject (Optional[str]): Filter by subject name.
            doc_type (Optional[str]): Filter by document type name.
            keyword (Optional[str]): Case-insensitive substring match against `document_name`.
            year (Optional[int]): Filter by document year.
            sorted_by_upload_date (Optional[str]): "asc" or "desc" to sort by upload date (default "desc").
            favourites_only (Optional[str]): When equal to the string "true" and `user_id` is provided, restrict results to items favourited by that user.
            user_id (Optional[int]): User identifier used together with `favourites_only` to filter favourites.
        
        Returns:
            dict: A pagination result with keys:
                - "items": list of Library instances for the requested page.
                - "page": the requested page number.
                - "pages": total number of pages.
                - "size": page size used.
                - "total": total number of matching items.
        """
        stmt = select(cls).where(cls.approved == approved)

        if category:
            stmt = stmt.where(cls.doc_category.has(name=category))

        if subject:
            stmt = stmt.where(cls.doc_subject.has(name=subject))

        if doc_type:
            stmt = stmt.where(cls.doc_type.has(name=doc_type))

        if year:
            stmt = stmt.where(cls.year == year)

        if keyword:
            stmt = stmt.where(cls.document_name.ilike(f"%{keyword}%"))

        if user_id and favourites_only == "true":
            stmt = stmt.where(cls.favourited_by.any(user_id=user_id))

        if sorted_by_upload_date == "asc":
            stmt = stmt.order_by(cls.uploaded_on.asc())
        else:
            stmt = stmt.order_by(cls.uploaded_on.desc())

        count_stmt = select(func.count()).select_from(stmt)  # pylint: disable=E1102
        total = await session.scalar(count_stmt)

        stmt = stmt.limit(size).offset((page - 1) * size)
        stmt = stmt.options(
            selectinload(cls.account).load_only(Account.user_id, Account.username),
            selectinload(cls.doc_category),
            selectinload(cls.doc_subject),
            selectinload(cls.doc_type),
        )

        res = await session.execute(stmt)
        pages = total // size if total % size == 0 else (total // size) + 1
        return {
            "items": res.scalars().all(),
            "page": page,
            "pages": pages,
            "size": size,
            "total": total,
        }

    @classmethod
    async def get(cls, session: AsyncSession, id: int) -> NoteSchema:  # pylint: disable=W0622, C0103
        stmt = (
            select(cls)
            .where(cls.id == id)
            .options(
                selectinload(cls.account).load_only(Account.user_id, Account.username),
                selectinload(cls.doc_category),
                selectinload(cls.doc_subject),
                selectinload(cls.doc_type),
            )
        )
        result = await session.execute(stmt)
        res = result.scalar()

        if not res:
            raise HTTPException(status_code=404, detail="Note not found")
        return res

    @classmethod
    async def download(cls, session: AsyncSession, id: int):  # pylint: disable=W0622, C0103
        note: NoteSchema = await cls.get(session, id)
        url = AWS_CLOUDFRONT_URL + "/" + note.file_name

        async with httpx.AsyncClient() as client:
            response = await client.get(url)

            if response.status_code == 200:
                content = response.content
                response = Response(content=content)
                response.headers[
                    "Content-Disposition"
                ] = f"attachment; filename={note.document_name}{note.extension}"
                return response
            else:
                raise HTTPException(status_code=response.status_code, detail="File not found")

    @classmethod
    async def update_note(
        cls,
        session: AsyncSession,
        id: int,  # pylint: disable=W0622, C0103
        authenticated: Account,
        data: NoteUpdateSchema,
    ):
        stmt = update(cls)
        fetch_stmt = select(cls)

        if authenticated.role < 2:
            fetch_stmt = fetch_stmt.where(cls.id == id).where(
                cls.uploaded_by == authenticated.user_id
            )
            stmt = stmt.where(cls.id == id).where(cls.uploaded_by == authenticated.user_id)
        else:
            fetch_stmt = fetch_stmt.where(cls.id == id)
            stmt = stmt.where(cls.id == id)

        res = await session.execute(fetch_stmt)
        existing_note = res.scalar()

        if not existing_note:
            raise HTTPException(status_code=404, detail="Note not found")

        if authenticated.role < 2 and existing_note.uploaded_by != authenticated.user_id:
            raise HTTPException(status_code=403, detail="Not authorized to update this note")

        stmt = stmt.values(**data.dict(exclude_none=True))
        await session.execute(stmt)
        await session.commit()
        # import pdb
        # pdb.set_trace()
        await session.refresh(existing_note, ["doc_category", "doc_type", "doc_subject", "account"])

        return existing_note

    @classmethod
    async def approve_note(
        cls,
        session: AsyncSession,
        id: int,  # pylint: disable=W0622, C0103
    ):
        stmt = update(cls)
        fetch_stmt = select(cls)
        fetch_stmt = fetch_stmt.where(cls.id == id)
        stmt = stmt.where(cls.id == id)

        stmt = stmt.values({"approved": True})
        await session.execute(stmt)
        await session.commit()

        fetch_stmt = fetch_stmt.options(
            selectinload(cls.account).load_only(Account.user_id, Account.username),
            selectinload(cls.doc_category),
            selectinload(cls.doc_subject),
            selectinload(cls.doc_type),
        )

        res = await session.execute(fetch_stmt)
        updated_object = res.scalar()
        return updated_object

    @classmethod
    async def delete_note(
        cls,
        session: AsyncSession,
        authenticated: Account,
        id: int,  # pylint: disable=W0622, C0103
    ):
        stmt = delete(cls).where(cls.id == id)
        fetch_stmt = (
            select(cls)
            .where(cls.id == id)
            .options(
                selectinload(cls.account).load_only(Account.user_id, Account.username),
                selectinload(cls.doc_category),
                selectinload(cls.doc_subject),
                selectinload(cls.doc_type),
            )
        )

        res = await session.execute(fetch_stmt)
        deleted_note = res.scalar()

        if not deleted_note:
            raise HTTPException(status_code=404, detail="Notes not found")

        await session.execute(stmt)
        await session.commit()
        return deleted_note

    @classmethod
    async def get_latest_scoreboard_users_stats(
        cls, session: AsyncSession
    ) -> List[UserUploadCount]:
        stmt = (
            select(cls.uploaded_by, func.count(cls.id).label("upload_count"))
            .where(cls.approved == True)
            .group_by(cls.uploaded_by)
        )

        res = await session.execute(stmt)
        return [UserUploadCount(**row._asdict()) for row in res]