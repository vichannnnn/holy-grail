# TICKET-013: Complete Elasticsearch Integration for Full-Text Search

## Description
Implement Elasticsearch integration to enable powerful full-text search within document content. This will replace the simple search with a scalable solution that can handle complex queries, relevance scoring, and filtering across 12,000+ documents.

## Acceptance Criteria
- [ ] Set up Elasticsearch Docker container
- [ ] Complete `build_index.py` implementation
- [ ] Index all document metadata and extracted text
- [ ] Implement advanced search features:
  - [ ] Full-text search with relevance scoring
  - [ ] Fuzzy matching for typos
  - [ ] Phrase matching
  - [ ] Boolean queries (AND, OR, NOT)
  - [ ] Field-specific searches
- [ ] Update `ai_summarizer.py` to use Elasticsearch
- [ ] Add search result highlighting
- [ ] Implement faceted search (by category, subject, year)
- [ ] Performance optimization for sub-second searches

## Implementation Details

### Docker Setup:
```bash
docker run -d --name elasticsearch \
  -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  elasticsearch:8.11.0
```

### Index Structure:
```json
{
  "mappings": {
    "properties": {
      "id": {"type": "integer"},
      "document_name": {"type": "text", "analyzer": "standard"},
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

### Search Features:
- Multi-field search with boosting
- Aggregations for filtering
- Highlighting for context display
- Pagination for large result sets

## Priority
High

## Status
Todo

## Notes
- Docker is now working on the system
- Consider using Elasticsearch's built-in analyzers for better search
- May need to tune relevance scoring for educational content
- Implement bulk indexing for efficiency