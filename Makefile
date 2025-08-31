.PHONY: help init install dev test format lint clean

# Variables
VENV := .venv
PYTHON := python3
UV := uv
DB_COMPOSE := docker-compose.db.yml
BACKEND_DIR := holy-grail-backend/backend

# Database variables
local_postgres_user := postgres
local_postgres_db_name := app

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
	@echo "  make downgrade     - Rollback last migration"
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
	@echo "  make start         - Start everything (db + backend)"
	@echo "  make stop          - Stop everything"
	@echo "  make dump          - Import SQL dump (sql_file_name=...)"

# Initial setup
init:
	@echo "🚀 Initial setup..."
	@if [ ! -f .env ]; then cp .env.example .env; echo "✅ Created .env from .env.example"; fi
	@command -v $(UV) >/dev/null 2>&1 || { echo "Installing uv..."; curl -LsSf https://astral.sh/uv/install.sh | sh; }
	@cd $(BACKEND_DIR) && $(UV) venv
	@cd $(BACKEND_DIR) && $(UV) pip install -e ".[dev]"
	@echo "✅ Setup complete! Run 'make start' to begin development"

# Dependencies
install:
	cd $(BACKEND_DIR) && $(UV) pip install -e ".[dev]"

sync:
	cd $(BACKEND_DIR) && $(UV) pip sync

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
	docker exec -it holy-grail-db psql -U $(local_postgres_user) -d $(local_postgres_db_name)

migrate:
	cd $(BACKEND_DIR) && $(UV) run alembic upgrade head

migration:
	cd $(BACKEND_DIR) && $(UV) run alembic revision --autogenerate -m "$(name)"

downgrade:
	cd $(BACKEND_DIR) && $(UV) run alembic downgrade -1

# Development server
dev:
	cd $(BACKEND_DIR) && $(UV) run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev-debug:
	cd $(BACKEND_DIR) && $(UV) run uvicorn app.main:app --reload --host 0.0.0.0 --port 9000

# Testing
test:
	cd $(BACKEND_DIR) && ENVIRONMENT=local $(UV) run pytest app/tests -x -vv

test-file:
	cd $(BACKEND_DIR) && ENVIRONMENT=local $(UV) run pytest app/tests/api/$(file).py -x -vv

coverage:
	cd $(BACKEND_DIR) && ENVIRONMENT=local $(UV) run coverage run --source=app -m pytest -x
	cd $(BACKEND_DIR) && $(UV) run coverage report
	cd $(BACKEND_DIR) && $(UV) run coverage html

generate_xml:
	cd $(BACKEND_DIR) && $(UV) run coverage xml -i

# Code quality
format:
	cd $(BACKEND_DIR) && $(UV) run ruff format .

lint:
	cd $(BACKEND_DIR) && $(UV) run ruff check .

fix:
	cd $(BACKEND_DIR) && $(UV) run ruff check --fix .

mypy:
	cd $(BACKEND_DIR) && $(UV) run mypy app --strict

check: lint mypy test
	@echo "✅ All checks passed!"

# Utilities
clean:
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	rm -rf .coverage htmlcov .pytest_cache .mypy_cache .ruff_cache
	cd $(BACKEND_DIR) && rm -rf $(VENV)

dump:
	docker exec -i holy-grail-db psql -U $(local_postgres_user) -d $(local_postgres_db_name) < $(sql_file_name)

# Combined commands
start: db-up
	@echo "⏳ Waiting for database..."
	@sleep 3
	$(MAKE) migrate
	$(MAKE) dev

stop: db-down
	@echo "✅ All services stopped"

# Legacy commands (for compatibility)
tests: test
ruff: format
