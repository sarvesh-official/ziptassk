# ZipTassk Features

ZipTassk is a multi-page todo application built for the Ziptrrip Tech Challenge. It combines simple task management with a small productivity dashboard.

## Pages

- **Todo List**: `/` or `/index.html`
  - Loads todos from the backend and displays completion progress.
  - Supports creating, editing, completing, viewing, and deleting todos.
  - Allows an optional description during creation and editing.
  - Provides an option to clear the full todo list.
- **Todo Details**: `/todo?id=<todo-id>`
  - A separate React page view for an individual todo.
  - Reads the todo ID from the query string.
  - Displays the todo's name, status, description, and deadline.
  - Allows the todo to be marked completed or pending.
  - Supports editing the name, description, and deadline.
  - Allows deletion with a confirmation prompt.
  - Can be opened directly using its URL.

The application uses separate page views selected by the URL path. The todo detail page is linked from each item in the list.

## Todo Management

- Create todos with a generated deadline.
- Add an optional description using a single two-step input: `Next` captures the name, then the same input accepts a description before `Add`.
- Edit todos on the main page with the same name-then-description input flow.
- Edit todo names, descriptions, and deadlines from the detail page.
- Mark todos completed or pending; completion changes are saved through the backend.
- Strike through only the name of completed todos.
- Delete individual todos from the list or detail page.
- Clear the entire todo list using the reset option.
- Display loading, empty, and API error states.

## Productivity Dashboard

Alongside the todo list, ZipTassk includes a small set of productivity features.

### Calendar

- Displays the current month and highlights today's date.
- Provides a quick date reference while planning tasks and deadlines.

### Live Clock

- Displays the current local time.
- Updates automatically every second without a page refresh.

### Motivational Quote

- Loads a motivational quote and author from a quote service when available.
- Shows a local fallback quote if the service cannot be reached.

### Spotify Music

- Embeds a Spotify playlist in the dashboard sidebar.
- Lets users play music without leaving the application.

### Completion Progress

- Displays completed todos compared with the total todo count.
- Updates when todos are completed or reopened.

## User Experience

- Light-only visual theme using ZipTassk's teal branding.
- Responsive layout that hides the sidebars on narrower screens.
- Visual distinction between completed and pending todos.
- Direct navigation between the todo list and individual todo details.
- Confirmation before deleting a todo from its detail page.
- Local logo, profile icon, and plant illustrations.

## Backend Functionality

The Express API uses MongoDB through Mongoose and exposes:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/health` | Check API availability |
| GET | `/api/todos` | List all todos |
| GET | `/api/todos/:id` | Get one todo |
| POST | `/api/todos` | Create a todo |
| PATCH | `/api/todos/:id` | Update todo fields |
| DELETE | `/api/todos/:id` | Delete a todo |

The update endpoint supports changing the name, description, deadline, and completion status.

## Data Persistence

- Todo data is stored in MongoDB.
- Todo operations are persisted through the Express backend.
- Completion status remains saved after a page refresh.
- The frontend communicates with the backend through REST APIs.

## Local Setup

### Backend

```bash
cd server
bun install
cp .env.example .env
```

Set `MONGODB_URI` in `server/.env`, then start the API:

```bash
bun run start
```

### Frontend

In another terminal:

```bash
cd client
bun install
cp .env.example .env
bun run dev
```

The client uses `VITE_API_URL`, which defaults to `http://localhost:4000/api`.

## Validation

```bash
cd client
bun run build
bun run lint
cd ../server
bunx tsc --noEmit
```
