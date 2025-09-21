# TICKET-012: Create App-Frontend for Premium Features

## Description
Create a new minimal frontend application (app-frontend) for premium SaaS features. This frontend will be a stripped-down version of the main frontend, containing only essential features like authentication and a basic home page. It will run on port 3001 and be accessible via app.grail.moe.

## Acceptance Criteria
- [x] New app-frontend directory created under /apps
- [x] Basic Next.js setup with Tailwind CSS
- [x] Authentication system functional (login, register, reset password)
- [x] Home page with Hero and Analytics components
- [x] Running on port 3001
- [x] Connects to the same backend API
- [x] Uses @shared/ui and @shared/tooling packages
- [x] All unnecessary features removed
- [x] Clean, minimal codebase

## Priority
High

## Status
Done

## Implementation Steps

### 1. Create app-frontend directory structure
```bash
mkdir -p apps/app-frontend
cd apps/app-frontend
```

### 2. Copy base configuration files from frontend
Copy these files from the renamed frontend:
- `package.json` (update name to "app-frontend" and port to 3001)
- `tsconfig.json`
- `next.config.ts`
- `next-env.d.ts`
- `tailwind.config.ts` (if exists)
- `postcss.config.mjs`
- `.env.example` structure
- `biome.jsonc`
- `Dockerfile` (update port to 3001)

### 3. Create source directory structure
```bash
mkdir -p src/app
mkdir -p src/lib
mkdir -p public
```

### 4. Copy essential lib utilities
From frontend, copy:
- `/src/lib/auth/` - All authentication utilities
- `/src/lib/api-client/` - API client configuration

### 5. Copy authentication pages and components
From frontend, copy:
- `/src/app/auth/` - Entire auth directory
- `/src/app/auth/_components/` - Auth-specific components

### 6. Copy home page components
From frontend, copy:
- `/src/app/page.tsx` - Home page
- `/src/app/_components/Hero/` - Hero component
- `/src/app/_components/Analytics/` - Analytics component
- `/src/app/_components/index.ts` - Update to export only Hero and Analytics

### 7. Copy layout and global files
From frontend, copy:
- `/src/app/layout.tsx` - Root layout
- `/src/app/globals.css` - Global styles
- Error pages: `not-found.tsx`, `forbidden.tsx`, `unauthorized.tsx`

### 8. Copy essential public assets
From frontend, copy:
- Favicon files
- Essential images/icons
- robots.txt (update if needed)

### 9. Create minimal header/footer
- Simplify the Header component (remove unnecessary navigation)
- Keep Footer minimal

### 10. Update package.json
```json
{
  "name": "app-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "setup": "bun install",
    "dev": "bunx next dev --turbopack -p 3001",
    "build": "bunx next build",
    "start": "next start -p 3001",
    "format": "bunx biome format --write .",
    "lint": "bunx biome lint --write ./src"
  },
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "@hookform/resolvers": "^5.2.2",
    "@shared/tooling": "workspace:*",
    "@shared/ui": "workspace:*",
    "axios": "^1.12.2",
    "jwt-decode": "^4.0.0",
    "next": "^15.5.3",
    "react": "19.1.1",
    "react-dom": "19.1.1",
    "react-hook-form": "^7.62.0",
    "react-hot-toast": "^2.6.0",
    "tailwind-merge": "^3.3.1",
    "zod": "^4.1.8"
  }
}
```

### 11. Clean up and remove unnecessary features
Do NOT copy these directories/features:
- `/app/developer/` - Developer panel
- `/app/admin/` - Admin panel
- `/app/library/` - Library functionality
- `/app/upload/` - Upload features
- `/app/leaderboard/` - Leaderboard
- `/app/account/` - Keep only if basic profile needed
- `/app/verify-account/` - Keep only if email verification is required
- Unused lib features (AdminApprove, AdminDelete, AdminEdit, etc.)

### 12. Update imports and clean up
- Remove any imports referencing deleted features
- Update navigation links in Header
- Ensure all imports resolve correctly
- Remove unused dependencies from package.json

### 13. Test the application
```bash
cd apps/app-frontend
bun install
bun run dev
```
Verify:
- App starts on http://localhost:3001
- Home page loads correctly
- Can navigate to login/register
- Authentication works
- No console errors

## Technical Details

### Directory Structure (Final)
```
apps/app-frontend/
├── src/
│   ├── app/
│   │   ├── _components/
│   │   │   ├── Analytics/
│   │   │   ├── Hero/
│   │   │   └── index.ts
│   │   ├── auth/
│   │   │   ├── _components/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── reset-password/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── forbidden.tsx
│   │   └── unauthorized.tsx
│   └── lib/
│       ├── auth/
│       └── api-client/
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
└── Dockerfile
```

### Environment Variables
Create `.env.example`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### API Client Configuration
Ensure the API client points to the correct backend URL and handles authentication properly.

## Dependencies
- TICKET-011 must be completed first (frontend renamed)
- Backend CORS must support localhost:3001 for development

## Rollback Plan
If issues arise:
- Simply delete the app-frontend directory
- No impact on existing frontend

## Notes
- Keep the codebase minimal and focused
- This is for premium features only, not educational content
- Future features will be added incrementally
- Maintain consistency with the main frontend's patterns