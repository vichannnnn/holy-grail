# TICKET-026: Developer Panel Users Pagination and Layout Alignment

## Description
The Developer Panel's Users tab currently loads all users at once, which can cause performance issues and UI hangs when dealing with many users. Additionally, the table content in both Developer Panel and Admin Panel is not vertically aligned with the header sections - the tables extend wider than the "Developer Panel" / "Administrator Panel" titles and description text.

## Acceptance Criteria
- [ ] Users tab in Developer Panel implements pagination (server-side preferred)
- [ ] Pagination controls display below the users table
- [ ] Users are loaded in manageable page sizes (e.g., 20-50 per page)
- [ ] Developer Panel content (tabs/table) is vertically aligned with header section
- [ ] Admin Panel content is vertically aligned with its header section
- [ ] Tables have a constrained max-width matching the header (w-5/6 sm:w-3/4)
- [ ] Layout is responsive and works on all screen sizes

## Priority
Medium

## Status
Todo

## Technical Context

### Current Layout Issue
- Header uses: `flex flex-col m-auto w-5/6 sm:w-3/4` (centered, 75-83% width)
- DeveloperContent/Tabs uses: `w-full` with no max-width constraint
- AdminContent uses: `px-8` padding but no max-width constraint
- Result: Header is narrower than content, causing visual misalignment

### Relevant Files
- `/apps/frontend/src/app/developer/page.tsx` - Developer Panel page
- `/apps/frontend/src/app/developer/_components/DeveloperContent.tsx` - Tab content container
- `/apps/frontend/src/app/developer/_components/DataTable.tsx` - Table component
- `/apps/frontend/src/app/developer/actions.ts` - User fetch action (needs pagination)
- `/apps/frontend/src/app/admin/page.tsx` - Admin Panel page
- `/apps/frontend/src/app/admin/_components/AdminContent/AdminContent.tsx` - Admin content
- `/packages/ui/src/components/Tabs/Tabs.tsx` - Shared Tabs component
- `/apps/frontend/src/lib/features/Pagination/Pagination.tsx` - Existing pagination component

### Backend Endpoint
- Current: `GET /admin/users` returns all users
- Needs: Paginated endpoint with `page` and `size` query parameters

### Existing Pagination Pattern
The Admin Panel already uses pagination with the `Pagination` component from `@lib/features/client`. The same pattern should be applied to the Users tab.

## Implementation Steps

### 1. Backend Changes
- [ ] Add pagination support to `/admin/users` endpoint
- [ ] Return paginated response: `{ items, page, pages, size, total }`

### 2. Frontend - Pagination
- [ ] Update `fetchAllUsers` to accept page/size parameters
- [ ] Create paginated Users tab component (client component for state)
- [ ] Integrate existing `Pagination` component

### 3. Frontend - Layout Alignment
- [ ] Wrap DeveloperContent in container with `m-auto w-5/6 sm:w-3/4`
- [ ] Apply same width constraint to AdminContent
- [ ] Ensure tables respect container width (remove min-w-full or add max-width)

## Notes
- Consider using URL search params for pagination state (like Admin Panel does for notes)
- The existing `Pagination` component should be reused for consistency
- Test with large user datasets to verify performance improvement
