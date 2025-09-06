#!/usr/bin/env python3
"""
Seed data script for Holy Grail development environment.
This script populates initial categories, subjects, and document types.
It's idempotent - safe to run multiple times.
"""

import asyncio
import os
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core import settings
from app.db.database import async_session, engine
from app.models.auth import Account
from app.models.categories import CategoryLevel, DocumentTypes, Subjects
from app.utils.auth import Authenticator


async def create_admin_user(session: AsyncSession):
    """Create a default admin user for development."""
    # Check if admin already exists
    result = await session.execute(select(Account).where(Account.email == "admin@holygrail.sg"))
    existing_admin = result.scalar_one_or_none()

    if not existing_admin:
        admin = Account(
            email="admin@holygrail.sg",
            username="admin",
            password=Authenticator.pwd_context.hash("admin123"),
            role=4,  # Developer role
            verified=True,
        )
        session.add(admin)
        print("✅ Created admin user (email: admin@holygrail.sg, password: admin123)")
    else:
        print("ℹ️  Admin user already exists")


async def create_categories(session: AsyncSession):
    """Create default category levels."""
    categories = [
        "GCE 'O' Levels",
        "GCE 'A' Levels",
        "International Baccalaureate",
    ]

    for cat_name in categories:
        # Check if category exists
        result = await session.execute(select(CategoryLevel).where(CategoryLevel.name == cat_name))
        existing = result.scalar_one_or_none()

        if not existing:
            category = CategoryLevel(name=cat_name)
            session.add(category)
            print(f"✅ Created category: {cat_name}")
        else:
            print(f"ℹ️  Category already exists: {cat_name}")


async def create_subjects(session: AsyncSession):
    """Create default subjects for each category."""
    subjects_data = [
        # O-Level subjects
        {"name": "Mathematics", "category_id": 1},
        {"name": "Physics", "category_id": 1},
        {"name": "Chemistry", "category_id": 1},
        {"name": "Biology", "category_id": 1},
        {"name": "English", "category_id": 1},
        {"name": "Chinese", "category_id": 1},
        {"name": "Malay", "category_id": 1},
        {"name": "Tamil", "category_id": 1},
        {"name": "History", "category_id": 1},
        {"name": "Geography", "category_id": 1},
        {"name": "Social Studies", "category_id": 1},
        # A-Level subjects
        {"name": "H2 Mathematics", "category_id": 2},
        {"name": "H2 Physics", "category_id": 2},
        {"name": "H2 Chemistry", "category_id": 2},
        {"name": "H2 Biology", "category_id": 2},
        {"name": "H2 Economics", "category_id": 2},
        {"name": "H1 General Paper", "category_id": 2},
        {"name": "H2 Literature", "category_id": 2},
        {"name": "H2 History", "category_id": 2},
        {"name": "H2 Geography", "category_id": 2},
        # IB subjects
        {"name": "Mathematics AA", "category_id": 3},
        {"name": "Mathematics AI", "category_id": 3},
        {"name": "Physics", "category_id": 3},
        {"name": "Chemistry", "category_id": 3},
        {"name": "Biology", "category_id": 3},
        {"name": "Economics", "category_id": 3},
        {"name": "Business Management", "category_id": 3},
        {"name": "Psychology", "category_id": 3},
        {"name": "English A", "category_id": 3},
        {"name": "Theory of Knowledge", "category_id": 3},
    ]

    for subj_data in subjects_data:
        # Check if subject exists
        result = await session.execute(
            select(Subjects).where(
                (Subjects.name == subj_data["name"]) & (Subjects.category_id == subj_data["category_id"])
            )
        )
        existing = result.scalar_one_or_none()

        if not existing:
            subject = Subjects(**subj_data)
            session.add(subject)
            print(f"✅ Created subject: {subj_data['name']} (Category {subj_data['category_id']})")
        else:
            print(
                f"ℹ️  Subject already exists: {subj_data['name']} (Category {subj_data['category_id']})"
            )


async def create_document_types(session: AsyncSession):
    """Create default document types."""
    doc_types = [
        "Notes",
        "Practice Paper",
        "Past Year Paper",
        "Answer Key",
        "Formula Sheet",
        "Study Guide",
    ]

    for doc_name in doc_types:
        # Check if document type exists
        result = await session.execute(select(DocumentTypes).where(DocumentTypes.name == doc_name))
        existing = result.scalar_one_or_none()

        if not existing:
            doc_type = DocumentTypes(name=doc_name)
            session.add(doc_type)
            print(f"✅ Created document type: {doc_name}")
        else:
            print(f"ℹ️  Document type already exists: {doc_name}")


async def main():
    """Run all seed functions."""
    print("🌱 Starting seed data population...")
    print(f"📍 Using database: {settings.database_url}")

    async with async_session() as session:
        try:
            # Create all seed data
            await create_categories(session)
            await create_subjects(session)
            await create_document_types(session)
            await create_admin_user(session)

            # Commit all changes
            await session.commit()
            print("\n✅ Seed data population completed successfully!")

        except Exception as e:
            await session.rollback()
            print(f"\n❌ Error during seed data population: {e}")
            sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
