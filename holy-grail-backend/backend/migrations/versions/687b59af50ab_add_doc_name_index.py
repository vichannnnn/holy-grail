"""add-doc-name-index

Revision ID: 687b59af50ab
Revises: 7b47fd460f9c
Create Date: 2023-07-18 09:30:02.604309

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "687b59af50ab"
down_revision = "7b47fd460f9c"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("library_document_name_key", "library", type_="unique")
    op.create_index(
        op.f("ix_library_document_name"), "library", ["document_name"], unique=True
    )
    op.create_index(
        op.f("ix_subjects_category_id"), "subjects", ["category_id"], unique=False
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_subjects_category_id"), table_name="subjects")
    op.drop_index(op.f("ix_library_document_name"), table_name="library")
    op.create_unique_constraint(
        "library_document_name_key", "library", ["document_name"]
    )
    # ### end Alembic commands ###
