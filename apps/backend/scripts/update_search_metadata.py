#!/usr/bin/env python3
"""
Fast metadata update for OpenSearch documents.

Updates file_name and extension fields from PostgreSQL without re-extracting PDF content.
This is useful when the OpenSearch index was built before these fields were added.

Usage:
    cd apps/backend
    uv run python scripts/update_search_metadata.py
"""
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from opensearchpy.helpers import async_bulk  # noqa: E402
from sqlalchemy import select  # noqa: E402
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine  # noqa: E402
from sqlalchemy.orm import sessionmaker  # noqa: E402

from app.core.config import settings  # noqa: E402
from app.models.library import Library  # noqa: E402
from app.services.search import search_service  # noqa: E402


async def update_metadata() -> None:
    print("=" * 50)
    print("Holy Grail OpenSearch Metadata Updater")
    print("=" * 50)
    print()
    print(f"OpenSearch Host: {settings.opensearch_host}:{settings.opensearch_port}")
    print(f"OpenSearch Index: {settings.opensearch_index}")
    print()

    if not await search_service.is_available():
        print("ERROR: OpenSearch is not available!")
        print("Make sure OpenSearch is running:")
        print("  docker compose -f docker/docker-compose.db.yml up opensearch")
        sys.exit(1)

    print("OpenSearch connection: OK")
    print()

    engine = create_async_engine(settings.database_url)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with async_session() as session:
        stmt = select(Library.id, Library.file_name, Library.extension).where(
            Library.approved == True  # noqa: E712
        )
        result = await session.execute(stmt)
        notes = result.all()

        print(f"Found {len(notes)} approved notes to update")

        if not notes:
            print("No notes to update.")
            await engine.dispose()
            return

        client = await search_service._get_client()
        if not client:
            print("ERROR: Could not get OpenSearch client")
            await engine.dispose()
            return

        actions = []
        for note_id, file_name, extension in notes:
            actions.append(
                {
                    "_op_type": "update",
                    "_index": settings.opensearch_index,
                    "_id": str(note_id),
                    "doc": {
                        "file_name": file_name or "",
                        "extension": extension or "",
                    },
                }
            )

        print(f"Updating {len(actions)} documents...")
        print()

        success, failed = await async_bulk(
            client,
            actions,
            chunk_size=500,
            raise_on_error=False,
            request_timeout=60,
        )

        failed_count = len(failed) if isinstance(failed, list) else failed

        print("=== Update Summary ===")
        print(f"Successfully updated: {success}")
        print(f"Failed: {failed_count}")

        if isinstance(failed, list) and failed:
            print()
            print("Failed document IDs (first 10):")
            for item in failed[:10]:
                print(f"  - {item}")

    await engine.dispose()
    print()
    print("Done!")


if __name__ == "__main__":
    asyncio.run(update_metadata())
