# Holy Grail

[![codecov](https://codecov.io/gh/vichannnnn/holy-grail/branch/dev/graph/badge.svg)](https://codecov.io/gh/vichannnnn/holy-grail/tree/dev)
[![Python](https://img.shields.io/badge/python-3.11-blue.svg)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/built%20with-Docker-blue)](https://www.docker.com/)
[![Build and Deploy](https://github.com/vichannnnn/holy-grail/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/vichannnnn/holy-grail/actions/workflows/build-and-deploy.yml)
[![Pull Request Tests](https://github.com/vichannnnn/holy-grail/actions/workflows/pull-request-test.yml/badge.svg)](https://github.com/vichannnnn/holy-grail/actions/workflows/pull-request-test.yml)

![Grail-chan](https://image.himaa.me/grail-chan-sparkling-640x480.png)

Holy Grail is a completely free-to-access web library aimed at Singaporean students that houses all the summary
notes and practice papers for GCE 'O' Levels, GCE 'A' Levels and International Baccalaureate.

## Overview

Holy Grail is a modern full-stack web application built with:
- **Backend**: FastAPI (Python 3.11) with PostgreSQL database
- **Frontend**: Next.js 15/16 (React 19) with TypeScript and Tailwind CSS
- **Task Queue**: Celery with Redis broker for async processing
- **Infrastructure**: Turborepo monorepo with Docker containerization

## Quick Start

### Prerequisites
- Node.js 18+ and [Bun](https://bun.sh/) 1.2.22+
- Python 3.11+ with [UV](https://docs.astral.sh/uv/) package manager
- Docker

### Setup (3 Simple Steps)

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd holy-grail
   bun install
   ```

2. **Start the database**
   ```bash
   bun run db
   ```

3. **Start the development servers**
   ```bash
   bun run dev
   ```

That's it! You can now access:
- **Backend API**: http://localhost:8000/docs
- **Main Frontend**: http://localhost:3000 (grail.moe)
- **App Frontend**: http://localhost:3001 (app.grail.moe)

Or use `bun run dev:full` to start everything with database, migrations, and seed data in one command.

## Architecture

Holy Grail uses a micro-frontend architecture with two separate frontend applications:

```
┌──────────────────┐     ┌──────────────────┐
│  Main Frontend   │     │   App Frontend   │
│   (grail.moe)    │     │ (app.grail.moe)  │
│   Port: 3000     │     │   Port: 3001     │
└────────┬─────────┘     └────────┬─────────┘
         │                         │
         └────────────┬────────────┘
                      │
               ┌──────▼──────┐
               │ Backend API │
               │  (FastAPI)  │
               │ Port: 8000  │
               └──────┬──────┘
                      │
         ┌────────────┼────────────┐
         │            │            │
   ┌─────▼─────┐ ┌────▼────┐ ┌─────▼─────┐
   │PostgreSQL │ │  Redis  │ │  Celery   │
   │  (Docker) │ │ (Broker)│ │  (Tasks)  │
   │Port: 5432 │ │Port:6379│ │ Port:8001 │
   └───────────┘ └─────────┘ └───────────┘
```

- **Main Frontend** (`/apps/frontend`): The primary educational platform serving free notes and papers
- **App Frontend** (`/apps/app-frontend`): Premium SaaS features for enhanced studying tools
- Both frontends connect to the same backend API and share authentication

## Project Structure

```
holy-grail/
├── apps/
│   ├── backend/        # FastAPI backend application
│   ├── frontend/       # Main educational platform (Next.js 16)
│   ├── app-frontend/   # Premium features platform (Next.js 15)
│   └── task/           # Celery task worker + API
├── packages/
│   ├── ui/             # Shared React component library
│   └── tooling/        # Shared Biome and TypeScript configs
├── docker/             # Docker configurations (PostgreSQL, Redis)
├── docs/               # Project documentation
├── claude/             # Claude Code organization
│   ├── agents/         # Custom AI agents
│   ├── docs/           # Development documentation
│   ├── plans/          # Implementation plans
│   └── tickets/        # Task tickets
└── turbo.json          # Monorepo configuration
```

## Available Commands

From the root directory:

```bash
# Quick Start
bun install             # Install all dependencies
bun run setup           # Initial Turborepo setup
bun run dev:full        # Start DB, run migrations, seed data, and start all dev servers

# Development
bun run dev             # Start all dev servers (backend, frontend, app-frontend)
bun run db              # Start PostgreSQL and Redis in Docker
bun run migrate         # Run database migrations
bun run seed            # Seed database with sample data
bun run task            # Start Celery task worker

# Code Quality
bun run build           # Build all packages
bun run test            # Run all tests
bun run lint            # Lint all packages
bun run format          # Format all code
```

For package-specific commands, see the README in each package directory.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Next.js 15-16, TypeScript, Tailwind CSS 4.1 |
| **Backend** | FastAPI, Python 3.11, SQLAlchemy 2.0, Pydantic 2.0 |
| **Database** | PostgreSQL 14.1, Alembic migrations |
| **Task Queue** | Celery 5.4, Redis 7.0.7 |
| **Auth** | JWT-based with bcrypt password hashing |
| **Storage** | AWS S3 for file storage |
| **Infrastructure** | AWS ECS Fargate, Terraform Cloud |
| **Package Managers** | Bun (Node), UV (Python) |
| **Code Quality** | Ruff (Python), Biome (JS/TS), MyPy |

## Documentation

- [Setup Guide](./docs/SETUP.md) - Detailed setup instructions
- [Development Guide](./docs/DEVELOPMENT.md) - Development workflow and tips
- [Architecture](./docs/ARCHITECTURE.md) - System design and structure
- [Troubleshooting](./docs/TROUBLESHOOTING.md) - Common issues and solutions

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure that all backend contributions are updated with appropriate tests and passed with `bun run test` first.
