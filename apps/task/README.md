# Task Service

This is the Celery task service for Holy Grail, handling background jobs and asynchronous operations for the educational platform.

## Setup

1. Install dependencies:
```bash
uv sync
```

2. Copy environment file:
```bash
cp .env.example .env
```

## Running the Service

### Development Mode (runs both API and worker):
```bash
npm run dev
```

### Run API and Worker Separately:
```bash
# Run the FastAPI task service (port 8001)
npm run api

# Run the Celery worker with beat scheduler
npm run worker
```

## Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:cov
```

## Code Quality

```bash
# Format code
npm run format

# Lint code
npm run lint

# Type checking
npm run typecheck

# Run all checks
npm run check
```

## Architecture

- **API Service**: FastAPI application on port 8001 that receives task requests
- **Celery Worker**: Processes background tasks from Redis queue
- **Celery Beat**: Schedules periodic tasks

## Available Tasks

- Email tasks (verification, password reset, new password)
- Health check ping
- Google Analytics data fetching
- Scoreboard user updates

## Environment Variables

- `CELERY_BROKER_URL`: Redis URL for Celery broker
- `CELERY_RESULT_BACKEND`: Redis URL for storing task results
- `BACKEND_CONTAINER_URL`: URL to reach the backend service
- `MAILTRAP_API_KEY`: API key for email service