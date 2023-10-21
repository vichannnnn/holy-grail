import os

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    RunReportRequest,
)

from app.db.database import SessionLocal
from app.models.auth import Account
from app.utils.worker import celery_app


def extract_metrics(response):
    event_name_position = next(
        (
            i
            for i, header in enumerate(response.dimension_headers)
            if header.name == "eventName"
        ),
        None,
    )

    active_users_position = next(
        (
            i
            for i, header in enumerate(response.metric_headers)
            if header.name == "activeUsers"
        ),
        None,
    )
    event_count_position = next(
        (
            i
            for i, header in enumerate(response.metric_headers)
            if header.name == "eventCount"
        ),
        None,
    )

    file_download_event_count, page_view_active_user = None, None

    for row in response.rows:
        if row.dimension_values[event_name_position].value == "file_download":
            file_download_event_count = row.metric_values[event_count_position].value
        elif row.dimension_values[event_name_position].value == "page_view":
            page_view_active_user = row.metric_values[active_users_position].value

    return file_download_event_count, page_view_active_user


@celery_app.task(name="fetch_google_analytics")
def fetch_google_analytics():
    starting_date = "2023-06-14"
    ending_date = "today"
    client = BetaAnalyticsDataClient()

    request_api = RunReportRequest(
        property=f"properties/{os.environ['GOOGLE_APPLICATION_PROPERTY_ID']}",
        dimensions=[Dimension(name="eventName")],
        metrics=[Metric(name="activeUsers"), Metric(name="eventCount")],
        date_ranges=[DateRange(start_date=starting_date, end_date=ending_date)],
    )
    resp = client.run_report(request=request_api)

    session = SessionLocal()
    user_count = Account.get_users_count(session=session)
    session.close()

    file_download_event_count, page_view_active_user = extract_metrics(resp)

    data = {
        "file_download_count": file_download_event_count,
        "unique_active_users": page_view_active_user,
        "user-count": user_count,
    }

    return data
