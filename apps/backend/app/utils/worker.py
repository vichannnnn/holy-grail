"""
Celery task queue configuration and local development mock.

This module configures Celery for production environments and provides
a mock implementation for local development that executes tasks
synchronously.
"""
import logging
from typing import Any, Callable

from app.core import Environment, settings

logger = logging.getLogger(__name__)

# Only initialize Celery for non-local environments
if settings.environment != Environment.LOCAL and settings.email_enabled:
    from celery import Celery  # type: ignore

    celery_app = Celery(
        "tasks",
        include=[
            # "app.tasks.fetch_google_analytics",
            "app.tasks.health_check",
            "app.tasks.verify_email",
            "app.tasks.reset_password_email",
            "app.tasks.new_password_email",
            "app.tasks.update_scoreboard_users",
        ],
    )
    celery_app.conf.timezone = "Asia/Singapore"
    celery_app.conf.broker_url = settings.celery_broker_url
    celery_app.conf.result_backend = settings.celery_result_backend

    celery_app.conf.beat_schedule = {
        "ping": {
            "task": "ping",
            "schedule": 3600.0,
        },
        # "fetch_google_analytics": {
        #     "task": "fetch_google_analytics",
        #     "schedule": 86400.0,
        # },
        "update_scoreboard_users": {
            "task": "update_scoreboard_users",
            "schedule": 43200.0,
            "options": {"countdown": 0},
        },
    }
else:
    # Mock Celery app for local development
    class MockTask:
        """
        Mock Celery task for local development.

        Executes tasks synchronously and logs what would be sent
        to the task queue in production.
        """

        def __init__(self, func: Callable) -> None:
            self.func = func
            self.__name__ = func.__name__

        def delay(self, *args: Any, **kwargs: Any) -> Any:
            """
            Mock implementation of Celery's delay method.

            Logs the task call and executes synchronously.

            Args:
                *args: Positional arguments for the task.
                **kwargs: Keyword arguments for the task.

            Returns:
                Any: Result of synchronous task execution.
            """
            logger.info(
                f"📧 [LOCAL MODE] Would send task '{self.__name__}' with args={args}, kwargs={kwargs}"
            )
            # Execute synchronously in local mode
            return self.func(*args, **kwargs)

        def apply_async(self, *args: Any, **kwargs: Any) -> Any:
            """
            Mock implementation of Celery's apply_async method.

            Logs the task call and executes synchronously.

            Args:
                *args: Positional arguments for the task.
                **kwargs: Keyword arguments for the task.

            Returns:
                Any: Result of synchronous task execution.
            """
            logger.info(
                f"📧 [LOCAL MODE] Would send async task '{self.__name__}' with args={args}, kwargs={kwargs}"
            )
            return self.func(*args, **kwargs)

        def __call__(self, *args: Any, **kwargs: Any) -> Any:
            return self.func(*args, **kwargs)

    class MockCelery:
        """
        Mock Celery application for local development.

        Provides a compatible interface with the real Celery app but
        executes all tasks synchronously without a message broker.
        """

        def __init__(self) -> None:
            logger.info("📧 Celery running in LOCAL mode - tasks will execute synchronously")
            self.conf = type("conf", (), {})()

        def task(self, *args: Any, **kwargs: Any) -> Callable:
            """
            Decorator to register a function as a mock Celery task.

            Args:
                *args: Decorator arguments (ignored).
                **kwargs: Decorator keyword arguments (ignored).

            Returns:
                Callable: Decorator that wraps function in MockTask.
            """

            def decorator(func: Callable) -> MockTask:
                return MockTask(func)

            return decorator

    celery_app = MockCelery()  # type: ignore
