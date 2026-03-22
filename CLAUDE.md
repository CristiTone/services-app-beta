# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Turborepo monorepo for a Fiverr-style services marketplace. Runs on npm workspaces with three apps and four shared packages targeting ~70-80% code sharing between web and mobile.

## Commands

```bash
# Development (from root)
npm run dev              # All apps
npm run dev:web          # Web only (Astro, port 4321)
npm run dev:api          # API only (Bun/Hono, port 3000)
npm run dev:mobile       # Mobile only (Expo)

# Build & Type Check
npm run build
npm run typecheck

# Database (runs against apps/api)
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to DB
turbo run db:studio --filter=@marketplace/api  # Prisma Studio
```

**Package manager:** npm. Do not use pnpm or yarn.
**API runtime:** Bun (not Node). API scripts use `bun run`.

## Monorepo Structure

```
apps/
  web/      # Astro 4 + React islands, i18n routing (/en/, /ro/)
  mobile/   # React Native 0.74 + Expo 51 + Expo Router
  api/      # Bun + Hono REST API + Prisma → PostgreSQL
packages/
  shared/   # Business logic: types, api-client, hooks, stores, validation, utils
  ui-react/ # Shared React components (web + mobile via platform abstraction)
  i18n/     # EN + RO translations + initI18n() bootstrap
  config/   # Shared Tailwind and TypeScript base configs
```

## Architecture

### Code Sharing

`packages/shared` is the core of the monorepo:
- `types/` — Domain models (User, Service, Booking)
- `api-client/` — Typed fetch wrapper; configure with `configureApiClient(config)`, then use `servicesApi.list()` etc.
- `hooks/` — React hooks like `useServices()` that work identically on web and mobile
- `stores/` — Zustand auth store (`useAuthStore`) — platform-agnostic
- `validation/` — Zod schemas (single source of truth for request shapes and type inference)
- `utils/` — `cn()`, price/date formatters

### Platform Abstraction

`packages/ui-react` uses `Platform.tsx` to conditionally require React Native primitives or fall back to `<div>`/`<span>`. This lets the same component render on both web and mobile. Components use `className` for Tailwind (NativeWind handles it on mobile).

### API

Hono router with route groups at `/api/services`, `/api/users`, `/api/bookings`. Auth middleware validates `Authorization: Bearer <token>` — JWT verification is a TODO (placeholder). Zod schemas validate request bodies at the route handler level.

### i18n

Locale is path-prefixed on web (`/en/`, `/ro/`). Call `initI18n(locale)` at app bootstrap. Use `react-i18next` hooks in React code.

## Environment Variables

| App | File | Key vars |
|-----|------|----------|
| API | `apps/api/.env` | `DATABASE_URL`, `JWT_SECRET`, `PORT` |
| Web | `apps/web/.env` | `PUBLIC_API_URL` |
| Mobile | `apps/mobile/.env` | `EXPO_PUBLIC_API_URL` |

## Database

PostgreSQL via Prisma. Core models: **User** (`role: customer | provider`), **Service** (`price: Float`, FK `providerId`), **Booking** (`status: pending | confirmed | completed | cancelled`, FKs `serviceId` + `customerId`).
