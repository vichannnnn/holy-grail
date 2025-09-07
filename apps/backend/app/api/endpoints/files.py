"""
File serving endpoints for local development.

This module provides endpoints for serving static files from local storage
during development. This functionality is disabled in production environments
where files are served directly from S3/CDN.
"""
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.core import Environment, settings
from app.services.storage import LocalFileStorage

router = APIRouter()


@router.get("/files/{file_path:path}")
async def serve_file(file_path: str) -> FileResponse:
    """
    Serve files from local storage in development environment.
    
    This endpoint allows direct file access during local development without
    requiring S3 credentials. It's automatically disabled in production where
    files are served from S3/CDN.
    
    Args:
        file_path: Path to the file within local storage directory
        
    Returns:
        FileResponse: The requested file with appropriate MIME type
        
    Raises:
        HTTPException(404): If file not found or in non-local environment
        
    Note:
        This endpoint is only available when ENVIRONMENT=local
    """
    if settings.environment != Environment.LOCAL:
        raise HTTPException(
            status_code=404, detail="File serving only available in local environment"
        )

    storage = LocalFileStorage()
    try:
        return storage.get_file_response(file_path)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")
