import { PrismaClient } from '@prisma/client';

// On Netlify, getConnectionString() resolves the correct branch database URL
// (production DB for prod deploys, isolated branch DB for previews).
// Locally, Prisma falls back to DATABASE_URL in .env.
function getDatasourceUrl(): string | undefined {
  if (process.env.NETLIFY) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getConnectionString } = require('@netlify/database');
    return getConnectionString() as string;
  }
  return process.env.DATABASE_URL;
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: getDatasourceUrl(),
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
