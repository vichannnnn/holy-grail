# TICKET-021: Refactor Authentication System

## Description
Consolidate and refactor the authentication system to eliminate code duplication and improve maintainability. This is the third phase of the backend refactoring plan (PLAN-001).

## Acceptance Criteria
- [ ] Single authentication factory function replaces multiple auth functions
- [ ] Role-based authentication uses configurable parameters
- [ ] JWT decoding logic exists in only one place
- [ ] Authentication decorators created for common patterns
- [ ] All duplicated code eliminated from `deps.py`
- [ ] Consistent error handling across all auth scenarios
- [ ] All existing authentication functionality preserved
- [ ] Tests cover all authentication scenarios

## Priority
Medium

## Status
Todo

## Implementation Steps
1. [ ] Analyze current authentication functions in `deps.py`
   - [ ] Document commonalities between functions
   - [ ] Identify parameters that differ
2. [ ] Create authentication factory function
   - [ ] Design flexible parameter system
   - [ ] Handle verified/unverified users
   - [ ] Handle role-based access (user, admin, developer)
3. [ ] Refactor JWT decoding to single location
   - [ ] Create `decode_jwt_token()` utility function
   - [ ] Handle all JWT exceptions consistently
4. [ ] Update existing auth dependencies
   - [ ] Replace `get_current_user` with factory call
   - [ ] Replace `get_verified_user` with factory call
   - [ ] Replace `get_admin` with factory call
   - [ ] Replace `get_developer` with factory call
5. [ ] Create role-based decorators (optional)
   - [ ] `@require_admin` decorator
   - [ ] `@require_verified` decorator
   - [ ] `@require_role(min_role=X)` decorator
6. [ ] Update all endpoints using authentication
7. [ ] Update tests for new authentication system
8. [ ] Document new authentication patterns

## Example Implementation
```python
# /app/api/deps.py
from typing import Optional
from functools import partial

async def authenticate_user(
    session: CurrentSession,
    token: OAuth2Session,
    *,
    require_verified: bool = False,
    min_role: int = 1,
) -> CurrentUserSchema:
    """
    Universal authentication function with configurable requirements.
    
    Args:
        session: Database session
        token: OAuth2 access token
        require_verified: Whether email verification is required
        min_role: Minimum role level required (1=user, 2=admin, 3=developer)
        
    Returns:
        CurrentUserSchema: Authenticated user information
        
    Raises:
        HTTPException(401): Invalid credentials
        HTTPException(403): Insufficient permissions
    """
    try:
        payload = decode_jwt_token(token)  # Single JWT decoding function
        username = payload.get("sub")
        
        if not username:
            raise AppError.INVALID_CREDENTIALS_ERROR
            
        user = await Account.select_from_username(session, username)
        if not user:
            raise AppError.INVALID_CREDENTIALS_ERROR
            
        # Check verification requirement
        if require_verified and not user.verified:
            raise AppError.PERMISSION_DENIED_ERROR
            
        # Check role requirement
        if user.role < min_role:
            raise AppError.PERMISSION_DENIED_ERROR
            
        return CurrentUserSchema(
            user_id=user.user_id,
            username=username,
            role=user.role,
            email=user.email,
            verified=user.verified,
        )
    except JWTError as exc:
        raise AppError.INVALID_CREDENTIALS_ERROR from exc

# Create specific dependencies using partial application
get_current_user = partial(authenticate_user, require_verified=False, min_role=1)
get_verified_user = partial(authenticate_user, require_verified=True, min_role=1)
get_admin = partial(authenticate_user, require_verified=False, min_role=2)
get_developer = partial(authenticate_user, require_verified=False, min_role=3)

# Or use factory pattern
def require_auth(*, verified: bool = False, min_role: int = 1):
    """Factory for creating authentication dependencies."""
    async def auth_dependency(
        session: CurrentSession,
        token: OAuth2Session
    ) -> CurrentUserSchema:
        return await authenticate_user(
            session, token,
            require_verified=verified,
            min_role=min_role
        )
    return auth_dependency

# Usage in endpoints
SessionUser = Annotated[CurrentUserSchema, Depends(require_auth())]
SessionVerifiedUser = Annotated[CurrentUserSchema, Depends(require_auth(verified=True))]
SessionAdmin = Annotated[CurrentUserSchema, Depends(require_auth(min_role=2))]
```

## Notes
- Ensure backward compatibility with existing endpoints
- Consider performance implications of changes
- Maintain clear error messages for different failure scenarios
- Document the new authentication patterns thoroughly
- Consider adding authentication caching if needed