"""
Rate limiting utilities for API endpoints.

This module provides rate limiting functionality using SlowAPI,
with support for extracting real IP addresses behind proxies
and conditional rate limiting based on environment.
"""
from slowapi import Limiter
from starlette.requests import Request

from app.core import Environment, settings


def get_ipaddr(request: Request) -> str:
    """
    Extract client IP address from request.

    Handles X-Forwarded-For header for requests behind proxies/load balancers.
    Falls back to direct client IP if header is not present.

    Args:
        request: Starlette request object.

    Returns:
        str: Client IP address.
    """
    if "X-Forwarded-For" in request.headers:
        x_forwarded_for = request.headers["X-Forwarded-For"]
        ip_addresses = [ip.strip() for ip in x_forwarded_for.split(",")]
        return ip_addresses[-1]
    else:
        if not request.client or not request.client.host:
            return "127.0.0.1"
        return request.client.host


limiter = Limiter(key_func=get_ipaddr)


def conditional_rate_limit(*args, **kwargs):
    """
    Decorator for conditional rate limiting based on environment.

    Applies rate limiting in production environments but bypasses it
    in local development for easier testing.

    Args:
        *args: Positional arguments passed to limiter.limit().
        **kwargs: Keyword arguments passed to limiter.limit().

    Returns:
        Callable: Decorator function that either applies rate limiting
                  or returns the original function unchanged.
    """

    def decorator(func):
        if settings.environment == Environment.LOCAL:
            return func
        else:
            return limiter.limit(*args, **kwargs)(func)

    return decorator
