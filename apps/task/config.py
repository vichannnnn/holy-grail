from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    opensearch_enabled: bool = False
    opensearch_host: str = "localhost"
    opensearch_port: int = 9200
    opensearch_index: str = "holy_grail_documents"
    opensearch_user: str | None = None
    opensearch_password: str | None = None
    opensearch_use_ssl: bool | None = None

    aws_cloudfront_url: str | None = None

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
