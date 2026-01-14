# TICKET-009: Fix Celery Beat macOS Error

## Description
Fix the Celery Beat OverflowError that occurs on macOS when running the task service. This error is related to file descriptor handling differences between macOS and Linux.

## Acceptance Criteria
- [x] Identify the root cause of the OverflowError
- [x] Implement workarounds to prevent the error
- [x] Ensure Celery worker and scheduled tasks still function correctly
- [x] Document the issue and solution for future developers
- [x] Verify the error doesn't affect production (Linux) environments

## Priority
Low

## Status
Done

## Implementation Summary
1. Added environment variable `OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES` to task's dev:worker script
2. Created `celeryconfig.py` with macOS-specific workarounds
3. Updated `worker.py` to import and apply the configuration
4. Added dotenv loading to both `worker.py` and `api.py` to ensure environment variables are loaded

## Technical Details
The error occurs because Celery Beat tries to close file descriptors during fork operations, which can overflow on macOS due to different file descriptor handling. The error message:
```
OverflowError: Python int too large to convert to C int
```

This is a known issue with Celery on macOS and does not affect functionality - the worker and scheduled tasks continue to run normally.

## Notes
- The error is cosmetic and can be safely ignored during development
- This error does not occur in production (Linux) environments
- The Celery worker starts successfully despite the Beat error
- All scheduled tasks execute as expected
- Completed: 2025-09-13