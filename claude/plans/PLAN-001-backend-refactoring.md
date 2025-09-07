# PLAN-001: Backend API Refactoring

## Executive Summary
This plan outlines a comprehensive refactoring of the backend API to improve code quality, maintainability, and separation of concerns. The refactoring will be executed in 6 phases, each focusing on a specific aspect of improvement.

## Objectives
- [ ] Add comprehensive documentation (docstrings) to all modules, classes, and functions
- [ ] Implement proper separation of concerns with a service layer
- [ ] Eliminate code duplication, especially in authentication
- [ ] Clean up technical debt (commented code, debug statements)
- [ ] Improve data access patterns with repository pattern
- [ ] Enhance API structure with consistent patterns

## Architecture

### Current Architecture
```
API Endpoints → Models (with business logic) → Database
```

### Target Architecture
```
API Endpoints → Services (business logic) → Repositories (data access) → Models (data representation) → Database
```

### Directory Structure (After Refactoring)
```
app/
├── api/
│   ├── endpoints/      # API route handlers
│   └── deps.py         # Dependencies (auth, session, etc.)
├── services/           # Business logic layer
│   ├── auth.py
│   ├── library.py
│   ├── analytics.py
│   └── ...
├── repositories/       # Data access layer
│   ├── auth.py
│   ├── library.py
│   └── ...
├── models/            # SQLAlchemy models (data only)
├── schemas/           # Pydantic models
└── core/              # Configuration
```

## Implementation Phases

### Phase 1: Add Documentation
- Add module-level docstrings explaining purpose
- Add class docstrings with usage examples
- Add function/method docstrings (Google style)
- Include parameter types, return values, and exceptions
- Priority: HIGH
- Estimated effort: 2-3 days

### Phase 2: Implement Service Layer
- Create `/services` directory
- Move business logic from models to services
- One service class per domain (AuthService, LibraryService, etc.)
- Inject services as dependencies in endpoints
- Priority: HIGH
- Estimated effort: 3-4 days

### Phase 3: Refactor Authentication
- Create authentication factory function
- Consolidate role-based authentication
- Implement role decorators
- Remove duplicated JWT logic
- Priority: MEDIUM
- Estimated effort: 1-2 days

### Phase 4: Code Cleanup
- Remove all commented-out code
- Remove debug statements (pdb.set_trace())
- Fix inconsistent naming
- Remove unused imports and parameters
- Priority: HIGH
- Estimated effort: 1 day

### Phase 5: Implement Repository Pattern
- Create `/repositories` directory
- Move data access from models to repositories
- Implement unit of work pattern
- Keep models as pure data structures
- Priority: MEDIUM
- Estimated effort: 3-4 days

### Phase 6: Enhance API Structure
- Add OpenAPI descriptions to all endpoints
- Implement consistent error response schema
- Standardize HTTP status codes
- Add request/response validation
- Priority: LOW
- Estimated effort: 2 days

## Example Transformations

### Service Layer Example
```python
# Before (in models/auth.py)
class Account(Base, CRUD):
    @classmethod
    async def register(cls, session, data):
        # Business logic mixed with data access
        if data.password != data.repeat_password:
            raise AppError.BAD_REQUEST_ERROR
        # ... more logic
        
# After (in services/auth.py)
class AuthService:
    def __init__(self, session: AsyncSession, email_service: EmailService):
        self.session = session
        self.email_service = email_service
        
    async def register_user(self, data: AccountRegisterSchema) -> CurrentUserWithJWTSchema:
        """Register a new user account."""
        if data.password != data.repeat_password:
            raise AppError.BAD_REQUEST_ERROR
        # ... business logic
```

### Authentication Refactoring Example
```python
# Before (multiple similar functions)
async def get_current_user(session, token): ...
async def get_verified_user(session, token): ...
async def get_admin(session, token): ...

# After (single factory)
def require_auth(*, verified: bool = False, min_role: int = 1):
    async def get_authenticated_user(session, token):
        # Single implementation
    return get_authenticated_user
```

## Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing functionality | High | Comprehensive test coverage before refactoring |
| Large scope causing delays | Medium | Phase-based approach, can deliver incrementally |
| Merge conflicts with ongoing work | Medium | Coordinate with team, work on separate branch |

## Success Metrics
- 100% of functions have docstrings
- Zero commented-out code in production
- All business logic moved to service layer
- Authentication code reduced by 50%
- All endpoints have OpenAPI documentation
- Consistent error handling across all endpoints

## Testing Strategy
- Write tests for new service layer before implementation
- Ensure existing tests pass after each phase
- Add integration tests for refactored components
- Performance testing to ensure no regression

## Notes
- Each phase will have its own ticket with detailed implementation steps
- Phases can be executed somewhat in parallel (1, 4 can start immediately)
- Regular code reviews after each phase
- Update documentation as we progress