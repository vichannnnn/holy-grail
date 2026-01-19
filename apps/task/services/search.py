from datetime import datetime
from typing import Optional

from opensearchpy import OpenSearch

from config import settings


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
                "file_name": {"type": "keyword"},
                "extension": {"type": "keyword"},
                "view_count": {"type": "integer"},
                "approved": {"type": "boolean"},
                "category_id": {"type": "integer"},
                "subject_id": {"type": "integer"},
                "type_id": {"type": "integer"},
                "user_id": {"type": "integer"},
                "category_name": {"type": "keyword"},
                "subject_name": {"type": "keyword"},
                "doc_type_name": {"type": "keyword"},
            }
        },
    }

    def __init__(self) -> None:
        self._client: Optional[OpenSearch] = None
        self._connected = False

    @property
    def client(self) -> Optional[OpenSearch]:
        if not self._connected:
            self._connect()
        return self._client

    @property
    def index_name(self) -> str:
        return settings.opensearch_index

    @property
    def is_enabled(self) -> bool:
        return settings.opensearch_enabled

    def _connect(self) -> bool:
        if not self.is_enabled:
            return False

        try:
            auth = None
            if settings.opensearch_user and settings.opensearch_password:
                auth = (settings.opensearch_user, settings.opensearch_password)

            use_ssl = settings.opensearch_use_ssl
            if use_ssl is None:
                use_ssl = settings.opensearch_port == 443

            self._client = OpenSearch(
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

            if self._client.ping():
                self._connected = True
                return True
            else:
                self._connected = False
                return False
        except Exception:
            self._connected = False
            return False

    def is_available(self) -> bool:
        if not self.is_enabled:
            return False
        try:
            if self.client:
                return self.client.ping()
            return False
        except Exception:
            return False

    def create_index(self, delete_existing: bool = False) -> bool:
        if not self.client:
            return False

        try:
            if self.client.indices.exists(index=self.index_name):
                if delete_existing:
                    self.client.indices.delete(index=self.index_name)
                else:
                    return True

            self.client.indices.create(index=self.index_name, body=self.INDEX_SETTINGS)
            return True
        except Exception:
            return False

    def index_document(
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
        file_name: Optional[str] = None,
        extension: Optional[str] = None,
        view_count: int = 0,
        approved: bool = True,
        category_id: Optional[int] = None,
        subject_id: Optional[int] = None,
        type_id: Optional[int] = None,
        user_id: Optional[int] = None,
    ) -> bool:
        if not self.client:
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
            "file_name": file_name or "",
            "extension": extension or "",
            "view_count": view_count,
            "approved": approved,
            "category_id": category_id,
            "subject_id": subject_id,
            "type_id": type_id,
            "user_id": user_id,
            "category_name": category,
            "subject_name": subject,
            "doc_type_name": doc_type,
        }

        try:
            self.client.index(
                index=self.index_name,
                id=str(doc_id),
                body=doc_body,
                refresh=True,
            )
            return True
        except Exception:
            return False

    def delete_document(self, doc_id: int) -> bool:
        if not self.client:
            return False

        try:
            self.client.delete(
                index=self.index_name,
                id=str(doc_id),
                refresh=True,
            )
            return True
        except Exception:
            return False


search_service = SearchService()
