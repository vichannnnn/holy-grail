import logging
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

load_dotenv()

logger = logging.getLogger(__name__)

from tasks.delete_document import delete_document_task  # noqa: E402
from tasks.fetch_google_analytics import fetch_google_analytics  # noqa: E402
from tasks.health_check import ping  # noqa: E402
from tasks.index_document import index_document_task  # noqa: E402
from tasks.new_password_email import send_new_password_email_task  # noqa: E402
from tasks.reset_password_email import send_reset_password_email_task  # noqa: E402
from tasks.update_scoreboard_users import update_scoreboard_users_task  # noqa: E402
from tasks.verify_email import send_verification_email_task  # noqa: E402
from worker import celery_app  # noqa: E402


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Task API starting up - triggering fetch_google_analytics task")
    fetch_google_analytics.delay()
    yield
    logger.info("Task API shutting down")


app = FastAPI(title="Holy Grail Celery Task API", version="1.0.0", lifespan=lifespan)

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


class IndexDocumentRequest(BaseModel):
    doc_id: int
    document_name: str
    category: str
    subject: str
    doc_type: str
    year: int | None = None
    uploaded_by: str
    uploaded_on: str
    file_name: str
    extension: str
    view_count: int = 0
    category_id: int | None = None
    subject_id: int | None = None
    type_id: int | None = None
    user_id: int | None = None


class DeleteDocumentRequest(BaseModel):
    doc_id: int


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


@app.post("/tasks/index-document")
async def trigger_index_document(request: IndexDocumentRequest):
    task = index_document_task.delay(
        doc_id=request.doc_id,
        document_name=request.document_name,
        category=request.category,
        subject=request.subject,
        doc_type=request.doc_type,
        year=request.year,
        uploaded_by=request.uploaded_by,
        uploaded_on=request.uploaded_on,
        file_name=request.file_name,
        extension=request.extension,
        view_count=request.view_count,
        category_id=request.category_id,
        subject_id=request.subject_id,
        type_id=request.type_id,
        user_id=request.user_id,
    )
    return {"task_id": task.id, "status": "queued"}


@app.post("/tasks/delete-document")
async def trigger_delete_document(request: DeleteDocumentRequest):
    task = delete_document_task.delay(
        doc_id=request.doc_id,
    )
    return {"task_id": task.id, "status": "queued"}
