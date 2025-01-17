import os

PRODUCTION_FLAG = os.getenv("PRODUCTION", False).lower() == "true"
TESTING_FLAG = os.environ.get("TESTING", False).lower() == "true"
