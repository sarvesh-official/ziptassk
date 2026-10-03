# ziptassk features

ziptassk is a multi-page todo application built for the Ziptrrip Tech challenge.

## Pages

- **Todo list**: `/` or `/index.html`. Loads todos from the backend, shows completion progress, and supports adding, completing, editing, viewing, deleting, and resetting todos.
- **Todo details**: `/todo?id=<todo-id>`. This is a separate React page view that reads the todo id from the query string, loads the single todo from the backend, displays its status, description, deadline, and id, and allows the todo to be marked done or pending.

The pages are separate React page views selected by the URL path. They use normal links so each page can be opened and shared directly.

## Frontend functionality

- Create a todo with a generated deadline.
- Toggle completion with persistent backend updates.
- Strike through completed todo names.
- Edit todo names.
- Delete individual todos.
- Reset the complete list.
- Show loading, empty, and API error states.
- Show a calendar, live clock, quote, Spotify embed, and local illustrations.
- Use a light-only visual theme.

## Backend functionality

The Express API uses MongoDB through Mongoose and exposes:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/health` | Check API availability |
| GET | `/api/todos` | List todos |
| GET | `/api/todos/:id` | Get one todo |
| POST | `/api/todos` | Create a todo |
| PATCH | `/api/todos/:id` | Update name, description, deadline, or completion |
| DELETE | `/api/todos/:id` | Delete a todo |

## Local setup

```bash
cd server
bun install
cp .env.example .env
# Set MONGODB_URI in server/.env
bun run start
```

In another terminal:

```bash
cd client
bun install
cp .env.example .env
bun run dev
```

The client uses `VITE_API_URL` and defaults to `http://localhost:4000/api`.

## Validation

```bash
cd client && bun run build && bun run lint
cd ../server && bunx tsc --noEmit
```
