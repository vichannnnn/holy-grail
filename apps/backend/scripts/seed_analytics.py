"""
Script to seed initial analytics data for development.
"""
import asyncio
import datetime
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from app.db.database import async_session
from app.models.analytics import Analytics


async def seed_analytics():
    """Create initial analytics record with mock data."""
    async with async_session() as session:
        try:
            # Check if analytics already exists
            existing = await Analytics.get_latest_analytics(session)
            print("Analytics data already exists")
            return
        except Exception:
            # No analytics data, create mock record
            pass

        # Create mock analytics record
        analytics = Analytics(file_download_count=1234, unique_active_users=567, user_count=89)

        session.add(analytics)
        await session.commit()
        print("Successfully created mock analytics data")


if __name__ == "__main__":
    asyncio.run(seed_analytics())
