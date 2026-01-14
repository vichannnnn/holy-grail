from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

load_dotenv()

from tasks.fetch_google_analytics import fetch_google_analytics
from tasks.health_check import ping
from tasks.new_password_email import send_new_password_email_task
from tasks.reset_password_email import send_reset_password_email_task
from tasks.update_scoreboard_users import update_scoreboard_users_task
from tasks.verify_email import send_verification_email_task
from worker import celery_app

app = FastAPI(title="Holy Grail Celery Task API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EmailTaskRequest(BaseModel):
    email: EmailStr
    username: str


class VerifyEmailRequest(EmailTaskRequest):
    confirm_url: str


class ResetPasswordEmailRequest(EmailTaskRequest):
    confirm_url: str


class NewPasswordEmailRequest(EmailTaskRequest):
    password: str


@app.get("/")
async def root():
    return {"message": "Holy Grail Celery Task API"}


@app.get("/ping")
async def health_check():
    return {"status": "ok"}


@app.post("/tasks/ping")
async def trigger_ping():
    task = ping.delay()
    return {"task_id": task.id, "status": "queued"}


@app.post("/tasks/send-verify-email")
async def trigger_verify_email(request: VerifyEmailRequest):
    task = send_verification_email_task.delay(
        email=request.email,
        username=request.username,
        confirm_url=request.confirm_url,
    )
    return {"task_id": task.id, "status": "queued"}


@app.post("/tasks/send-reset-password-email")
async def trigger_reset_password_email(request: ResetPasswordEmailRequest):
    task = send_reset_password_email_task.delay(
        email=request.email,
        username=request.username,
        confirm_url=request.confirm_url,
    )
    return {"task_id": task.id, "status": "queued"}


@app.post("/tasks/send-new-password-email")
async def trigger_new_password_email(request: NewPasswordEmailRequest):
    task = send_new_password_email_task.delay(
        email=request.email,
        username=request.username,
        password=request.password,
    )
    return {"task_id": task.id, "status": "queued"}


@app.post("/tasks/update-scoreboard-users")
async def trigger_update_scoreboard_users():
    task = update_scoreboard_users_task.delay()
    return {"task_id": task.id, "status": "queued"}


@app.post("/tasks/fetch-google-analytics")
async def trigger_fetch_google_analytics():
    task = fetch_google_analytics.delay()
    return {"task_id": task.id, "status": "queued"}


@app.get("/tasks/{task_id}/status")
async def get_task_status(task_id: str):
    task = celery_app.AsyncResult(task_id)
    return {
        "task_id": task_id,
        "status": task.status,
        "result": task.result if task.state == "SUCCESS" else None,
    }
