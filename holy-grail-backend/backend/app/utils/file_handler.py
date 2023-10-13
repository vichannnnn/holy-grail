import os
from io import BytesIO

import boto3
from starlette.datastructures import UploadFile

S3_KEY = os.environ["AWS_S3_SECRET_ACCESS_KEY"]
S3_KEY_ID = os.environ["AWS_S3_ACCESS_KEY_ID"]
S3_BUCKET_NAME = (
    "test-bucket" if os.environ.get("TESTING") else os.environ["AWS_S3_BUCKET_NAME"]
)
S3_BUCKET_URL = f"https://{S3_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/"

s3_app_client = boto3.client(
    "s3", aws_access_key_id=S3_KEY_ID, aws_secret_access_key=S3_KEY
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
    print(file_name)
    file_content = await file.read()
    file_obj = BytesIO(file_content)
    if file.filename.endswith(".zip"):
        ExtraArgs = {
            "ContentType": "application/zip",
            "ContentDisposition": "attachment",
        }
    else:
        ExtraArgs = {"ContentType": "application/pdf", "ContentDisposition": "inline"}

    s3_client.upload_fileobj(
        Fileobj=file_obj,
        Bucket=S3_BUCKET_NAME,
        Key=file.filename,
        ExtraArgs=ExtraArgs,
    )
    return file.filename
