"""
Background task management endpoints.

This module provides endpoints for triggering and monitoring Celery background
tasks. Used primarily for testing task queue health and debugging async
job execution.
"""
import httpx
from fastapi import APIRouter, HTTPException

from app.core import settings

router = APIRouter()


@router.post("/trigger_ping_task")
async def trigger_ping_task() -> dict[str, str]:
    """
    Trigger a ping health check background task.

    Initiates a simple background task to verify Celery worker connectivity
    and task queue functionality. Returns immediately with a task ID for
    status checking.

    Returns:
        dict: Task ID for monitoring the background job

    Example:
        {"task_id": "550e8400-e29b-41d4-a716-446655440000"}
    """
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(f"{settings.task_api_url}/tasks/ping")
            response.raise_for_status()
            return response.json()
        except httpx.RequestError as e:
            raise HTTPException(status_code=503, detail=f"Task service unavailable: {str(e)}")


@router.get("/check_ping_task/{task_id}")
async def check_triggered_ping_task(task_id: str) -> dict[str, str]:
    """
    Check the status of a triggered ping task.

    Queries Celery for the current state of a background task. Useful for
    monitoring task execution and verifying worker health.

    Args:
        task_id: UUID of the background task to check

    Returns:
        dict: Task status and result if completed

    Example responses:
        - Pending: {"status": "pending"}
        - Success: {"status": "success", "result": "pong"}
        - Failure: {"status": "failure", "error": "Worker offline"}
    """
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{settings.task_api_url}/tasks/{task_id}/status")
            response.raise_for_status()
            data = response.json()

            if data["status"] == "PENDING":
                return {"status": "pending"}
            elif data["status"] == "SUCCESS":
                return {"status": "success", "result": data["result"]}
            else:
                return {"status": "failure", "error": str(data.get("result", "Unknown error"))}
        except httpx.RequestError as e:
            raise HTTPException(status_code=503, detail=f"Task service unavailable: {str(e)}")
