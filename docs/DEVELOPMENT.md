# Development Guide

This guide covers the development workflow, best practices, and useful commands for working on Holy Grail.

## Development Workflow

### 1. Branch Management

- **Main branch**: `main` (production)
- **Development branch**: `dev` (staging)
- **Feature branches**: Create from `dev`

```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name
```

### 2. Running the Application

#### Full Stack Development

```bash
# Start database
bun run db

# Start all services
bun run dev
```

#### Backend Development

The backend runs with hot-reload enabled:

```bash
cd apps/backend
bun run dev
```

Access points:
- API Documentation: http://localhost:8000/docs
- Health Check: http://localhost:8000/hello

#### Frontend Development

```bash
cd apps/frontend
bun run dev
```

The frontend runs on http://localhost:3000 with hot module replacement.

### 3. Code Quality

#### Python (Backend)

Run formatting:
```bash
cd apps/backend
bun run format
```

Run linting:
```bash
cd apps/backend
bun run lint
```

Run type checking:
```bash
cd apps/backend
bun run typecheck
```

#### TypeScript (Frontend)

Run linting:
```bash
cd apps/frontend
bun run lint
```

Build for production:
```bash
cd apps/frontend
bun run build
```

### 4. Testing

#### Backend Tests

Run all tests:
```bash
cd apps/backend
bun run test
```

Run with coverage:
```bash
cd apps/backend
bun run test:cov
```

#### Frontend Tests

```bash
cd apps/frontend
bun run test
```

### 5. Database Operations

#### View Database Logs

```bash
docker logs holy-grail-db
```

#### Access PostgreSQL Shell

```bash
docker exec -it holy-grail-db psql -U holy_grail -d holy_grail
```

#### Reset Database

⚠️ **Warning**: This will delete all data!

```bash
docker compose -f external/docker/docker-compose.db.yml down -v
bun run db
```

## Environment-Specific Behavior

### Local Development (ENVIRONMENT=local)

- **Email**: Logs to console instead of sending
- **File Storage**: Uses local filesystem (`./uploads`)
- **Authentication**: JWT tokens with shorter expiry
- **Error Messages**: Detailed stack traces

### Development/Production (ENVIRONMENT=dev/prod)

- **Email**: Sends via Mailtrap/SMTP
- **File Storage**: Uses AWS S3
- **Authentication**: JWT tokens with standard expiry
- **Error Messages**: Generic error responses

## Common Development Tasks

### Adding a New API Endpoint

1. Create/update the route in `apps/backend/app/api/endpoints/`
2. Add schemas in `apps/backend/app/schemas/`
3. Update models if needed in `apps/backend/app/models/`
4. Add tests in `apps/backend/app/tests/`

### Adding a New Frontend Page

1. Create the page component in `apps/frontend/app/`
2. Update navigation if needed
3. Add any required API calls in `apps/frontend/lib/`
4. Update types in `apps/frontend/types/`

### Debugging

#### Backend Debugging

Add breakpoints in your code:
```python
import ipdb; ipdb.set_trace()
```

Then run with debug mode:
```bash
cd apps/backend
bun run dev:debug  # Runs on port 9000
```

#### Frontend Debugging

Use browser DevTools and React Developer Tools extension.

## Git Commit Guidelines

Follow conventional commits:
```
feat: add user authentication
fix: resolve login redirect issue
docs: update API documentation
chore: upgrade dependencies
```

## Pre-commit Hooks

The project uses pre-commit hooks to ensure code quality:

```bash
pip install pre-commit
pre-commit install
```

Hooks will run automatically on commit, checking:
- Code formatting
- Linting
- Type checking

## VS Code Setup

Recommended extensions:
- Python (ms-python.python)
- Pylance (ms-python.vscode-pylance)
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)

## Deployment

Deployments are automated via GitHub Actions:
- Push to `dev` → Deploys to development environment
- Push to `main` → Deploys to production environment

## Getting Help

- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues
- Review existing tickets in `/claude/tickets/`
- Open an issue on GitHub for bugs or feature requests