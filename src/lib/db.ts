import { PrismaClient } from "@prisma/client";

/**
 * SE-1 · Prisma client singleton.
 * Cached on globalThis so Next.js dev hot-reload doesn't exhaust SQLite
 * connections. Standard Prisma + Next.js pattern.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
