# Marketplace Roadmap

## Current State (as of project init)

**Done — scaffolding only:**
- Monorepo structure (Turborepo + pnpm)
- Prisma schema: User, Service, Booking
- API routes for services, users, bookings (basic CRUD + pagination)
- Web pages: home, services list, service detail
- Mobile screens: home, services list (profile is placeholder)
- Shared: types, Zod schemas, api-client, useServices hook, AuthStore, i18n (EN + RO)
- UI components: ServiceCard, Button, Platform abstraction

**Nothing is wired end-to-end** — auth middleware is a stub, booking buttons have no handlers, provider IDs are hardcoded as `'demo-provider-id'`.

---

## Phase 1: Make It Actually Work (Weeks 1-4)

### Infrastructure
- [ ] Set up Railway + managed PostgreSQL (OVHcloud or Scaleway)
- [ ] Run `pnpm db:push` against real DB, seed with test data
- [ ] Configure `.env` files for each app

### Auth (unblocks everything else)
- [ ] Implement real JWT sign/verify in `apps/api/src/middleware/auth.ts`
- [ ] `POST /api/auth/register` — create user, return JWT
- [ ] `POST /api/auth/login` — verify credentials, return JWT
- [ ] Wire authenticated user from JWT payload into route handlers (replace `demo-provider-id` / `demo-customer-id`)
- [ ] Add `login`, `register` methods to `packages/shared/src/api-client`
- [ ] Add `useAuth` hook in `packages/shared/src/hooks`
- [ ] Web: login + register pages (`/[lang]/auth/login`, `/[lang]/auth/register`)
- [ ] Mobile: login + register screens

### Booking Flow
- [ ] Web: wire "Book Now" button on service detail → booking confirmation modal/page
- [ ] Mobile: same booking flow on service detail screen
- [ ] Both: require auth before booking (redirect to login if not authenticated)

---

## Phase 2: Core Marketplace Features (Weeks 5-10)

### Expand Prisma Schema
- [ ] `Category` model + `categoryId` on Service
- [ ] `ProviderProfile` model (bio, location, avatar, hourly rate, availability)
- [ ] `Review` model (bookingId, rating 1-5, text, createdAt)

### Service Listings
- [ ] Provider profile creation/edit page (web + mobile)
- [ ] Service creation/edit UI for providers
- [ ] Search + category filter on services list
- [ ] City/location filter
- [ ] SEO: meta tags, structured data on service detail pages

### Booking System
- [ ] Provider availability calendar (simple blocked-date approach first)
- [ ] Booking request → provider accepts/rejects flow
- [ ] Email notifications via Resend (booking requested, confirmed, cancelled)
- [ ] Provider booking management dashboard
- [ ] Customer bookings list page

### Reviews & Ratings
- [ ] Review form after booking status = `completed`
- [ ] Aggregate rating display on provider profile
- [ ] Trust badge for verified providers (manual admin flag for now)

---

## Phase 3: Payments & Real-time (Weeks 11-14)

### Payments (Stripe Connect)
- [ ] Stripe Connect onboarding for providers
- [ ] Payment intent on booking confirmation (customer pays upfront)
- [ ] Platform fee deduction (15-20%), provider payout on completion
- [ ] Invoice generation
- [ ] Refund handling for cancellations

### Real-time
- [ ] In-app messaging between customer and provider (Stream.io or SendBird)
- [ ] Real-time booking status updates (WebSocket or SSE)
- [ ] Push notifications: Expo for mobile, web push for web

---

## Phase 4: Advanced Features (Weeks 15-18)

### Maps & Location
- [ ] Mapbox or Google Maps integration
- [ ] Provider location on profile
- [ ] Distance-based search radius filter
- [ ] Service area coverage display

### Admin Dashboard
- [ ] User management (ban, verify, role changes)
- [ ] Service approval queue (moderation before listing goes live)
- [ ] Dispute resolution tools
- [ ] Basic analytics (signups, bookings, revenue, GMV)
- [ ] Platform settings (fee %, categories)

---

## Phase 5: Launch Prep (Weeks 19-24)

### Quality
- [ ] Unit + integration tests for API routes
- [ ] E2E tests for critical flows (register → book → complete → review)
- [ ] Performance: image optimization, API response caching
- [ ] Accessibility audit (WCAG AA)
- [ ] Security audit (OWASP top 10, rate limiting, input sanitization)

### Production Deployment
- [ ] Deploy API + web to Railway (PostgreSQL as a Railway service)
- [ ] GitHub Actions CI/CD pipeline (or Railway's native Git deploy)
- [ ] Cloudflare CDN for images/static assets
- [ ] Sentry error tracking
- [ ] Uptime monitoring
- [ ] Automated DB backups

### Soft Launch
- [ ] Beta test with real users (target: 1 service category, 1 city)
- [ ] Legal pages: Terms of Service, Privacy Policy, GDPR compliance
- [ ] Customer support setup

---

## Phase 6: Growth (Month 7+)

- Expand service categories
- Multi-city / multi-region
- Premium provider subscriptions
- Marketing tools (referral program, promoted listings)
- Scale infrastructure

---

## Immediate Next Steps

1. **Set up infrastructure** — Railway project + PostgreSQL service, `.env` files, `pnpm db:push`
2. **Implement JWT auth** — this unblocks login, booking, provider features, and everything else
3. **Build register/login pages** — web first, then mobile
4. **Wire booking flow** — connect the "Book Now" button end-to-end

> Strategy: launch for ONE service category in ONE city first. Get 10 providers manually onboarded before opening registration.
