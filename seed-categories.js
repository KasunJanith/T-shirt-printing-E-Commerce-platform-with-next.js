const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedCategories() {
  console.log('🌱 Seeding categories...')

  const categories = [
    { name: "Men's T-Shirts", slug: 'mens-t-shirts' },
    { name: "Women's T-Shirts", slug: 'womens-t-shirts' },
    { name: "Kids' T-Shirts", slug: 'kids-t-shirts' },
    { name: 'Graphic Tees', slug: 'graphic-tees' },
    { name: 'Plain Tees', slug: 'plain-tees' },
    { name: 'Premium Collection', slug: 'premium-collection' },
    { name: 'Small Print', slug: 'small-print' },
    { name: 'Normal Print', slug: 'normal-print' },
    { name: 'Full Print', slug: 'full-print' },
  ]

  try {
    for (const category of categories) {
      const existing = await prisma.category.findFirst({
        where: { name: category.name }
      })

      if (!existing) {
        await prisma.category.create({
          data: category
        })
        console.log(`✅ Created category: ${category.name}`)
      } else {
        console.log(`⏭️  Category already exists: ${category.name}`)
      }
    }

    console.log('\n✅ Categories seeded successfully!')
    
    // Display all categories
    const allCategories = await prisma.category.findMany()
    console.log('\n📋 All Categories:')
    allCategories.forEach((cat, index) => {
      console.log(`   ${index + 1}. ${cat.name} (ID: ${cat.id})`)
    })

  } catch (error) {
    console.error('❌ Error seeding categories:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function
seedCategories()
  .then(() => {
    console.log('\n🎉 Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error)
    process.exit(1)
  })
