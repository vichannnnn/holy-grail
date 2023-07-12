import datetime
from typing import TYPE_CHECKING, Optional, List

from fastapi import UploadFile, HTTPException
from sqlalchemy import func, ForeignKey, select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column, relationship, selectinload
from sqlalchemy.sql.expression import text
from starlette.datastructures import (
    UploadFile as StarletteUploadFile,
    FormData as StarletteFormData,
)

from app.db.base_class import Base
from app.utils.exceptions import AppError
from app.utils.file_handler import save_file, accepted_doc_type_extensions
from app.models.auth import Account
from app.schemas.library import NoteCreateSchema, NoteSchema

if TYPE_CHECKING:
    from app.models.categories import CategoryLevel, Subjects, DocumentTypes


class Library(Base, CRUD["Library"]):
    __tablename__ = "library"

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
    document_name: Mapped[str] = mapped_column(nullable=False, unique=True)
    file_name: Mapped[str] = mapped_column(nullable=False, unique=True)
    view_count: Mapped[int] = mapped_column(server_default=text("0"), nullable=False)
    uploaded_by: Mapped[int] = mapped_column(
        ForeignKey("account.user_id"), nullable=False
    )
    uploaded_on: Mapped[datetime.datetime] = mapped_column(
        nullable=False, server_default=func.now(), index=True  # pylint: disable=E1102
    )
    approved: Mapped[bool] = mapped_column(nullable=False, server_default="f")

    account: Mapped["Account"] = relationship(back_populates="documents")
    doc_category: Mapped["CategoryLevel"] = relationship(back_populates="documents")
    doc_subject: Mapped["Subjects"] = relationship(back_populates="documents")
    doc_type: Mapped["DocumentTypes"] = relationship(back_populates="documents")

    @classmethod
    async def create_note(
        cls,
        session: AsyncSession,
        uploaded_file: UploadFile,
        uploaded_by: int,
        data: NoteCreateSchema,
        s3_bucket,
    ):
        if uploaded_file.content_type not in accepted_doc_type_extensions:
            raise AppError.BAD_REQUEST_ERROR

        if not isinstance(uploaded_file, StarletteUploadFile):
            raise AppError.BAD_REQUEST_ERROR

        extension = accepted_doc_type_extensions[uploaded_file.content_type]
        file_id = uuid.uuid4().hex
        file_name = file_id + extension
        data_insert = NoteInsertSchema(
            **data.dict(), uploaded_by=uploaded_by, file_name=file_name
        )

        res = await super().create(session, data_insert.dict())
        await session.refresh(
            res, ["doc_category", "doc_type", "doc_subject", "account"]
        )
        await save_file(uploaded_file, file_name, s3_bucket)
        return res

    @classmethod
    async def create_many(
        cls,
        session: AsyncSession,
        form_data: StarletteFormData,
        uploaded_by: int,
        s3_bucket,
    ):
        max_index = int(form_data["maxIndex"])
        datas = [
            NoteCreateSchema(
                category=form_data[f"category {i}"],
                subject=form_data[f"subject {i}"],
                type=form_data[f"type {i}"],
                document_name=form_data[f"document_name {i}"],
            )
            for i in range(max_index + 1)
        ]
        uploaded_files = [form_data[f"file {i}"] for i in range(max_index + 1)]

        objs = []
        for uploaded_file, data in zip(uploaded_files, datas):
            if uploaded_file.content_type not in accepted_doc_type_extensions.keys():
                raise AppError.INVALID_FILE_TYPE_ERROR

            extension = accepted_doc_type_extensions[uploaded_file.content_type]
            data_json = data.dict()
            data_json["uploaded_by"] = uploaded_by
            if isinstance(uploaded_file, StarletteUploadFile):
                file_name = await save_file(uploaded_file, extension, s3_bucket)
                data_json["file_name"] = file_name

            obj = Library(**data_json)
            objs.append(obj)

        try:
            session.add_all(objs)
            await session.commit()

        except SQLAlchemyExceptions.IntegrityError as exc:
            if str(exc).find("ForeignKeyViolationError") != -1:
                raise AppError.CATEGORY_DOES_NOT_EXISTS_ERROR
            elif str(exc).find("UniqueViolationError") != -1:
                raise AppError.DOCUMENT_NAME_ALREADY_EXISTS_ERROR from exc
            raise AppError.DOCUMENT_NAME_ALREADY_EXISTS_ERROR from exc
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
    ):
        stmt = select(cls).where(cls.approved == approved)

        if category:
            stmt = stmt.where(cls.doc_category.has(name=category))

        if subject:
            stmt = stmt.where(cls.doc_subject.has(name=subject))

        if doc_type:
            stmt = stmt.where(cls.doc_type.has(name=doc_type))

        count_stmt = select(func.count()).select_from(stmt)  # pylint: disable=E1102
        total = await session.scalar(count_stmt)

        stmt = stmt.limit(size).offset((page - 1) * size)
        stmt = stmt.options(
            selectinload(cls.account).load_only(Account.user_id, Account.username),
            selectinload(cls.doc_category),
            selectinload(cls.doc_subject),
            selectinload(cls.doc_type),
        )

        result = await session.execute(stmt)
        pages = total // size if total % size == 0 else (total // size) + 1
        return {
            "items": result.scalars().all(),
            "page": page,
            "pages": pages,
            "size": size,
            "total": total,
        }

    @classmethod
    async def get(cls, session: AsyncSession, id: int):  # pylint: disable=W0622, C0103
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
    async def update_note(
        cls,
        session: AsyncSession,
        id: int,  # pylint: disable=W0622, C0103
        authenticated: Account,
        data: dict,
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

        stmt = stmt.values(**data)
        await session.execute(stmt)
        await session.commit()

        fetch_stmt = fetch_stmt.options(
            selectinload(cls.account).load_only(Account.user_id, Account.username),
            selectinload(cls.doc_category),
            selectinload(cls.doc_subject),
            selectinload(cls.doc_type),
        )

        res = await session.execute(fetch_stmt)
        updated_note = res.scalar()

        if not updated_note:
            raise HTTPException(status_code=404, detail="note not found")
        return updated_note

    @classmethod
    async def approve_note(
        cls, session: AsyncSession, id: int  # pylint: disable=W0622, C0103
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
