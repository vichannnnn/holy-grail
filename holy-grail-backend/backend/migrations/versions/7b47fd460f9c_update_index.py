"""update-index

Revision ID: 7b47fd460f9c
Revises: fcf930aadcbe
Create Date: 2023-07-15 11:09:23.418166

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "7b47fd460f9c"
down_revision = "fcf930aadcbe"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("account_username_key", "account", type_="unique")
    op.create_index(op.f("ix_account_user_id"), "account", ["user_id"], unique=False)
    op.create_index(op.f("ix_account_username"), "account", ["username"], unique=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_account_username"), table_name="account")
    op.drop_index(op.f("ix_account_user_id"), table_name="account")
    op.create_unique_constraint("account_username_key", "account", ["username"])
    # ### end Alembic commands ###