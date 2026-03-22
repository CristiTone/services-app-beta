FROM node:20-slim AS base
WORKDIR /app

# Copy monorepo root files
COPY package.json package-lock.json* ./

# Copy workspace packages (web depends on shared, ui-react, i18n, config)
COPY packages/ ./packages/
COPY apps/web/ ./apps/web/

# Install all workspace dependencies
RUN npm install

# Build
WORKDIR /app/apps/web
RUN npm run build

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
