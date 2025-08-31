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
└── [your project files and directories]
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
# Backend Development (Docker-based)
make build          # Build Docker containers
make migrate        # Run database migrations
make runserver      # Start backend server on port 9000 (debug mode)
make tests          # Run all backend tests
make test file=<name>  # Run specific test file
make check          # Run linting, type checking, and tests
make ruff           # Format and lint Python code
make mypy           # Run type checking

# Frontend Development (Next.js)
cd holy-grail-frontend
bun install         # Install dependencies
bun run dev         # Start development server with hot reload
bun run build-local # Build for local deployment
bun run build-dev   # Build for development environment
bun run build-prod  # Build for production environment
bun run lint        # Run ESLint

# Docker Services
docker compose up   # Start all services
docker compose down # Stop all services

# Database Operations
make dump           # Import SQL dump to local database
make migrations name=<description>  # Create new migration
make downgrade      # Rollback last migration

# Testing & Quality
make coverage       # Run tests with coverage report
make generate_xml   # Generate coverage XML report
```
<!-- auto-generated-end:commands -->

## Important Context

### Technology Stack
- **Backend**: FastAPI (Python 3.11) with async/await patterns
- **Frontend**: React 18 with Next.js 15, TypeScript, Tailwind CSS, Material-UI
- **Database**: PostgreSQL with Alembic migrations
- **Message Queue**: Redis + Celery for async tasks
- **Infrastructure**: Docker Compose for local development, AWS ECS for production
- **Testing**: pytest for backend, Jest for frontend
- **Code Quality**: Ruff, MyPy, ESLint, pre-commit hooks

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
- Docker-based development for consistency across environments

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
- Copy `.env.example` to `.env` for backend configuration
- Frontend environments: `.env` (local), `.env.development`, `.env.production`
- Secret key generation: `secrets.token_hex(32)` in Python
- AWS credentials configured for production deployments

### Testing Guidelines
- Run `make tests` before committing backend changes
- Use `make test file=<name>` for targeted testing
- Frontend tests via `bun test` or `npm test`
- Coverage reports available via `make coverage` and `make generate_xml`

### Database Management
- Migrations managed via Alembic: `make migrations name=<description>`
- Database dumps can be imported via `make dump`
- PostgreSQL running in Docker container `holy-grail-db`

### Deployment
- Development auto-deploys from `dev` branch
- Production auto-deploys from `main` branch
- AWS ECS Fargate configuration: 512 CPU / 1024 Memory
- Frontend includes auto-scaling configuration
<!-- auto-generated-end:notes -->