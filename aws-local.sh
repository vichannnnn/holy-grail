#!/bin/bash

# Load AWS credentials from .env.aws
if [ -f .env.aws ]; then
    export $(cat .env.aws | grep -v '^#' | xargs)
else
    echo "Error: .env.aws file not found!"
    exit 1
fi

# Execute AWS CLI command with project-level credentials
aws "$@"