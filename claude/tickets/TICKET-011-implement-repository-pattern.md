# TICKET-011: Implement Repository Pattern

## Description
Implement the repository pattern to separate data access logic from business logic and models. This is the fifth phase of the backend refactoring plan (PLAN-001).

## Acceptance Criteria
- [ ] `/app/repositories` directory created
- [ ] Repository class created for each domain
- [ ] All database queries moved from models to repositories
- [ ] Models contain only data structure definitions
- [ ] Services use repositories for data access
- [ ] Unit of Work pattern implemented for transactions
- [ ] All existing functionality preserved
- [ ] Performance not degraded

## Priority
Medium

## Status
Todo

## Implementation Steps
1. [ ] Create `/app/repositories` directory with `__init__.py`
2. [ ] Create base repository class
   - [ ] Define common CRUD operations
   - [ ] Implement query builder patterns
   - [ ] Add transaction support
3. [ ] Create `AccountRepository` in `/app/repositories/auth.py`
   - [ ] Move data access methods from Account model
   - [ ] Implement user queries (by username, by email, etc.)
4. [ ] Create `LibraryRepository` in `/app/repositories/library.py`
   - [ ] Move complex queries from Library model
   - [ ] Implement pagination queries
   - [ ] Add filtering and search queries
5. [ ] Create `AnalyticsRepository` in `/app/repositories/analytics.py`
6. [ ] Create `ScoreboardRepository` in `/app/repositories/scoreboard.py`
7. [ ] Implement Unit of Work pattern
   - [ ] Create UnitOfWork class for transaction management
   - [ ] Ensure proper rollback on errors
8. [ ] Update services to use repositories
9. [ ] Remove data access logic from models
10. [ ] Update tests to use repositories

## Example Implementation

### Base Repository
```python
# /app/repositories/base.py
from typing import TypeVar, Generic, Type, Optional, List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from app.db.base_class import Base

ModelType = TypeVar("ModelType", bound=Base)

class BaseRepository(Generic[ModelType]):
    """Base repository providing common database operations."""
    
    def __init__(self, model: Type[ModelType], session: AsyncSession):
        self.model = model
        self.session = session
        
    async def get_by_id(self, id: int) -> Optional[ModelType]:
        """Get a single record by ID."""
        stmt = select(self.model).where(self.model.id == id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
        
    async def get_all(self, **filters) -> List[ModelType]:
        """Get all records matching the filters."""
        stmt = select(self.model)
        for key, value in filters.items():
            stmt = stmt.where(getattr(self.model, key) == value)
        result = await self.session.execute(stmt)
        return result.scalars().all()
        
    async def create(self, **data) -> ModelType:
        """Create a new record."""
        instance = self.model(**data)
        self.session.add(instance)
        await self.session.commit()
        await self.session.refresh(instance)
        return instance
        
    async def update(self, id: int, **data) -> Optional[ModelType]:
        """Update a record by ID."""
        stmt = update(self.model).where(self.model.id == id).values(**data).returning(self.model)
        result = await self.session.execute(stmt)
        await self.session.commit()
        return result.scalar_one_or_none()
        
    async def delete(self, id: int) -> bool:
        """Delete a record by ID."""
        stmt = delete(self.model).where(self.model.id == id)
        result = await self.session.execute(stmt)
        await self.session.commit()
        return result.rowcount > 0
```

### Specific Repository
```python
# /app/repositories/auth.py
from typing import Optional
from sqlalchemy import select, func
from app.repositories.base import BaseRepository
from app.models.auth import Account

class AccountRepository(BaseRepository[Account]):
    """Repository for account data access."""
    
    def __init__(self, session: AsyncSession):
        super().__init__(Account, session)
        
    async def get_by_username(self, username: str) -> Optional[Account]:
        """Get account by username (case-insensitive)."""
        stmt = select(Account).where(
            func.upper(Account.username) == username.upper()
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
        
    async def get_by_email(self, email: str) -> Optional[Account]:
        """Get account by email address."""
        stmt = select(Account).where(Account.email == email)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
        
    async def count_users(self) -> int:
        """Get total number of users."""
        stmt = select(func.count(Account.user_id))
        result = await self.session.execute(stmt)
        return result.scalar_one()
```

### Unit of Work
```python
# /app/repositories/unit_of_work.py
from app.repositories.auth import AccountRepository
from app.repositories.library import LibraryRepository

class UnitOfWork:
    """Manages database transactions and repository access."""
    
    def __init__(self, session: AsyncSession):
        self.session = session
        self.accounts = AccountRepository(session)
        self.library = LibraryRepository(session)
        
    async def __aenter__(self):
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            await self.rollback()
        await self.session.close()
        
    async def commit(self):
        await self.session.commit()
        
    async def rollback(self):
        await self.session.rollback()
```

## Notes
- Keep repositories focused on data access only
- Business logic stays in services
- Consider query performance and optimization
- Use repository pattern consistently across all domains
- Document complex queries thoroughly