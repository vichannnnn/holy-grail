# Holy Grail

[![codecov](https://codecov.io/gh/vichannnnn/holy-grail/branch/dev/graph/badge.svg)](https://codecov.io/gh/vichannnnn/holy-grail/tree/dev)
[![Python](https://img.shields.io/badge/python-3.11-blue.svg)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/built%20with-Docker-blue)](https://www.docker.com/)
[![Deploy](https://github.com/vichannnnn/holy-grail/actions/workflows/deploy-dev.yml/badge.svg)](https://github.com/vichannnnn/holy-grail/actions)
[![Deploy](https://github.com/vichannnnn/holy-grail/actions/workflows/deploy-prod.yml/badge.svg)](https://github.com/vichannnnn/holy-grail/actions)

![Grail-chan](https://image.himaa.me/grail-chan-sparkling-640x480.png)

This is a GitHub monorepo for the Holy Grail webapp consisting of a few services: Celery task runner, Redis broker,
Postgres database, FastAPI backend and React Frontend.

Updated changes are automatically deployed to their respective environment (development, production).

Holy Grail is a completely free-to-access web library aimed at Singaporean students that houses all the summary
notes and practice papers for GCE 'O' Levels, GCE 'A' Levels and
International Baccalaureate.

## Overview

Holy Grail is a modern web application built with:
- **Backend**: FastAPI (Python) with PostgreSQL database
- **Frontend**: Next.js (React) with TypeScript
- **Infrastructure**: Monorepo managed with Turborepo

## Quick Start

### Prerequisites
- Node.js 18+ and Bun (or npm/yarn)
- Python 3.11+
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
- 🚀 **Backend API**: http://localhost:8000/docs
- 🎨 **Main Frontend**: http://localhost:3000
- 💎 **App Frontend**: http://localhost:3001

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
               ┌──────▼─────────┐
               │  Backend API   │
               │   (FastAPI)    │
               │  Port: 8000    │
               └──────┬─────────┘
                      │
               ┌──────▼─────────┐
               │   PostgreSQL   │
               │   (Docker)     │
               │  Port: 5432    │
               └────────────────┘
```

- **Main Frontend** (`/apps/frontend`): The primary educational platform serving free notes and papers
- **App Frontend** (`/apps/app-frontend`): Premium SaaS features for enhanced studying tools
- Both frontends connect to the same backend API and share authentication

## Project Structure

```
holy-grail/
├── apps/
│   ├── backend/        # FastAPI backend application
│   ├── frontend/       # Main educational platform (Next.js)
│   ├── app-frontend/   # Premium features platform (Next.js)
│   └── task/           # Celery task worker
├── packages/           # Shared packages
├── docs/              # Documentation
└── turbo.json         # Monorepo configuration
```

## Available Commands

From the root directory:

```bash
bun run dev          # Start all services
bun run db           # Start database only
bun run build        # Build all packages
bun run test         # Run all tests
bun run lint         # Lint all packages
```

For package-specific commands, see the README in each package directory.

## Migration from Previous Setup

If you have the old setup with `new-frontend`:

1. **Pull the latest changes**:
   ```bash
   git pull origin main
   ```

2. **Clean and reinstall dependencies**:
   ```bash
   rm -rf node_modules bun.lockb
   bun install
   ```

3. **Update your local development**:
   - The main frontend now runs on port 3000 (previously `new-frontend` was on 3001)
   - New `app-frontend` runs on port 3001
   - Remove any local references to the old frontend directory

4. **Update environment variables**:
   - Main frontend: Uses standard `.env.local`
   - App frontend: Create `.env.local` from `.env.example`

## Documentation

- 📖 [Setup Guide](./docs/SETUP.md) - Detailed setup instructions
- 🛠️ [Development Guide](./docs/DEVELOPMENT.md) - Development workflow and tips
- 🏗️ [Architecture](./docs/ARCHITECTURE.md) - System design and structure
- 🚨 [Troubleshooting](./docs/TROUBLESHOOTING.md) - Common issues and solutions

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure that all backend contributions are updated with appropriate tests and passed with `bun run test` first.
