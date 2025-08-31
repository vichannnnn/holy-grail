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
    @abstractmethod
    async def upload_file(
        self,
        file: UploadFile,
        key: str,
        content_type: Optional[str] = None,
    ) -> str:
        """Upload file and return URL"""
        pass

    @abstractmethod
    async def delete_file(self, key: str) -> bool:
        """Delete file by key"""
        pass

    @abstractmethod
    async def get_file_url(self, key: str) -> str:
        """Get public URL for file"""
        pass

    @abstractmethod
    async def file_exists(self, key: str) -> bool:
        """Check if file exists"""
        pass


class LocalFileStorage(StorageService):
    """Local file storage for development"""

    def __init__(self) -> None:
        self.base_path = Path(settings.local_storage_path)
        self.base_path.mkdir(parents=True, exist_ok=True)
        logger.info(f"📁 Local storage initialized at {self.base_path.absolute()}")

    async def upload_file(
        self,
        file: UploadFile,
        key: str,
        content_type: Optional[str] = None,
    ) -> str:
        file_path = self.base_path / key
        file_path.parent.mkdir(parents=True, exist_ok=True)

        content = await file.read()
        async with aiofiles.open(file_path, "wb") as f:
            await f.write(content)

        url = f"{settings.local_storage_url}/{key}"
        logger.info(f"📁 File uploaded locally: {key} -> {url}")
        return url

    async def delete_file(self, key: str) -> bool:
        file_path = self.base_path / key
        if file_path.exists():
            file_path.unlink()
            logger.info(f"🗑️ File deleted locally: {key}")
            return True
        logger.warning(f"⚠️ File not found for deletion: {key}")
        return False

    async def get_file_url(self, key: str) -> str:
        return f"{settings.local_storage_url}/{key}"

    async def file_exists(self, key: str) -> bool:
        file_path = self.base_path / key
        return file_path.exists()

    def get_file_response(self, key: str) -> FileResponse:
        """Get file response for serving files locally"""
        file_path = self.base_path / key
        if not file_path.exists():
            raise FileNotFoundError(f"File not found: {key}")
        return FileResponse(file_path)


class S3Storage(StorageService):
    """AWS S3 storage for production"""

    def __init__(self) -> None:
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
        return f"{settings.aws_cloudfront_url}/{key}"

    async def file_exists(self, key: str) -> bool:
        try:
            self.s3_client.head_object(
                Bucket=self.bucket_name,
                Key=key,
            )
            return True
        except Exception:
            return False


def get_storage_service() -> StorageService:
    if settings.environment == Environment.LOCAL:
        return LocalFileStorage()
    return S3Storage()


# Singleton instance
storage_service = get_storage_service()