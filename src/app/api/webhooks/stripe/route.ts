import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature found' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session

        // Get line items from the session
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id)        // Extract metadata
        const metadata = session.metadata || {}
        const shippingAddressData = metadata.shippingAddress 
          ? JSON.parse(metadata.shippingAddress) 
          : {}

        // Create order in database
        // Note: Order items should be created based on the cart data stored in metadata
        // or in a separate process after webhook confirmation
        const order = await prisma.order.create({
          data: {
            orderNumber: `ORD-${Date.now()}`,
            userId: metadata.userId || null,
            customerEmail: session.customer_email || session.customer_details?.email || '',
            customerName: metadata.customerName || session.customer_details?.name || 'Guest',
            status: 'PROCESSING',
            total: (session.amount_total || 0) / 100, // Convert from cents
            paymentMethod: 'CARD',
            paymentStatus: 'PAID',
            shippingAddress: shippingAddressData,
          }
        })

        console.log('Order created:', order.id, order.orderNumber)
        
        // TODO: Create order items separately using cart data from metadata
        // You can store cart items in metadata during checkout session creation
        // and parse them here to create OrderItem records with proper product/variant relations
        
        break

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment succeeded:', paymentIntent.id)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', failedPayment.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
