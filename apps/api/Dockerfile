FROM node:20-slim AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy monorepo root files
COPY package.json pnpm-workspace.yaml turbo.json .npmrc ./

# Copy workspace packages (api depends on shared)
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

# Install all workspace dependencies
RUN pnpm install

# Generate Prisma client and build
WORKDIR /app/apps/api
RUN pnpm db:generate
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
