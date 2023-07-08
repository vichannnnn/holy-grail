from slowapi import Limiter
from slowapi.util import get_remote_address
import os

limiter = Limiter(key_func=get_remote_address)


def conditional_rate_limit(*args, **kwargs):
    def decorator(func):
        if os.getenv("TESTING"):
            return func
        else:
            return limiter.limit(*args, **kwargs)(func)

    return decorator
