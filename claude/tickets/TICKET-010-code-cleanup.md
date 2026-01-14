# TICKET-010: Code Cleanup

## Description
Clean up technical debt in the backend codebase by removing commented-out code, debug statements, fixing naming inconsistencies, and removing unused imports. This is the fourth phase of the backend refactoring plan (PLAN-001).

## Acceptance Criteria
- [ ] All commented-out code removed
- [ ] All debug statements (pdb.set_trace()) removed
- [ ] Consistent naming conventions applied throughout
- [ ] All unused imports removed
- [ ] All unused function parameters removed or properly used
- [ ] No pylint disable comments for fixable issues
- [ ] Code passes all linting checks

## Priority
High

## Status
Todo

## Implementation Steps
1. [ ] Remove commented-out code
   - [ ] Remove commented endpoint in `analytics.py` (lines 10-14)
   - [ ] Search for other commented code blocks across all files
2. [ ] Remove debug statements
   - [ ] Remove pdb.set_trace() in `library.py` (lines 122-123)
   - [ ] Search for any other debug statements
3. [ ] Fix naming inconsistencies
   - [ ] Standardize `authenticated` vs `current_user` parameter naming
   - [ ] Ensure consistent naming patterns across endpoints
   - [ ] Fix variable names that don't follow conventions
4. [ ] Remove unused imports
   - [ ] Run import analysis tool
   - [ ] Remove all unused imports
   - [ ] Organize imports according to PEP8
5. [ ] Handle unused parameters
   - [ ] Remove `request` parameter where only used for pylint disable
   - [ ] Either use or remove other unused parameters
   - [ ] Remove unnecessary pylint disable comments
6. [ ] General code quality improvements
   - [ ] Fix any remaining linting issues
   - [ ] Ensure consistent code formatting
   - [ ] Remove redundant code

## Specific Issues to Address

### Commented Code to Remove
- `/app/api/endpoints/analytics.py` - Lines 10-14 (fetch_google_analytics endpoint)
- Search all files for other instances

### Debug Statements to Remove
- `/app/api/endpoints/library.py` - Lines 122-123 (pdb.set_trace())

### Naming Inconsistencies
- Some endpoints use `authenticated` parameter
- Others use `current_user` parameter
- Standardize to one consistent name

### Unused Parameters
- Multiple endpoints have `request: Request` parameter only for rate limiting
- These have `# pylint: disable=W0613` comments
- Consider if there's a better pattern for rate limiting

## Example Fixes

### Before
```python
@router.post("/create")
async def create_account(
    request: Request,  # pylint: disable=W0613
    session: CurrentSession,
    authenticated: SessionUser,  # Inconsistent naming
    data: AccountRegisterSchema,
):
    # import pdb
    # pdb.set_trace()  # Debug statement to remove
    created_user = await Account.register(session=session, data=data)
    return created_user
```

### After
```python
@router.post("/create")
async def create_account(
    request: Request,  # Used by rate_limit decorator
    session: CurrentSession,
    current_user: SessionUser,  # Consistent naming
    data: AccountRegisterSchema,
):
    created_user = await Account.register(session=session, data=data)
    return created_user
```

## Notes
- Use automated tools where possible (isort, autoflake, etc.)
- Ensure no functional changes during cleanup
- Run full test suite after cleanup
- Consider adding pre-commit hooks to prevent future issues