from fastapi import Response as FastAPIResponse
from sqlalchemy import ForeignKey
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column, synonym, relationship
from sqlalchemy.sql.expression import text

from app.crud.base import CRUD
from app.db.base_class import Base
from app.models.auth import Account
from app.models.library import Library


class Scoreboard(Base, CRUD["Scoreboard"]):
    __tablename__ = "scoreboard"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("account.user_id"), primary_key=True, index=True, nullable=False
    )
    upload_count: Mapped[int] = mapped_column(
        nullable=False, index=True, server_default=text("0")
    )

    account: Mapped["Account"] = relationship("Account", back_populates="scoreboard")
    id: Mapped[int] = synonym("user_id")

    @classmethod
    async def update_scoreboard_users(cls, session: AsyncSession):
        res = await Library.get_latest_scoreboard_users_stats(session)

        for data in res:
            await super().upsert(
                session, id=data.uploaded_by, data={"upload_count": data.upload_count}
            )
        return FastAPIResponse(status_code=204)
