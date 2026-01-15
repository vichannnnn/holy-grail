import logging

from celery import Task

from services.search import search_service
from worker import celery_app

logger = logging.getLogger(__name__)


class DeleteDocumentTask(Task):
    autoretry_for = (Exception,)
    retry_backoff = True
    retry_backoff_max = 300
    retry_jitter = True
    max_retries = 3


@celery_app.task(
    bind=True,
    base=DeleteDocumentTask,
    name="delete_document",
)
def delete_document_task(
    self,
    doc_id: int,
) -> dict:
    logger.info(f"Deleting document {doc_id} from search index")

    if not search_service.is_available():
        logger.warning("OpenSearch is not available, retrying...")
        raise Exception("OpenSearch is not available")

    success = search_service.delete_document(doc_id)

    if not success:
        logger.warning(f"Document {doc_id} not found in index or already deleted")

    logger.info(f"Successfully processed delete for document {doc_id}")
    return {
        "doc_id": doc_id,
        "deleted": success,
    }
