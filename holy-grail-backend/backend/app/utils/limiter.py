from slowapi import Limiter
from starlette.requests import Request

from app.utils.flags import TESTING_FLAG


def get_ipaddr(request: Request) -> str:
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
    def decorator(func):
        if TESTING_FLAG:
            return func
        else:
            return limiter.limit(*args, **kwargs)(func)

    return decorator
