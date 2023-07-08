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
