"""updates

Revision ID: 0ab9feb5a220
Revises: f446da92529c
Create Date: 2023-07-06 06:31:38.557329

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0ab9feb5a220'
down_revision = 'f446da92529c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hardwares', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hardwares', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###
