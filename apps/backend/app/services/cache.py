import hashlib
import json
from typing import Any, Optional

import redis.asyncio as redis

from app.core.config import settings


class CacheService:
    def __init__(self) -> None:
        self._client: redis.Redis | None = None

    @property
    def is_enabled(self) -> bool:
        return settings.redis_cache_enabled

    async def _get_client(self) -> redis.Redis | None:
        if not self.is_enabled:
            return None

        if self._client is None:
            self._client = redis.from_url(
                settings.redis_url,
                encoding="utf-8",
                decode_responses=True,
            )

        return self._client

    async def get(self, key: str) -> str | None:
        client = await self._get_client()
        if not client:
            return None

        try:
            return await client.get(key)
        except Exception:
            return None

    async def set(self, key: str, value: str, ttl: int | None = None) -> bool:
        client = await self._get_client()
        if not client:
            return False

        if ttl is None:
            ttl = settings.redis_cache_ttl

        try:
            await client.set(key, value, ex=ttl)
            return True
        except Exception:
            return False

    async def delete(self, key: str) -> bool:
        client = await self._get_client()
        if not client:
            return False

        try:
            await client.delete(key)
            return True
        except Exception:
            return False

    async def delete_pattern(self, pattern: str) -> int:
        client = await self._get_client()
        if not client:
            return 0

        try:
            cursor = 0
            deleted_count = 0
            while True:
                cursor, keys = await client.scan(cursor=cursor, match=pattern, count=100)
                if keys:
                    deleted_count += await client.delete(*keys)
                if cursor == 0:
                    break
            return deleted_count
        except Exception:
            return 0

    async def close(self) -> None:
        if self._client:
            await self._client.close()
            self._client = None


def generate_search_cache_key(
    keyword: str | None = None,
    category: str | None = None,
    subject: str | None = None,
    doc_type: str | None = None,
    year: int | None = None,
    page: int = 1,
    size: int = 50,
) -> str:
    params = {
        "keyword": keyword or "",
        "category": category or "",
        "subject": subject or "",
        "doc_type": doc_type or "",
        "year": year or 0,
        "page": page,
        "size": size,
    }
    params_str = json.dumps(params, sort_keys=True)
    hash_value = hashlib.md5(params_str.encode()).hexdigest()[:16]
    return f"search:{hash_value}"


def serialize_search_results(results: dict[str, Any]) -> str:
    def default_serializer(obj: Any) -> Any:
        if hasattr(obj, "isoformat"):
            return obj.isoformat()
        if hasattr(obj, "model_dump"):
            return obj.model_dump()
        raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

    return json.dumps(results, default=default_serializer)


def deserialize_search_results(data: str) -> dict[str, Any]:
    return json.loads(data)


cache_service = CacheService()
