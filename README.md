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
- 🎨 **Frontend**: http://localhost:3000
- 🆕 **New Frontend**: http://localhost:3001

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend API   │────▶│   PostgreSQL    │
│  (Next.js)      │     │   (FastAPI)     │     │   (Docker)      │
│  Port: 3000     │     │   Port: 8000    │     │   Port: 5432    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Project Structure

```
holy-grail/
├── apps/
│   ├── backend/        # FastAPI backend application
│   ├── frontend/       # Main Next.js frontend
│   └── new-frontend/   # Experimental frontend
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

## Documentation

- 📖 [Setup Guide](./docs/SETUP.md) - Detailed setup instructions
- 🛠️ [Development Guide](./docs/DEVELOPMENT.md) - Development workflow and tips
- 🏗️ [Architecture](./docs/ARCHITECTURE.md) - System design and structure
- 🚨 [Troubleshooting](./docs/TROUBLESHOOTING.md) - Common issues and solutions

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure that all backend contributions are updated with appropriate tests and passed with `make tests` first.
