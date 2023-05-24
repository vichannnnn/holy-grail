import uuid
from starlette.datastructures import UploadFile
import boto3
import os
from io import BytesIO

S3_KEY = os.environ["AWS_S3_SECRET_ACCESS_KEY"]
S3_KEY_ID = os.environ["AWS_S3_ACCESS_KEY_ID"]
S3_BUCKET_NAME = os.environ["AWS_S3_BUCKET_NAME"]

s3_client = boto3.client(
    "s3", aws_access_key_id=S3_KEY_ID, aws_secret_access_key=S3_KEY
)


async def save_file(file: UploadFile, extension: str) -> str:
    file_id = uuid.uuid4().hex
    file.filename = file_id + extension

    file_content = await file.read()
    file_obj = BytesIO(file_content)
    s3_client.upload_fileobj(
        Fileobj=file_obj,
        Bucket=S3_BUCKET_NAME,
        Key=file.filename,
        ExtraArgs={"ContentType": "application/pdf", "ContentDisposition": "inline"},
    )
    return file.filename
