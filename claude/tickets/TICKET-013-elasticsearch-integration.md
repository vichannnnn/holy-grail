# TICKET-013: OpenSearch Integration for Full-Text Search

## Description
Implement OpenSearch integration to enable powerful full-text search across 12,000+ documents, replacing the current basic SQL ILIKE search on `document_name` only.

## Acceptance Criteria
- [ ] Set up OpenSearch Docker container for local development
- [ ] Add `opensearch-py` dependency to backend
- [ ] Create search service with full-text capabilities
- [ ] Implement advanced search features:
  - [ ] Full-text search with relevance scoring
  - [ ] Fuzzy matching for typos
  - [ ] Phrase matching
  - [ ] Boolean queries (AND, OR, NOT)
  - [ ] Field-specific searches
- [ ] Add search result highlighting
- [ ] Implement faceted search (by category, subject, year)
- [ ] Update `/notes/approved` endpoint to use OpenSearch
- [ ] Add admin reindex endpoint
- [ ] Create Terraform module for AWS OpenSearch
- [ ] Performance optimization for sub-second searches

## Implementation Plan

### Phase 1: Local Development Setup

#### 1.1 Add Dependencies
**File**: `apps/backend/pyproject.toml`
- Add `opensearch-py` package (AWS-compatible)

#### 1.2 Docker Compose
**File**: `docker/docker-compose.db.yml`
```yaml
opensearch:
  image: opensearchproject/opensearch:2.11.0
  environment:
    - discovery.type=single-node
    - DISABLE_SECURITY_PLUGIN=true
  ports:
    - "9200:9200"
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:9200"]
    interval: 30s
    timeout: 10s
    retries: 5
```

#### 1.3 Configuration
**File**: `apps/backend/app/core/config.py`
- Add OpenSearch settings (host, port, index name)
- Environment-based configuration (local vs AWS)

---

### Phase 2: Search Service Implementation

#### 2.1 Create Search Service
**New File**: `apps/backend/app/services/search.py`
- OpenSearch client initialization
- Index management (create, delete, check)
- Document indexing (single + bulk)
- Search methods with all advanced features
- Result highlighting

#### 2.2 Index Schema
```json
{
  "mappings": {
    "properties": {
      "id": {"type": "integer"},
      "document_name": {
        "type": "text",
        "analyzer": "standard",
        "fields": {"keyword": {"type": "keyword"}}
      },
      "content": {"type": "text", "analyzer": "english"},
      "category": {"type": "keyword"},
      "subject": {"type": "keyword"},
      "year": {"type": "integer"},
      "type": {"type": "keyword"},
      "uploaded_by": {"type": "keyword"},
      "uploaded_on": {"type": "date"}
    }
  }
}
```

#### 2.3 Reference Existing Prototype
- `prototype/build_index.py` (362 lines) contains indexing logic to adapt

---

### Phase 3: API Integration

#### 3.1 Update Search Endpoint
**File**: `apps/backend/app/api/endpoints/library.py`
- Modify `GET /notes/approved` to use OpenSearch when available
- Fallback to SQL search if OpenSearch unavailable

#### 3.2 New Schemas
**File**: `apps/backend/app/schemas/library.py`
- Add search response schema with highlights

#### 3.3 Admin Endpoints
**File**: `apps/backend/app/api/endpoints/admin.py`
- `POST /admin/search/reindex` - Rebuild entire index
- `GET /admin/search/status` - Index health and document count

---

### Phase 4: AWS Infrastructure (Terraform)

#### 4.1 OpenSearch Module
**New File**: `terraform/opensearch/main.tf`
```hcl
resource "aws_opensearch_domain" "main" {
  domain_name    = "${var.app_name}-search"
  engine_version = "OpenSearch_2.11"

  cluster_config {
    instance_type  = "t3.small.search"  # Free tier eligible
    instance_count = 1
  }

  ebs_options {
    ebs_enabled = true
    volume_size = 10  # Free tier: 10GB
    volume_type = "gp3"
  }

  node_to_node_encryption { enabled = true }
  encrypt_at_rest { enabled = true }
}
```

#### 4.2 Variables
**New File**: `terraform/opensearch/variable.tf`
- Domain name, instance type, EBS size

#### 4.3 Integration
**File**: `terraform/main.tf`
- Add opensearch module
- Pass endpoint to ECS task definition

#### 4.4 ECS Updates
**File**: `terraform/ecs/backend.tf`
- Add `OPENSEARCH_HOST` environment variable
- Add IAM permissions for OpenSearch access

---

### Phase 5: Data Migration & Indexing

#### 5.1 Initial Indexing Script
**New File**: `apps/backend/scripts/build_search_index.py`
- Fetch all documents from database
- Bulk index to OpenSearch
- Progress logging

#### 5.2 Incremental Indexing
- Hook into document CRUD operations in `Library` model

---

## Files to Modify/Create

| File | Action |
|------|--------|
| `apps/backend/pyproject.toml` | Modify |
| `docker/docker-compose.db.yml` | Modify |
| `apps/backend/app/core/config.py` | Modify |
| `apps/backend/app/services/search.py` | Create |
| `apps/backend/app/api/endpoints/library.py` | Modify |
| `apps/backend/app/schemas/library.py` | Modify |
| `apps/backend/app/api/endpoints/admin.py` | Modify |
| `terraform/opensearch/main.tf` | Create |
| `terraform/opensearch/variable.tf` | Create |
| `terraform/main.tf` | Modify |
| `terraform/ecs/backend.tf` | Modify |
| `apps/backend/scripts/build_search_index.py` | Create |

## Priority
High

## Status
Todo

## Cost Estimate (AWS)
- **First 12 months**: $0 (free tier: t3.small.search + 10GB EBS)
- **After free tier**: ~$18-25/month for t3.small.search

## Verification
1. Run `docker compose up` with OpenSearch locally
2. Run indexing script to populate index
3. Test search via Swagger UI (`/docs`)
4. Verify faceted search, highlighting, fuzzy matching
5. Apply Terraform to staging and test AWS integration

## Notes
- Uses `opensearch-py` for AWS compatibility
- Fallback to SQL search if OpenSearch unavailable
- Existing prototype at `prototype/build_index.py` can be referenced
- Free tier: 750 hours/month for 12 months from AWS account creation
