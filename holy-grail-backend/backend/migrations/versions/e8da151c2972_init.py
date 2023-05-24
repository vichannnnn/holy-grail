"""init

Revision ID: e8da151c2972
Revises: 
Create Date: 2023-05-24 17:23:31.830372

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e8da151c2972'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('account',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('role', sa.Integer(), server_default=sa.text('1'), nullable=False),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_index('username_case_sensitive_index', 'account', [sa.text('upper(username)')], unique=True)
    op.create_table('category_level',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_category_level_id'), 'category_level', ['id'], unique=False)
    op.create_table('documents',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_documents_id'), 'documents', ['id'], unique=False)
    op.create_table('subjects',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_subjects_id'), 'subjects', ['id'], unique=False)
    op.create_table('library',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category', sa.Integer(), nullable=False),
    sa.Column('subject', sa.Integer(), nullable=False),
    sa.Column('type', sa.Integer(), nullable=False),
    sa.Column('file_name', sa.String(), nullable=False),
    sa.Column('view_count', sa.Integer(), server_default=sa.text('0'), nullable=False),
    sa.Column('uploaded_by', sa.Integer(), nullable=False),
    sa.Column('uploaded_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('approved', sa.Boolean(), server_default='f', nullable=False),
    sa.ForeignKeyConstraint(['category'], ['category_level.id'], onupdate='CASCADE'),
    sa.ForeignKeyConstraint(['subject'], ['subjects.id'], onupdate='CASCADE'),
    sa.ForeignKeyConstraint(['type'], ['documents.id'], onupdate='CASCADE'),
    sa.ForeignKeyConstraint(['uploaded_by'], ['account.user_id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('file_name')
    )
    op.create_index(op.f('ix_library_category'), 'library', ['category'], unique=False)
    op.create_index(op.f('ix_library_id'), 'library', ['id'], unique=False)
    op.create_index(op.f('ix_library_subject'), 'library', ['subject'], unique=False)
    op.create_index(op.f('ix_library_type'), 'library', ['type'], unique=False)
    op.create_index(op.f('ix_library_uploaded_on'), 'library', ['uploaded_on'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_library_uploaded_on'), table_name='library')
    op.drop_index(op.f('ix_library_type'), table_name='library')
    op.drop_index(op.f('ix_library_subject'), table_name='library')
    op.drop_index(op.f('ix_library_id'), table_name='library')
    op.drop_index(op.f('ix_library_category'), table_name='library')
    op.drop_table('library')
    op.drop_index(op.f('ix_subjects_id'), table_name='subjects')
    op.drop_table('subjects')
    op.drop_index(op.f('ix_documents_id'), table_name='documents')
    op.drop_table('documents')
    op.drop_index(op.f('ix_category_level_id'), table_name='category_level')
    op.drop_table('category_level')
    op.drop_index('username_case_sensitive_index', table_name='account')
    op.drop_table('account')
    # ### end Alembic commands ###
