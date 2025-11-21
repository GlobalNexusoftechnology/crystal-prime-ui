# Ticket Comments API

This document describes the Ticket Comments API implementation for the Crystal Prime frontend application.

## Overview

The Ticket Comments API allows users to create, read, update, and delete comments on tickets. Each comment can have a title, description, status, priority, and remark. By default, the title and description are populated from the parent ticket.

## API Endpoints

### Base URL
```
/api/ticket-comments
```

### Endpoints

1. **Create Ticket Comment**
   - `POST /api/ticket-comments`
   - Creates a new comment for a specific ticket

2. **Get All Ticket Comments**
   - `GET /api/ticket-comments/ticket/:ticket_id`
   - Retrieves all comments for a specific ticket

3. **Get Ticket Comment Detail**
   - `GET /api/ticket-comments/:comment_id`
   - Retrieves a specific comment by ID

4. **Update Ticket Comment**
   - `PUT /api/ticket-comments/:comment_id`
   - Updates an existing comment

5. **Delete Ticket Comment**
   - `DELETE /api/ticket-comments/:comment_id`
   - Deletes a comment

## Data Types

### ICreateTicketCommentPayload
```typescript
interface ICreateTicketCommentPayload {
  ticket_id: string;
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  remark?: string;
}
```

### ITicketCommentResponse
```typescript
interface ITicketCommentResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  remark: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  ticket: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assigned_to: string;
    created_at: string;
    updated_at: string;
    deleted: boolean;
    deleted_at: string | null;
    project: {
      id: string;
      name: string;
    };
    milestone: {
      id: string;
      name: string;
    };
  };
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}
```

## React Query Hooks

### useCreateTicketCommentMutation
Creates a new ticket comment.

```typescript
const { onCreateTicketComment, isPending, error } = useCreateTicketCommentMutation({
  onSuccessCallback: (data: ITicketCommentResponse) => {
    // Handle success
  },
  onErrorCallback: (error: IApiError) => {
    // Handle error
  }
});

// Usage
onCreateTicketComment({
  ticket_id: "ticket-uuid",
  title: "Comment Title",
  description: "Comment Description",
  status: "Open",
  priority: "Medium",
  remark: "Additional remarks"
});
```

### useGetAllTicketCommentsQuery
Retrieves all comments for a specific ticket.

```typescript
const { 
  allTicketCommentsData, 
  isLoading, 
  isError, 
  error, 
  getAllTicketComments 
} = useGetAllTicketCommentsQuery({ 
  ticketId: "ticket-uuid", 
  enabled: true 
});
```

### useUpdateTicketCommentMutation
Updates an existing ticket comment.

```typescript
const { onUpdateTicketComment, isPending, error } = useUpdateTicketCommentMutation({
  onSuccessCallback: (data: ITicketCommentResponse) => {
    // Handle success
  },
  onErrorCallback: (error: IApiError) => {
    // Handle error
  }
});

// Usage
onUpdateTicketComment({
  commentId: "comment-uuid",
  payload: {
    title: "Updated Title",
    status: "In Progress"
  }
});
```

### useDeleteTicketCommentMutation
Deletes a ticket comment.

```typescript
const { onDeleteTicketComment, isPending, error } = useDeleteTicketCommentMutation({
  onSuccessCallback: () => {
    // Handle success
  },
  onErrorCallback: (error: IApiError) => {
    // Handle error
  }
});

// Usage
onDeleteTicketComment("comment-uuid");
```

### useTicketCommentDetailQuery
Retrieves a specific ticket comment by ID.

```typescript
const { 
  ticketCommentDetailData, 
  isLoading, 
  isError, 
  error, 
  getTicketCommentDetail 
} = useTicketCommentDetailQuery({ 
  commentId: "comment-uuid", 
  enabled: true 
});
```

## Usage Example

See `src/components/ticket-comments/TicketCommentsExample.tsx` for a complete implementation example.

```typescript
import { TicketCommentsExample } from '@/components/ticket-comments';

// In your component
<TicketCommentsExample ticketId="your-ticket-id" />
```

## Default Values

When creating a ticket comment:
- If `title` is not provided, it defaults to the ticket's title
- If `description` is not provided, it defaults to the ticket's description
- `status` defaults to "Open"
- `priority` defaults to "Medium"

## Error Handling

All hooks include error handling with:
- Error logging to remote services
- Toast notifications for user feedback
- Proper error states for UI components

## Backend Integration

The API expects the backend to:
1. Automatically populate title and description from the ticket if not provided
2. Associate the comment with the current authenticated user
3. Return the full comment object with ticket and user details
4. Handle proper validation and error responses
