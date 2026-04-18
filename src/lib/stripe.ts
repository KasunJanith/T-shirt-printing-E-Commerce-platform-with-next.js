import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripeApiVersion: Stripe.LatestApiVersion = '2025-09-30.clover'

// Only initialize Stripe if the secret key is available
let stripe: Stripe | null = null

try {
  if (stripeSecretKey) {
    stripe = new Stripe(stripeSecretKey, {
      apiVersion: stripeApiVersion,
      typescript: true,
    })
  }
} catch (error) {
  // Silently fail during build - Stripe will be null
  console.debug('Stripe initialization skipped (expected during build)')
}

export { stripe }

export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100)
}

export function formatAmountFromStripe(amount: number): number {
  return amount / 100
}
