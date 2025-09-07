"""
File storage service abstraction.

This module provides an abstract interface for file storage with concrete
implementations for local file system (development) and AWS S3 (production).
The service is automatically selected based on environment configuration.
"""
import logging
from abc import ABC, abstractmethod
from pathlib import Path
from typing import BinaryIO, Optional

import aiofiles
from fastapi import UploadFile
from fastapi.responses import FileResponse

from app.core import Environment, settings

logger = logging.getLogger(__name__)


class StorageService(ABC):
    """
    Abstract base class for file storage implementations.

    Defines the interface for uploading, deleting, and accessing files
    in different storage backends.
    """

    @abstractmethod
    async def upload_file(
        self,
        file: UploadFile,
        key: str,
        content_type: Optional[str] = None,
    ) -> str:
        """
        Upload file to storage backend.

        Args:
            file: FastAPI UploadFile object containing file data.
            key: Storage key/path for the file.
            content_type: Optional MIME type for the file.

        Returns:
            str: Public URL to access the uploaded file.
        """
        pass

    @abstractmethod
    async def delete_file(self, key: str) -> bool:
        """
        Delete file from storage.

        Args:
            key: Storage key/path of the file to delete.

        Returns:
            bool: True if deletion successful, False otherwise.
        """
        pass

    @abstractmethod
    async def get_file_url(self, key: str) -> str:
        """
        Get public URL for accessing file.

        Args:
            key: Storage key/path of the file.

        Returns:
            str: Public URL for the file.
        """
        pass

    @abstractmethod
    async def file_exists(self, key: str) -> bool:
        """
        Check if file exists in storage.

        Args:
            key: Storage key/path of the file.

        Returns:
            bool: True if file exists, False otherwise.
        """
        pass


class LocalFileStorage(StorageService):
    """
    Local file system storage for development.

    Stores files on the local disk and serves them via the FastAPI
    files endpoint. Creates storage directory if it doesn't exist.
    """

    def __init__(self) -> None:
        """
        Initialize local storage with configured path.

        Creates the base storage directory if it doesn't exist.
        """
        self.base_path = Path(settings.local_storage_path)
        self.base_path.mkdir(parents=True, exist_ok=True)
        logger.info(f"📁 Local storage initialized at {self.base_path.absolute()}")

    async def upload_file(
        self,
        file: UploadFile,
        key: str,
        content_type: Optional[str] = None,
    ) -> str:
        """
        Save uploaded file to local disk.

        Creates parent directories if needed. Content type is ignored
        for local storage.

        Args:
            file: FastAPI UploadFile object.
            key: Storage path relative to base directory.
            content_type: Ignored for local storage.

        Returns:
            str: Local URL to access the file.
        """
        file_path = self.base_path / key
        file_path.parent.mkdir(parents=True, exist_ok=True)

        content = await file.read()
        async with aiofiles.open(file_path, "wb") as f:
            await f.write(content)

        url = f"{settings.local_storage_url}/{key}"
        logger.info(f"📁 File uploaded locally: {key} -> {url}")
        return url

    async def delete_file(self, key: str) -> bool:
        """
        Delete file from local disk.

        Args:
            key: Storage path relative to base directory.

        Returns:
            bool: True if file existed and was deleted, False if not found.
        """
        file_path = self.base_path / key
        if file_path.exists():
            file_path.unlink()
            logger.info(f"🗑️ File deleted locally: {key}")
            return True
        logger.warning(f"⚠️ File not found for deletion: {key}")
        return False

    async def get_file_url(self, key: str) -> str:
        """
        Get local URL for file access.

        Args:
            key: Storage path relative to base directory.

        Returns:
            str: URL for accessing file via local server.
        """
        return f"{settings.local_storage_url}/{key}"

    async def file_exists(self, key: str) -> bool:
        """
        Check if file exists on local disk.

        Args:
            key: Storage path relative to base directory.

        Returns:
            bool: True if file exists, False otherwise.
        """
        file_path = self.base_path / key
        return file_path.exists()

    def get_file_response(self, key: str) -> FileResponse:
        """
        Get FastAPI FileResponse for serving files.

        Used by the local files endpoint to serve stored files.

        Args:
            key: Storage path relative to base directory.

        Returns:
            FileResponse: FastAPI response for file download.

        Raises:
            FileNotFoundError: If file doesn't exist.
        """
        file_path = self.base_path / key
        if not file_path.exists():
            raise FileNotFoundError(f"File not found: {key}")
        return FileResponse(file_path)


class S3Storage(StorageService):
    """
    AWS S3 storage for production environments.

    Uploads files to S3 bucket and serves them via CloudFront CDN.
    Requires AWS credentials and bucket configuration.
    """

    def __init__(self) -> None:
        """
        Initialize S3 client with AWS credentials.

        Raises:
            ValueError: If AWS credentials are not configured.
        """
        if not all(
            [
                settings.aws_access_key_id,
                settings.aws_secret_access_key,
                settings.aws_s3_bucket_name,
            ]
        ):
            raise ValueError("AWS credentials not configured")

        import boto3

        self.s3_client = boto3.client(
            "s3",
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key,
            region_name=settings.aws_region,
        )
        self.bucket_name = settings.aws_s3_bucket_name
        logger.info(f"☁️ S3 storage initialized with bucket: {self.bucket_name}")

    async def upload_file(
        self,
        file: UploadFile,
        key: str,
        content_type: Optional[str] = None,
    ) -> str:
        """
        Upload file to S3 bucket.

        Sets cache headers for immutability and appropriate content
        disposition based on file type.

        Args:
            file: FastAPI UploadFile object.
            key: S3 object key (path).
            content_type: MIME type for the file.

        Returns:
            str: CloudFront URL for accessing the file.
        """
        extra_args = {"CacheControl": "max-age=31536000, public, immutable"}
        if content_type:
            extra_args["ContentType"] = content_type

        # For zip files, set as attachment
        if key.endswith(".zip"):
            extra_args["ContentDisposition"] = "attachment"
        else:
            extra_args["ContentDisposition"] = "inline"

        content = await file.read()
        await file.seek(0)  # Reset file pointer

        self.s3_client.put_object(
            Bucket=self.bucket_name,
            Key=key,
            Body=content,
            **extra_args,
        )

        url = f"{settings.aws_cloudfront_url}/{key}"
        logger.info(f"☁️ File uploaded to S3: {key} -> {url}")
        return url

    async def delete_file(self, key: str) -> bool:
        """
        Delete file from S3 bucket.

        Args:
            key: S3 object key to delete.

        Returns:
            bool: True if deletion successful, False on error.
        """
        try:
            self.s3_client.delete_object(
                Bucket=self.bucket_name,
                Key=key,
            )
            logger.info(f"🗑️ File deleted from S3: {key}")
            return True
        except Exception as e:
            logger.error(f"❌ Failed to delete file from S3: {key} - {e}")
            return False

    async def get_file_url(self, key: str) -> str:
        """
        Get CloudFront URL for file.

        Args:
            key: S3 object key.

        Returns:
            str: Full CloudFront URL for the file.
        """
        return f"{settings.aws_cloudfront_url}/{key}"

    async def file_exists(self, key: str) -> bool:
        """
        Check if file exists in S3 bucket.

        Uses HEAD request to check existence without downloading.

        Args:
            key: S3 object key to check.

        Returns:
            bool: True if object exists, False otherwise.
        """
        try:
            self.s3_client.head_object(
                Bucket=self.bucket_name,
                Key=key,
            )
            return True
        except Exception:
            return False


def get_storage_service() -> StorageService:
    """
    Factory function to get appropriate storage service.

    Returns local file storage for development, S3 storage for
    production based on environment configuration.

    Returns:
        StorageService: Concrete storage service instance.
    """
    if settings.environment == Environment.LOCAL:
        return LocalFileStorage()
    return S3Storage()


# Singleton instance
storage_service = get_storage_service()
