# TICKET-005: Standardize AWS Configuration

## Description
Standardize AWS credential naming conventions across the entire codebase to use AWS SDK standard names. Make AWS configuration optional for local development with appropriate fallbacks.

## Acceptance Criteria
- [x] Rename AWS credentials to AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
- [x] Make AWS configuration optional for LOCAL environment
- [x] Implement local file storage fallback
- [x] Update all AWS service references in code
- [x] Consolidate .env.aws into main .env file
- [x] Update docker-compose.yml environment mappings

## Priority
Medium

## Status
Done

## Implementation Steps

### 1. Update Settings Configuration
- Change AWS field names in Settings class:
  - `aws_access_key` → `aws_access_key_id`
  - `aws_secret_key` → `aws_secret_access_key`
- Make all AWS fields Optional
- Add validation for AWS fields based on environment

### 2. Create Storage Service Interface
- Create `app/services/storage.py`
- Define abstract StorageService interface
- Implement LocalFileStorage for LOCAL environment
- Implement S3Storage for DEV/PROD
- Use factory pattern based on configuration

### 3. Update File Handler
- Modify `app/utils/file_handler.py`
- Use new storage service interface
- Remove direct boto3 calls
- Add local file path configuration

### 4. Update Environment Files
- Update .env.example with new AWS names
- Remove .env.aws file
- Consolidate aws-local.sh script
- Update all documentation

### 5. Update Docker Compose
- Change environment variable mappings
- Update both development and production configs
- Ensure backward compatibility during migration

### 6. Migration Script
- Create script to update existing .env files
- Rename old variable names to new ones
- Backup original files before modification

## Technical Details

### Updated Settings with Standard AWS Names
```python
# app/core/config.py
from typing import Optional
from pydantic_settings import BaseSettings
from app.core.enums import Environment

class Settings(BaseSettings):
    # AWS Configuration (Optional for LOCAL)
    aws_access_key_id: Optional[str] = None
    aws_secret_access_key: Optional[str] = None
    aws_region: str = "ap-southeast-1"
    aws_s3_bucket_name: Optional[str] = None
    aws_cloudfront_url: Optional[str] = None
    
    # Local Storage Configuration
    local_storage_path: str = "./uploads"
    local_storage_url: str = "http://localhost:8000/files"
    
    @property
    def storage_url(self) -> str:
        """Get the appropriate storage URL based on environment"""
        if self.environment == Environment.LOCAL:
            return self.local_storage_url
        return self.aws_cloudfront_url or self.local_storage_url
    
    @validator("aws_access_key_id", "aws_secret_access_key", "aws_s3_bucket_name")
    def validate_aws_config(cls, v, values):
        """Ensure AWS config is provided for non-local environments"""
        if values.get("environment") != Environment.LOCAL and v is None:
            raise ValueError("AWS configuration required for non-local environments")
        return v
```

### Storage Service Implementation
```python
# app/services/storage.py
from abc import ABC, abstractmethod
from pathlib import Path
from typing import BinaryIO, Optional
import aiofiles
from app.core.config import settings, Environment

class StorageService(ABC):
    @abstractmethod
    async def upload_file(
        self, 
        file: BinaryIO, 
        key: str, 
        content_type: Optional[str] = None
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

class LocalFileStorage(StorageService):
    def __init__(self):
        self.base_path = Path(settings.local_storage_path)
        self.base_path.mkdir(parents=True, exist_ok=True)
    
    async def upload_file(
        self, 
        file: BinaryIO, 
        key: str,
        content_type: Optional[str] = None
    ) -> str:
        file_path = self.base_path / key
        file_path.parent.mkdir(parents=True, exist_ok=True)
        
        async with aiofiles.open(file_path, 'wb') as f:
            content = await file.read()
            await f.write(content)
        
        return f"{settings.local_storage_url}/{key}"
    
    async def delete_file(self, key: str) -> bool:
        file_path = self.base_path / key
        if file_path.exists():
            file_path.unlink()
            return True
        return False
    
    async def get_file_url(self, key: str) -> str:
        return f"{settings.local_storage_url}/{key}"

class S3Storage(StorageService):
    def __init__(self):
        import boto3
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key,
            region_name=settings.aws_region
        )
        self.bucket_name = settings.aws_s3_bucket_name
    
    async def upload_file(
        self,
        file: BinaryIO,
        key: str,
        content_type: Optional[str] = None
    ) -> str:
        extra_args = {}
        if content_type:
            extra_args['ContentType'] = content_type
        
        self.s3_client.upload_fileobj(
            file,
            self.bucket_name,
            key,
            ExtraArgs=extra_args
        )
        
        return f"{settings.aws_cloudfront_url}/{key}"
    
    async def delete_file(self, key: str) -> bool:
        try:
            self.s3_client.delete_object(
                Bucket=self.bucket_name,
                Key=key
            )
            return True
        except Exception:
            return False
    
    async def get_file_url(self, key: str) -> str:
        return f"{settings.aws_cloudfront_url}/{key}"

def get_storage_service() -> StorageService:
    if settings.environment == Environment.LOCAL:
        return LocalFileStorage()
    return S3Storage()

# Singleton instance
storage_service = get_storage_service()
```

### Updated docker-compose.yml
```yaml
environment:
  # Standard AWS naming
  AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
  AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
  AWS_REGION: ${AWS_REGION:-ap-southeast-1}
  AWS_S3_BUCKET_NAME: ${AWS_S3_BUCKET_NAME}
  AWS_CLOUDFRONT_URL: ${AWS_CLOUDFRONT_URL}
```

### Migration Script
```bash
#!/bin/bash
# scripts/migrate-aws-vars.sh

if [ -f .env ]; then
    cp .env .env.backup
    
    # Rename AWS variables
    sed -i '' 's/AWS_ACCESS_KEY=/AWS_ACCESS_KEY_ID=/g' .env
    sed -i '' 's/AWS_SECRET_KEY=/AWS_SECRET_ACCESS_KEY=/g' .env
    
    echo "✅ Migrated AWS variables in .env (backup: .env.backup)"
fi

# Merge .env.aws if it exists
if [ -f .env.aws ]; then
    echo "" >> .env
    echo "# Merged from .env.aws" >> .env
    cat .env.aws >> .env
    mv .env.aws .env.aws.backup
    echo "✅ Merged .env.aws into .env (backup: .env.aws.backup)"
fi
```

## Benefits
- **Standard Names**: Follows AWS SDK conventions
- **Optional AWS**: No AWS required for local development
- **Local Storage**: Files stored locally during development
- **Easier Testing**: No cloud dependencies for tests
- **Cost Savings**: No S3 usage during development

## Notes
- Ensure local storage directory is gitignored
- Consider adding file serving endpoint for local files
- Update any frontend references to AWS URLs
- Add file size limits for local storage

## Implementation Summary

Successfully standardized AWS configuration across the codebase and implemented local development fallbacks:

- **AWS Naming Standardization**: Renamed all AWS credential variables to standard AWS SDK names (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) for consistency and automatic SDK recognition
- **Optional AWS Configuration**: Made all AWS credentials optional for LOCAL environment with proper validation ensuring required fields only for DEV/PROD deployments
- **Storage Service Interface**: Created abstract StorageService with LocalFileStorage for LOCAL development and S3Storage for production, using factory pattern for environment-aware selection
- **Local File Storage**: Implemented complete local file storage solution with automatic directory creation, file serving, and URL generation for development workflow
- **Configuration Consolidation**: Merged separate .env.aws file into main .env configuration with migration script for smooth transition
- **Docker Environment Updates**: Updated all docker-compose.yml files to use standardized AWS environment variable names

The implementation eliminates AWS dependencies during local development, reduces costs, provides instant file operations, and maintains full S3 compatibility for production environments.