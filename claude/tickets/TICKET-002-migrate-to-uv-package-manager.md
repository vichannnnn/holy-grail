# TICKET-002: Migrate to UV Package Manager

## Description
Migrate from traditional pip/requirements.txt to the modern UV package manager with pyproject.toml. Configure ruff as the primary formatting and linting tool to replace the current toolchain.

## Acceptance Criteria
- [ ] Convert requirements.txt to pyproject.toml
- [ ] Configure uv for package management
- [ ] Set up ruff configuration for formatting/linting
- [ ] Update Makefile with uv commands
- [ ] Create uv.lock file for reproducible builds
- [ ] Update CI/CD workflows to use uv

## Priority
High

## Status
Todo

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