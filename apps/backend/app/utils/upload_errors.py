"""
Upload error types for file validation.

This module defines error codes used when validating file uploads
to provide specific feedback about upload failures.
"""
from enum import Enum


class UploadError(Enum):
    """
    Enumeration of possible file upload errors.

    Used to provide specific error codes when document uploads
    fail validation or conflict with existing data.
    """

    DOCUMENT_NAME_DUPLICATED = "DOCUMENT_NAME_DUPLICATED"
    DOCUMENT_NAME_IN_DB = "DOCUMENT_NAME_IN_DB"
    INVALID_FILE_TYPE = "INVALID_FILE_TYPE"
    SCHEMA_VALIDATION_ERROR = "SCHEMA_VALIDATION_ERROR"
