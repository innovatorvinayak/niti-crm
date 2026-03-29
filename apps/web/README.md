# NitiCRM Frontend

Next.js frontend for NitiCRM.

## Prerequisites

- Node.js 20+
- Backend API running (FastAPI, default `http://localhost:8000`)

## Environment

1. Copy `.env.example` to `.env.local`.
2. Set the backend base URL:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

The app now resolves all API requests from `NEXT_PUBLIC_API_BASE_URL` (login, signup, dashboard, contacts, pipeline).

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Backend integration assumptions

- Auth endpoints:
  - `POST /auth/signup`
  - `POST /auth/login`
  - `GET /auth/me`
- CRM lead endpoints:
  - `GET /api/leads/`
  - `POST /api/leads/`
- All protected calls require `Authorization: Bearer <token>`.

## Current frontend behavior

- Persists auth token + organization in `localStorage`.
- Redirects to `/login` when token is missing/expired.
- Renders live leads in:
  - `/dashboard`
  - `/contacts`
  - `/contacts/[id]`
  - `/pipeline`
- Supports lead creation from dashboard, contacts, and pipeline screens.

## Notes

- Pipeline stage movement is currently read-only from the frontend because the backend does not yet expose a lead status update endpoint (`PATCH`/`PUT` for leads).

