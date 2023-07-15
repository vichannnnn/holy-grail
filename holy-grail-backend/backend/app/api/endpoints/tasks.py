from fastapi import APIRouter

from app.tasks.health_check import ping as ping_task

router = APIRouter()


@router.post("/trigger_ping_task")
async def trigger_ping_task():
    task = ping_task.delay()
    return {"task_id": task.id}


@router.post("/trigger_send_verification_token_task")
async def trigger_ping_send_verification_token_task():
    task = ping_task.delay()
    return {"task_id": task.id}


@router.get("/check_ping_task/{task_id}")
def check_triggered_ping_task(task_id: str):
    task = ping_task.AsyncResult(task_id)

    if task.state == "PENDING":  # pylint: disable=no-else-return
        return {"status": "pending"}
    elif task.state == "SUCCESS":
        return {"status": "success", "result": task.result}
    else:
        return {"status": "failure", "error": str(task.result)}


@router.get("/check_send_verification_token_task/{task_id}")
def check_triggered_verification_token_task(task_id: str):
    task = ping_task.AsyncResult(task_id)

    if task.state == "PENDING":  # pylint: disable=no-else-return
        return {"status": "pending"}
    elif task.state == "SUCCESS":
        return {"status": "success", "result": task.result}
    else:
        return {"status": "failure", "error": str(task.result)}
