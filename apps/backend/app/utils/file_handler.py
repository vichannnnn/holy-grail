"""
File upload handler for S3 storage.

This module provides utilities for uploading files to AWS S3 with
appropriate content types and caching headers. Handles both regular
documents and zip archives.

Note: This module appears to be legacy code as the application now uses
the storage service abstraction.
"""
from io import BytesIO

import boto3
from starlette.datastructures import UploadFile

from app.core import Environment, settings

S3_BUCKET_NAME = (
    "test-bucket" if settings.environment == Environment.LOCAL else settings.aws_s3_bucket_name
)
AWS_CLOUDFRONT_URL = settings.aws_cloudfront_url

S3_BUCKET_URL = f"https://{S3_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/"

s3_app_client = (
    boto3.client(
        "s3",
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
        region_name=settings.aws_region,
    )
    if settings.aws_access_key_id
    else None
)

accepted_doc_type_extensions = {
    # "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    "application/pdf": ".pdf",
    # "text/plain": ".txt",
}

developer_accepted_doc_type_extensions = {
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    "application/pdf": ".pdf",
    "text/plain": ".txt",
    "application/zip": ".zip",
}


async def save_file(file: UploadFile, file_name: str, s3_client: boto3.client) -> str:
    """
    Upload file to S3 bucket.

    Sets appropriate content type and disposition based on file extension.
    Applies immutable caching headers for performance.

    Args:
        file: FastAPI UploadFile object to upload.
        file_name: Desired filename in S3.
        s3_client: Boto3 S3 client instance.

    Returns:
        str: The filename used in S3.
    """
    file.filename = file_name
    file_content = await file.read()
    file_obj = BytesIO(file_content)

    CommonArgs = {"CacheControl": "max-age=31536000, public, immutable"}

    if file.filename.endswith(".zip"):
        ExtraArgs = {
            "ContentType": "application/zip",
            "ContentDisposition": "attachment",
        }
    else:
        ExtraArgs = {"ContentType": "application/pdf", "ContentDisposition": "inline"}

    HeaderArgs = {**CommonArgs, **ExtraArgs}

    s3_client.upload_fileobj(
        Fileobj=file_obj,
        Bucket=S3_BUCKET_NAME,
        Key=file.filename,
        ExtraArgs=HeaderArgs,
    )
    return file.filename
