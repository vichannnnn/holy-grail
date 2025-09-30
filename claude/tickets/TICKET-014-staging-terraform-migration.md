# TICKET-014: Migrate to Staging/Production Deployment Strategy

## Description
Migrate from the current dev/production deployment strategy to a staging/production strategy using Terraform and ECS. This involves updating the CI/CD pipeline to support the staging branch, creating staging-specific Terraform configurations, and updating the build process to work with the new Turborepo monorepo structure.

The key change is that the `staging` branch will replace the `dev` branch as the pre-production environment, providing a consistent infrastructure for testing before production deployment.

## Acceptance Criteria
- [x] `staging.terraform.tfvars` created with staging-specific configuration
- [x] CI/CD workflow updated to trigger on `staging` and `main` branches (not `dev`)
- [x] Docker build contexts updated to use new Turborepo structure (`apps/backend`, `apps/frontend`)
- [x] Frontend `next.config.ts` updated to enable standalone output for Docker
- [ ] Terraform Cloud workspace created for staging environment
- [ ] GitHub secrets added for staging workspace ID
- [ ] Staging environment successfully deploys to ECS
- [ ] Production deployment still works correctly
- [ ] Old `dev` branch deployment removed/deprecated

## Priority
High

## Status
In Progress

## Implementation Steps

### 1. Fix Frontend Configuration for Docker
**Files**: `apps/frontend/next.config.ts`

Uncomment the `output: "standalone"` line to enable Docker standalone builds:
```typescript
output: "standalone", // Required for Docker deployment
```

Currently commented out for Vercel, but needed for ECS deployment.

### 2. Create Staging Terraform Configuration
**Files**: `terraform/staging.terraform.tfvars`

Create new staging configuration based on `dev.terraform.tfvars`:
```hcl
# AWS Project Settings
region         = "ap-southeast-1"
AWS_ACCESS_KEY = "<STAGING_AWS_ACCESS_KEY>"
AWS_SECRET_KEY = "<STAGING_AWS_SECRET_KEY>"
app_name       = "holy-grail-staging"

# Docker Container Images
backend_image       = "ghcr.io/vichannnnn/holy-grail-staging/backend"
frontend_image      = "ghcr.io/vichannnnn/holy-grail-staging/frontend"
celery_image        = "ghcr.io/vichannnnn/holy-grail-staging/celery"
backend_image_hash  = ""
frontend_image_hash = ""
celery_image_hash   = ""

# Domain Names
root_domain_name        = "grail.moe"
backend_subdomain_name  = "api.staging"
frontend_subdomain_name = "staging"

# Environment variables
AWS_CLOUDFRONT_URL = "https://staging.document.grail.moe"
AWS_S3_BUCKET_NAME = "holy-grail-staging-bucket"
BUCKET_DOMAIN_NAME = "staging.document.grail.moe"

# Database (can use dev database or create separate)
POSTGRES_DB       = "app"
POSTGRES_USER     = "holygrailadmin"
POSTGRES_PASSWORD = "<STAGING_PASSWORD>"

# Other environment variables (copy from dev.terraform.tfvars)
```

### 3. Update CI/CD Workflow
**Files**: `.github/workflows/build-and-deploy.yml`

#### 3a. Update Trigger Branches
```yaml
on:
  push:
    branches:
      - staging  # Changed from dev
      - main     # Changed from master
    paths:
      - 'apps/backend/**'      # Changed from holy-grail-backend/**
      - 'apps/frontend/**'     # Changed from holy-grail-frontend/**
      - 'terraform/**'
```

#### 3b. Update Environment Variables
```yaml
env:
  REGISTRY: ghcr.io
  STAGING_IMAGE_NAME: vichannnnn/holy-grail-staging  # New
  PROD_IMAGE_NAME: vichannnnn/holy-grail
  FRONTEND_IMAGE_NAME: frontend
  BACKEND_IMAGE_NAME: backend
  CELERY_IMAGE_NAME: celery
  # ... rest of env vars
```

#### 3c. Update Path Filters
```yaml
- name: Path filter
  id: path-filter
  uses: dorny/paths-filter@v3
  with:
    filters: |
      backend:
        - 'apps/backend/**'      # Updated path
      celery:
        - 'apps/backend/**'      # Updated path
      frontend:
        - 'apps/frontend/**'     # Updated path
```

#### 3d. Update Frontend Build Context
```yaml
- name: Build and push Frontend Docker image
  uses: docker/build-push-action@v2
  with:
    context: .                                    # Root for turbo prune
    file: ./apps/frontend/Dockerfile
    push: true
    tags: |
      ${{ env.REGISTRY }}/${{ github.ref == 'refs/heads/staging' && env.STAGING_IMAGE_NAME || env.PROD_IMAGE_NAME}}/${{ env.FRONTEND_IMAGE_NAME }}:${{ env.HASH }}
```

#### 3e. Update Backend Build Context
```yaml
- name: Build and push Backend Docker image
  uses: docker/build-push-action@v2
  with:
    context: ./apps/backend                       # Updated path
    file: ./apps/backend/Dockerfile
    push: true
    tags: |
      ${{ env.REGISTRY }}/${{ github.ref == 'refs/heads/staging' && env.STAGING_IMAGE_NAME || env.PROD_IMAGE_NAME}}/${{ env.BACKEND_IMAGE_NAME }}:${{ env.HASH }}
```

#### 3f. Update Celery Build Context
```yaml
- name: Build and push Celery Docker image
  uses: docker/build-push-action@v2
  with:
    context: ./apps/backend                       # Updated path
    file: ./apps/backend/Dockerfile
    push: true
    tags: |
      ${{ env.REGISTRY }}/${{ github.ref == 'refs/heads/staging' && env.STAGING_IMAGE_NAME || env.PROD_IMAGE_NAME}}/${{ env.CELERY_IMAGE_NAME }}:${{ env.HASH }}
```

#### 3g. Update Workspace ID References
Replace all instances of:
```yaml
WORKSPACE_ID: ${{ github.ref == 'refs/heads/dev' && secrets.DEV_WORKSPACE_ID || secrets.PROD_WORKSPACE_ID }}
```
With:
```yaml
WORKSPACE_ID: ${{ github.ref == 'refs/heads/staging' && secrets.STAGING_WORKSPACE_ID || secrets.PROD_WORKSPACE_ID }}
```

### 4. Setup Terraform Cloud
1. Create new workspace in Terraform Cloud: `holy-grail-staging`
2. Configure workspace to use `staging.terraform.tfvars` variables
3. Set up all required variables (sensitive ones as sensitive)
4. Note the workspace ID for GitHub secrets

### 5. Update GitHub Secrets
Add new secret:
- `STAGING_WORKSPACE_ID`: The workspace ID from Terraform Cloud

### 6. Optional: Clean Up Dev Configuration
- Archive or remove `terraform/dev.terraform.tfvars`
- Update documentation to reflect new deployment strategy
- Deprecate `dev` branch in favor of `staging`

### 7. Test Deployment
1. Push changes to `staging` branch
2. Verify GitHub Actions workflow triggers
3. Verify Docker images are built and pushed
4. Verify Terraform applies successfully
5. Test staging environment: `https://staging.grail.moe` and `https://api.staging.grail.moe`
6. Verify production deployment still works on `main` branch

## Technical Details

### Docker Build Context Changes
**Before (old structure)**:
- Context: `./holy-grail-backend/backend`
- Context: `./holy-grail-frontend`

**After (new Turborepo structure)**:
- Backend context: `./apps/backend`
- Frontend context: `.` (root, for turbo prune to work)
- Frontend Dockerfile: `./apps/frontend/Dockerfile`

### Terraform Variables
Key differences between staging and production:
- `app_name`: Differentiates resources
- Domain subdomains: `staging` vs production
- Docker image names: Different registry paths
- S3 buckets: Separate buckets for each environment

### Frontend Dockerfile Requirements
The frontend Dockerfile uses `turbo prune` which requires:
1. Build context at repository root
2. Access to `turbo.json`
3. Access to all workspaces for dependency resolution

### Branch Strategy
- `staging`: Pre-production testing environment (was `dev`)
- `main`: Production environment (was `master`)
- Feature branches: Merge to `staging` first, then `main`

## Dependencies
- Terraform Cloud access
- GitHub repository admin access
- AWS credentials for staging environment
- Domain DNS access (Porkbun)

## Notes
- Staging environment can be destroyed when not in use to save costs
- The staging environment should mirror production as closely as possible
- This provides better consistency than the old dev environment
- Staging uses the same ECS Fargate configuration as production

## Cost Considerations
- Staging environment costs ~$46-66/month when running
- Can be destroyed via `terraform destroy` when not needed
- Consider using smaller task sizes for staging if budget is tight
- Can share dev database to reduce RDS costs

## Rollback Plan
If issues occur:
1. Revert workflow changes
2. Keep old `dev` branch configuration
3. Staging configuration can be removed without affecting production
4. Production deployment on `main` branch is unaffected

## Verification Checklist
- [ ] Staging branch triggers CI/CD workflow
- [ ] Docker images build successfully with new paths
- [ ] Terraform applies without errors
- [ ] Staging site is accessible at staging.grail.moe
- [ ] Staging API is accessible at api.staging.grail.moe
- [ ] Production deployment still works
- [ ] No references to old paths remain in CI/CD