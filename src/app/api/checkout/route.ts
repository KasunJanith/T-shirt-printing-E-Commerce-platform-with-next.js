import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe, formatAmountForStripe } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to checkout' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { items, shippingAddress } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Calculate total
    const subtotal = items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity)
    }, 0)
    
    const shipping = 5.00 // Fixed shipping cost
    const total = subtotal + shipping

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: `Size: ${item.size}, Color: ${item.color}`,
          images: item.image ? [item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_APP_URL}${item.image}`] : [],
        },
        unit_amount: formatAmountForStripe(item.price),
      },
      quantity: item.quantity,
    }))

    // Add shipping as a line item
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Shipping',
          description: 'Standard shipping',
        },
        unit_amount: formatAmountForStripe(shipping),
      },
      quantity: 1,
    })

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: session.user.email,
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      metadata: {
        userId: session.user.id || '',
        customerName: shippingAddress?.firstName ? `${shippingAddress.firstName} ${shippingAddress.lastName}` : session.user.name || '',
        shippingAddress: JSON.stringify(shippingAddress),
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      billing_address_collection: 'required',
    })

    return NextResponse.json({ 
      sessionId: checkoutSession.id,
      url: checkoutSession.url 
    })

  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
