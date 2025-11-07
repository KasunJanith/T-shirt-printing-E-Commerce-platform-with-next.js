const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function updateProducts() {
  try {
    console.log('🔄 Starting product migration...\n')
    
    // Get all products
    const products = await prisma.product.findMany()
    console.log(`📦 Found ${products.length} products\n`)
    
    if (products.length === 0) {
      console.log('⚠️  No products found in database.')
      console.log('💡 Add some products first, then run this script.\n')
      return
    }
    
    // Update each product with a print size
    const printSizes = ['SMALL', 'MEDIUM', 'FULL']
    let updateCount = 0
    
    for (const product of products) {
      // Assign print size based on price (you can customize this logic)
      let printSize
      const price = Number(product.price)
      
      if (price < 20) {
        printSize = 'SMALL'
      } else if (price < 30) {
        printSize = 'MEDIUM'
      } else {
        printSize = 'FULL'
      }
      
      await prisma.product.update({
        where: { id: product.id },
        data: {
          printSize: printSize
        }
      })
      
      updateCount++
      console.log(`✅ Updated "${product.name}" → ${printSize} print (${updateCount}/${products.length})`)
    }
    
    console.log(`\n🎉 Successfully updated ${updateCount} products!`)
    console.log('✨ All products now have print sizes assigned.\n')
    
  } catch (error) {
    console.error('❌ Error updating products:', error.message)
    console.error('\n💡 Try running: npx prisma db push\n')
  } finally {
    await prisma.$disconnect()
  }
}

updateProducts()
