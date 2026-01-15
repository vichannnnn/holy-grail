# Ticket List

## Overview
This file maintains a centralized list of all tickets in the project. Update this file whenever you create, update, or complete tickets.

**Note**: Individual ticket files are stored in this same `/tickets` folder with the naming convention `TICKET-XXX-description.md` (e.g., `TICKET-001-user-authentication.md`, `TICKET-002-api-integration.md`)

## Ticket Status Legend
- 🔴 **Todo** - Not started
- 🟡 **In Progress** - Currently being worked on
- 🟢 **Done** - Completed
- 🔵 **Blocked** - Waiting on dependencies or external factors
- ⚫ **Cancelled** - No longer needed

## Active Tickets

### High Priority
- 🟡 [TICKET-014](./TICKET-014-production-deployment.md) - Production Deployment Preparation (partial: CI/CD exists)
- 🔴 [TICKET-015](./TICKET-015-extract-parse-mcqs.md) - Extract and Parse MCQs from Exam Papers
- 🔴 [TICKET-016](./TICKET-016-question-answer-matching.md) - Build Question-Answer Matching System
- 🔴 [TICKET-017](./TICKET-017-gpt5-variation-generator.md) - GPT-5 Question Variation Generator
- 🔴 [TICKET-018](./TICKET-018-adaptive-quiz-engine.md) - Create Adaptive Quiz Engine
- 🔴 [TICKET-020](./TICKET-020-implement-service-layer.md) - Implement Service Layer
- 🔴 [TICKET-022](./TICKET-022-code-cleanup.md) - Code Cleanup
- 🔴 [TICKET-023](./TICKET-023-cost-estimation-controls.md) - Cost Estimation and Permission Controls
- 🔴 [TICKET-025](./TICKET-025-pdf-extraction-real-documents.md) - PDF Extraction from Documents

### Medium Priority
- 🔴 [TICKET-019](./TICKET-019-quiz-ui-components.md) - Build Quiz UI Components
- 🔴 [TICKET-021](./TICKET-021-refactor-authentication.md) - Refactor Authentication System
- 🔴 [TICKET-024](./TICKET-024-implement-repository-pattern.md) - Implement Repository Pattern
- 🔴 [TICKET-026](./TICKET-026-developer-panel-pagination-alignment.md) - Developer Panel Users Pagination and Layout Alignment

### Low Priority
_No low priority tickets yet_

## Completed Tickets
- 🟢 [TICKET-013](./TICKET-013-elasticsearch-integration.md) - OpenSearch Integration for Full-Text Search (Completed: 2026-01-15)
- 🟢 [TICKET-001](./TICKET-001-implement-configuration-system.md) - Implement Configuration System (Completed: 2025-01-31)
- 🟢 [TICKET-002](./TICKET-002-migrate-to-uv-package-manager.md) - Migrate to UV Package Manager (Completed: 2025-01-31)
- 🟢 [TICKET-003](./TICKET-003-simplify-docker-setup.md) - Simplify Docker Setup for Local Development (Completed: 2025-01-31)
- 🟢 [TICKET-004](./TICKET-004-refactor-email-system.md) - Refactor Email System for Local Development (Completed: 2025-01-31)
- 🟢 [TICKET-005](./TICKET-005-standardize-aws-configuration.md) - Standardize AWS Configuration (Completed: 2025-01-31)
- 🟢 [TICKET-007](./TICKET-007-add-documentation.md) - Add Documentation to Backend API (Completed: 2025-09-07)
- 🟢 [TICKET-008](./TICKET-008-docker-compose-simplification.md) - Simplify Docker Compose for Database Only (Completed: 2025-09-13)
- 🟢 [TICKET-009](./TICKET-009-fix-celery-macos-error.md) - Fix Celery Beat macOS Error (Completed: 2025-09-13)
- 🟢 [TICKET-010](./TICKET-010-task-service-decoupling.md) - Verify Task Service Decoupling (Completed: 2025-09-13)
- 🟢 [TICKET-011](./TICKET-011-replace-frontend-with-new-frontend.md) - Replace Frontend with New-Frontend (Completed: 2025-09-21)
- 🟢 [TICKET-012](./TICKET-012-create-app-frontend.md) - Create App-Frontend for Premium Features (Completed: 2025-09-21)
- 🟢 [TICKET-013](./TICKET-013-update-documentation.md) - Update Documentation for New Architecture (Completed: 2025-09-21)

## Cancelled/Archived Tickets
_No cancelled tickets yet_

---

## How to Use This File

1. **When creating a new ticket**:
   - Create the ticket file in `/tickets` folder (e.g., `TICKET-001-user-authentication.md`)
   - Use the template structure from `/tickets/README.md` for the ticket content
   - Add it to the appropriate priority section in this list
   - Include ticket number, title, and status emoji
   - Link to the full ticket file

2. **Format for ticket entries**:
   ```
   - 🔴 [TICKET-001](./TICKET-001-user-authentication.md) - User Authentication System
   ```
   
3. **File organization**:
   ```
   tickets/
   ├── ticket-list.md          # This file (centralized index)
   ├── TICKET-001-user-auth.md # Individual ticket file
   ├── TICKET-002-api-docs.md  # Individual ticket file
   └── TICKET-003-testing.md   # Individual ticket file
   ```

4. **When updating ticket status**:
   - Change the status emoji
   - Move completed tickets to "Completed Tickets" section
   - Add completion date for completed tickets

4. **Example of a populated list**:
   ```markdown
   ### High Priority
   - 🟡 [TICKET-001](./TICKET-001-user-authentication.md) - User Authentication System
   - 🔴 [TICKET-003](./TICKET-003-api-rate-limiting.md) - Implement API Rate Limiting

   ### Medium Priority
   - 🔵 [TICKET-002](./TICKET-002-email-notifications.md) - Email Notification Service (blocked: waiting for SMTP credentials)
   
   ### Completed Tickets
   - 🟢 [TICKET-000](./TICKET-000-project-setup.md) - Initial Project Setup (Completed: 2024-01-15)
   ```

5. **Best Practices**:
   - Keep this file updated in real-time
   - Review weekly to ensure accuracy
   - Use consistent naming conventions
   - Archive old completed tickets quarterly