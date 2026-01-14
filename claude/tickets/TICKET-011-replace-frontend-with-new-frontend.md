# TICKET-011: Replace Frontend with New-Frontend

## Description
Remove the old Material UI-based frontend and replace it with the new Tailwind CSS-based frontend. This involves deleting the old frontend directory, renaming new-frontend to frontend, and updating all references and configurations to reflect this change.

## Acceptance Criteria
- [x] Old frontend directory is removed
- [x] new-frontend is renamed to frontend
- [x] Port configuration updated from 3001 to 3000
- [x] All imports and references updated
- [x] Frontend runs successfully on port 3000
- [x] No broken links or missing dependencies
- [x] Turborepo configuration updated
- [x] Docker configuration updated if necessary

## Priority
High

## Status
Done

## Implementation Steps

### 1. Create a new branch
- Branch from `staging`
- Name: `replace-frontend`

### 2. Remove old frontend directory
- Delete `/apps/frontend` directory completely
- Verify no orphaned references remain

### 3. Rename new-frontend to frontend
- Rename `/apps/new-frontend` to `/apps/frontend`
- Update package.json name field from "new-frontend" to "frontend"

### 4. Update port configuration
- In `apps/frontend/package.json`:
  - Change dev script: `"dev": "bunx next dev --turbopack"` (remove `-p 3001`)
  - Change start script: `"start": "next start"` (remove `-p 3001`)
- In `apps/frontend/Dockerfile`:
  - Update EXPOSE from 3001 to 3000
  - Update CMD to use port 3000

### 5. Update references across the codebase
- Search and replace "new-frontend" with "frontend" in:
  - Root package.json workspaces
  - Turborepo configuration (turbo.json)
  - Documentation files
  - GitHub workflows
  - Any Docker compose files
  - Backend CORS configuration (if hardcoded)

### 6. Update environment files
- Ensure `.env`, `.env.local`, `.env.development`, `.env.production` are properly configured
- Update any references to port 3001 to 3000

### 7. Test the changes
- Run `bun install` from root
- Run `bun run dev` and verify frontend starts on port 3000
- Test key functionality:
  - Homepage loads
  - Authentication works
  - Navigation functions
  - API calls succeed

### 8. Update documentation references
- Update any README files mentioning port 3001
- Update any setup documentation

## Technical Details

### Files to Update
- `/apps/frontend/package.json` (after rename)
- `/apps/frontend/Dockerfile` (after rename)
- `/turbo.json` (if it references new-frontend)
- `/package.json` (root - workspaces)
- Any documentation mentioning new-frontend or port 3001

### Search Patterns
```bash
# Find all references to new-frontend
grep -r "new-frontend" --exclude-dir=node_modules --exclude-dir=.next

# Find all references to port 3001
grep -r "3001" --exclude-dir=node_modules --exclude-dir=.next
```

### Verification Commands
```bash
# After changes, verify the frontend starts correctly
cd apps/frontend
bun install
bun run dev

# Should see: ▲ Next.js 15.x.x
# - Local: http://localhost:3000
```

## Dependencies
- Ensure no active PRs are targeting the old frontend directory
- Coordinate with team to avoid conflicts

## Rollback Plan
If issues arise:
1. Revert the commit
2. Restore from backup if necessary
3. Document any unexpected dependencies discovered

## Notes
- The old frontend uses Material UI while new-frontend uses Tailwind CSS
- Ensure all team members are aware of this architectural change
- This change affects local development setup for all developers