import logging
from datetime import datetime

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)


class TaskClient:
    def __init__(self) -> None:
        self._base_url = settings.task_api_url

    async def trigger_index_document(
        self,
        doc_id: int,
        document_name: str,
        category: str,
        subject: str,
        doc_type: str,
        year: int | None,
        uploaded_by: str,
        uploaded_on: datetime,
        file_name: str,
        extension: str,
    ) -> str | None:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    f"{self._base_url}/tasks/index-document",
                    json={
                        "doc_id": doc_id,
                        "document_name": document_name,
                        "category": category,
                        "subject": subject,
                        "doc_type": doc_type,
                        "year": year,
                        "uploaded_by": uploaded_by,
                        "uploaded_on": uploaded_on.isoformat(),
                        "file_name": file_name,
                        "extension": extension,
                    },
                )
                if response.status_code == 200:
                    result = response.json()
                    logger.info(f"Queued index task for document {doc_id}: {result.get('task_id')}")
                    return result.get("task_id")
                else:
                    logger.error(
                        f"Failed to queue index task for document {doc_id}: {response.status_code}"
                    )
                    return None
        except httpx.RequestError as e:
            logger.warning(f"Task service unavailable, could not queue index task: {e}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error queuing index task: {e}")
            return None

    async def trigger_delete_document(self, doc_id: int) -> str | None:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    f"{self._base_url}/tasks/delete-document",
                    json={"doc_id": doc_id},
                )
                if response.status_code == 200:
                    result = response.json()
                    logger.info(
                        f"Queued delete task for document {doc_id}: {result.get('task_id')}"
                    )
                    return result.get("task_id")
                else:
                    logger.error(
                        f"Failed to queue delete task for document {doc_id}: {response.status_code}"
                    )
                    return None
        except httpx.RequestError as e:
            logger.warning(f"Task service unavailable, could not queue delete task: {e}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error queuing delete task: {e}")
            return None

    async def trigger_bulk_index(
        self,
        documents: list[dict],
    ) -> tuple[int, int]:
        queued = 0
        failed = 0
        for doc in documents:
            task_id = await self.trigger_index_document(
                doc_id=doc["doc_id"],
                document_name=doc["document_name"],
                category=doc["category"],
                subject=doc["subject"],
                doc_type=doc["doc_type"],
                year=doc["year"],
                uploaded_by=doc["uploaded_by"],
                uploaded_on=doc["uploaded_on"],
                file_name=doc["file_name"],
                extension=doc["extension"],
            )
            if task_id:
                queued += 1
            else:
                failed += 1
        return queued, failed


task_client = TaskClient()
