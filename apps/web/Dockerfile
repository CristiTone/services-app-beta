FROM node:20-slim AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy monorepo root files
COPY package.json pnpm-workspace.yaml turbo.json .npmrc ./

# Copy workspace packages (web depends on shared, ui-react, i18n, config)
COPY packages/ ./packages/
COPY apps/web/ ./apps/web/

# Install all workspace dependencies
RUN pnpm install

# Build
WORKDIR /app/apps/web
RUN pnpm build

EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]
