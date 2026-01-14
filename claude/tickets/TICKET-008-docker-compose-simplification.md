# TICKET-008: Simplify Docker Compose for Database Only

## Description
Simplify the Docker Compose setup to only include database services (PostgreSQL and Redis) for local development. The application services (backend, frontend, task) will run natively using bun/npm for better developer experience with hot-reload and easier debugging.

## Acceptance Criteria
- [x] Create new `docker-compose.database.yml` with only PostgreSQL and Redis services
- [x] Update `package.json` with "db" command to use the new docker-compose file
- [x] Update backend's dev script to not start its own database containers
- [x] Create `dev:full` command that orchestrates database startup, migrations, seeding, and app services
- [x] Fix port conflicts when running multiple services
- [x] Ensure all services can communicate properly (backend ↔ task service ↔ Redis)

## Priority
Medium

## Status
Done

## Implementation Summary
1. Created `docker-compose.database.yml` with only PostgreSQL and Redis services
2. Updated root `package.json`:
   - Added `"db": "docker compose -f docker-compose.database.yml up -d"`
   - Added `"dev:full": "bun run db && sleep 3 && bun run migrate && bun run seed && bun run dev"`
3. Updated `apps/backend/package.json` to remove database startup from dev script
4. Fixed port conflict issue where both Turbo's dev and standalone task command were trying to use port 8001

## Notes
- The `dev:full` command provides a one-command startup for the entire stack
- Developers can still run services individually if needed
- This approach provides better DX with native hot-reload while keeping databases containerized
- Completed: 2025-09-13