#!/bin/bash
# Integration test runner for backend and task service

echo "🧪 Running Backend and Task Service Integration Tests"
echo "===================================================="

# Check if Redis is running
echo "Checking Redis..."
redis-cli ping > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Redis is not running. Please run: bun run db"
    exit 1
fi
echo "✅ Redis is running"

# Check if task service is running
echo "Checking Task Service..."
curl -s http://localhost:8001/ping > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Task service is not running. Please run: bun run task"
    exit 1
fi
echo "✅ Task service is running"

echo ""
echo "Running integration tests..."
echo ""

# Run backend tests excluding e2e tests
cd apps/backend
echo "📦 Backend unit/integration tests (excluding e2e):"
npm run test -- -m "not e2e"

# Run task service tests
cd ../task
echo ""
echo "📦 Task service tests:"
npm run test

# Run e2e tests if requested
if [ "$1" == "--e2e" ]; then
    cd ../backend
    echo ""
    echo "📦 End-to-end tests:"
    npm run test -- -m "e2e"
fi

echo ""
echo "✅ All tests completed!"