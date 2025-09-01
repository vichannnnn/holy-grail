# TICKET-002: Migrate to UV Package Manager

## Description
Migrate from traditional pip/requirements.txt to the modern UV package manager with pyproject.toml. Configure ruff as the primary formatting and linting tool to replace the current toolchain.

## Acceptance Criteria
- [x] Convert requirements.txt to pyproject.toml
- [x] Configure uv for package management
- [x] Set up ruff configuration for formatting/linting
- [x] Update Makefile with uv commands
- [x] Create uv.lock file for reproducible builds
- [x] Update CI/CD workflows to use uv

## Priority
High

## Status
Done

## Implementation Steps

### 1. Install UV Locally
- Install uv package manager
- Initialize uv in the project
- Create initial pyproject.toml

### 2. Convert Dependencies
- Parse existing requirements.txt and requirements-dev.txt
- Create [project.dependencies] section in pyproject.toml
- Create [project.optional-dependencies] for dev dependencies
- Specify Python version constraints

### 3. Configure Ruff
- Add ruff to dev dependencies
- Create [tool.ruff] configuration section
- Configure formatting rules (line length, quotes, etc.)
- Configure linting rules (import sorting, etc.)
- Set up ignore patterns for migrations, etc.

### 4. Update Makefile Commands
- Replace pip commands with uv equivalents
- Update virtual environment creation
- Add new commands:
  - `make install`: Install dependencies with uv
  - `make sync`: Sync dependencies from lock file
  - `make format`: Run ruff format
  - `make lint`: Run ruff check
  - `make fix`: Run ruff check --fix

### 5. Create Lock File
- Generate uv.lock for reproducible builds
- Commit lock file to version control
- Document lock file update process

### 6. Update CI/CD
- Modify GitHub Actions workflows
- Use uv for dependency installation
- Cache uv dependencies for faster builds
- Run ruff in CI for code quality checks

## Technical Details

### Example pyproject.toml Structure
```toml
[project]
name = "holy-grail-backend"
version = "0.1.0"
description = "Holy Grail Backend API"
requires-python = ">=3.11"
dependencies = [
    "fastapi>=0.104.1",
    "uvicorn[standard]>=0.24.0",
    "pydantic>=2.5.0",
    "pydantic-settings>=2.1.0",
    "sqlalchemy>=2.0.23",
    "asyncpg>=0.29.0",
    "alembic>=1.12.1",
    "python-jose[cryptography]>=3.3.0",
    "passlib[bcrypt]>=1.7.4",
    "python-multipart>=0.0.6",
    "celery>=5.3.4",
    "redis>=5.0.1",
    "boto3>=1.34.0",
    "Pillow>=10.1.0",
    "aiofiles>=23.2.1",
    "httpx>=0.25.2",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.4.3",
    "pytest-asyncio>=0.21.1",
    "coverage>=7.3.2",
    "mypy>=1.7.1",
    "ruff>=0.1.0",
    "ipdb>=0.13.13",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.ruff]
line-length = 100
target-version = "py311"

[tool.ruff.lint]
select = [
    "E",  # pycodestyle errors
    "W",  # pycodestyle warnings
    "F",  # pyflakes
    "I",  # isort
    "B",  # flake8-bugbear
    "C4", # flake8-comprehensions
    "UP", # pyupgrade
]
ignore = [
    "E501",  # line too long (handled by formatter)
    "B008",  # do not perform function calls in argument defaults
]

[tool.ruff.format]
quote-style = "double"
indent-style = "space"
skip-magic-trailing-comma = false

[tool.ruff.lint.isort]
known-first-party = ["app"]
```

### Makefile Updates
```makefile
# Package Management
install:
	uv pip install -e ".[dev]"

sync:
	uv pip sync

lock:
	uv pip compile pyproject.toml -o uv.lock

# Code Quality
format:
	uv run ruff format .

lint:
	uv run ruff check .

fix:
	uv run ruff check --fix .
```

## Migration Strategy
1. Create pyproject.toml alongside requirements.txt
2. Test installation with uv
3. Update developer documentation
4. Remove requirements.txt files after verification
5. Update all developer machines

## Benefits
- **Faster**: UV is 10-100x faster than pip
- **Reproducible**: Lock files ensure consistent environments
- **Modern**: Follows Python packaging standards
- **Unified**: Single tool for formatting and linting with ruff
- **Simpler**: One configuration file instead of multiple

## Notes
- Ensure all developers install uv before pulling changes
- Update README with new setup instructions
- Consider creating migration script for smooth transition

## Implementation Summary

Successfully migrated from pip/requirements.txt to UV package manager with comprehensive toolchain modernization:

- **Package Management Migration**: Converted all dependencies from requirements.txt and requirements-dev.txt to pyproject.toml with proper project metadata and dependency sections
- **UV Configuration**: Set up UV package manager with virtual environment integration, configured for Python 3.11+ with reproducible lock file generation
- **Ruff Integration**: Implemented comprehensive ruff configuration for both formatting and linting, replacing multiple tools with a single unified solution
- **Makefile Updates**: Updated all development commands to use UV, added new targets for install, sync, format, lint, and fix operations
- **Lock File Generation**: Created uv.lock for reproducible builds ensuring consistent dependencies across all environments
- **CI/CD Integration**: Updated GitHub Actions workflows to use UV for faster dependency installation and caching

The migration provides 10-100x faster package operations, reproducible environments, and simplified toolchain management while maintaining full compatibility with existing workflows.