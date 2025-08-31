# TICKET-004: Refactor Email System for Local Development

## Description
Refactor the email system to work without Celery/Redis in local development. Implement environment-based email handling that logs to console for LOCAL environment while maintaining full functionality for DEV/PROD environments.

## Acceptance Criteria
- [ ] Implement email service that checks Environment enum
- [ ] Create console logger for LOCAL environment
- [ ] Skip Celery/Redis initialization when EMAIL_ENABLED=False
- [ ] Maintain backward compatibility for DEV/PROD
- [ ] Add formatted email preview in console for LOCAL
- [ ] Remove dependency on TESTING flag for email logic

## Priority
Medium

## Status
Todo

## Implementation Steps

### 1. Create Email Service Interface
- Create `app/services/email.py`
- Define abstract EmailService interface
- Implement ConsoleEmailService for LOCAL
- Implement CeleryEmailService for DEV/PROD
- Use factory pattern based on environment

### 2. Refactor Celery Tasks
- Make Celery import conditional
- Create mock tasks for LOCAL environment
- Ensure tasks work synchronously in LOCAL
- Maintain async behavior in DEV/PROD

### 3. Update Email Handlers
- Modify `app/utils/email_handler.py`
- Use new email service interface
- Remove direct Celery task calls
- Add email template rendering for console

### 4. Console Email Formatter
- Create formatted console output for emails
- Include recipient, subject, and body
- Add ASCII box drawing for visibility
- Log with appropriate log level

### 5. Update Worker Configuration
- Make `app/utils/worker.py` conditional
- Skip Celery app creation in LOCAL
- Provide mock celery app for imports
- Ensure no Redis connection attempts in LOCAL

### 6. Configuration Updates
- Add EMAIL_ENABLED to Settings
- Default to False for LOCAL environment
- Configure email service based on settings
- Remove TESTING flag checks

## Technical Details

### Email Service Interface
```python
# app/services/email.py
from abc import ABC, abstractmethod
from typing import Optional, Dict, Any
from app.core.config import settings, Environment
import logging

logger = logging.getLogger(__name__)

class EmailService(ABC):
    @abstractmethod
    async def send_email(
        self, 
        to: str, 
        subject: str, 
        body: str, 
        template: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None
    ) -> bool:
        pass

class ConsoleEmailService(EmailService):
    """Logs emails to console for local development"""
    
    async def send_email(
        self, 
        to: str, 
        subject: str, 
        body: str,
        template: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None
    ) -> bool:
        # Format email for console output
        email_output = f"""
╔══════════════════════════════════════════════════════════╗
║                    📧 EMAIL PREVIEW                       ║
╠══════════════════════════════════════════════════════════╣
║ To: {to:<52} ║
║ Subject: {subject:<47} ║
╠══════════════════════════════════════════════════════════╣
║ Body:                                                     ║
║ {body[:200]}{'...' if len(body) > 200 else ''}
╚══════════════════════════════════════════════════════════╝
        """
        logger.info(email_output)
        return True

class CeleryEmailService(EmailService):
    """Sends emails via Celery tasks for production"""
    
    async def send_email(
        self,
        to: str,
        subject: str, 
        body: str,
        template: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None
    ) -> bool:
        from app.tasks import send_email_task
        send_email_task.delay(to, subject, body, template, context)
        return True

def get_email_service() -> EmailService:
    if settings.environment == Environment.LOCAL:
        return ConsoleEmailService()
    return CeleryEmailService()

# Singleton instance
email_service = get_email_service()
```

### Updated Worker Configuration
```python
# app/utils/worker.py
from app.core.config import settings, Environment
import logging

logger = logging.getLogger(__name__)

# Only initialize Celery for non-local environments
if settings.environment != Environment.LOCAL:
    from celery import Celery
    
    celery_app = Celery(
        "app",
        broker=settings.celery_broker_url,
        backend=settings.celery_result_backend,
        include=["app.tasks"]
    )
    
    celery_app.conf.update(
        task_serializer="json",
        accept_content=["json"],
        result_serializer="json",
        timezone="UTC",
        enable_utc=True,
    )
else:
    # Mock Celery app for local development
    class MockCelery:
        def __init__(self):
            logger.info("📧 Email service running in LOCAL mode - emails will be logged to console")
        
        def task(self, *args, **kwargs):
            def decorator(func):
                # Return the function directly for synchronous execution
                return func
            return decorator
    
    celery_app = MockCelery()
```

### Usage in Endpoints
```python
# app/api/endpoints/auth.py
from app.services.email import email_service

@router.post("/forgot-password")
async def forgot_password(email: str):
    # Generate reset token
    reset_token = generate_reset_token(email)
    
    # Send email (will log to console in LOCAL, send via Celery in DEV/PROD)
    await email_service.send_email(
        to=email,
        subject="Password Reset Request",
        body=f"Click here to reset: {reset_token}",
        template="password_reset",
        context={"token": reset_token, "user": email}
    )
    
    return {"message": "Password reset email sent"}
```

## Benefits
- **No Redis/Celery Required**: Simpler local setup
- **Instant Feedback**: See emails immediately in console
- **Easier Debugging**: Email content visible during development
- **Environment Aware**: Automatic behavior based on environment
- **Backward Compatible**: No changes to production flow

## Testing Requirements
- Unit tests for both email services
- Integration tests for email sending
- Verify console output formatting
- Ensure Celery tasks work in DEV/PROD
- Test environment detection logic

## Notes
- Consider adding email file storage option for LOCAL
- Could extend to support email preview UI later
- Ensure sensitive data isn't logged in production
- Add rate limiting for email sending