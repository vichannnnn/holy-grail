FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

COPY pyproject.toml .
COPY uv.lock* .

RUN uv sync --frozen --no-cache

COPY . .

ENV PYTHONPATH=/app

CMD ["uv", "run", "celery", "-A", "worker", "worker", "-B", "--loglevel=info"]