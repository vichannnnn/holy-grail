# TICKET-006: Create Developer Setup Scripts

## Description
Create comprehensive setup scripts and update the Makefile to provide a streamlined developer experience. Implement initialization scripts, validation tools, and simplified commands for daily development tasks.

## Acceptance Criteria
- [ ] Create init script for first-time setup
- [ ] Update Makefile with simplified commands using uv
- [ ] Add validation script for environment configuration
- [ ] Create comprehensive setup documentation
- [ ] Test onboarding flow on clean system
- [ ] Add helpful error messages and guidance

## Priority
Medium

## Status
Todo

## Implementation Steps

### 1. Create Initialization Script
- Create `scripts/init.sh`
- Check for Python 3.11+
- Install uv if not present
- Copy .env.example to .env
- Create virtual environment
- Install dependencies
- Set up database
- Run initial migrations

### 2. Update Makefile
- Simplify commands for common tasks
- Use uv for all Python operations
- Add database-only Docker commands
- Include development server commands
- Add code quality commands
- Create combined workflow commands

### 3. Environment Validation Script
- Create `scripts/validate-env.py`
- Check all required variables based on environment
- Validate database connectivity
- Test AWS credentials if provided
- Verify email configuration
- Provide clear error messages

### 4. Create Setup Documentation
- Write comprehensive LOCAL_DEVELOPMENT.md
- Include step-by-step setup guide
- Document all available commands
- Add troubleshooting section
- Include common scenarios

### 5. Developer Experience Enhancements
- Add command aliases for common operations
- Create helpful error messages
- Add progress indicators for long operations
- Include health check commands
- Add database backup/restore utilities

## Technical Details

### init.sh Script
```bash
#!/bin/bash
set -e

echo "🚀 Holy Grail Backend - Initial Setup"
echo "======================================"

# Check Python version
echo "📦 Checking Python version..."
python_version=$(python3 --version 2>&1 | grep -oE '[0-9]+\.[0-9]+')
required_version="3.11"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "❌ Python 3.11+ is required (found $python_version)"
    exit 1
fi
echo "✅ Python $python_version"

# Install uv if not present
if ! command -v uv &> /dev/null; then
    echo "📦 Installing uv package manager..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    source $HOME/.cargo/env
fi
echo "✅ uv is installed"

# Create .env from example
if [ ! -f .env ]; then
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "ℹ️  .env already exists"
fi

# Create virtual environment
echo "🐍 Creating virtual environment..."
uv venv

# Install dependencies
echo "📦 Installing dependencies..."
source .venv/bin/activate
uv pip install -e ".[dev]"

# Start database
echo "🗄️  Starting PostgreSQL..."
docker compose -f docker-compose.db.yml up -d

# Wait for database
echo "⏳ Waiting for database to be ready..."
for i in {1..30}; do
    if docker exec holy-grail-db pg_isready -U postgres > /dev/null 2>&1; then
        echo "✅ Database is ready"
        break
    fi
    echo -n "."
    sleep 1
done

# Run migrations
echo "🔄 Running database migrations..."
uv run alembic upgrade head

echo ""
echo "✨ Setup complete! Next steps:"
echo "  1. Review and update .env with your settings"
echo "  2. Run 'make dev' to start the development server"
echo "  3. API will be available at http://localhost:8000/docs"
```

### Updated Makefile
```makefile
.PHONY: help init install dev test format lint clean

# Default target - show help
help:
	@echo "Holy Grail Backend - Development Commands"
	@echo "========================================="
	@echo ""
	@echo "Initial Setup:"
	@echo "  make init          - First-time setup (install everything)"
	@echo "  make install       - Install/update Python dependencies"
	@echo ""
	@echo "Database:"
	@echo "  make db-up         - Start PostgreSQL container"
	@echo "  make db-down       - Stop PostgreSQL container"
	@echo "  make db-reset      - Reset database (destructive!)"
	@echo "  make db-shell      - Connect to PostgreSQL shell"
	@echo "  make migrate       - Run database migrations"
	@echo "  make migration     - Create new migration (name=...)"
	@echo ""
	@echo "Development:"
	@echo "  make dev           - Start backend server (hot-reload)"
	@echo "  make dev-debug     - Start backend with debugger support"
	@echo "  make test          - Run all tests"
	@echo "  make test-file     - Run specific test (file=...)"
	@echo "  make coverage      - Run tests with coverage report"
	@echo ""
	@echo "Code Quality:"
	@echo "  make format        - Format code with ruff"
	@echo "  make lint          - Check code with ruff"
	@echo "  make fix           - Auto-fix linting issues"
	@echo "  make mypy          - Run type checking"
	@echo "  make check         - Run all quality checks"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean         - Remove generated files"
	@echo "  make validate      - Validate environment setup"
	@echo "  make start         - Start everything (db + backend)"
	@echo "  make stop          - Stop everything"

# Variables
VENV := .venv
PYTHON := $(VENV)/bin/python
UV := uv
DB_COMPOSE := docker-compose.db.yml

# Initial setup
init:
	@bash scripts/init.sh

# Dependencies
install:
	$(UV) pip install -e ".[dev]"

sync:
	$(UV) pip sync

# Database management
db-up:
	docker compose -f $(DB_COMPOSE) up -d
	@echo "✅ PostgreSQL is running on port 5432"

db-down:
	docker compose -f $(DB_COMPOSE) down
	@echo "✅ PostgreSQL stopped"

db-reset:
	docker compose -f $(DB_COMPOSE) down -v
	docker compose -f $(DB_COMPOSE) up -d
	@sleep 3
	$(MAKE) migrate
	@echo "✅ Database reset complete"

db-shell:
	docker exec -it holy-grail-db psql -U postgres -d app

migrate:
	$(UV) run alembic upgrade head

migration:
	$(UV) run alembic revision --autogenerate -m "$(name)"

# Development server
dev:
	$(UV) run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev-debug:
	$(UV) run uvicorn app.main:app --reload --host 0.0.0.0 --port 9000

# Testing
test:
	$(UV) run pytest app/tests -x -vv

test-file:
	$(UV) run pytest app/tests/$(file) -x -vv

coverage:
	$(UV) run coverage run --source=app -m pytest -x
	$(UV) run coverage report
	$(UV) run coverage html

# Code quality
format:
	$(UV) run ruff format .

lint:
	$(UV) run ruff check .

fix:
	$(UV) run ruff check --fix .

mypy:
	$(UV) run mypy app --strict

check: lint mypy test
	@echo "✅ All checks passed!"

# Utilities
clean:
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	rm -rf .coverage htmlcov .pytest_cache .mypy_cache
	rm -rf $(VENV)

validate:
	$(UV) run python scripts/validate-env.py

# Combined commands
start: db-up
	@echo "⏳ Waiting for database..."
	@sleep 3
	$(MAKE) migrate
	$(MAKE) dev

stop: db-down
	@echo "✅ All services stopped"

# Install uv if not present
install-uv:
	@command -v uv >/dev/null 2>&1 || { \
		echo "Installing uv..."; \
		curl -LsSf https://astral.sh/uv/install.sh | sh; \
	}
```

### validate-env.py Script
```python
#!/usr/bin/env python3
"""Validate environment configuration for Holy Grail Backend"""

import sys
from typing import List, Tuple
from app.core.config import settings, Environment
import asyncio
from sqlalchemy import text
from app.db.database import engine

class Colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def print_status(label: str, status: bool, message: str = ""):
    icon = "✅" if status else "❌"
    color = Colors.GREEN if status else Colors.RED
    print(f"{icon} {label}: {color}{message or ('OK' if status else 'FAILED')}{Colors.RESET}")

def print_header(title: str):
    print(f"\n{Colors.BOLD}{title}{Colors.RESET}")
    print("=" * len(title))

async def check_database() -> Tuple[bool, str]:
    """Check database connectivity"""
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT version()"))
            version = result.scalar()
            return True, f"PostgreSQL {version.split()[1]}"
    except Exception as e:
        return False, str(e)

def check_environment() -> Tuple[bool, str]:
    """Check environment configuration"""
    env = settings.environment
    return True, f"{env.value.upper()}"

def check_aws() -> Tuple[bool, str]:
    """Check AWS configuration"""
    if settings.environment == Environment.LOCAL:
        if not settings.aws_access_key_id:
            return True, "Not required for LOCAL"
    else:
        if not all([
            settings.aws_access_key_id,
            settings.aws_secret_access_key,
            settings.aws_s3_bucket_name
        ]):
            return False, "Missing AWS credentials"
    return True, "Configured"

def check_email() -> Tuple[bool, str]:
    """Check email configuration"""
    if settings.environment == Environment.LOCAL:
        if not settings.email_enabled:
            return True, "Console mode (LOCAL)"
    else:
        if not settings.email_enabled:
            return False, "Email disabled for non-LOCAL environment"
        if not all([settings.mailtrap_api_key, settings.mailtrap_bearer_token]):
            return False, "Missing email credentials"
    return True, "Configured"

async def main():
    print(Colors.BOLD + "🔍 Holy Grail Backend - Environment Validation" + Colors.RESET)
    print("=" * 50)
    
    # Check environment
    print_header("Environment")
    status, message = check_environment()
    print_status("Environment", status, message)
    
    # Check database
    print_header("Database")
    status, message = await check_database()
    print_status("PostgreSQL", status, message)
    
    # Check AWS
    print_header("AWS Configuration")
    status, message = check_aws()
    print_status("AWS Services", status, message)
    
    # Check email
    print_header("Email Configuration")
    status, message = check_email()
    print_status("Email Service", status, message)
    
    # Summary
    print_header("Summary")
    print(f"Environment: {Colors.BOLD}{settings.environment.value.upper()}{Colors.RESET}")
    print(f"API URL: {Colors.BOLD}http://localhost:8000{Colors.RESET}")
    print(f"Docs URL: {Colors.BOLD}http://localhost:8000/docs{Colors.RESET}")
    
    print("\n✨ Validation complete!")

if __name__ == "__main__":
    asyncio.run(main())
```

## Benefits
- **Quick Onboarding**: New developers set up in minutes
- **Clear Commands**: Self-documenting Makefile
- **Error Prevention**: Validation catches issues early
- **Consistent Setup**: Everyone has the same environment
- **Better DX**: Streamlined daily workflow

## Documentation Structure
```
LOCAL_DEVELOPMENT.md
├── Prerequisites
├── Quick Start (3 commands)
├── Available Commands
├── Project Structure
├── Configuration Guide
├── Common Tasks
│   ├── Running Tests
│   ├── Database Operations
│   ├── Debugging
│   └── Code Quality
├── Troubleshooting
└── FAQ
```

## Notes
- Scripts should be cross-platform (bash/zsh/fish)
- Consider adding Windows support with PowerShell
- Add progress indicators for long operations
- Include rollback procedures for each script
- Test on fresh macOS and Linux systems