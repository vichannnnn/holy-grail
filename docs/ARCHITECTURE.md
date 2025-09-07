# Architecture Overview

Holy Grail is a monorepo containing a full-stack web application for providing educational resources to Singaporean students.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Client Browser                            │
└─────────────────┬───────────────────────────────┬──────────────────┘
                  │                               │
                  ▼                               ▼
         ┌───────────────┐               ┌───────────────┐
         │   Frontend    │               │ New Frontend  │
         │   (Next.js)   │               │   (Next.js)   │
         │  Port: 3000   │               │  Port: 3001   │
         └───────┬───────┘               └───────┬───────┘
                 │                               │
                 └───────────┬───────────────────┘
                             │ HTTP/REST
                             ▼
                    ┌─────────────────┐
                    │   Backend API   │
                    │   (FastAPI)     │
                    │   Port: 8000    │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
        ┌──────────────┐         ┌──────────────┐
        │  PostgreSQL  │         │ File Storage │
        │   Database   │         │ (Local/S3)   │
        │  Port: 5432  │         └──────────────┘
        └──────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Material-UI
- **State Management**: React Context + Hooks
- **Build Tool**: Turbopack
- **Package Manager**: Bun

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database ORM**: SQLAlchemy 2.0 (async)
- **Authentication**: JWT (python-jose)
- **Password Hashing**: Passlib + bcrypt
- **API Documentation**: Automatic via FastAPI (OpenAPI/Swagger)
- **Package Manager**: UV (fast Python package installer)

### Infrastructure
- **Database**: PostgreSQL (via Docker)
- **File Storage**: 
  - Local: Filesystem (development)
  - Production: AWS S3
- **Email Service**: 
  - Local: Console logging
  - Production: Mailtrap/SMTP
- **Deployment**: 
  - Development: AWS ECS
  - Production: AWS ECS

## Project Structure

```
holy-grail/
├── apps/                    # Application packages
│   ├── backend/            # FastAPI backend
│   │   ├── app/
│   │   │   ├── api/        # API endpoints
│   │   │   ├── core/       # Core configuration
│   │   │   ├── models/     # Database models
│   │   │   ├── schemas/    # Pydantic schemas
│   │   │   ├── services/   # Business logic
│   │   │   └── utils/      # Utilities
│   │   ├── alembic/        # Database migrations
│   │   └── tests/          # Backend tests
│   │
│   ├── frontend/           # Main Next.js frontend
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities and API clients
│   │   └── public/        # Static assets
│   │
│   └── new-frontend/      # Experimental frontend
│
├── packages/              # Shared packages
│   └── @shared/          # Shared utilities
│       ├── ui/           # Shared UI components
│       └── tooling/      # Shared configs
│
├── docs/                 # Documentation
├── external/             # External configurations
│   └── docker/          # Docker configs
│
└── turbo.json           # Turborepo configuration
```

## Key Design Decisions

### 1. Monorepo Structure
- Uses Turborepo for efficient builds and caching
- Shared dependencies and configurations
- Coordinated deployments

### 2. Database Design
- Async SQLAlchemy for better performance
- Alembic for migration management
- PostgreSQL for ACID compliance and JSON support

### 3. Authentication & Authorization
- JWT-based authentication
- Role-based access control (User, Admin, Developer)
- Email verification system

### 4. File Management
- Abstracted storage service (local/S3)
- Secure file upload with type validation
- PDF generation for documents

### 5. Environment Management
- Environment-specific configurations
- Feature flags based on environment
- Separate frontend/backend environment files

## API Design

### RESTful Endpoints
- Standard HTTP methods (GET, POST, PUT, DELETE)
- Consistent URL patterns
- JSON request/response format

### Authentication Flow
1. User registers → Email verification sent
2. User verifies email → Account activated
3. User logs in → JWT token issued
4. Token included in Authorization header for protected routes

### Common API Patterns
```
GET    /api/resource       # List resources
GET    /api/resource/{id}  # Get single resource
POST   /api/resource       # Create resource
PUT    /api/resource/{id}  # Update resource
DELETE /api/resource/{id}  # Delete resource
```

## Security Considerations

### Backend Security
- Input validation via Pydantic
- SQL injection prevention via SQLAlchemy
- Rate limiting on sensitive endpoints
- CORS configuration for frontend origins
- Password hashing with bcrypt

### Frontend Security
- Environment variables for sensitive config
- API calls through authenticated sessions
- XSS prevention via React
- Content Security Policy headers

## Performance Optimizations

### Backend
- Async/await for I/O operations
- Database connection pooling
- Pagination for large datasets
- Caching strategies (future)

### Frontend
- Server-side rendering with Next.js
- Image optimization
- Code splitting
- Lazy loading of components

## Deployment Architecture

### Development Environment
- Automated deployment from `dev` branch
- AWS ECS Fargate containers
- Application Load Balancer
- RDS PostgreSQL database

### Production Environment
- Automated deployment from `main` branch
- AWS ECS Fargate with auto-scaling
- CloudFront CDN for static assets
- RDS PostgreSQL with backups
- S3 for file storage

## Monitoring & Logging

### Application Monitoring
- Structured logging with correlation IDs
- Error tracking (planned)
- Performance metrics (planned)

### Infrastructure Monitoring
- AWS CloudWatch for containers
- Database performance insights
- Load balancer metrics