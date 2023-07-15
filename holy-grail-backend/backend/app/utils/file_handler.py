from starlette.datastructures import UploadFile
from io import BytesIO
import boto3
import os

S3_KEY = os.environ["AWS_S3_SECRET_ACCESS_KEY"]
S3_KEY_ID = os.environ["AWS_S3_ACCESS_KEY_ID"]
S3_BUCKET_NAME = (
    "test-bucket" if os.environ.get("TESTING") else os.environ["AWS_S3_BUCKET_NAME"]
)

s3_app_client = boto3.client(
    "s3", aws_access_key_id=S3_KEY_ID, aws_secret_access_key=S3_KEY
)


accepted_doc_type_extensions = {
    # "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    "application/pdf": ".pdf",
    # "text/plain": ".txt",
}


async def save_file(file: UploadFile, file_name: str, s3_client: boto3.client) -> str:
    file.filename = file_name
    file_content = await file.read()
    file_obj = BytesIO(file_content)
    s3_client.upload_fileobj(
        Fileobj=file_obj,
        Bucket=S3_BUCKET_NAME,
        Key=file.filename,
        ExtraArgs={"ContentType": "application/pdf", "ContentDisposition": "inline"},
    )
    return file.filename
