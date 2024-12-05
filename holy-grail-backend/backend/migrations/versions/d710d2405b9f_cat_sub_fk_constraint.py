"""cat-sub-fk-constraint

Revision ID: d710d2405b9f
Revises: 082d4bc20fd4
Create Date: 2023-11-23 07:54:59.033380

"""

from alembic import op

# revision identifiers, used by Alembic.
revision = "d710d2405b9f"
down_revision = "082d4bc20fd4"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index(
        op.f("ix_analytics_timestamp"), "analytics", ["timestamp"], unique=False
    )
    op.create_unique_constraint(
        "subject_id_category_id_unique", "subjects", ["id", "category_id"]
    )
    op.create_foreign_key(
        None, "library", "subjects", ["subject", "category"], ["id", "category_id"]
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("subject_id_category_id_unique", "subjects", type_="unique")
    op.drop_constraint(None, "library", type_="foreignkey")
    op.drop_index(op.f("ix_analytics_timestamp"), table_name="analytics")
    # ### end Alembic commands ###
