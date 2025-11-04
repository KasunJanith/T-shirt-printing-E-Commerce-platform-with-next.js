import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

console.log('[DB] Initializing Prisma Client...')
console.log('[DB] DATABASE_URL exists:', !!process.env.DATABASE_URL)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['error', 'warn'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  console.log('[DB] Prisma Client initialized successfully')
}