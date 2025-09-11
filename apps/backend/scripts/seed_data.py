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
from app.models.library import Library
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
            password=Authenticator.pwd_context.hash("Admin123!"),
            role=3,  # Developer role
            verified=True,
        )
        session.add(admin)
        print("✅ Created admin user (email: admin@holygrail.sg, password: Admin123!)")
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
                (Subjects.name == subj_data["name"])
                & (Subjects.category_id == subj_data["category_id"])
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


async def create_sample_notes(session: AsyncSession):
    """Create sample notes for development."""
    # First get the admin user
    result = await session.execute(select(Account).where(Account.email == "admin@holygrail.sg"))
    admin = result.scalar_one_or_none()

    if not admin:
        print("⚠️  Admin user not found, skipping notes creation")
        return

    # Get subject IDs dynamically
    subject_map = {}

    # O-Level subjects
    for name in ["Mathematics", "Physics", "Chemistry"]:
        result = await session.execute(
            select(Subjects).where((Subjects.name == name) & (Subjects.category_id == 1))
        )
        subject = result.scalar_one_or_none()
        if subject:
            subject_map[(1, name)] = subject.id

    # A-Level subjects
    result = await session.execute(
        select(Subjects).where((Subjects.name == "H2 Mathematics") & (Subjects.category_id == 2))
    )
    subject = result.scalar_one_or_none()
    if subject:
        subject_map[(2, "H2 Mathematics")] = subject.id

    # IB subjects
    result = await session.execute(
        select(Subjects).where((Subjects.name == "Mathematics AA") & (Subjects.category_id == 3))
    )
    subject = result.scalar_one_or_none()
    if subject:
        subject_map[(3, "Mathematics AA")] = subject.id

    # Sample notes data
    notes_data = [
        # O-Level Mathematics
        {
            "category": 1,
            "subject": subject_map.get((1, "Mathematics"), 1),
            "type": 1,  # Notes
            "document_name": "Chapter 1 - Algebra Fundamentals",
            "file_name": "o-level-math-ch1-algebra.pdf",
            "year": 2024,
            "uploaded_by": admin.user_id,
            "approved": True,
            "extension": ".pdf",
        },
        {
            "category": 1,
            "subject": subject_map.get((1, "Mathematics"), 1),
            "type": 3,  # Past Year Paper
            "document_name": "2023 O-Level Mathematics Paper 1",
            "file_name": "o-level-math-2023-p1.pdf",
            "year": 2023,
            "uploaded_by": admin.user_id,
            "approved": True,
            "extension": ".pdf",
        },
        # O-Level Physics
        {
            "category": 1,
            "subject": subject_map.get((1, "Physics"), 2),
            "type": 5,  # Formula Sheet
            "document_name": "Physics Formula Sheet - Complete",
            "file_name": "o-level-physics-formulas.pdf",
            "year": 2024,
            "uploaded_by": admin.user_id,
            "approved": True,
            "extension": ".pdf",
        },
        # A-Level H2 Mathematics
        {
            "category": 2,
            "subject": subject_map.get((2, "H2 Mathematics"), 12),
            "type": 1,  # Notes
            "document_name": "Complex Numbers - Complete Guide",
            "file_name": "a-level-h2-math-complex.pdf",
            "year": 2024,
            "uploaded_by": admin.user_id,
            "approved": True,
            "extension": ".pdf",
        },
        {
            "category": 2,
            "subject": subject_map.get((2, "H2 Mathematics"), 12),
            "type": 2,  # Practice Paper
            "document_name": "Vectors Practice Problems Set 1",
            "file_name": "a-level-h2-math-vectors-practice.pdf",
            "year": 2024,
            "uploaded_by": admin.user_id,
            "approved": True,
            "extension": ".pdf",
        },
        # IB Mathematics AA
        {
            "category": 3,
            "subject": subject_map.get((3, "Mathematics AA"), 22),
            "type": 6,  # Study Guide
            "document_name": "IB Math AA HL Study Guide - Calculus",
            "file_name": "ib-math-aa-calculus-guide.pdf",
            "year": 2024,
            "uploaded_by": admin.user_id,
            "approved": True,
            "extension": ".pdf",
        },
        # Some unapproved notes
        {
            "category": 1,
            "subject": subject_map.get((1, "Chemistry"), 3),
            "type": 1,  # Notes
            "document_name": "Organic Chemistry Summary",
            "file_name": "o-level-chem-organic.pdf",
            "year": 2024,
            "uploaded_by": admin.user_id,
            "approved": False,
            "extension": ".pdf",
        },
    ]

    for note_data in notes_data:
        # Check if note already exists
        result = await session.execute(
            select(Library).where(Library.file_name == note_data["file_name"])
        )
        existing = result.scalar_one_or_none()

        if not existing:
            note = Library(**note_data)
            session.add(note)
            print(f"✅ Created note: {note_data['document_name']}")
        else:
            print(f"ℹ️  Note already exists: {note_data['document_name']}")


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
            await create_sample_notes(session)

            # Commit all changes
            await session.commit()
            print("\n✅ Seed data population completed successfully!")

        except Exception as e:
            await session.rollback()
            print(f"\n❌ Error during seed data population: {e}")
            sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
