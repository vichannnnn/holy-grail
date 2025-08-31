# Local Development Guide

## Prerequisites

- **Python 3.11+** 
- **Docker** (for PostgreSQL)
- **UV** (modern Python package manager - will be installed automatically)

## Quick Start

```bash
# 1. Clone the repository
git clone <repository-url>
cd holy-grail

# 2. Run initial setup (one-time only)
make init

# 3. Start development
make start
```

That's it! The API will be available at http://localhost:8000/docs

## Architecture Overview

The local development setup has been optimized for a better developer experience:

- **Direct Python execution** - No Docker overhead for the backend
- **PostgreSQL in Docker** - Database runs in a container
- **No Redis/Celery** - Email tasks run synchronously and log to console
- **Local file storage** - No AWS S3 required for development
- **Hot-reload** - Instant code changes without rebuilding containers

## Environment Configuration

### Environment Variables

The project uses a `.env` file for configuration. A `.env.example` file is provided with sensible defaults:

```bash
# Core Configuration
ENVIRONMENT=local        # Options: local, dev, prod
POSTGRES_HOST=localhost  # Database runs on host machine port

# Optional for LOCAL environment
AWS_ACCESS_KEY_ID=       # Not needed locally
EMAIL_ENABLED=false      # Emails log to console
```

### Environment Detection

The application uses an `Environment` enum with three values:
- `LOCAL` - Local development (no email, local storage)
- `DEV` - Development server (full features)
- `PROD` - Production server (full features)

## Available Commands

### Database Management

```bash
make db-up      # Start PostgreSQL container
make db-down    # Stop PostgreSQL container
make db-reset   # Reset database (destructive!)
make db-shell   # Connect to PostgreSQL shell
make migrate    # Run database migrations
make migration name="description"  # Create new migration
```

### Development Server

```bash
make dev        # Start backend with hot-reload (port 8000)
make dev-debug  # Start backend with debugger support (port 9000)
make start      # Start database + backend together
make stop       # Stop everything
```

### Testing

```bash
make test       # Run all tests
make test-file file=api/test_auth  # Run specific test file
make coverage   # Generate coverage report
```

### Code Quality

```bash
make format     # Format code with ruff
make lint       # Check code with ruff
make fix        # Auto-fix linting issues
make mypy       # Run type checking
make check      # Run all quality checks
```

## Feature Behavior in Local Development

### Email System

In `LOCAL` environment, emails are not sent. Instead, they are:
- Logged to the console with formatted preview
- Executed synchronously (no Celery/Redis needed)
- Displayed with recipient, subject, and body

Example console output:
```
╔══════════════════════════════════════════════════════════╗
║                    📧 EMAIL PREVIEW                       ║
╠══════════════════════════════════════════════════════════╣
║ To: user@example.com                                      ║
║ Subject: Verify your email address                        ║
╠══════════════════════════════════════════════════════════╣
║ Body:                                                     ║
║ Hi username,                                               ║
║ Please verify your email address...                       ║
╚══════════════════════════════════════════════════════════╝
```

### File Storage

In `LOCAL` environment, files are stored locally:
- Uploaded files saved to `./uploads` directory
- Served via `/files/{path}` endpoint
- No AWS S3 configuration required
- Files accessible at `http://localhost:8000/files/{path}`

### Database

PostgreSQL runs in Docker:
- Default credentials in `.env.example` work out of the box
- Data persists in `./postgres-data` directory
- Accessible on `localhost:5432`

## Project Structure

```
holy-grail/
├── .env                          # Environment configuration (create from .env.example)
├── .env.example                  # Example configuration with defaults
├── docker-compose.db.yml         # PostgreSQL-only Docker setup
├── docker-compose.yml            # Full stack (for production-like testing)
├── Makefile                      # Development commands
├── LOCAL_DEVELOPMENT.md          # This file
├── holy-grail-backend/
│   └── backend/
│       ├── app/
│       │   ├── core/
│       │   │   ├── config.py    # Pydantic settings configuration
│       │   │   └── enums.py     # Environment enum
│       │   ├── services/
│       │   │   ├── email.py     # Email service (console/Celery)
│       │   │   └── storage.py   # Storage service (local/S3)
│       │   └── ...
│       ├── pyproject.toml        # Python dependencies and tool config
│       └── .venv/                # Python virtual environment
└── uploads/                      # Local file storage (gitignored)
```

## Debugging

### Using pdb/ipdb

Since the backend runs directly with Python, you can use debuggers:

```python
import ipdb; ipdb.set_trace()  # Add breakpoint
```

Then run:
```bash
make dev-debug  # Runs on port 9000 with debugger support
```

### Viewing Logs

All logs appear directly in the terminal:
- SQL queries (when configured)
- API requests and responses
- Email previews
- File upload/download operations

### Common Issues

**Port already in use:**
```bash
# Check what's using port 8000
lsof -i :8000
# Kill the process if needed
kill -9 <PID>
```

**Database connection failed:**
```bash
# Ensure PostgreSQL is running
make db-up
# Check container status
docker ps
```

**Missing dependencies:**
```bash
# Reinstall dependencies
make install
```

## Migrating from Docker-based Development

If you're coming from the old Docker-based setup:

1. **Stop all Docker containers:**
   ```bash
   docker-compose down
   ```

2. **Install uv and dependencies:**
   ```bash
   make init
   ```

3. **Update your .env file:**
   - Change `POSTGRES_HOST` from `db` to `localhost`
   - Set `ENVIRONMENT=local`
   - Remove `TESTING=true` (no longer used)

4. **Start with new setup:**
   ```bash
   make start
   ```

## Advanced Configuration

### Using Different Ports

Edit the Makefile to change default ports:
```makefile
dev:
    cd $(BACKEND_DIR) && $(UV) run uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

### Connecting to Remote Database

Update `.env` to point to a remote database:
```bash
POSTGRES_HOST=remote-db.example.com
POSTGRES_PORT=5432
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
```

### Enabling Email in Local

If you want to test real email sending locally:
```bash
EMAIL_ENABLED=true
MAILTRAP_API_KEY=your_key
MAILTRAP_BEARER_TOKEN=your_token
# Also need Redis running for Celery
```

## VS Code Configuration

Recommended `.vscode/settings.json`:

```json
{
  "python.defaultInterpreter": "${workspaceFolder}/holy-grail-backend/backend/.venv/bin/python",
  "python.formatting.provider": "ruff",
  "python.linting.enabled": true,
  "python.linting.ruffEnabled": true,
  "[python]": {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  }
}
```

## Contributing

1. Create a feature branch from `dev`
2. Make your changes
3. Run `make check` to ensure code quality
4. Create a pull request to `dev`

## Help

- Check existing issues on GitHub
- Review the ticket system in `/claude/tickets/`
- Consult the main README.md for project overview