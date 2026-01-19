# TICKET-001: Fix OpenSearch Connectivity and Add Separate Search Endpoint

## Description

Fix OpenSearch connectivity issues in AWS ECS by passing missing credentials and optionally adding VPC integration. Also create a separate `/search` endpoint for testing OpenSearch independently from the main `/notes/approved` endpoint.

### Root Cause
The `OPENSEARCH_USER` and `OPENSEARCH_PASSWORD` environment variables are defined in Terraform Cloud but are **not passed through** to the ECS task definition. The variable flow is broken:
- `terraform/variable.tf` → has credentials
- `terraform/main.tf` → passes to opensearch module ✅, does NOT pass to ecs module ❌
- `terraform/ecs/variable.tf` → missing these variables
- `terraform/ecs/backend.tf` → missing from container env vars

## Acceptance Criteria

### Part A: Pass Missing Credentials to ECS (Required)
- [x] Add `OPENSEARCH_USER`, `OPENSEARCH_PASSWORD`, `OPENSEARCH_PORT` variables to `terraform/ecs/variable.tf`
- [x] Pass credentials from `terraform/main.tf` to ECS module
- [x] Add env vars to backend container in `terraform/ecs/backend.tf`
- [x] Add env vars to celery container in `terraform/ecs/backend.tf`
- [x] Add env vars to task-api container in `terraform/ecs/backend.tf`

### Part B: Add OpenSearch to VPC (Optional but Recommended)
- [x] Add VPC variables (`vpc_id`, `subnet_ids`, `ecs_security_group_id`) to `terraform/opensearch/variable.tf`
- [x] Add security group resource to `terraform/opensearch/main.tf`
- [x] Add `vpc_options` block to OpenSearch domain
- [x] Pass VPC info from `terraform/main.tf` to opensearch module
- [x] Create `terraform/ecs/outputs.tf` to export ECS security group ID

### Part C: New Search Endpoints (Backend Code)
- [x] Revert `/notes/approved` endpoint to PostgreSQL only (remove OpenSearch logic)
- [x] Create new `/notes/search` endpoint that exclusively uses OpenSearch
- [x] Test that existing `/admin/search/reindex` endpoint works for mass reindexing

## Priority
High

## Status
Done

## Technical Details

### Files to Modify

| File | Change |
|------|--------|
| `terraform/ecs/variable.tf` | Add OpenSearch credential variables |
| `terraform/main.tf` | Pass credentials to ECS, pass VPC to opensearch |
| `terraform/ecs/backend.tf` | Add env vars to 3 containers |
| `terraform/opensearch/variable.tf` | Add VPC variables |
| `terraform/opensearch/main.tf` | Add security group and vpc_options |
| `terraform/ecs/outputs.tf` | Export ECS security group ID (new file) |
| `apps/backend/app/api/endpoints/library.py` | Remove OpenSearch from `/approved`, add `/search` |

### Verification Steps

1. Run `terraform plan` - should show task definition updates
2. Run `terraform apply` - apply infrastructure changes
3. Force ECS redeploy to pick up new env vars
4. Test `GET /admin/search/status` - should return `{"available": true, ...}`
5. Test `GET /notes/search?keyword=test` - should use OpenSearch
6. Test `GET /notes/approved?keyword=test` - should use PostgreSQL only
7. Test `POST /admin/search/reindex?recreate_index=true` - should queue indexing tasks

## AWS Architecture for OpenSearch Indexing

### Search Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                    Users                                        │
└─────────────────────────────────────┬───────────────────────────────────────────┘
                                      │ HTTPS (grail.moe)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              AWS Cloud (ap-southeast-1)                         │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                         ECS Fargate Cluster                             │   │
│  │                                                                         │   │
│  │  ┌──────────────┐                                                       │   │
│  │  │   Frontend   │  Server Actions (BFF)                                 │   │
│  │  │   (Next.js)  │  • fetchApprovedNotes() → /notes/approved             │   │
│  │  │              │  • searchNotes() → /notes/search                      │   │
│  │  └──────┬───────┘                                                       │   │
│  │         │                                                               │   │
│  │         │ HTTP (internal)                                               │   │
│  │         ▼                                                               │   │
│  │  ┌──────────────┐       ┌──────────────┐       ┌──────────────┐         │   │
│  │  │   Backend    │──────▶│   Task API   │──────▶│    Celery    │         │   │
│  │  │   (FastAPI)  │ HTTP  │   (FastAPI)  │ Redis │    Worker    │         │   │
│  │  └──────┬───────┘       └──────────────┘       └──────┬───────┘         │   │
│  │         │                                             │                 │   │
│  └─────────┼─────────────────────────────────────────────┼─────────────────┘   │
│            │                                             │                     │
│      ┌─────┴─────┐                              ┌────────┴────────┐            │
│      ▼           ▼                              ▼                 ▼            │
│  ┌────────┐  ┌────────────┐              ┌────────────┐    ┌────────────┐      │
│  │  RDS   │  │ OpenSearch │◀─────────────│     S3     │    │   Redis    │      │
│  │Postgres│  │   Domain   │  fetch PDF   │   Bucket   │    │(ElastiCache│      │
│  └────────┘  └────────────┘              └────────────┘    └────────────┘      │
│       │            │                           │                               │
│       │            │                           │                               │
│  ┌────┴────┐  ┌────┴────┐               ┌──────┴──────┐                        │
│  │ Library │  │ Search  │               │  CloudFront │                        │
│  │ Listing │  │ Results │               │(doc.grail.moe)                       │
│  └─────────┘  └─────────┘               └─────────────┘                        │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Backend API Endpoints

| Endpoint | Data Source | Use Case |
|----------|-------------|----------|
| `GET /notes/approved` | PostgreSQL | Library browsing with filters |
| `GET /notes/search` | OpenSearch | Full-text search with keyword |
| `GET /admin/search/status` | OpenSearch | Check index health/count |
| `POST /admin/search/reindex` | Celery → OpenSearch | Bulk reindex all documents |

### Document Lifecycle Hooks

| Event | Endpoint | Action |
|-------|----------|--------|
| Note Approved | `PUT /admin/approve/{id}` | Queues `index_document` Celery task |
| Note Deleted | `DELETE /note/{id}` | Queues `delete_document` Celery task |
| Manual Reindex | `POST /admin/search/reindex` | Queues bulk `index_document` tasks |

### Celery Tasks

| Task | File | Description |
|------|------|-------------|
| `index_document` | `apps/task/tasks/index_document.py` | Downloads PDF from S3, extracts text, indexes to OpenSearch |
| `delete_document` | `apps/task/tasks/delete_document.py` | Removes document from OpenSearch index |

### Key Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENSEARCH_HOST` | OpenSearch domain endpoint |
| `OPENSEARCH_USER` | Master username for auth |
| `OPENSEARCH_PASSWORD` | Master password for auth |
| `OPENSEARCH_PORT` | Port (443 for AWS) |
| `OPENSEARCH_USE_SSL` | Enable SSL (true for AWS) |

## Utility Scripts

| Script | Purpose |
|--------|---------|
| `scripts/trigger_reindex.py` | Trigger reindex via API, check status, test search |
| `scripts/check_opensearch.py` | Direct OpenSearch access for debugging (requires credentials) |

### Usage Examples

```bash
python scripts/trigger_reindex.py --status

python scripts/trigger_reindex.py

python scripts/trigger_reindex.py --search "integration"
```

## Notes

- VPC change may recreate OpenSearch domain, which deletes the search index
- The existing index can be recreated using `/admin/search/reindex`
- No extra AWS costs for VPC deployment
- Current infrastructure: VPC with 2 subnets in 2 AZs (ap-southeast-1a, ap-southeast-1b)

## Related Plan File
See `/Users/hima/.claude/plans/tingly-wobbling-zebra.md` for detailed implementation steps.
