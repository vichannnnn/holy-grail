import os

PRODUCTION_FLAG = os.getenv("PRODUCTION", "false").lower() == "true"
TESTING_FLAG = os.environ.get("TESTING", "false").lower() == "true"