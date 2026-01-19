"""
Core enumerations used throughout the application.

This module defines enum types for consistent value handling
across the application.
"""
from enum import Enum


class Environment(str, Enum):
    """
    Deployment environment enumeration.

    Defines the different environments the application can run in,
    with helper methods to check environment-specific requirements.
    """

    LOCAL = "LOCAL"
    DEV = "DEV"
    PROD = "PROD"

    def is_local(self) -> bool:
        """
        Check if running in local development.

        Returns:
            bool: True if environment is LOCAL.
        """
        return self == Environment.LOCAL

    def is_dev(self) -> bool:
        """
        Check if running in development environment.

        Returns:
            bool: True if environment is DEV.
        """
        return self == Environment.DEV

    def is_prod(self) -> bool:
        """
        Check if running in production environment.

        Returns:
            bool: True if environment is PROD.
        """
        return self == Environment.PROD

    def is_production_like(self) -> bool:
        """
        Check if running in a production-like environment.

        Both DEV and PROD are considered production-like as they
        require external services like AWS and email.

        Returns:
            bool: True if environment is DEV or PROD.
        """
        return self in (Environment.DEV, Environment.PROD)

    def requires_aws(self) -> bool:
        """
        Check if environment requires AWS services.

        Returns:
            bool: True if AWS configuration is required.
        """
        return self.is_production_like()

    def requires_email(self) -> bool:
        """
        Check if environment requires email services.

        Returns:
            bool: True if email configuration is required.
        """
        return self.is_production_like()
