# Troubleshooting Guide

This guide covers common issues and their solutions when working with Holy Grail.

## Common Issues

### 🚨 Port Already in Use

**Problem**: Error message "Address already in use" when starting services.

**Solution**:
```bash
# Find process using port 8000 (backend)
lsof -i :8000
kill -9 <PID>

# Find process using port 3000 (frontend)
lsof -i :3000
kill -9 <PID>

# Find process using port 5432 (database)
lsof -i :5432
kill -9 <PID>
```

### 🚨 Database Connection Failed

**Problem**: Backend cannot connect to PostgreSQL database.

**Solutions**:

1. **Check if database is running**:
   ```bash
   docker ps | grep holy-grail-db
   ```

2. **Start the database if not running**:
   ```bash
   bun run db
   ```

3. **Check database logs**:
   ```bash
   docker logs holy-grail-db
   ```

4. **Verify environment variables** in `apps/backend/.env`:
   ```
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   ```

### 🚨 Module Import Errors (Python)

**Problem**: `ModuleNotFoundError: No module named 'app'` when running tests.

**Solution**: The test command should include PYTHONPATH:
```bash
cd apps/backend
PYTHONPATH=. uv run pytest
```

### 🚨 Frontend API Connection Issues

**Problem**: Frontend shows API connection errors or CORS issues.

**Solutions**:

1. **Verify backend is running**:
   - Check http://localhost:8000/docs
   - Should see Swagger documentation

2. **Check CORS settings** in backend:
   - Frontend URL should be in allowed origins

3. **Verify API URL** in frontend environment:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

### 🚨 Docker Issues

**Problem**: Docker containers not starting or behaving unexpectedly.

**Solutions**:

1. **Reset Docker containers**:
   ```bash
   docker compose -f docker/docker-compose.db.yml down -v
   docker compose -f docker/docker-compose.db.yml up -d
   ```

2. **Clean Docker system**:
   ```bash
   docker system prune -a
   ```

3. **Check Docker daemon**:
   ```bash
   docker version
   ```

### 🚨 Migration Errors

**Problem**: Database migration failures or conflicts.

**Solutions**:

1. **Check migration status**:
   ```bash
   cd apps/backend
   uv run alembic current
   ```

2. **Run pending migrations**:
   ```bash
   bun run migrate
   ```

3. **Rollback last migration**:
   ```bash
   uv run alembic downgrade -1
   ```

### 🚨 Authentication Issues

**Problem**: Login fails or JWT token errors.

**Solutions**:

1. **Check SECRET_KEY** in `.env`:
   - Must be set and consistent
   - Generate new one if needed:
     ```python
     import secrets
     print(secrets.token_hex(32))
     ```

2. **Clear browser cookies/localStorage**:
   - JWT tokens might be expired or invalid

### 🚨 File Upload Errors

**Problem**: File uploads failing in local development.

**Solutions**:

1. **Check upload directory exists**:
   ```bash
   mkdir -p uploads
   ```

2. **Verify file permissions**:
   ```bash
   chmod 755 uploads
   ```

3. **Check file size limits** in backend configuration

### 🚨 Email Not Working

**Problem**: Emails not being sent or received.

**Solution**: In local development, emails are logged to console. Look for:
```
╔══════════════════════════════════════════════════════════╗
║                    📧 EMAIL PREVIEW                       ║
╠══════════════════════════════════════════════════════════╣
```

To enable real email sending:
1. Set `EMAIL_ENABLED=true` in `.env`
2. Configure Mailtrap credentials
3. Run Redis for Celery task queue

### 🚨 TypeScript/Build Errors

**Problem**: TypeScript compilation errors or build failures.

**Solutions**:

1. **Clear build cache**:
   ```bash
   rm -rf .next
   rm -rf .turbo
   ```

2. **Reinstall dependencies**:
   ```bash
   rm -rf node_modules
   bun install
   ```

3. **Check TypeScript config**:
   - Ensure `tsconfig.json` is valid
   - Run type checking: `bun run typecheck`

## Environment-Specific Issues

### Local Development

- **Slow hot-reload**: Restart the dev server
- **Memory issues**: Increase Node.js memory limit:
  ```bash
  NODE_OPTIONS="--max-old-space-size=4096" bun run dev
  ```

### Production Deployment

- **AWS credentials**: Ensure AWS CLI is configured
- **Environment variables**: All required vars must be set in deployment platform

## Getting More Help

### Debugging Steps

1. **Check logs**:
   - Backend: Terminal output
   - Frontend: Browser console
   - Database: `docker logs holy-grail-db`

2. **Enable debug mode**:
   ```bash
   # Backend
   DEBUG=true bun run dev
   
   # Frontend
   NEXT_PUBLIC_DEBUG=true bun run dev
   ```

3. **Use development tools**:
   - Backend: Add `import ipdb; ipdb.set_trace()`
   - Frontend: Use React DevTools

### Still Stuck?

1. Search existing GitHub issues
2. Check `/claude/tickets/` for known issues
3. Ask in project discussions
4. Create a new issue with:
   - Error message/screenshot
   - Steps to reproduce
   - Environment details
   - What you've already tried