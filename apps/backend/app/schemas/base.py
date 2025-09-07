"""
Base schema configuration for all Pydantic models.

Provides a custom base model with common configuration settings
used throughout the application for data validation and serialization.
"""
from pydantic import BaseModel, ConfigDict


class CustomBaseModel(BaseModel):
    """
    Custom base model with application-wide Pydantic configuration.

    Configuration:
        - arbitrary_types_allowed: Allows custom types in model fields
        - regex_engine: Uses Python's regex engine for pattern validation
        - from_attributes: Enables model creation from ORM objects
    """

    model_config = ConfigDict(
        arbitrary_types_allowed=True, regex_engine="python-re", from_attributes=True
    )
