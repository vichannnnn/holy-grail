# PLAN-014: Staging/Production Deployment Strategy Migration

**Created**: 2025-09-30
**Related Ticket**: [TICKET-014](../tickets/TICKET-014-staging-terraform-migration.md)
**Status**: Planning

## Executive Summary

Migrate Holy Grail's deployment infrastructure from a dev/production model to a staging/production model that provides better consistency and testing capabilities. This involves updating Terraform configurations, CI/CD pipelines, and Docker build processes to work with the new Turborepo monorepo structure.

## Objectives

- [ ] Replace dev environment with staging environment
- [ ] Ensure staging mirrors production infrastructure for consistent testing
- [ ] Update CI/CD to support new branch strategy (staging/main)
- [ ] Adapt Docker builds to work with Turborepo structure
- [ ] Maintain ability to destroy staging when not in use

## Current State Analysis

### Branch Strategy
- **Current**: `dev` → Dev environment, `master` → Production
- **Issue**: Inconsistent naming, dev doesn't mirror production closely
- **Desired**: `staging` → Staging environment, `main` → Production

### Infrastructure
- **ECS Configuration**: Terraform + ECS Fargate on AWS
- **CI/CD**: GitHub Actions → Terraform Cloud
- **Current tfvars**: `dev.terraform.tfvars`, `terraform.tfvars` (prod)

### Monorepo Structure
- **Old structure**: `holy-grail-backend/`, `holy-grail-frontend/`
- **New structure**: Turborepo with `apps/backend/`, `apps/frontend/`, `apps/app-frontend/`
- **Issue**: CI/CD still references old paths

### Docker Build Context
- **Frontend**: Uses `turbo prune` requiring root context
- **Backend**: Standalone build in `apps/backend`
- **Issue**: Frontend `output: "standalone"` is commented out

## Architecture

### Deployment Flow

```
┌─────────────┐         ┌─────────────┐
│   Staging   │         │    Main     │
│   Branch    │         │   Branch    │
└──────┬──────┘         └──────┬──────┘
       │                       │
       │ Push                  │ Push
       ▼                       ▼
┌─────────────────────────────────────┐
│      GitHub Actions Workflow        │
│  - Build Docker images              │
│  - Push to GHCR                     │
│  - Update Terraform Cloud vars      │
└──────┬──────────────────────┬───────┘
       │                      │
       │ Staging              │ Production
       ▼                      ▼
┌─────────────┐         ┌─────────────┐
│  Terraform  │         │  Terraform  │
│   Cloud     │         │   Cloud     │
│  (Staging)  │         │    (Prod)   │
└──────┬──────┘         └──────┬──────┘
       │                       │
       │ terraform apply       │ terraform apply
       ▼                       ▼
┌─────────────┐         ┌─────────────┐
│ ECS Fargate │         │ ECS Fargate │
│  Staging    │         │    Prod     │
│ Environment │         │ Environment │
└─────────────┘         └─────────────┘
```

### Infrastructure Components

**Per Environment**:
- ECS Cluster
- Application Load Balancer (ALB)
- ECS Services (Backend, Frontend, Celery)
- RDS PostgreSQL instance
- S3 bucket for documents
- CloudFront distribution
- ACM certificates for SSL

### Domain Strategy

**Staging**:
- Frontend: `https://staging.grail.moe`
- Backend API: `https://api.staging.grail.moe`
- Documents: `https://staging.document.grail.moe`

**Production**:
- Frontend: `https://grail.moe`
- Backend API: `https://api.grail.moe`
- Documents: `https://document.grail.moe`

## Implementation Phases

### Phase 1: Frontend Configuration Fix

**Goal**: Enable Docker standalone output for Next.js

**Tasks**:
1. Edit `apps/frontend/next.config.ts`
2. Uncomment `output: "standalone"`
3. Test local Docker build: `docker build -f apps/frontend/Dockerfile .`
4. Verify build produces standalone output

**Risk**: Low
**Duration**: 10 minutes

### Phase 2: Create Staging Terraform Configuration

**Goal**: Define staging infrastructure as code

**Tasks**:
1. Copy `dev.terraform.tfvars` to `staging.terraform.tfvars`
2. Update variables:
   - `app_name = "holy-grail-staging"`
   - Image names: `ghcr.io/vichannnnn/holy-grail-staging/*`
   - Subdomains: `staging` and `api.staging`
   - S3 bucket: `holy-grail-staging-bucket`
   - CloudFront URL: `staging.document.grail.moe`
3. Generate new secret keys where needed
4. Review all environment variables

**Risk**: Low
**Duration**: 30 minutes

### Phase 3: Update CI/CD Workflow

**Goal**: Adapt GitHub Actions to new structure and branches

**Tasks**:
1. Update trigger branches (staging/main instead of dev/master)
2. Update path filters to new monorepo structure
3. Add staging image name environment variable
4. Update all Docker build contexts:
   - Frontend: context `.`, file `./apps/frontend/Dockerfile`
   - Backend: context `./apps/backend`, file `./apps/backend/Dockerfile`
   - Celery: context `./apps/backend`, file `./apps/backend/Dockerfile`
5. Update conditional logic for branch detection
6. Update workspace ID references (staging vs dev)

**Risk**: Medium (workflow changes can break deployment)
**Duration**: 2 hours

### Phase 4: Terraform Cloud Setup

**Goal**: Configure Terraform Cloud for staging

**Tasks**:
1. Create workspace `holy-grail-staging`
2. Link to GitHub repository
3. Configure workspace settings:
   - Execution Mode: Remote
   - Terraform Version: 1.5.0
   - Auto-apply: Enabled (for CI/CD)
4. Add all variables from `staging.terraform.tfvars`
5. Mark sensitive variables appropriately
6. Note workspace ID for GitHub secrets

**Risk**: Low
**Duration**: 30 minutes

### Phase 5: GitHub Configuration

**Goal**: Add staging secrets

**Tasks**:
1. Navigate to repository Settings → Secrets
2. Add `STAGING_WORKSPACE_ID` with workspace ID from Phase 4
3. Verify all other required secrets exist:
   - `TFC_TOKEN`
   - `GITHUB_TOKEN` (automatic)

**Risk**: Low
**Duration**: 5 minutes

### Phase 6: Test Staging Deployment

**Goal**: Validate staging environment deployment

**Tasks**:
1. Create/push to `staging` branch
2. Monitor GitHub Actions workflow
3. Verify Docker images build and push successfully
4. Check Terraform Cloud run completes
5. Verify ECS tasks are running
6. Test endpoints:
   - Frontend: https://staging.grail.moe
   - Backend: https://api.staging.grail.moe/docs
   - Health check: https://api.staging.grail.moe/hello
7. Test basic functionality (login, browse, upload)
8. Check CloudWatch logs for errors

**Risk**: High (first deployment may reveal issues)
**Duration**: 1-2 hours (including troubleshooting)

### Phase 7: Validate Production Still Works

**Goal**: Ensure production deployment unaffected

**Tasks**:
1. Merge a small change to `main` branch
2. Monitor production deployment workflow
3. Verify production site remains functional
4. Rollback if issues detected

**Risk**: Medium
**Duration**: 30 minutes

### Phase 8: Documentation & Cleanup

**Goal**: Update docs and remove old config

**Tasks**:
1. Update README with new branch strategy
2. Update CLAUDE.md deployment section
3. Document staging environment management
4. Add instructions for destroying staging when not in use
5. Consider archiving/removing `dev.terraform.tfvars`
6. Update team on new workflow

**Risk**: Low
**Duration**: 30 minutes

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Docker build fails with new context | High | Medium | Test builds locally first; frontend context must be root for turbo prune |
| Terraform apply fails on first run | High | Medium | Validate terraform files locally; review all variable names |
| DNS propagation delays | Medium | High | Use nslookup to verify DNS; may take 5-10 minutes |
| Cost overrun from two environments | Medium | Low | Monitor costs; destroy staging when not in use |
| Production deployment breaks | Critical | Low | Test on staging first; keep rollback plan ready |
| GitHub Actions secrets misconfigured | High | Medium | Double-check secret names match workflow references |

## Success Metrics

- [ ] Staging environment accessible at staging.grail.moe
- [ ] Staging API responds at api.staging.grail.moe/docs
- [ ] Production deployment unchanged and functional
- [ ] CI/CD workflow completes in <15 minutes
- [ ] No manual Terraform apply needed (fully automated)
- [ ] Staging can be destroyed and recreated successfully
- [ ] Team understands new deployment workflow

## Testing Strategy

### Unit Testing
- Terraform validate passes
- Docker images build locally
- Next.js standalone output generated

### Integration Testing
- GitHub Actions workflow completes
- Terraform Cloud runs successfully
- ECS tasks start and pass health checks

### End-to-End Testing
- User registration works on staging
- Document upload/download works
- Authentication flows work
- API endpoints respond correctly
- Frontend routes render properly

## Rollback Plan

### If Staging Deployment Fails
1. Review GitHub Actions logs
2. Check Terraform Cloud run details
3. Fix issues without affecting production
4. Retry deployment

### If Production Deployment Breaks
1. Revert last commit on main branch
2. Trigger re-deployment
3. Verify production is restored
4. Fix issues on staging before retrying

### If Workflow is Broken
1. Revert `.github/workflows/build-and-deploy.yml`
2. Push reverted changes
3. Fix issues in feature branch
4. Test thoroughly before re-applying

## Cost Analysis

### Staging Environment (Monthly)
- ECS Fargate (512 CPU, 1024 Memory, 3 tasks): ~$20-25
- Application Load Balancer: ~$16
- RDS db.t3.micro (if separate): ~$15-30
- S3 + CloudFront: ~$5
- **Total**: ~$56-76/month (or ~$41-51 if sharing dev RDS)

### When Destroyed
- $0 (all resources removed)

### Comparison
- Current (dev + prod): Similar cost
- Benefit: Can destroy staging between test cycles

## Timeline

- **Phase 1**: 10 minutes
- **Phase 2**: 30 minutes
- **Phase 3**: 2 hours
- **Phase 4**: 30 minutes
- **Phase 5**: 5 minutes
- **Phase 6**: 1-2 hours
- **Phase 7**: 30 minutes
- **Phase 8**: 30 minutes

**Total Estimated Time**: 5-6 hours

## Post-Implementation

### Monitoring
- Set up CloudWatch alarms for staging
- Monitor ECS task health
- Track deployment success rate
- Monitor costs weekly

### Maintenance
- Destroy staging when not in use: `terraform destroy -var-file=staging.terraform.tfvars`
- Rebuild staging before major features: `git push origin staging`
- Keep staging environment variables in sync with production

### Future Improvements
- Consider preview environments per PR
- Implement automated testing in CI/CD
- Add infrastructure cost monitoring
- Set up automated staging destruction schedule (e.g., weekends)

## Decision Log

### Why Staging Instead of Dev?
- Better reflects production environment
- Clearer naming convention
- Emphasizes this is for pre-production testing

### Why Not Keep Dev?
- Reduces confusion with three environments
- Saves infrastructure costs
- Staging serves the same purpose better

### Why Separate S3 Buckets?
- Prevents accidental data mixing
- Allows independent testing
- Cleaner separation of concerns

### Why Same ECS Configuration?
- Ensures staging mirrors production
- Catches infrastructure-related issues before prod
- Better testing reliability

## References

- [Terraform Cloud Workspaces Documentation](https://developer.hashicorp.com/terraform/cloud-docs/workspaces)
- [GitHub Actions Docker Build](https://github.com/docker/build-push-action)
- [Turborepo Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Next.js Standalone Output](https://nextjs.org/docs/pages/api-reference/next-config-js/output)