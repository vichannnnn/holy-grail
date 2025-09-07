"""
Background task management endpoints.

This module provides endpoints for triggering and monitoring Celery background
tasks. Used primarily for testing task queue health and debugging async
job execution.
"""
from fastapi import APIRouter

from app.tasks.health_check import ping as ping_task

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
    task = ping_task.delay()
    return {"task_id": task.id}


@router.get("/check_ping_task/{task_id}")
def check_triggered_ping_task(task_id: str) -> dict[str, str]:
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
    task = ping_task.AsyncResult(task_id)

    if task.state == "PENDING":  # pylint: disable=no-else-return
        return {"status": "pending"}
    elif task.state == "SUCCESS":
        return {"status": "success", "result": task.result}
    else:
        return {"status": "failure", "error": str(task.result)}
