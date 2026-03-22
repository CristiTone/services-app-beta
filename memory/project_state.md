---
name: Current implementation state
description: What is actually built vs stubbed in the marketplace app, and the immediate next priorities
type: project
---

The monorepo scaffold is complete but nothing works end-to-end. Key gaps:

- JWT auth middleware is a stub (checks token exists but doesn't verify it)
- No login/register pages or screens on web or mobile
- Booking "Book Now" button has no handler — no booking flow exists in UI
- API routes hardcode `demo-provider-id` / `demo-customer-id` instead of reading from JWT
- Provider has no UI to create/edit services

**What IS working:**
- API routes: basic CRUD for services, users, bookings (with fake auth)
- Web pages: home, services list, service detail (read-only)
- Mobile screens: home, services list (profile is a placeholder)
- Shared packages: types, Zod schemas, api-client, useServices hook, AuthStore (Zustand), i18n (EN + RO complete)
- UI components: ServiceCard, Button, Platform abstraction (cross-platform)
- Prisma schema: User, Service, Booking models complete

**Immediate next steps (in order):**
1. Set up infrastructure: Hetzner VPS + managed PostgreSQL + .env files
2. Implement real JWT sign/verify in auth middleware
3. Add /auth/register and /auth/login API routes
4. Build login/register UI (web first, then mobile)
5. Wire booking flow end-to-end (auth-gated)

**Why:** Nothing can be tested or demoed until auth works — it blocks all user-specific features.
**How to apply:** When asked to implement a feature, check if auth is needed first. If not yet implemented, that's the prerequisite.
