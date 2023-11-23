import datetime
import uuid
from typing import TYPE_CHECKING, Optional, Union, Tuple, List

import boto3
import httpx
from fastapi import UploadFile, HTTPException, Response
from pydantic import ValidationError
from sqlalchemy import exc as SQLAlchemyExceptions
from sqlalchemy import (
    func,
    ForeignKey,
    select,
    update,
    delete,
    DateTime,
    ForeignKeyConstraint,
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
)
from app.utils.exceptions import AppError
from app.utils.file_handler import (
    save_file,
    accepted_doc_type_extensions,
    developer_accepted_doc_type_extensions,
    AWS_CLOUDFRONT_URL,
)
from app.utils.upload_errors import UploadError

if TYPE_CHECKING:
    from app.models.categories import CategoryLevel, Subjects, DocumentTypes


def form_data_note_parser(
    form_data: FormData, idx: int
) -> Union[bool, Tuple[NoteCreateSchema, int]]:
    try:
        note_ds = NoteCreateSchema(
            file=form_data[f"{idx}[file]"],
            category=int(form_data[f"{idx}[category]"]),
            subject=int(form_data[f"{idx}[subject]"]),
            type=int(form_data[f"{idx}[type]"]),
            year=int(form_data[f"{idx}[year]"])
            if form_data[f"{idx}[year]"] != 0
            else None,
            document_name=form_data[f"{idx}[name]"],
        )

    except ValidationError:
        return False

    return note_ds, idx


class Library(Base, CRUD["Library"]):
    __tablename__ = "library"
    __table_args__ = (
        ForeignKeyConstraint(
            ["subject", "category"], ["subjects.id", "subjects.category_id"]
        ),
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
    uploaded_by: Mapped[int] = mapped_column(
        ForeignKey("account.user_id"), nullable=False
    )
    uploaded_on: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now(), index=True
    )
    approved: Mapped[bool] = mapped_column(
        index=True, nullable=False, server_default="f"
    )
    year: Mapped[int] = mapped_column(nullable=True, index=True)

    account: Mapped["Account"] = relationship("Account", back_populates="documents")
    doc_category: Mapped["CategoryLevel"] = relationship(
        "CategoryLevel", back_populates="documents"
    )
    doc_subject: Mapped["Subjects"] = relationship(
        "Subjects", back_populates="documents", foreign_keys=[subject]
    )
    doc_type: Mapped["DocumentTypes"] = relationship(
        "DocumentTypes", back_populates="documents"
    )
    extension: Mapped[str] = mapped_column(server_default=".pdf", nullable=False)

    @classmethod
    async def create_many(
        cls,
        session: AsyncSession,
        uploader_role: RoleEnum,
        form_data: FormData,
        uploaded_by: int,
        s3_bucket: boto3.client,
    ):
        # A form has 6 fields, we have 25 limits so it should be 25 * 6
        if len(form_data) > 25 * 6:
            raise AppError.BAD_REQUEST_ERROR

        valid_notes: List[tuple[NoteCreateSchema, int]] = []
        failed_notes = {
            UploadError.SCHEMA_VALIDATION_ERROR.name: [],
            UploadError.INVALID_FILE_TYPE.name: [],
        }

        document_names = [
            (form_data[f"{i}[name]"], i) for i in range(len(form_data) // 6)
        ]

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
                extension = developer_accepted_doc_type_extensions[
                    note.file.content_type
                ]
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
                await session.refresh(
                    obj, ["doc_category", "doc_type", "doc_subject", "account"]
                )

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
    ):
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
                raise HTTPException(
                    status_code=response.status_code, detail="File not found"
                )

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
            stmt = stmt.where(cls.id == id).where(
                cls.uploaded_by == authenticated.user_id
            )
        else:
            fetch_stmt = fetch_stmt.where(cls.id == id)
            stmt = stmt.where(cls.id == id)

        res = await session.execute(fetch_stmt)
        existing_note = res.scalar()

        if not existing_note:
            raise HTTPException(status_code=404, detail="Note not found")

        if (
            authenticated.role < 2
            and existing_note.uploaded_by != authenticated.user_id
        ):
            raise HTTPException(
                status_code=403, detail="Not authorized to update this note"
            )

        stmt = stmt.values(**data.dict(exclude_none=True))
        await session.execute(stmt)
        await session.commit()
        # import pdb
        # pdb.set_trace()
        await session.refresh(
            existing_note, ["doc_category", "doc_type", "doc_subject", "account"]
        )

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
