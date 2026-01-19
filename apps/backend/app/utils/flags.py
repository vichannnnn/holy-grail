"""
Environment flags for conditional behavior.

This module provides boolean flags based on environment variables
to control application behavior in different environments.
"""
import os

TESTING_FLAG = os.environ.get("TESTING", "false").lower() == "true"
