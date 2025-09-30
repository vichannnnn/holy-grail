# Staging Environment Setup Guide

This guide walks through the manual steps required to set up the staging environment for the first time.

## Prerequisites

- Terraform Cloud account with access to the organization
- GitHub repository admin access
- AWS credentials for staging environment

## Step 1: Create Terraform Cloud Workspace

1. Log in to [Terraform Cloud](https://app.terraform.io/)
2. Navigate to your organization
3. Click "New Workspace"
4. Select "Version control workflow"
5. Choose your GitHub repository
6. Configure workspace settings:
   - **Workspace Name**: `holy-grail-staging`
   - **Terraform Working Directory**: `terraform`
   - **VCS Branch**: Leave as default (will use all branches)
7. Click "Create workspace"

## Step 2: Configure Workspace Settings

1. Go to workspace Settings → General
2. Set **Execution Mode**: Remote
3. Set **Terraform Version**: 1.5.0
4. Set **Auto apply**: Enabled (required for CI/CD)
5. Save settings

## Step 3: Add Terraform Variables

Navigate to workspace Variables tab and add the following variables from `staging.terraform.tfvars`:

### Terraform Variables (category: terraform)

| Variable Name | Value | Sensitive | Description |
|--------------|-------|-----------|-------------|
| `region` | `ap-southeast-1` | No | AWS region |
| `AWS_ACCESS_KEY` | `<YOUR_AWS_ACCESS_KEY>` | Yes | AWS access key |
| `AWS_SECRET_KEY` | `<YOUR_AWS_SECRET_KEY>` | Yes | AWS secret key |
| `app_name` | `holy-grail-staging` | No | Application name |
| `backend_image` | `ghcr.io/vichannnnn/holy-grail-staging/backend` | No | Backend Docker image |
| `frontend_image` | `ghcr.io/vichannnnn/holy-grail-staging/frontend` | No | Frontend Docker image |
| `celery_image` | `ghcr.io/vichannnnn/holy-grail-staging/celery` | No | Celery Docker image |
| `backend_image_hash` | `` | No | Backend image hash (empty initially) |
| `frontend_image_hash` | `` | No | Frontend image hash (empty initially) |
| `celery_image_hash` | `` | No | Celery image hash (empty initially) |
| `root_domain_name` | `grail.moe` | No | Root domain |
| `backend_subdomain_name` | `api.staging` | No | Backend subdomain |
| `frontend_subdomain_name` | `staging` | No | Frontend subdomain |
| `github_username` | `vichannnnn` | No | GitHub username |
| `github_personal_access_token` | `<YOUR_GITHUB_PAT>` | Yes | GitHub PAT |
| `POSTGRES_PASSWORD` | `<YOUR_POSTGRES_PASSWORD>` | Yes | PostgreSQL password |
| `POSTGRES_DB` | `app` | No | PostgreSQL database name |
| `POSTGRES_USER` | `holygrailadmin` | No | PostgreSQL username |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `1440` | No | JWT expiration time |
| `ALGORITHM` | `HS256` | No | JWT algorithm |
| `SECRET_KEY` | `<YOUR_SECRET_KEY>` | Yes | Application secret key |
| `AWS_CLOUDFRONT_URL` | `https://staging.document.grail.moe` | No | CloudFront URL |
| `AWS_S3_BUCKET_NAME` | `holy-grail-staging-bucket` | No | S3 bucket name |
| `MAILTRAP_API_KEY` | `<YOUR_MAILTRAP_API_KEY>` | Yes | Mailtrap API key |
| `MAILTRAP_BEARER_TOKEN` | `<YOUR_MAILTRAP_BEARER_TOKEN>` | Yes | Mailtrap bearer token |
| `CELERY_BROKER_URL` | `redis://localhost:6379` | No | Redis broker URL |
| `CELERY_RESULT_BACKEND` | `redis://localhost:6379` | No | Redis result backend |
| `PRODUCTION` | `true` | No | Production mode flag |
| `LOGFIRE_TOKEN` | `<YOUR_LOGFIRE_TOKEN>` | Yes | Logfire token |
| `BUCKET_DOMAIN_NAME` | `staging.document.grail.moe` | No | S3 bucket custom domain |

**Note**: Copy the actual values from your local `staging.terraform.tfvars` file for the sensitive variables.

**Note**: Mark all values listed as "Sensitive: Yes" as sensitive in Terraform Cloud.

## Step 4: Get Workspace ID

1. In the workspace, click on Settings → General
2. Find the **Workspace ID** (starts with `ws-`)
3. Copy this ID - you'll need it for GitHub secrets

## Step 5: Add GitHub Secret

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add the following secret:
   - **Name**: `STAGING_WORKSPACE_ID`
   - **Value**: The workspace ID from Step 4 (e.g., `ws-xxxxxxxxx`)
5. Click "Add secret"

## Step 6: Verify Existing GitHub Secrets

Make sure these secrets already exist in your repository:
- `TFC_TOKEN` - Terraform Cloud API token
- `PROD_WORKSPACE_ID` - Production workspace ID (for main branch)
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

## Step 7: Test Deployment

1. Push changes to the `staging` branch:
   ```bash
   git push origin feat/stg-terraform:staging
   ```

2. Monitor the GitHub Actions workflow:
   - Go to Actions tab in GitHub
   - Watch the "Build and Deploy" workflow

3. Check Terraform Cloud:
   - The workspace should show a new run
   - Verify the run completes successfully

4. Verify Infrastructure:
   - ECS cluster created: `holy-grail-staging-cluster`
   - Services running: backend, frontend
   - Load balancer created with DNS name

5. Test Endpoints (after DNS propagation):
   - Frontend: https://staging.grail.moe
   - Backend API: https://api.staging.grail.moe/docs
   - Health check: https://api.staging.grail.moe/hello

## Step 8: DNS Configuration

The Terraform configuration uses Porkbun scripts to automatically create DNS records:
- `staging.grail.moe` → ALB DNS (CNAME)
- `api.staging.grail.moe` → ALB DNS (CNAME)

**Note**: DNS propagation may take 5-10 minutes. Use `nslookup` to verify:
```bash
nslookup staging.grail.moe
nslookup api.staging.grail.moe
```

## Troubleshooting

### Workflow Fails at Docker Build
- Check build context paths are correct
- Verify Dockerfile exists at specified path
- Check GitHub Actions logs for specific error

### Terraform Apply Fails
- Review Terraform Cloud run logs
- Verify all variables are set correctly
- Check AWS credentials have necessary permissions
- Ensure no resource name conflicts

### DNS Not Resolving
- Wait 5-10 minutes for propagation
- Check Porkbun API logs in Terraform output
- Verify domain ownership and API access

### ECS Tasks Not Starting
- Check CloudWatch logs: `/aws/ecs/holy-grail-staging/cluster`
- Verify Docker images pushed successfully to GHCR
- Check ECS task definition environment variables
- Ensure security groups allow necessary traffic

## Destroying Staging Environment

When not in use, destroy the staging environment to save costs:

```bash
cd terraform
terraform workspace select holy-grail-staging  # If using workspaces
terraform destroy -var-file=staging.terraform.tfvars
```

Or via Terraform Cloud:
1. Go to workspace Settings → Destruction and Deletion
2. Queue destroy plan
3. Confirm destruction

**Cost Savings**: Destroying staging when idle = $0/month vs ~$56-76/month when running

## Re-creating Staging Environment

To recreate after destruction:

```bash
git push origin staging
```

The CI/CD pipeline will automatically rebuild and deploy everything.

## Next Steps

1. Test full deployment workflow
2. Validate all application features work on staging
3. Set up monitoring and alerting (optional)
4. Document any staging-specific configurations
5. Train team on new deployment process

## Notes

- Staging environment mirrors production configuration
- Can be destroyed/recreated anytime without affecting production
- Use staging to test infrastructure changes before production
- Keep staging.terraform.tfvars in sync with any production changes