---
name: Project overview and goals
description: What this marketplace app is, target market, and launch strategy
type: project
---

Romanian-language services marketplace (Fiverr/TaskRabbit-style) for local services (plumbers, cleaners, tutors, etc.). Targets Romania first.

**Tech:** Turborepo monorepo — Astro+React web, React Native+Expo mobile, Bun+Hono API, PostgreSQL+Prisma, Tailwind/NativeWind.

**Business model:** Commission-based (15-20% platform fee on bookings). May add provider subscription tiers later.

**Launch strategy:** One service category, one city first. Manually onboard first 10 providers before opening registration.

**Infrastructure plan:** Railway (API + PostgreSQL as Railway services). Cloudflare CDN for static assets.

**Why:** Start hyper-local to prove the model before expanding to more categories/cities.
**How to apply:** Scope feature suggestions to what supports single-category, single-city MVP. Don't over-engineer for multi-region until Phase 6.
