import logging
from datetime import datetime

from celery import Task

from config import settings
from services.search import search_service
from utils.pdf_extractor import extract_text_from_pdf_sync
from worker import celery_app

logger = logging.getLogger(__name__)


class IndexDocumentTask(Task):
    autoretry_for = (Exception,)
    retry_backoff = True
    retry_backoff_max = 300
    retry_jitter = True
    max_retries = 3


@celery_app.task(
    bind=True,
    base=IndexDocumentTask,
    name="index_document",
)
def index_document_task(
    self,
    doc_id: int,
    document_name: str,
    category: str,
    subject: str,
    doc_type: str,
    year: int | None,
    uploaded_by: str,
    uploaded_on: str,
    file_name: str,
    extension: str,
    view_count: int = 0,
    category_id: int | None = None,
    subject_id: int | None = None,
    type_id: int | None = None,
    user_id: int | None = None,
) -> dict:
    logger.info(f"Starting indexing for document {doc_id}: {document_name}")

    if not search_service.is_available():
        logger.warning("OpenSearch is not available, retrying...")
        raise Exception("OpenSearch is not available")

    search_service.create_index(delete_existing=False)

    content = ""
    if settings.aws_cloudfront_url and extension.lower() == ".pdf":
        file_url = f"{settings.aws_cloudfront_url}/{file_name}"
        logger.info(f"Extracting text from PDF: {file_url}")
        content = extract_text_from_pdf_sync(file_url, max_chars=50000)
        if content:
            logger.info(f"Extracted {len(content)} characters from PDF")
        else:
            logger.warning(f"No text extracted from PDF: {file_url}")

    uploaded_on_dt = datetime.fromisoformat(uploaded_on.replace("Z", "+00:00"))

    success = search_service.index_document(
        doc_id=doc_id,
        document_name=document_name,
        category=category,
        subject=subject,
        doc_type=doc_type,
        year=year,
        uploaded_by=uploaded_by,
        uploaded_on=uploaded_on_dt,
        content=content,
        file_name=file_name,
        extension=extension,
        view_count=view_count,
        approved=True,
        category_id=category_id,
        subject_id=subject_id,
        type_id=type_id,
        user_id=user_id,
    )

    if not success:
        logger.error(f"Failed to index document {doc_id}")
        raise Exception(f"Failed to index document {doc_id}")

    logger.info(f"Successfully indexed document {doc_id}")
    return {
        "doc_id": doc_id,
        "document_name": document_name,
        "content_length": len(content),
        "indexed": True,
    }
