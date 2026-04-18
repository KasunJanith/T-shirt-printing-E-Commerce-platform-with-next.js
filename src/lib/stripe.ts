import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripeApiVersion: Stripe.LatestApiVersion = '2023-10-16'

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: stripeApiVersion,
      typescript: true,
    })
  : null

export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100)
}

export function formatAmountFromStripe(amount: number): number {
  return amount / 100
}
