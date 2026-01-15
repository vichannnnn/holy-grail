#!/usr/bin/env python3
"""
Build OpenSearch index for Holy Grail documents.

This script reads all approved documents from the database and indexes them
to OpenSearch for full-text search capabilities.

Usage:
    cd apps/backend
    uv run python scripts/build_search_index.py [--recreate] [--limit N] [--extract-content]

Options:
    --recreate         Delete and recreate the index before indexing
    --limit N          Limit indexing to first N documents (for testing)
    --extract-content  Extract text from PDF files (slower but enables content search)
    --no-extract       Skip PDF content extraction (faster, metadata only)
    --concurrency N    Number of concurrent PDF downloads (default: 10)
"""
import argparse
import asyncio
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import selectinload, sessionmaker

from app.core.config import settings
from app.models.library import Library
from app.services.search import search_service
from app.utils.pdf_extractor import extract_text_from_url

PDF_EXTENSIONS = {".pdf"}


async def extract_content_for_doc(doc: dict, base_url: str, semaphore: asyncio.Semaphore) -> dict:
    async with semaphore:
        file_name = doc.get("file_name", "")
        extension = doc.get("extension", "").lower()

        if extension not in PDF_EXTENSIONS:
            return doc

        url = f"{base_url}/{file_name}"
        content = await extract_text_from_url(url, max_chars=50000, timeout=60.0)
        doc["content"] = content
        return doc


async def build_index(
    recreate: bool = False,
    limit: int | None = None,
    extract_content: bool = True,
    concurrency: int = 10,
) -> None:
    print(f"OpenSearch Host: {settings.opensearch_host}:{settings.opensearch_port}")
    print(f"OpenSearch Index: {settings.opensearch_index}")
    print(f"OpenSearch Enabled: {settings.opensearch_enabled}")
    print(f"CloudFront URL: {settings.aws_cloudfront_url}")
    print(f"Extract Content: {extract_content}")
    print()

    if not search_service.is_available():
        print("ERROR: OpenSearch is not available!")
        print("Make sure OpenSearch is running:")
        print("  docker compose -f docker/docker-compose.db.yml up opensearch")
        sys.exit(1)

    print("OpenSearch connection: OK")

    if recreate:
        print("Recreating index...")
        search_service.create_index(delete_existing=True)
    else:
        print("Creating index if not exists...")
        search_service.create_index(delete_existing=False)

    stats = search_service.get_index_stats()
    if stats:
        print(f"Current index stats: {stats['doc_count']} documents, {stats['size_mb']} MB")

    engine = create_async_engine(settings.database_url)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with async_session() as session:
        stmt = (
            select(Library)
            .where(Library.approved == True)
            .options(
                selectinload(Library.account),
                selectinload(Library.doc_category),
                selectinload(Library.doc_subject),
                selectinload(Library.doc_type),
            )
            .order_by(Library.id)
        )

        if limit:
            stmt = stmt.limit(limit)

        result = await session.execute(stmt)
        documents = result.scalars().all()

        print(f"Found {len(documents)} approved documents to index")

        if not documents:
            print("No documents to index.")
            return

        docs_to_index = []
        for doc in documents:
            docs_to_index.append(
                {
                    "id": doc.id,
                    "document_name": doc.document_name,
                    "category": doc.doc_category.name,
                    "subject": doc.doc_subject.name,
                    "doc_type": doc.doc_type.name,
                    "year": doc.year,
                    "uploaded_by": doc.account.username,
                    "uploaded_on": doc.uploaded_on,
                    "content": "",
                    "file_name": doc.file_name,
                    "extension": doc.extension,
                }
            )

        if extract_content and settings.aws_cloudfront_url:
            print()
            print(f"Extracting PDF content (concurrency: {concurrency})...")
            start_time = time.time()

            semaphore = asyncio.Semaphore(concurrency)
            tasks = [
                extract_content_for_doc(doc, settings.aws_cloudfront_url, semaphore)
                for doc in docs_to_index
            ]

            total = len(tasks)
            completed = 0
            extracted_count = 0

            for coro in asyncio.as_completed(tasks):
                doc = await coro
                completed += 1
                if doc.get("content"):
                    extracted_count += 1

                if completed % 100 == 0 or completed == total:
                    elapsed = time.time() - start_time
                    rate = completed / elapsed if elapsed > 0 else 0
                    print(
                        f"  Progress: {completed}/{total} "
                        f"({extracted_count} with content) "
                        f"[{rate:.1f} docs/sec]"
                    )

            elapsed = time.time() - start_time
            print(f"Content extraction completed in {elapsed:.1f}s")
            print(f"  Documents with extracted content: {extracted_count}/{total}")
        elif extract_content:
            print("WARNING: CloudFront URL not configured, skipping content extraction")

        for doc in docs_to_index:
            doc.pop("file_name", None)
            doc.pop("extension", None)

        print()
        print(f"Indexing {len(docs_to_index)} documents...")

        success, failed = search_service.bulk_index_documents(docs_to_index)

        print()
        print("=== Indexing Summary ===")
        print(f"Total documents:  {len(docs_to_index)}")
        print(f"Successfully indexed: {success}")
        print(f"Failed: {failed}")

        stats = search_service.get_index_stats()
        if stats:
            print()
            print("=== Index Stats ===")
            print(f"Document count: {stats['doc_count']}")
            print(f"Index size: {stats['size_mb']} MB")

    await engine.dispose()


def main() -> None:
    parser = argparse.ArgumentParser(description="Build OpenSearch index for documents")
    parser.add_argument(
        "--recreate",
        action="store_true",
        help="Delete and recreate the index before indexing",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Limit indexing to first N documents (for testing)",
    )
    parser.add_argument(
        "--extract-content",
        action="store_true",
        default=True,
        dest="extract_content",
        help="Extract text from PDF files (default: enabled)",
    )
    parser.add_argument(
        "--no-extract",
        action="store_false",
        dest="extract_content",
        help="Skip PDF content extraction",
    )
    parser.add_argument(
        "--concurrency",
        type=int,
        default=10,
        help="Number of concurrent PDF downloads (default: 10)",
    )

    args = parser.parse_args()

    print("=" * 50)
    print("Holy Grail OpenSearch Index Builder")
    print("=" * 50)
    print()

    asyncio.run(
        build_index(
            recreate=args.recreate,
            limit=args.limit,
            extract_content=args.extract_content,
            concurrency=args.concurrency,
        )
    )

    print()
    print("Done!")


if __name__ == "__main__":
    main()
