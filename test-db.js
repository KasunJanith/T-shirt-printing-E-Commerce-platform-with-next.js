// Test database connection
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('Testing database connection...')
    
    // Try to query the database
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Database connection successful!')
    console.log('Result:', result)
    
    // Try to count users
    const userCount = await prisma.user.count()
    console.log(`✅ Users in database: ${userCount}`)
    
    await prisma.$disconnect()
    console.log('✅ Test completed successfully!')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

testConnection()
