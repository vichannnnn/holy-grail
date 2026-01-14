# TICKET-013: Update Documentation for New Architecture

## Description
Update all project documentation to reflect the new two-frontend architecture. This includes updating setup instructions, development commands, architectural diagrams, and adding clear documentation about the separation between the main educational platform (grail.moe) and the premium features platform (app.grail.moe).

## Acceptance Criteria
- [x] CLAUDE.md updated with new project structure
- [x] README.md reflects new architecture
- [x] Development commands updated for both frontends
- [x] Clear documentation on running both frontends
- [x] Updated port information (3000 for frontend, 3001 for app-frontend)
- [x] Domain structure documented (grail.moe vs app.grail.moe)
- [x] No references to old frontend or port 3001 for main frontend
- [x] Setup instructions work for new developers

## Priority
Medium

## Status
Done

## Implementation Steps

### 1. Update CLAUDE.md

#### Update Project Structure
```
├── apps/              # Turborepo apps
│   ├── backend/       # FastAPI backend application
│   ├── frontend/      # Main educational platform (React/Next.js)
│   ├── app-frontend/  # Premium SaaS features platform
│   └── task/          # Celery task worker
```

#### Update Common Commands
Add commands for both frontends:
```bash
# Frontend Development (Main Platform)
cd apps/frontend
bun run dev         # Start on port 3000

# App-Frontend Development (Premium Platform)
cd apps/app-frontend
bun run dev         # Start on port 3001

# Run both frontends simultaneously
bun run dev         # From root - starts all services
```

#### Update Service URLs
```
- **Main Frontend**: http://localhost:3000 (grail.moe in production)
- **App Frontend**: http://localhost:3001 (app.grail.moe in production)
- **Backend API**: http://localhost:8000/docs
```

### 2. Update README.md

Add a new section explaining the architecture:
```markdown
## Architecture

Holy Grail uses a micro-frontend architecture with two separate frontend applications:

- **Main Frontend** (`/apps/frontend`): The primary educational platform serving free notes and papers
- **App Frontend** (`/apps/app-frontend`): Premium SaaS features for enhanced studying tools

Both frontends connect to the same backend API and share authentication.
```

Update quick start section:
```markdown
## Quick Start

1. Install dependencies: `bun install`
2. Start the database: `bun run db`
3. Run migrations: `bun run migrate`
4. Seed data: `bun run seed`
5. Start development servers: `bun run dev`
   - Main frontend: http://localhost:3000
   - App frontend: http://localhost:3001
   - Backend API: http://localhost:8000
```

### 3. Create/Update Architecture Documentation

Create `docs/ARCHITECTURE.md` if it doesn't exist:
```markdown
# Architecture Overview

## Frontend Architecture

### Main Frontend (grail.moe)
- Port: 3000
- Purpose: Free educational content, notes, papers
- Features: Library, upload, leaderboard, public content

### App Frontend (app.grail.moe)
- Port: 3001
- Purpose: Premium SaaS features
- Features: Advanced study tools, analytics, premium content

### Shared Resources
- Authentication system
- API client configuration
- UI component library (@shared/ui)
- Build tooling (@shared/tooling)
```

### 4. Update Development Setup Documentation

Update any setup documentation:
- Remove references to "new-frontend"
- Update port references (3001 is now for app-frontend)
- Add instructions for running specific frontends
- Document environment variable setup for both frontends

### 5. Update Package Scripts Documentation

Document root-level commands:
```bash
bun run dev          # Start all services
bun run build        # Build all services
bun run test         # Run tests for all services
bun run lint         # Lint all services
```

### 6. Update Docker Documentation

If Docker files exist, update:
- Port mappings
- Service names
- Build contexts

### 7. Search and Replace

Search for and update:
- "new-frontend" → "frontend"
- "port 3001" → "port 3000" (for main frontend contexts)
- Old frontend references

### 8. Add Migration Notes

Create a section for developers with existing setups:
```markdown
## Migration from Old Setup

If you have the old setup with `new-frontend`:
1. Pull the latest changes
2. Delete your node_modules
3. Run `bun install`
4. The main frontend now runs on port 3000
5. New app-frontend runs on port 3001
```

## Technical Details

### Files to Update
- `/CLAUDE.md`
- `/README.md`
- `/docs/SETUP.md` (if exists)
- `/docs/ARCHITECTURE.md` (create if needed)
- Any other documentation files

### Verification Checklist
- [ ] A new developer can follow README and get both frontends running
- [ ] CLAUDE.md accurately reflects current structure
- [ ] No dead links or outdated references
- [ ] Port information is correct everywhere
- [ ] Domain structure is documented

## Dependencies
- TICKET-011 and TICKET-012 should be completed first
- Ensures documentation matches actual implementation

## Notes
- Keep documentation concise but comprehensive
- Include troubleshooting section if needed
- Consider adding architecture diagrams
- Ensure consistency across all documentation files