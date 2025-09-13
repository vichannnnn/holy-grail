.PHONY: help install worker api test lint format mypy check

help:
	@echo "Available commands:"
	@echo "  make install   - Install dependencies using UV"
	@echo "  make worker    - Run Celery worker with beat scheduler"
	@echo "  make api       - Run FastAPI task service"
	@echo "  make test      - Run tests"
	@echo "  make lint      - Run ruff linter"
	@echo "  make format    - Format code with ruff"
	@echo "  make mypy      - Run type checking"
	@echo "  make check     - Run all quality checks (lint, format, mypy)"

install:
	uv sync

worker:
	uv run celery -A worker worker -B --loglevel=info

api:
	uv run uvicorn api:app --host 0.0.0.0 --port 8001 --reload

test:
	uv run pytest

lint:
	uv run ruff check .

format:
	uv run ruff format .

mypy:
	uv run mypy . --ignore-missing-imports

check: lint format mypy
	@echo "All checks passed!"