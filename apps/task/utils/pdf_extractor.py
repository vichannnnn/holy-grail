import io

import httpx
from pypdf import PdfReader


def extract_text_from_pdf_bytes(pdf_bytes: bytes, max_chars: int = 50000) -> str:
    try:
        reader = PdfReader(io.BytesIO(pdf_bytes))
        text_parts = []
        total_chars = 0

        for page in reader.pages:
            page_text = page.extract_text() or ""
            text_parts.append(page_text)
            total_chars += len(page_text)

            if total_chars >= max_chars:
                break

        full_text = "\n".join(text_parts)
        return full_text[:max_chars].strip()
    except Exception:
        return ""


def extract_text_from_pdf_sync(url: str, max_chars: int = 50000, timeout: float = 30.0) -> str:
    try:
        with httpx.Client(timeout=timeout) as client:
            response = client.get(url)
            if response.status_code != 200:
                return ""

            content_type = response.headers.get("content-type", "").lower()
            if "pdf" not in content_type and not url.lower().endswith(".pdf"):
                return ""

            return extract_text_from_pdf_bytes(response.content, max_chars)
    except Exception:
        return ""
