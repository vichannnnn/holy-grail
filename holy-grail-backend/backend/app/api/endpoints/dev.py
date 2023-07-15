import re
from typing import List, Dict, Any, Optional
from fastapi import APIRouter
from app.api.deps import SessionDeveloper
from prometheus_client import generate_latest

router = APIRouter()


def parse_metric_line(line: str) -> Optional[Dict[str, Any]]:
    """Parse a single line of a metric."""
    match = re.match(r"(\w+){?(.*)}?\s(.+)", line)
    if match is not None:
        metric_name, labels_str, value = match.groups()
        labels = dict(re.findall(r'(\w+)="(.+?)"', labels_str))
        return {"metric_name": metric_name, "labels": labels, "value": float(value)}
    return None


def metrics_to_json(metrics_str: str) -> List[Dict[str, Any]]:
    """Convert all metrics to JSON."""

    lines = metrics_str.split("\n")
    metrics = [parse_metric_line(line) for line in lines]
    metrics = [
        metric for metric in metrics if metric is not None
    ]  # Filter out any None values
    return metrics


@router.get("/metrics")
async def expose_metrics(authenticated: SessionDeveloper):  # pylint: disable=W0613
    metrics_str = generate_latest().decode("utf8")
    return metrics_to_json(metrics_str)
