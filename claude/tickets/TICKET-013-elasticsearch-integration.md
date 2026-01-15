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
