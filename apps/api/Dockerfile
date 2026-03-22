FROM oven/bun:1 AS base
WORKDIR /app

# Copy monorepo root files
COPY package.json pnpm-workspace.yaml turbo.json ./

# Copy workspace packages (api depends on shared)
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

# Install all workspace dependencies
RUN bun install

# Generate Prisma client
WORKDIR /app/apps/api
RUN bunx prisma generate

# Build
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]
