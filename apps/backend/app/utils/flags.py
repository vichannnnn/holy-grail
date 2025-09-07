"""
Environment flags for conditional behavior.

This module provides boolean flags based on environment variables
to control application behavior in different environments.
"""
import os

PRODUCTION_FLAG = os.getenv("PRODUCTION", "false").lower() == "true"
TESTING_FLAG = os.environ.get("TESTING", "false").lower() == "true"
