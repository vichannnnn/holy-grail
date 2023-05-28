from app.db.base_class import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship, selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.expression import text
from sqlalchemy import func, ForeignKey, select, update, delete
import datetime
from typing import TYPE_CHECKING, Optional
from app.models.auth import Account
from app.file_handler import save_file
from app.schemas.library import NoteCreateSchema
from fastapi import UploadFile, HTTPException
from starlette.datastructures import UploadFile as StarletteUploadFile
from app.exceptions import AppError

if TYPE_CHECKING:
    from app.models.categories import CategoryLevel, Subjects, DocumentTypes

accepted_types = {
    # "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    "application/pdf": ".pdf",
    # "text/plain": ".txt",
}


class Library(Base):
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
    file_name: Mapped[str] = mapped_column(nullable=False, unique=True)
    view_count: Mapped[int] = mapped_column(server_default=text("0"), nullable=False)
    uploaded_by: Mapped[int] = mapped_column(
        ForeignKey("account.user_id"), nullable=False
    )
    uploaded_on: Mapped[datetime.datetime] = mapped_column(
        nullable=False, server_default=func.now(), index=True
    )
    approved: Mapped[bool] = mapped_column(nullable=False, server_default="f")

    account: Mapped["Account"] = relationship(back_populates="documents")
    doc_category: Mapped["CategoryLevel"] = relationship(back_populates="documents")
    doc_subject: Mapped["Subjects"] = relationship(back_populates="documents")
    doc_type: Mapped["DocumentTypes"] = relationship(back_populates="documents")

    @classmethod
    async def create(
        cls,
        session: AsyncSession,
        uploaded_file: UploadFile,
        uploaded_by: int,
        data: NoteCreateSchema,
    ):
        if uploaded_file.content_type not in accepted_types.keys():
            raise AppError.INVALID_FILE_TYPE_ERROR

        extension = accepted_types[uploaded_file.content_type]
        data_json = data.dict()
        data_json["uploaded_by"] = uploaded_by
        if isinstance(uploaded_file, StarletteUploadFile):
            file_name = await save_file(uploaded_file, extension)
            data_json["file_name"] = file_name

        obj = Library(**data_json)
        session.add(obj)
        await session.commit()
        return obj

    @classmethod
    async def get_all(
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
        count_stmt = select(func.count()).select_from(stmt)
        total = await session.scalar(count_stmt)

        if category:
            stmt = stmt.where(cls.doc_category.has(name=category))

        if subject:
            stmt = stmt.where(cls.doc_subject.has(name=subject))

        if doc_type:
            stmt = stmt.where(cls.doc_type.has(name=doc_type))

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
    async def get(cls, session: AsyncSession, id: int):
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
    async def update(
        cls: Base, session: AsyncSession, id: int, authenticated: Account, data: dict
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
            raise HTTPException(status_code=404, detail="Book not found")
        return updated_note

    @classmethod
    async def approve_note(cls: Base, session: AsyncSession, id: int):
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
    async def delete(cls: Base, session: AsyncSession, authenticated: Account, id: int):
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
