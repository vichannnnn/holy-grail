# TICKET-020: Implement Service Layer

## Description
Create a service layer to separate business logic from data models. Move all business logic currently in models to dedicated service classes. This is the second phase of the backend refactoring plan (PLAN-001).

## Acceptance Criteria
- [ ] `/app/services` directory created
- [ ] Service class created for each domain (auth, library, analytics, etc.)
- [ ] All business logic moved from models to services
- [ ] Models only contain data structure and relationships
- [ ] Endpoints use services instead of calling model methods directly
- [ ] All existing tests pass after refactoring
- [ ] Services are properly injected as dependencies

## Priority
High

## Status
Todo

## Implementation Steps
1. [ ] Create `/app/services` directory with `__init__.py`
2. [ ] Create `AuthService` class in `/app/services/auth.py`
   - [ ] Move `register()` method from Account model
   - [ ] Move `login()` method from Account model
   - [ ] Move `update_password()` method from Account model
   - [ ] Move `update_email()` method from Account model
   - [ ] Move `verify_email()` method from Account model
   - [ ] Move `send_reset_email()` method from Account model
   - [ ] Move `reset_password()` method from Account model
3. [ ] Create `LibraryService` class in `/app/services/library.py`
   - [ ] Move `create_many()` method from Library model
   - [ ] Move `download()` method from Library model
   - [ ] Move `get_all_notes_paginated()` method from Library model
   - [ ] Move `update_note()` method from Library model
   - [ ] Move `delete_note()` method from Library model
4. [ ] Create `AnalyticsService` class in `/app/services/analytics.py`
   - [ ] Move analytics business logic from model
5. [ ] Create `ScoreboardService` class in `/app/services/scoreboard.py`
   - [ ] Move scoreboard business logic from model
6. [ ] Create service dependency injection functions in `/app/api/deps.py`
7. [ ] Update all endpoints to use services instead of models
8. [ ] Update imports throughout the codebase
9. [ ] Ensure all tests pass after refactoring
10. [ ] Update any documentation affected by the changes

## Example Service Implementation
```python
# /app/services/auth.py
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.auth import Account
from app.schemas.auth import AccountRegisterSchema, CurrentUserWithJWTSchema
from app.services.email import EmailService
from app.utils.auth import Authenticator
from app.utils.exceptions import AppError

class AuthService:
    """Service for handling authentication and user management."""
    
    def __init__(self, session: AsyncSession, email_service: EmailService):
        self.session = session
        self.email_service = email_service
        
    async def register_user(self, data: AccountRegisterSchema) -> CurrentUserWithJWTSchema:
        """Register a new user account."""
        if data.password != data.repeat_password:
            raise AppError.BAD_REQUEST_ERROR
            
        hashed_password = Authenticator.pwd_context.hash(data.password)
        # ... rest of business logic
        
# /app/api/deps.py
async def get_auth_service(
    session: CurrentSession,
    email_service: EmailService = Depends(get_email_service)
) -> AuthService:
    return AuthService(session, email_service)
```

## Notes
- Maintain backward compatibility during transition
- Services should be stateless and focused on business logic
- Use dependency injection for services in endpoints
- Keep models as pure data structures
- Consider creating base service class if common patterns emerge