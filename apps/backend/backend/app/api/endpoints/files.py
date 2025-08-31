from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.core import Environment, settings
from app.services.storage import LocalFileStorage

router = APIRouter()


@router.get("/files/{file_path:path}")
async def serve_file(file_path: str):
    """Serve files from local storage (only available in LOCAL environment)"""
    if settings.environment != Environment.LOCAL:
        raise HTTPException(
            status_code=404, detail="File serving only available in local environment"
        )

    storage = LocalFileStorage()
    try:
        return storage.get_file_response(file_path)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")
