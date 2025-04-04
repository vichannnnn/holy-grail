"""time-zone-aware

Revision ID: 082d4bc20fd4
Revises: bffa95ea4989
Create Date: 2023-11-19 08:32:34.505816

"""

from alembic import op

# revision identifiers, used by Alembic.
revision = "082d4bc20fd4"
down_revision = "bffa95ea4989"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute(
        "ALTER TABLE analytics ALTER COLUMN timestamp TYPE TIMESTAMP WITH TIME ZONE USING timestamp AT TIME ZONE "
        "'GMT+8'"
    )
    op.execute(
        "ALTER TABLE library ALTER COLUMN uploaded_on TYPE TIMESTAMP WITH TIME ZONE USING uploaded_on AT TIME ZONE "
        "'GMT+8'"
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute(
        "ALTER TABLE analytics ALTER COLUMN timestamp TYPE TIMESTAMP WITHOUT TIME ZONE"
    )
    op.execute(
        "ALTER TABLE library ALTER COLUMN uploaded_on TYPE TIMESTAMP WITHOUT TIME ZONE"
    )
    # ### end Alembic commands ###
