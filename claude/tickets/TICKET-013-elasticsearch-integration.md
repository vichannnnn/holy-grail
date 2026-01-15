# TICKET-013: OpenSearch Integration for Full-Text Search

## Description
Implement OpenSearch integration to enable powerful full-text search across 14,000+ documents, replacing the current basic SQL ILIKE search on `document_name` only.

## Acceptance Criteria
- [x] Set up OpenSearch Docker container for local development
- [x] Add `opensearch-py` dependency to backend
- [x] Create search service with full-text capabilities
- [x] Implement advanced search features:
  - [x] Full-text search with relevance scoring
  - [x] Fuzzy matching for typos
  - [x] Phrase matching
  - [x] Field-specific searches (document_name, content, subject, category)
- [x] Implement faceted search (by category, subject, year)
- [x] Update `/notes/approved` endpoint to use OpenSearch
- [x] Add admin reindex endpoint (`POST /admin/search/reindex`)
- [x] Add admin status endpoint (`GET /admin/search/status`)
- [x] Create Terraform module for AWS OpenSearch
- [x] PDF content extraction for full-text search
- [x] Async document indexing via Celery tasks
- [x] Production deployment configuration (ECS task definition)
- [x] Auto-delete from index when documents are removed

## Priority
High

## Status
Done

---

## Implementation Summary

### Architecture
```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│    Backend      │────▶│   Task Service   │────▶│   OpenSearch    │
│   (FastAPI)     │     │    (Celery)      │     │   (Docker/AWS)  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
       │                        │
       │                        ▼
       │                ┌──────────────────┐
       │                │   CloudFront     │
       │                │   (PDF files)    │
       │                └──────────────────┘
       ▼
┌─────────────────┐
│   PostgreSQL    │
│   (metadata)    │
└─────────────────┘
```

### Key Features
1. **Full-text search** on document name + PDF content
2. **Fuzzy matching** for typo tolerance (e.g., "chemestry" → "chemistry")
3. **Relevance scoring** with field boosting (document_name^3, search_text^2, content)
4. **Async indexing** via Celery with automatic retries
5. **PDF extraction** using pypdf library
6. **Graceful fallback** to SQL ILIKE when OpenSearch unavailable

### Files Modified/Created

| File | Action | Description |
|------|--------|-------------|
| `apps/backend/pyproject.toml` | Modified | Added `opensearch-py`, `pypdf` |
| `docker/docker-compose.db.yml` | Modified | Added OpenSearch container |
| `apps/backend/app/core/config.py` | Modified | OpenSearch settings |
| `apps/backend/app/services/search.py` | Created | Search service |
| `apps/backend/app/services/task_client.py` | Created | Task service HTTP client |
| `apps/backend/app/utils/pdf_extractor.py` | Created | PDF text extraction |
| `apps/backend/app/api/endpoints/library.py` | Modified | Integrated search |
| `apps/backend/app/api/endpoints/admin.py` | Modified | Reindex endpoint |
| `apps/backend/scripts/build_search_index.py` | Created | Bulk indexing script |
| `apps/task/tasks/index_document.py` | Created | Celery index task |
| `apps/task/tasks/delete_document.py` | Created | Celery delete task |
| `apps/task/services/search.py` | Created | Task search service |
| `apps/task/utils/pdf_extractor.py` | Created | Task PDF extractor |
| `apps/task/config.py` | Modified | OpenSearch config |
| `apps/task/api.py` | Modified | Index/delete endpoints |
| `apps/task/worker.py` | Modified | Task includes |
| `terraform/opensearch/main.tf` | Created | AWS OpenSearch module |
| `terraform/opensearch/variable.tf` | Created | Module variables |
| `terraform/ecs/backend.tf` | Modified | Added task-api container, OpenSearch env vars |

---

## Production Deployment

### ECS Configuration
The ECS task definition now includes 4 containers:

| Container | Port | Purpose |
|-----------|------|---------|
| `backend` | 8000 | FastAPI API server |
| `celery` | - | Celery worker with beat scheduler |
| `task-api` | 8001 | HTTP API for triggering Celery tasks |
| `redis` | 6379 | Message broker |

### Environment Variables Added
- `OPENSEARCH_HOST` - OpenSearch endpoint (backend, celery, task-api)
- `OPENSEARCH_ENABLED` - Toggle OpenSearch on/off (backend, celery, task-api)
- `TASK_API_URL` - Task API endpoint for backend (`http://localhost:8001`)
- `AWS_CLOUDFRONT_URL` - CloudFront URL for PDF downloads (task-api)

### Deployment Steps

1. **Push code** - CI/CD deploys new containers automatically
2. **Enable OpenSearch** - Set `opensearch_enabled = true` in Terraform Cloud
3. **Wait for provisioning** - AWS OpenSearch domain takes ~15 minutes
4. **Run initial backfill** - Execute ECS task to index existing documents:

```bash
aws ecs run-task \
  --cluster holy-grail-cluster \
  --task-definition backend-task \
  --launch-type FARGATE \
  --network-configuration "..." \
  --overrides '{
    "containerOverrides": [{
      "name": "backend",
      "command": ["uv", "run", "python", "scripts/build_search_index.py", "--recreate"]
    }]
  }'
```

### Document Flow (Production)
```
Admin approves document
  └─▶ Backend POST /admin/approve/{id}
      └─▶ task_client.trigger_index_document()
          └─▶ HTTP POST to localhost:8001/tasks/index-document
              └─▶ Task API queues Celery task
                  └─▶ Celery worker executes index_document_task
                      ├─▶ Downloads PDF from CloudFront
                      ├─▶ Extracts text with pypdf
                      └─▶ Indexes to OpenSearch
```

---

## Usage

### Local Development

1. Start OpenSearch:
```bash
docker compose -f docker/docker-compose.db.yml up -d opensearch
```

2. Build search index:
```bash
cd apps/backend
export AWS_CLOUDFRONT_URL=https://document.grail.moe
uv run python scripts/build_search_index.py --recreate
```

3. Test search:
```bash
curl "http://localhost:8000/notes/approved?keyword=chemistry&size=10"
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/notes/approved` | GET | Search with `keyword` param uses OpenSearch |
| `/admin/search/status` | GET | Index health and document count |
| `/admin/search/reindex` | POST | Trigger full reindex |

### Indexing Script Options

```bash
uv run python scripts/build_search_index.py [OPTIONS]

Options:
  --recreate         Delete and recreate index before indexing
  --limit N          Limit to first N documents (for testing)
  --no-extract       Skip PDF content extraction
  --concurrency N    Concurrent PDF downloads (default: 10)
```

---

## Cost Estimate (AWS)
- **First 12 months**: $0 (free tier: t3.small.search + 10GB EBS)
- **After free tier**: ~$18-25/month for t3.small.search
- **Storage**: Included in free tier, then ~$0.10/GB/month

## Notes
- Index name: `holy_grail_documents`
- PDF extraction limited to 50,000 characters per document
- Celery tasks auto-retry 3 times with exponential backoff
- Falls back to SQL ILIKE search when OpenSearch unavailable
- ECS memory increased from 1024MB to 1536MB for 4 containers
- Task API uses same Docker image as Celery worker
