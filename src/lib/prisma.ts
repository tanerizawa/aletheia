import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: pg.Pool | undefined;
};

// Create connection pool if not exists
if (!globalForPrisma.pool && process.env.DATABASE_URL) {
  globalForPrisma.pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

const pool = globalForPrisma.pool;

// Create Prisma Client with adapter
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: pool ? new PrismaPg(pool) : undefined,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
