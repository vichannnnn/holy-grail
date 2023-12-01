"""add-scoreboard

Revision ID: 4b5888d54fc3
Revises: d30ae94f4500
Create Date: 2023-12-01 14:39:03.788369

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "4b5888d54fc3"
down_revision = "d30ae94f4500"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "scoreboard",
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column(
            "upload_count", sa.Integer(), server_default=sa.text("0"), nullable=False
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["account.user_id"],
        ),
        sa.PrimaryKeyConstraint("user_id"),
    )
    op.create_index(
        op.f("ix_scoreboard_upload_count"), "scoreboard", ["upload_count"], unique=False
    )
    op.create_index(
        op.f("ix_scoreboard_user_id"), "scoreboard", ["user_id"], unique=False
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_scoreboard_user_id"), table_name="scoreboard")
    op.drop_index(op.f("ix_scoreboard_upload_count"), table_name="scoreboard")
    op.drop_table("scoreboard")
    # ### end Alembic commands ###
