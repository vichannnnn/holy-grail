from typing import List

from fastapi import Response as FastAPIResponse
from sqlalchemy import ForeignKey, func, not_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column, relationship, selectinload, synonym
from sqlalchemy.sql.expression import text

from app.crud.base import CRUD
from app.db.base_class import Base
from app.models.auth import Account
from app.models.library import Library
from app.schemas.scoreboard import AuthenticatedScoreboardUser, ScoreboardUser, User


class Scoreboard(Base, CRUD["Scoreboard"]):
    __tablename__ = "scoreboard"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("account.user_id"), primary_key=True, index=True, nullable=False
    )
    upload_count: Mapped[int] = mapped_column(nullable=False, index=True, server_default=text("0"))

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

    @classmethod
    async def get_top_n_approved_users(
        cls, session: AsyncSession, top_n: int, exclude_ids: List[int]
    ):
        stmt = (
            select(cls.user_id, cls.upload_count, Account.username)
            .join(Account, cls.user_id == Account.user_id)
            .where(not_(cls.user_id.in_(exclude_ids)))
            .group_by(cls.user_id, Account.username)
            .order_by(cls.upload_count.desc())
            .limit(top_n)
        )

        results = await session.execute(stmt)
        return [
            ScoreboardUser(
                user=User(user_id=row.user_id, username=row.username),
                upload_count=row.upload_count,
            )
            for row in results.fetchall()
        ]

    @classmethod
    async def get_authenticated_approved_user(cls, session: AsyncSession, user_id: int):
        stmt = (
            select(cls, func.rank().over(order_by=cls.upload_count.desc()).label("rank"))
            .where(cls.id == user_id)
            .options(
                selectinload(cls.account).load_only(Account.user_id, Account.username),
            )
        )

        res = await session.execute(stmt)
        user, rank = res.one()

        return AuthenticatedScoreboardUser(
            user=User(user_id=user.user_id, username=user.account.username),
            upload_count=user.upload_count,
            rank=rank,
        )
