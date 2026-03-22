FROM node:20-slim AS base
WORKDIR /app

# Copy monorepo root files
COPY package.json package-lock.json* ./

# Copy workspace packages (api depends on shared and config)
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

# Install all workspace dependencies
RUN npm install

# Generate Prisma client and build
WORKDIR /app/apps/api
RUN npm run db:generate
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]
