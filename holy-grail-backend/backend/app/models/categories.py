from app.db.base_class import Base
from app.crud.base import CRUD
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.library import Library


class CategoryLevel(Base, CRUD["category_level"]):
    __tablename__ = "category_level"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    name: Mapped[str] = mapped_column(nullable=False)
    documents: Mapped["Library"] = relationship(
        back_populates="doc_category", uselist=True
    )


class Subjects(Base, CRUD["subjects"]):
    __tablename__ = "subjects"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    name: Mapped[str] = mapped_column(nullable=False)
    documents: Mapped["Library"] = relationship(
        back_populates="doc_subject", uselist=True
    )


class DocumentTypes(Base, CRUD["documents"]):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )
    name: Mapped[str] = mapped_column(nullable=False)
    documents: Mapped["Library"] = relationship(back_populates="doc_type", uselist=True)
