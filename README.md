# My Marketplace – Services Marketplace Monorepo

A Fiverr/Bolt-style marketplace for local services (plumbers, electricians, nail technicians, etc.) with **maximum code sharing** between web and mobile.

## Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Monorepo     | Turborepo + pnpm workspaces         |
| Web          | Astro, React islands, TypeScript, Tailwind |
| Mobile       | React Native (Expo), NativeWind      |
| API          | Bun + Hono, TypeScript              |
| Database     | PostgreSQL + Prisma ORM             |
| i18n         | English + Romanian (i18next)       |
| Deployment   | Hetzner (Germany)                  |

## Project Structure

```
my-marketplace/
├── apps/
│   ├── web/          # Astro + React islands (i18n routes: /en/, /ro/)
│   ├── mobile/       # Expo app (tabs: Home, Services, Profile)
│   └── api/          # Bun + Hono REST API
├── packages/
│   ├── shared/       # Business logic shared by web & mobile
│   │   ├── api-client/   # API calls (same on both platforms)
│   │   ├── hooks/        # e.g. useServices
│   │   ├── utils/        # formatPrice, formatDate, cn
│   │   ├── types/        # User, Service, Booking
│   │   ├── stores/       # Zustand (auth)
│   │   └── validation/  # Zod schemas
│   ├── ui-react/     # Shared React components (ServiceCard, Button, PageLayout)
│   ├── config/       # Shared Tailwind + TypeScript configs
│   └── i18n/         # en.json, ro.json, initI18n
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Code Sharing Strategy

- **~70–80% shared:** Types, validation, API client, hooks, Zustand stores, and UI building blocks live in `packages/shared` and `packages/ui-react`.
- **Web-only:** Astro pages, routing, and HTML layout in `apps/web`.
- **Mobile-only:** Expo screens, tab navigation, and RN primitives in `apps/mobile`.
- **UI:** `ServiceCard`, `Button`, `PageLayout` use a small platform layer (`View`/`Text` → `div`/`span` on web when `react-native` is not available), so the same component works in Astro islands and in Expo with NativeWind.

## Prerequisites

- **Node.js** ≥ 18  
- **pnpm** 9.x (`npm install -g pnpm`)  
- **Bun** (for API): [bun.sh](https://bun.sh)  
- **PostgreSQL** (local or remote for API)

## Setup

1. **Clone and install**

   ```bash
   cd my-marketplace
   pnpm install
   ```

   If you see an `EPERM` error involving `.vscode` inside `node_modules`, try running `pnpm install` again or use `pnpm install --ignore-scripts` then `pnpm install`.

2. **API – database and env**

   ```bash
   cp apps/api/.env.example apps/api/.env
   # Edit apps/api/.env and set DATABASE_URL and JWT_SECRET
   pnpm db:generate
   pnpm db:push
   ```

3. **Web env (optional)**

   ```bash
   cp apps/web/.env.example apps/web/.env
   # Set PUBLIC_API_URL if different from http://localhost:3000
   ```

4. **Mobile env (optional)**

   ```bash
   cp apps/mobile/.env.example apps/mobile/.env
   # Set EXPO_PUBLIC_API_URL (use your machine IP for device)
   ```

## Scripts (from repo root)

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `pnpm dev`      | Start all apps in development        |
| `pnpm dev:web`  | Start only Astro web                 |
| `pnpm dev:mobile` | Start only Expo                     |
| `pnpm dev:api`  | Start only Bun API                   |
| `pnpm build`    | Build all apps                       |
| `pnpm typecheck` | TypeScript check across packages    |
| `pnpm db:generate` | Generate Prisma client (run after schema change) |
| `pnpm db:push`  | Push Prisma schema to DB             |

## Running everything

1. **Terminal 1 – API**

   ```bash
   pnpm dev:api
   ```

   API runs at `http://localhost:3000`. Health: `GET /health`.

2. **Terminal 2 – Web**

   ```bash
   pnpm dev:web
   ```

   - Home: `http://localhost:4321/` and `http://localhost:4321/en`, `http://localhost:4321/ro`
   - Services: `http://localhost:4321/en/services`, `http://localhost:4321/ro/services`

3. **Terminal 3 – Mobile**

   ```bash
   pnpm dev:mobile
   ```

   Then press `i` (iOS) or `a` (Android) in the Expo CLI. For a physical device, set `EXPO_PUBLIC_API_URL` to your machine’s IP (e.g. `http://192.168.1.x:3000`).

## Environment Variables

- **API** (`apps/api/.env`): `DATABASE_URL`, `JWT_SECRET`, `PORT`  
- **Web** (`apps/web/.env`): `PUBLIC_API_URL`  
- **Mobile** (`apps/mobile/.env`): `EXPO_PUBLIC_API_URL`  

See each app’s `.env.example` for details.

## Database (Prisma)

- **User:** id, email, name, role (customer/provider)  
- **Service:** id, title, description, price, providerId  
- **Booking:** id, serviceId, customerId, date, status  

After changing `apps/api/prisma/schema.prisma`, run:

```bash
pnpm db:generate
pnpm db:push
```

## i18n

- Locales: **en**, **ro** (in `packages/i18n/locales/`).  
- Web: locale in path (`/en/...`, `/ro/...`).  
- Mobile: `initI18n('en')` in root layout; can be switched later.  
- Keys: e.g. `common.welcome`, `services.title`, `booking.confirm` (see JSON files).

## Deployment (Hetzner)

- **API:** Run Bun on a VM; use `pnpm build` in `apps/api`, then `bun run dist/index.js`. Point `DATABASE_URL` to your PostgreSQL instance (e.g. Hetzner DB or VM).  
- **Web:** Build with `pnpm build` in `apps/web`; serve the `dist/` output with Nginx or any static host.  
- **Mobile:** Build with EAS Build (Expo) and set `EXPO_PUBLIC_API_URL` to your production API URL.

## Adding New Shared Code

- New **types / validation / utils / API helpers** → `packages/shared`.  
- New **React components** (used on web and mobile) → `packages/ui-react` (use the existing View/Text platform layer where needed).  
- New **translations** → `packages/i18n/locales/en.json` and `ro.json`.  
- New **Tailwind/TS config** → extend or add in `packages/config`.

This keeps business logic and UI building blocks in one place and makes it easy to add more apps or packages later.
