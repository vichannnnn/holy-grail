import uuid
from starlette.datastructures import UploadFile
from io import BytesIO
import boto3
from app.app_s3_client import S3_BUCKET_NAME

accepted_doc_type_extensions = {
    # "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    "application/pdf": ".pdf",
    # "text/plain": ".txt",
}


async def save_file(file: UploadFile, extension: str, s3_client: boto3.client) -> str:
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
