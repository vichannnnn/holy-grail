# Claude Code Project Instructions

## Project Overview
<!-- auto-generated-start:overview -->
Holy Grail is a comprehensive web library platform for Singaporean students, providing free access to summary notes and practice papers for GCE 'O' Levels, GCE 'A' Levels, and International Baccalaureate. This monorepo contains a full-stack application with FastAPI backend, React/Next.js frontend, PostgreSQL database, Redis broker, and Celery task runner, all containerized with Docker.
<!-- auto-generated-end:overview -->

## Key Objectives
<!-- auto-generated-start:objectives -->
- Provide free educational resources for Singaporean students (O-Levels, A-Levels, IB)
- Maintain high-quality summary notes and practice papers repository
- Track user engagement and analytics for continuous improvement
- Ensure reliable, scalable infrastructure with automated deployments
- Support community-driven content contributions and feedback
<!-- auto-generated-end:objectives -->

## Project Structure

```
.
├── CLAUDE.md          # This file - project instructions for Claude
├── .claude/           # Claude Code configuration (auto-generated)
│   ├── agents/        # Project-specific agent overrides
│   └── commands/      # Custom slash commands for Claude Code
├── claude/            # Claude Code project organization
│   ├── agents/        # Custom agents for specialized tasks
│   ├── docs/          # Project documentation
│   ├── plans/         # Project plans and architectural documents
│   └── tickets/       # Task tickets and issues
├── apps/              # Turborepo apps
│   ├── backend/       # FastAPI backend application
│   ├── frontend/      # Main React/Next.js frontend
│   ├── new-frontend/  # New frontend (under development)
│   └── task/          # Celery task worker
├── packages/          # Shared packages
├── docker/            # Docker configurations
│   └── docker-compose.db.yml  # PostgreSQL database
├── package.json       # Root turborepo configuration
├── bun.lockb          # Bun lockfile
└── turbo.json         # Turborepo configuration
```

## Development Guidelines

### Code Style

- Follow existing code conventions in the project
- Use consistent naming patterns
- Maintain clean, readable code

### Testing

- Run tests before committing changes
- Add tests for new functionality
- Ensure all tests pass

### Git Workflow

- Create descriptive commit messages
- Keep commits focused and atomic
- Review changes before committing

## Commit Convention and Pull Request Guidelines

### Commit Message Format
Follow the conventional commits specification:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks (updating dependencies, build process, etc.)
- `perf`: Performance improvements

**Examples:**
```
feat(auth): add password reset functionality
fix(api): handle null values in user response
docs: update API documentation for book endpoints
refactor(frontend): extract BookTable into separate components
chore(deps): update FastAPI to 0.104.1
```

### Pull Request Guidelines

**PR Title**: Use the same format as commit messages

**PR Description Template:**
```markdown
## Summary
Brief description of what this PR does and why it's needed.

## Changes
- List of specific changes made
- Technical implementation details if relevant

## Testing
- [ ] Tests pass (if applicable)
- [ ] Manual testing completed
- [ ] No console errors or warnings

## Manual Testing Steps
1. Describe steps to manually test the feature
2. Expected behavior and edge cases tested

## Screenshots (if UI changes)
Attach relevant screenshots here

## Related Issues
Closes #XXX (if applicable)

## Checklist
- [ ] Code follows project conventions
- [ ] Self-documented code without unnecessary comments
- [ ] All tests pass
- [ ] Documentation updated if needed
- [ ] No sensitive information exposed
```

## Common Commands
<!-- auto-generated-start:commands -->
```bash
# Quick Start
bun install         # Install dependencies for all workspaces
bun run setup       # Initial setup for turborepo
bun run dev:full    # Start database, run migrations, seed data, and start all dev servers

# Development
bun run dev         # Start all dev servers (backend on :8000, frontend on :3000)
bun run db          # Start PostgreSQL database in Docker
bun run migrate     # Run database migrations
bun run seed        # Seed database with sample data
bun run task        # Start task worker (Celery)

# Backend-specific (from project root)
cd apps/backend
bun run dev         # Start backend server on port 8000 with hot reload
bun run test        # Run backend tests
bun run format      # Format Python code with ruff
bun run lint        # Lint Python code
bun run lint:fix    # Fix linting issues
bun run typecheck   # Run MyPy type checking
bun run check       # Run all quality checks (lint + typecheck + tests)

# Frontend-specific (from project root)
cd apps/frontend
bun run dev         # Start frontend dev server
bun run build       # Build for production
bun run lint        # Run ESLint

# Database Operations
bun run migrate                          # Run migrations
cd apps/backend && bun run migrate:create "migration_name"  # Create new migration
cd apps/backend && bun run migrate:down  # Rollback last migration

# Code Quality (all workspaces)
bun run format      # Format all code
bun run lint        # Lint all code
bun run test        # Run all tests

# Docker Services
bun run db          # Start PostgreSQL database
cd apps/backend && bun run docker:up    # Start database
cd apps/backend && bun run docker:down  # Stop database
```
<!-- auto-generated-end:commands -->

## Important Context

### Technology Stack
- **Backend**: FastAPI (Python 3.11) with async/await patterns
- **Frontend**: React 18 with Next.js 15, TypeScript, Tailwind CSS, Material-UI
- **Database**: PostgreSQL with Alembic migrations
- **Message Queue**: Redis + Celery for async tasks (production only)
- **Infrastructure**: Direct Python execution for local development, AWS ECS for production
- **Package Manager**: UV for fast Python dependency management
- **Testing**: pytest for backend, Jest for frontend
- **Code Quality**: Ruff (formatting & linting), MyPy, ESLint, pre-commit hooks

### Key Dependencies
- Authentication: JWT-based with password reset via email
- File Handling: Document upload/download for educational materials
- Analytics: Google Analytics integration, custom ad analytics tracking
- Email Service: SMTP integration for user notifications
- Rate Limiting: API endpoint protection

### Development Workflow
- Main development branch: `dev`
- Production branch: `main`
- Automated CI/CD via GitHub Actions for both environments
- Pre-commit hooks ensure code quality before commits
- Local development with direct Python execution and hot-reload
- PostgreSQL runs in Docker, backend runs natively for better DX

## Agents

See @claude/agents/README.md for available agents and their purposes

## Agent Orchestration

After adding the agents you want to in `./claude/agents` folder, setup the workflow for Claude code to follow

## Custom Commands

Custom slash commands are available in `.claude/commands/`:
- **/update-claude-md** - Automatically updates this file with project-specific information
- See `.claude/commands/README.md` for creating your own commands

## Tickets

See @claude/tickets/README.md for ticket format and management approach

### Ticket Management
- **Ticket List**: Maintain @claude/tickets/ticket-list.md as a centralized index of all tickets
- **Update ticket-list.md** whenever you:
  - Create a new ticket (add to appropriate priority section)
  - Change ticket status (update emoji and move if completed)
  - Complete a ticket (move to completed section with date)
- **Status Emojis**: 🔴 Todo | 🟡 In Progress | 🟢 Done | 🔵 Blocked | ⚫ Cancelled

## Plans

See @claude/plans/README.md for planning documents and architectural decisions

## Development Context

- See @claude/docs/ROADMAP.md for current status and next steps
- Task-based development workflow with tickets in `claude/tickets` directory
- Use `claude/plans` directory for architectural decisions and implementation roadmaps

## Important Instructions

Before starting any task:

1. **Confirm understanding**: Always confirm you understand the request and outline your plan before proceeding
2. **Ask clarifying questions**: Never make assumptions - ask questions when requirements are unclear
3. **Create planning documents**: Before implementing any code or features, create a markdown file documenting the approach
4. **Use plans directory**: When discussing ideas or next steps, create timestamped files in the plans directory (e.g., `claude/plans/next-steps-YYYY-MM-DD-HH-MM-SS.md`) to maintain a record of decisions
5. **No code comments**: Never add comments to any code you write - code should be self-documenting
6. **Maintain ticket list**: Always update @claude/tickets/ticket-list.md when creating, updating, or completing tickets to maintain a clear project overview

## Additional Notes
<!-- auto-generated-start:notes -->
### Service URLs
- **Backend API**: http://localhost:8000/docs (Swagger UI)
- **Frontend**: http://localhost:5173/ (development), http://localhost:3000/ (Next.js default)
- **Debug Backend**: http://localhost:9000/docs (with pdb support)

### Environment Setup
- Copy `.env.example` to `.env` for backend configuration (includes sensible defaults)
- Environment detection via `ENVIRONMENT` variable (local/dev/prod)
- Frontend environments: `.env` (local), `.env.development`, `.env.production`
- Secret key auto-generated for local development if not provided
- AWS credentials optional for local development (uses local file storage)
- Email disabled by default in local (logs to console instead)

### Testing Guidelines
- Run `bun run test` before committing changes (runs tests in all workspaces)
- For backend tests: `cd apps/backend && bun run test`
- For frontend tests: `cd apps/frontend && bun run test`
- Coverage reports: `cd apps/backend && bun run test:cov`
- Tests run with `ENVIRONMENT=local` automatically

### Database Management
- Migrations managed via Alembic: `cd apps/backend && bun run migrate:create "description"`
- Run migrations: `bun run migrate`
- Rollback migrations: `cd apps/backend && bun run migrate:down`
- PostgreSQL running in Docker container via `bun run db`
- Database accessible on `localhost:5432` for local development
- Direct PostgreSQL access: `docker exec -it holy-grail-db psql -U postgres -d app`

### Deployment
- Development auto-deploys from `dev` branch
- Production auto-deploys from `main` branch
- AWS ECS Fargate configuration: 512 CPU / 1024 Memory
- Frontend includes auto-scaling configuration
<!-- auto-generated-end:notes -->