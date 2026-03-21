# DraftMe

An AI-powered academic draft generator for personal statements, scholarship essays, and Erasmus motivation letters.

## Architecture

- **Frontend:** React + Vite (port 5000 in dev), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Express.js (port 3001 in dev), proxied through Vite in dev
- **Database:** PostgreSQL (Replit managed), Drizzle ORM
- **Auth:** Replit Auth (OpenID Connect via `openid-client` + `passport`)
- **AI:** Groq API (`llama-3.3-70b-versatile`), OpenAI-compatible SDK

## Key Features

- Multi-language support (English, French, Spanish, Arabic, Turkish, Italian, Portuguese)
- Document types: Personal Statement, Scholarship Essay, Erasmus Motivation Letter
- User authentication via Replit Auth
- Credit system: 3 free credits per new user, 1 credit per draft generated
- `/promo` route: 30-second looping animation demo of the app

## Environment Variables

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | Groq API key (shared env var) |
| `DATABASE_URL` | PostgreSQL connection string (auto-managed) |
| `SESSION_SECRET` | Express session secret (auto-managed) |
| `REPL_ID` | Replit app ID for OIDC (auto-managed) |

## Running

- **Dev:** `npm run dev` — starts Express (3001) + Vite (5000) concurrently
- **Production build:** `npm run build` — Vite + esbuild
- **Production run:** `npm run start`
- **DB migration:** `npx drizzle-kit push`

## File Structure

```
shared/
  schema.ts           # Re-exports all Drizzle schemas
  models/
    auth.ts           # Users + sessions tables (with credits column)
server/
  index.ts            # Express app, auth wiring, API routes
  db.ts               # Drizzle DB client
  replit_integrations/
    auth/             # Replit Auth module (OIDC, passport, session)
src/
  pages/
    Index.tsx         # Main form page with auth + credits UI
    Draft.tsx         # Draft display page
    Promo.tsx         # Animated demo page (/promo)
  hooks/
    use-auth.ts       # Auth state hook (calls /api/me)
  lib/
    draft-types.ts    # TypeScript types + language constants
    translations.ts   # UI strings per language
```

## API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/me` | Required | Returns current user + credits |
| POST | `/api/generate-draft` | Required | Generate a draft (costs 1 credit) |
| GET | `/api/login` | — | Begin Replit Auth login |
| GET | `/api/logout` | — | End session |
| GET | `/api/callback` | — | OIDC callback |
| GET | `/api/auth/user` | Required | Returns user (blueprint route) |
