from datetime import datetime
from typing import Any, Optional

from opensearchpy import AsyncOpenSearch
from pydantic import BaseModel

from app.core.config import settings


class SearchResult(BaseModel):
    id: int
    document_name: str
    category: str
    subject: str
    doc_type: str
    year: Optional[int]
    uploaded_by: str
    uploaded_on: datetime
    score: float
    highlights: Optional[dict[str, list[str]]] = None


class SearchResponse(BaseModel):
    items: list[SearchResult]
    total: int
    page: int
    pages: int
    size: int
    facets: Optional[dict[str, list[dict[str, Any]]]] = None


class SearchService:
    INDEX_SETTINGS = {
        "settings": {
            "number_of_shards": 1,
            "number_of_replicas": 0,
            "analysis": {
                "analyzer": {
                    "document_analyzer": {
                        "type": "standard",
                        "stopwords": "_english_",
                    }
                }
            },
        },
        "mappings": {
            "properties": {
                "id": {"type": "integer"},
                "document_name": {
                    "type": "text",
                    "analyzer": "document_analyzer",
                    "fields": {"keyword": {"type": "keyword"}},
                },
                "category": {"type": "keyword"},
                "subject": {"type": "keyword"},
                "doc_type": {"type": "keyword"},
                "year": {"type": "integer"},
                "uploaded_by": {"type": "keyword"},
                "uploaded_on": {"type": "date"},
                "content": {"type": "text", "analyzer": "document_analyzer"},
                "search_text": {"type": "text", "analyzer": "document_analyzer"},
            }
        },
    }

    def __init__(self) -> None:
        self._client: Optional[AsyncOpenSearch] = None
        self._connected = False

    @property
    def index_name(self) -> str:
        return settings.opensearch_index

    @property
    def is_enabled(self) -> bool:
        return settings.opensearch_enabled

    async def _get_client(self) -> Optional[AsyncOpenSearch]:
        if not self.is_enabled:
            return None

        if self._client is None:
            auth = None
            if settings.opensearch_user and settings.opensearch_password:
                auth = (settings.opensearch_user, settings.opensearch_password)

            use_ssl = settings.opensearch_use_ssl
            if use_ssl is None:
                use_ssl = settings.opensearch_port == 443

            self._client = AsyncOpenSearch(
                hosts=[
                    {
                        "host": settings.opensearch_host,
                        "port": settings.opensearch_port,
                    }
                ],
                http_auth=auth,
                use_ssl=use_ssl,
                verify_certs=False,
                ssl_show_warn=False,
                timeout=30,
            )

        return self._client

    async def is_available(self) -> bool:
        if not self.is_enabled:
            return False
        try:
            client = await self._get_client()
            if client:
                return await client.ping()
            return False
        except Exception:
            return False

    async def create_index(self, delete_existing: bool = False) -> bool:
        client = await self._get_client()
        if not client:
            return False

        try:
            if await client.indices.exists(index=self.index_name):
                if delete_existing:
                    await client.indices.delete(index=self.index_name)
                else:
                    return True

            await client.indices.create(index=self.index_name, body=self.INDEX_SETTINGS)
            return True
        except Exception:
            return False

    async def delete_index(self) -> bool:
        client = await self._get_client()
        if not client:
            return False

        try:
            if await client.indices.exists(index=self.index_name):
                await client.indices.delete(index=self.index_name)
            return True
        except Exception:
            return False

    async def index_document(
        self,
        doc_id: int,
        document_name: str,
        category: str,
        subject: str,
        doc_type: str,
        year: Optional[int],
        uploaded_by: str,
        uploaded_on: datetime,
        content: Optional[str] = None,
    ) -> bool:
        client = await self._get_client()
        if not client:
            return False

        search_text = f"{document_name} {subject} {category}"
        if content:
            search_text += f" {content[:1000]}"

        doc_body = {
            "id": doc_id,
            "document_name": document_name,
            "category": category,
            "subject": subject,
            "doc_type": doc_type,
            "year": year,
            "uploaded_by": uploaded_by,
            "uploaded_on": uploaded_on.isoformat(),
            "content": content or "",
            "search_text": search_text,
        }

        try:
            await client.index(
                index=self.index_name,
                id=str(doc_id),
                body=doc_body,
                refresh=True,
            )
            return True
        except Exception:
            return False

    async def bulk_index_documents(self, documents: list[dict[str, Any]]) -> tuple[int, int]:
        from opensearchpy.helpers import async_bulk

        client = await self._get_client()
        if not client:
            return 0, len(documents)

        actions = []
        for doc in documents:
            search_text = f"{doc['document_name']} {doc['subject']} {doc['category']}"
            content = doc.get("content", "")
            if content:
                search_text += f" {content[:1000]}"

            uploaded_on = doc["uploaded_on"]
            if isinstance(uploaded_on, datetime):
                uploaded_on = uploaded_on.isoformat()

            actions.append(
                {
                    "_index": self.index_name,
                    "_id": str(doc["id"]),
                    "_source": {
                        "id": doc["id"],
                        "document_name": doc["document_name"],
                        "category": doc["category"],
                        "subject": doc["subject"],
                        "doc_type": doc["doc_type"],
                        "year": doc.get("year"),
                        "uploaded_by": doc["uploaded_by"],
                        "uploaded_on": uploaded_on,
                        "content": content,
                        "search_text": search_text,
                    },
                }
            )

        try:
            success, failed = await async_bulk(
                client,
                actions,
                chunk_size=100,
                request_timeout=60,
            )
            return success, len(failed) if isinstance(failed, list) else 0
        except Exception:
            return 0, len(documents)

    async def delete_document(self, doc_id: int) -> bool:
        client = await self._get_client()
        if not client:
            return False

        try:
            await client.delete(
                index=self.index_name,
                id=str(doc_id),
                refresh=True,
            )
            return True
        except Exception:
            return False

    async def search(
        self,
        keyword: Optional[str] = None,
        category: Optional[str] = None,
        subject: Optional[str] = None,
        doc_type: Optional[str] = None,
        year: Optional[int] = None,
        page: int = 1,
        size: int = 50,
        fuzzy: bool = True,
        include_facets: bool = False,
    ) -> Optional[SearchResponse]:
        client = await self._get_client()
        if not client:
            return None

        must_clauses: list[dict[str, Any]] = []
        filter_clauses: list[dict[str, Any]] = []

        if keyword:
            if fuzzy:
                must_clauses.append(
                    {
                        "multi_match": {
                            "query": keyword,
                            "fields": [
                                "document_name^3",
                                "search_text^2",
                                "content",
                            ],
                            "fuzziness": "AUTO",
                            "prefix_length": 2,
                        }
                    }
                )
            else:
                must_clauses.append(
                    {
                        "multi_match": {
                            "query": keyword,
                            "fields": [
                                "document_name^3",
                                "search_text^2",
                                "content",
                            ],
                            "type": "phrase",
                        }
                    }
                )

        if category:
            filter_clauses.append({"term": {"category": category}})
        if subject:
            filter_clauses.append({"term": {"subject": subject}})
        if doc_type:
            filter_clauses.append({"term": {"doc_type": doc_type}})
        if year:
            filter_clauses.append({"term": {"year": year}})

        query: dict[str, Any] = {"bool": {}}
        if must_clauses:
            query["bool"]["must"] = must_clauses
        if filter_clauses:
            query["bool"]["filter"] = filter_clauses

        if not must_clauses and not filter_clauses:
            query = {"match_all": {}}

        body: dict[str, Any] = {
            "query": query,
            "from": (page - 1) * size,
            "size": size,
            "sort": [
                {"_score": {"order": "desc"}},
                {"uploaded_on": {"order": "desc"}},
            ],
            "highlight": {
                "fields": {
                    "document_name": {"number_of_fragments": 0},
                    "content": {"fragment_size": 150, "number_of_fragments": 3},
                },
                "pre_tags": ["<mark>"],
                "post_tags": ["</mark>"],
            },
        }

        if include_facets:
            body["aggs"] = {
                "categories": {"terms": {"field": "category", "size": 20}},
                "subjects": {"terms": {"field": "subject", "size": 50}},
                "doc_types": {"terms": {"field": "doc_type", "size": 20}},
                "years": {"terms": {"field": "year", "size": 30}},
            }

        try:
            result = await client.search(index=self.index_name, body=body)

            total = result["hits"]["total"]["value"]
            pages = (total + size - 1) // size if size > 0 else 0

            items = []
            for hit in result["hits"]["hits"]:
                source = hit["_source"]
                uploaded_on = source.get("uploaded_on")
                if isinstance(uploaded_on, str):
                    uploaded_on = datetime.fromisoformat(uploaded_on.replace("Z", "+00:00"))

                highlights = None
                if "highlight" in hit:
                    highlights = hit["highlight"]

                items.append(
                    SearchResult(
                        id=source["id"],
                        document_name=source["document_name"],
                        category=source["category"],
                        subject=source["subject"],
                        doc_type=source["doc_type"],
                        year=source.get("year"),
                        uploaded_by=source["uploaded_by"],
                        uploaded_on=uploaded_on,
                        score=hit["_score"],
                        highlights=highlights,
                    )
                )

            facets = None
            if include_facets and "aggregations" in result:
                facets = {}
                for agg_name, agg_data in result["aggregations"].items():
                    facets[agg_name] = [
                        {"key": bucket["key"], "count": bucket["doc_count"]}
                        for bucket in agg_data["buckets"]
                    ]

            return SearchResponse(
                items=items,
                total=total,
                page=page,
                pages=pages,
                size=size,
                facets=facets,
            )
        except Exception:
            return None

    async def get_index_stats(self) -> Optional[dict[str, Any]]:
        client = await self._get_client()
        if not client:
            return None

        try:
            if not await client.indices.exists(index=self.index_name):
                return {"exists": False, "doc_count": 0}

            stats = await client.indices.stats(index=self.index_name)
            doc_count = stats["indices"][self.index_name]["primaries"]["docs"]["count"]
            size_bytes = stats["indices"][self.index_name]["primaries"]["store"]["size_in_bytes"]

            return {
                "exists": True,
                "doc_count": doc_count,
                "size_bytes": size_bytes,
                "size_mb": round(size_bytes / (1024 * 1024), 2),
            }
        except Exception:
            return None

    async def close(self) -> None:
        if self._client:
            await self._client.close()
            self._client = None


search_service = SearchService()
