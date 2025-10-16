import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const {
      items,
      total,
      shippingAddress,
      paymentMethod,
      customerEmail,
      customerName
    } = await request.json()

    // Generate order number
    const orderNumber = `TS${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase()

    const order = await prisma.order.create({
      data: {
        orderNumber,
        total,
        paymentMethod,
        customerEmail,
        customerName,
        shippingAddress,
        userId: session?.user?.id,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            variantId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: true
      }
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}