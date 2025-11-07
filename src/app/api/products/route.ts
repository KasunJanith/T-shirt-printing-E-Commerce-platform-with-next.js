import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/products - List all products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const printSize = searchParams.get('printSize')
    const featured = searchParams.get('featured')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')

    const where: any = {}
    
    // Filter by print size
    if (printSize && ['SMALL', 'MEDIUM', 'FULL'].includes(printSize)) {
      where.printSize = printSize
    }
    
    // Filter by featured
    if (featured === 'true') {
      where.featured = true
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }
    
    // Search by name or description
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        variants: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create new product (Admin only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }    const body = await request.json()
    const { name, description, price, images, printSize, sizes, colors, stock } = body

    console.log('Received product data:', { name, description, price, images, printSize, sizes, colors, stock })

    // Validate required fields
    if (!name || !price) {
      return NextResponse.json(
        { error: 'Missing required fields: name and price are required' },
        { status: 400 }
      )
    }

    // Validate printSize if provided
    if (printSize && !['SMALL', 'MEDIUM', 'FULL'].includes(printSize)) {
      return NextResponse.json(
        { error: 'Invalid print size. Must be SMALL, MEDIUM, or FULL' },
        { status: 400 }
      )
    }

    // Parse price to number
    const parsedPrice = typeof price === 'string' ? parseFloat(price) : price
    if (isNaN(parsedPrice)) {
      return NextResponse.json(
        { error: 'Invalid price value' },
        { status: 400 }
      )
    }

    // Validate sizes are valid enum values
    const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const validatedSizes = sizes?.filter((size: string) => validSizes.includes(size.toUpperCase()))
    
    if (!validatedSizes || validatedSizes.length === 0) {
      return NextResponse.json(
        { error: 'At least one valid size is required (XS, S, M, L, XL, XXL)' },
        { status: 400 }
      )
    }

    // Create variants for each size/color combination
    const variants = []
    if (validatedSizes && colors && colors.length > 0) {
      for (const size of validatedSizes) {
        for (const color of colors) {
          variants.push({
            size: size.toUpperCase(), // Ensure uppercase for enum
            color: color.trim(),
            stock: Math.floor((stock || 100) / (validatedSizes.length * colors.length)) || 10,
          })
        }
      }
    }    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description?.trim() || '',
        price: parsedPrice,
        images: Array.isArray(images) ? images : [],
        printSize: printSize || 'MEDIUM', // Default to MEDIUM if not provided
        inStock: (stock || 100) > 0,
        featured: false,
        variants: {
          create: variants,
        },
      },
      include: {
        variants: true,
      },
    })

    console.log('Product created successfully:', product.id)
    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: `Failed to create product: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
