# TICKET-003: Simplify Docker Setup for Local Development

## Description
Simplify the local development environment by creating a minimal Docker setup that only runs PostgreSQL. Remove backend, Redis, and Celery services from local development to enable faster iteration with direct Python execution.

## Acceptance Criteria
- [ ] Create docker-compose.db.yml with PostgreSQL only
- [ ] Remove backend, Redis, Celery from local development workflow
- [ ] Update Makefile for new docker commands
- [ ] Document new development workflow
- [ ] Keep production docker-compose.yml intact for testing
- [ ] Ensure database persistence across restarts

## Priority
High

## Status
Todo

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