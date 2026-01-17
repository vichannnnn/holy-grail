# Claude Code Project Instructions

## Project Overview
<!-- auto-generated-start:overview -->
Holy Grail is a free educational platform monorepo serving summary notes and practice papers. Built with FastAPI (Python 3.11), Next.js 16 (React 19), PostgreSQL, OpenSearch, Celery/Redis task queue, and deployed on AWS ECS Fargate via Terraform.
<!-- auto-generated-end:overview -->

## Key Objectives
<!-- auto-generated-start:objectives -->
- Maintain a scalable full-stack monorepo architecture (Turbo, Bun, UV)
- Provide async REST API with FastAPI and SQLAlchemy 2.0
- Enable full-text search via async OpenSearch integration
- Process background jobs (emails, analytics) via Celery/Redis
- Deploy on AWS ECS Fargate with Terraform IaC
- Ensure code quality with Ruff, MyPy, Biome, and Pytest
<!-- auto-generated-end:objectives -->

## Project Structure

```
.
├── CLAUDE.md          # Project instructions for Claude
├── ROADMAP.md         # Project roadmap and goals
├── apps/
│   ├── backend/       # FastAPI REST API (Python 3.11)
│   ├── frontend/      # Next.js platform (grail.moe)
│   └── task/          # Celery worker + health API
├── packages/
│   ├── ui/            # Shared React component library
│   └── tooling/       # Shared Biome & TypeScript configs
├── terraform/         # AWS infrastructure (ECS, RDS, S3, etc.)
├── docker/            # Docker Compose for local dev
├── docs/              # Documentation
├── scripts/           # Utility scripts
├── .claude/           # Claude Code configuration
│   ├── agents/        # Specialized agents
│   └── skills/        # Skills for workflow automation
└── claude/            # Project organization
    └── tickets/       # Task tickets
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

## Common Commands
<!-- auto-generated-start:commands -->
```bash
bun run dev            # Start backend + frontend dev servers
bun run dev:full       # Start DB, migrate, seed, and all servers
bun run db             # Start PostgreSQL + Redis via Docker
bun run migrate        # Run Alembic database migrations
bun run seed           # Seed database with sample data
bun run test           # Run all tests
bun run lint           # Lint all code (Ruff + Biome)
bun run format         # Format all code
bun run task           # Start Celery task worker
```
<!-- auto-generated-end:commands -->

## Important Context

[Add any project-specific context, dependencies, or requirements here]

## Skills

Skills extend Claude's capabilities with specialized workflows. Available skills:

**Git Workflow:**
- **/commit** - Generate and execute git commits following conventional commit format
- **/create-pr** - Create GitHub pull requests with structured descriptions

**Project Management:**
- **/create-ticket** - Create task tickets with proper numbering and update ticket-list.md
- **/design-feature** - Guide feature development through requirements and design phases

**Utilities:**
- **/create-script** - Codify processes into standalone Python scripts with CLI interfaces
- **/skill-creator** - Guide for creating new skills
- **/update-claude-md** - Update CLAUDE.md sections through interactive Q&A

See `.claude/skills/` for skill definitions

## Tickets

See @claude/tickets/README.md for ticket format and management approach

### Ticket Management
- **Ticket List**: Maintain @claude/tickets/ticket-list.md as a centralized index of all tickets
- **Update ticket-list.md** whenever you:
  - Create a new ticket (add to appropriate priority section)
  - Change ticket status (update emoji and move if completed)
  - Complete a ticket (move to completed section with date)
- **Status Emojis**: 🔴 Todo | 🟡 In Progress | 🟢 Done | 🔵 Blocked | ⚫ Cancelled

## Development Context

- See @ROADMAP.md for current status and next steps
- Task-based development workflow with tickets in `claude/tickets` directory

## Important Instructions

Before starting any task:

1. **Confirm understanding**: Always confirm you understand the request and outline your plan before proceeding
2. **Ask clarifying questions**: Never make assumptions - always ask questions when requirements are unclear
3. **No code comments**: Never add comments to any code you write - code should be self-documenting
4. **Maintain ticket list**: Always update @claude/tickets/ticket-list.md when creating, updating, or completing tickets to maintain a clear project overview

## Additional Notes
<!-- auto-generated-start:notes -->
**Tech Stack:**
- Backend: FastAPI, SQLAlchemy 2.0, Pydantic 2.0, Alembic
- Frontend: Next.js 16, React 19, Tailwind CSS v4, TypeScript 5.9+
- Database: PostgreSQL 14.1, Redis 7.0.7, OpenSearch
- Infrastructure: AWS ECS Fargate, Terraform Cloud, Docker

**Development Requirements:**
- Node.js 18+ with Bun 1.2.22+ (NOT npm)
- Python 3.11+ with UV (NOT pip)
- Docker for local PostgreSQL/Redis

**Domain:** grail.moe
<!-- auto-generated-end:notes -->