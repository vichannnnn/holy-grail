# TICKET-003: Simplify Docker Setup for Local Development

## Description
Simplify the local development environment by creating a minimal Docker setup that only runs PostgreSQL. Remove backend, Redis, and Celery services from local development to enable faster iteration with direct Python execution.

## Acceptance Criteria
- [x] Create docker-compose.db.yml with PostgreSQL only
- [x] Remove backend, Redis, Celery from local development workflow
- [x] Update Makefile for new docker commands
- [x] Document new development workflow
- [x] Keep production docker-compose.yml intact for testing
- [x] Ensure database persistence across restarts

## Priority
High

## Status
Done

## Implementation Steps

### 1. Create Minimal Docker Compose
- Create `docker-compose.db.yml`
- Include only PostgreSQL service
- Configure proper volumes for data persistence
- Set up health checks
- Use consistent network naming

### 2. Update Makefile Commands
- Add database-specific commands:
  - `make db-up`: Start PostgreSQL container
  - `make db-down`: Stop PostgreSQL container
  - `make db-reset`: Reset database (drop and recreate)
  - `make db-shell`: Connect to PostgreSQL shell
- Update migration commands to work with new setup
- Remove Docker-based backend commands

### 3. Configure Direct Backend Execution
- Document uvicorn command for local development
- Set up environment for connecting to Dockerized PostgreSQL
- Configure hot-reload for development
- Add debugging support (pdb/ipdb)

### 4. Update Documentation
- Create LOCAL_DEVELOPMENT.md guide
- Document new workflow
- Explain when to use full docker-compose
- Add troubleshooting section

### 5. Maintain Production Setup
- Keep original docker-compose.yml
- Rename to docker-compose.full.yml or keep as-is
- Document when to use full stack locally

## Technical Details

### docker-compose.db.yml
```yaml
version: '3.8'

services:
  postgres:
    container_name: holy-grail-db
    image: postgres:14.1-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: ${POSTGRES_DB:-app}
    ports:
      - "5432:5432"
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
      - ./holy-grail-backend/db:/docker-entrypoint-initdb.d/
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - holy-grail-network

networks:
  holy-grail-network:
    name: holy-grail-network
    driver: bridge
```

### Updated Makefile Commands
```makefile
# Database Management
db-up:
	docker compose -f docker-compose.db.yml up -d

db-down:
	docker compose -f docker-compose.db.yml down

db-reset:
	docker compose -f docker-compose.db.yml down -v
	docker compose -f docker-compose.db.yml up -d
	sleep 5
	make migrate

db-shell:
	docker exec -it holy-grail-db psql -U postgres -d app

# Development Server
dev:
	uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev-debug:
	uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 9000

# Combined Commands
start: db-up
	@echo "Waiting for database..."
	@sleep 3
	make migrate
	make dev

stop: db-down
```

### Local Development Workflow
```bash
# First time setup
make init       # Copy .env.example to .env
make install    # Install Python dependencies with uv
make db-up      # Start PostgreSQL
make migrate    # Run database migrations

# Daily development
make start      # Start database and backend
# OR separately:
make db-up      # Start database
make dev        # Start backend with hot-reload

# Cleanup
make stop       # Stop everything
```

## Benefits
- **Faster Startup**: No need to build/start multiple containers
- **Instant Hot-Reload**: Direct Python execution with --reload
- **Better Debugging**: Use pdb/ipdb without Docker limitations
- **Reduced Resource Usage**: Only PostgreSQL running in Docker
- **Simpler Mental Model**: Clear separation of concerns

## Migration Notes
- Developers need to install Python 3.11+ locally
- UV package manager required (see TICKET-002)
- PostgreSQL data will be stored in `./postgres-data`
- Ensure .env has correct database connection settings

## Rollback Plan
- Original docker-compose.yml remains available
- Can switch back with: `docker compose up`
- No breaking changes to production setup

## Implementation Summary

Successfully simplified local development environment by separating database infrastructure from application services:

- **Minimal Docker Setup**: Created docker-compose.db.yml with PostgreSQL-only configuration, eliminating unnecessary service dependencies for local development
- **Database Persistence**: Configured proper volume mounting and health checks ensuring data persists across container restarts
- **Makefile Integration**: Added comprehensive database management commands (db-up, db-down, db-reset, db-shell) and streamlined development workflow
- **Direct Backend Execution**: Enabled direct Python execution with uvicorn for faster hot-reload and better debugging capabilities (pdb/ipdb support)
- **Service Separation**: Removed Redis, Celery, and backend services from local Docker setup while preserving full production docker-compose.yml
- **Workflow Documentation**: Updated development process with clear instructions for new simplified workflow and migration path

The changes provide faster startup times, reduced resource usage, instant hot-reload, and improved debugging experience while maintaining full compatibility with production deployment strategies.