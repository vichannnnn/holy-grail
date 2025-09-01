import secrets
from typing import Optional

from app.core.enums import Environment
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        populate_by_name=True,  # Allow both field names and aliases
    )

    # Environment
    environment: Environment = Field(default=Environment.LOCAL)

    # Database Configuration
    postgres_user: str = Field(default="postgres")
    postgres_password: str = Field(default="postgres")
    postgres_db: str = Field(default="app")
    postgres_host: str = Field(default="localhost")
    postgres_port: int = Field(default=5432)

    # JWT/Authentication
    secret_key: str = Field(default_factory=lambda: secrets.token_hex(32))
    algorithm: str = Field(default="HS256")
    access_token_expire_minutes: int = Field(default=1440)

    # AWS Configuration (Optional for LOCAL)
    aws_access_key_id: Optional[str] = Field(default=None, alias="AWS_ACCESS_KEY_ID")
    aws_secret_access_key: Optional[str] = Field(
        default=None, alias="AWS_SECRET_ACCESS_KEY"
    )
    aws_region: str = Field(default="ap-southeast-1", alias="AWS_REGION")
    aws_s3_bucket_name: Optional[str] = Field(default=None, alias="AWS_S3_BUCKET_NAME")
    aws_cloudfront_url: Optional[str] = Field(default=None, alias="AWS_CLOUDFRONT_URL")

    # Email Configuration
    email_enabled: bool = Field(default=False)
    mailtrap_api_key: Optional[str] = Field(default=None)
    mailtrap_bearer_token: Optional[str] = Field(default=None)

    # Celery Configuration (Optional for LOCAL)
    celery_broker_url: Optional[str] = Field(default="redis://localhost:6379")
    celery_result_backend: Optional[str] = Field(default="redis://localhost:6379")

    # Application URLs
    frontend_url: str = Field(default="http://localhost:3000")
    backend_url: str = Field(default="http://localhost:8000")
    backend_container_url: str = Field(default="backend:8000")

    # Local Storage Configuration (for LOCAL environment)
    local_storage_path: str = Field(default="./uploads")
    local_storage_url: str = Field(default="http://localhost:8000/files")

    # Optional Services
    logfire_token: Optional[str] = Field(default=None)

    @property
    def database_url(self) -> str:
        return f"postgresql+asyncpg://{self.postgres_user}:{self.postgres_password}@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"

    @property
    def sync_database_url(self) -> str:
        return f"postgresql://{self.postgres_user}:{self.postgres_password}@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"

    @property
    def storage_url(self) -> str:
        if self.environment == Environment.LOCAL:
            return self.local_storage_url
        return self.aws_cloudfront_url or self.local_storage_url

    @field_validator("aws_access_key_id", "aws_secret_access_key", "aws_s3_bucket_name")
    @classmethod
    def validate_aws_config(cls, v: Optional[str], info) -> Optional[str]:
        environment = info.data.get("environment", Environment.LOCAL)
        if environment != Environment.LOCAL and v is None:
            raise ValueError(
                f"AWS configuration required for {environment} environment"
            )
        return v

    @field_validator("email_enabled")
    @classmethod
    def validate_email_config(cls, v: bool, info) -> bool:
        environment = info.data.get("environment", Environment.LOCAL)
        if environment == Environment.LOCAL:
            return False
        return v

    @field_validator("mailtrap_api_key", "mailtrap_bearer_token")
    @classmethod
    def validate_mailtrap_config(cls, v: Optional[str], info) -> Optional[str]:
        environment = info.data.get("environment", Environment.LOCAL)
        email_enabled = info.data.get("email_enabled", False)
        if environment != Environment.LOCAL and email_enabled and v is None:
            raise ValueError("Mailtrap configuration required when email is enabled")
        return v

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if self.environment == Environment.LOCAL:
            self.email_enabled = False


settings = Settings()
