import os
from io import BytesIO

import boto3
from starlette.datastructures import UploadFile

from app.utils.flags import TESTING_FLAG

AWS_ACCESS_KEY = os.environ.get("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.environ.get("AWS_SECRET_KEY")
S3_BUCKET_NAME = "test-bucket" if TESTING_FLAG else os.environ["AWS_S3_BUCKET_NAME"]
AWS_CLOUDFRONT_URL = os.environ.get("AWS_CLOUDFRONT_URL")

S3_BUCKET_URL = f"https://{S3_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/"

s3_app_client = boto3.client(
    "s3", aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY
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
