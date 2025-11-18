import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/categories - List all print size categories
export async function GET() {
  try {
    // Return print sizes as categories
    const categories = [
      { id: '1', name: 'Small Print', slug: 'small-print' },
      { id: '2', name: 'Medium Print', slug: 'medium-print' },
      { id: '3', name: 'Full Print', slug: 'full-print' },
    ]

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST /api/categories - Not implemented (using static print sizes)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { error: 'Categories are predefined print sizes and cannot be created' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
