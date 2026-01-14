# PLAN-001: Frontend Architecture Migration Strategy

## Executive Summary
This plan outlines the migration strategy for restructuring the Holy Grail frontend architecture from a single frontend to a dual-frontend system: one for the main educational content platform (grail.moe) and another for premium SaaS features (app.grail.moe).

## Objectives
- [ ] Replace the current Material UI-based frontend with the Tailwind CSS-based new-frontend
- [ ] Create a separate app-frontend for premium features
- [ ] Maintain a clean separation between free educational content and paid features
- [ ] Ensure both frontends share the same authentication system
- [ ] Minimize code duplication while maintaining independence

## Architecture

### Current State
```
apps/
├── frontend/        # Old MUI-based frontend (port 3000)
├── new-frontend/    # New Tailwind-based frontend (port 3001)
├── backend/         # FastAPI backend (port 8000)
└── task/            # Celery worker
```

### Target State
```
apps/
├── frontend/        # Main educational platform (port 3000) - renamed from new-frontend
├── app-frontend/    # Premium SaaS features (port 3001) - new minimal frontend
├── backend/         # FastAPI backend (port 8000) - unchanged
└── task/            # Celery worker - unchanged
```

### Shared Resources
```
packages/
├── ui/              # Shared UI components - used by both frontends
└── tooling/         # Shared build tools - used by all apps
```

## Implementation Phases

### Phase 1: Frontend Replacement (TICKET-011)
**Timeline**: Day 1
**Risk**: Low
**Dependencies**: None

1. Backup current state
2. Remove old frontend directory
3. Rename new-frontend to frontend
4. Update configurations and references
5. Test functionality

### Phase 2: App-Frontend Creation (TICKET-012)
**Timeline**: Day 1-2
**Risk**: Low
**Dependencies**: Phase 1 completion

1. Copy frontend structure as base
2. Strip unnecessary features
3. Configure for port 3001
4. Test authentication flow
5. Verify home page functionality

### Phase 3: Documentation Update (TICKET-013)
**Timeline**: Day 2
**Risk**: Low
**Dependencies**: Phase 1 & 2 completion

1. Update technical documentation
2. Update development guides
3. Document architecture decisions
4. Create deployment guides

## Technical Approach

### Frontend Technology Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: @shared/ui package + inline components
- **State Management**: React hooks + Context API
- **Form Handling**: React Hook Form + Zod
- **API Client**: Axios with custom wrapper

### Component Organization
Following Next.js App Router conventions:
- `_components/` directories for page-specific components
- `/lib/` for shared utilities and features
- `@shared/ui` for truly reusable components

### Authentication Strategy
Both frontends will:
- Use the same JWT-based authentication
- Share the same backend API endpoints
- Store tokens in the same manner
- Have independent login/logout flows

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Build failures after rename | High | Low | Test thoroughly in development |
| Authentication issues | High | Medium | Verify JWT handling in both frontends |
| Port conflicts | Low | Low | Clear documentation of port usage |
| Missing dependencies | Medium | Medium | Careful review of imports |
| CORS configuration | Medium | Low | Backend already supports multiple origins |

## Success Metrics
- [ ] Old frontend successfully removed
- [ ] Frontend (renamed) runs on port 3000 without issues
- [ ] App-frontend runs on port 3001 with authentication working
- [ ] Both frontends can authenticate with the backend
- [ ] No regression in existing functionality
- [ ] Documentation is comprehensive and accurate
- [ ] Development workflow remains smooth

## Long-term Considerations

### Maintenance
- Keep shared components in @shared/ui package
- Maintain consistent coding standards across both frontends
- Regular dependency updates for both

### Future Enhancements
- Consider micro-frontend architecture if complexity grows
- Evaluate module federation for better code sharing
- Monitor performance and optimize bundle sizes

### Deployment Strategy
- Both frontends can be deployed independently
- Use environment-specific builds
- Maintain separate CI/CD pipelines

## Decision Log

### Why Two Separate Frontends?
1. **Clear separation of concerns**: Free vs paid features
2. **Independent deployment cycles**: Can update one without affecting the other
3. **Different user experiences**: Educational content vs SaaS tools
4. **Easier to maintain**: Smaller, focused codebases

### Why Keep _components Convention?
1. **Consistency**: Already used throughout new-frontend
2. **Next.js best practice**: Prevents accidental route creation
3. **Co-location**: Components stay close to their usage
4. **Clear organization**: Easy to identify page-specific components

## References
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- Project CLAUDE.md for coding standards