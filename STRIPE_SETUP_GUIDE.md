# Stripe Integration Setup Guide

## Overview
This guide will help you set up Stripe payment processing for the T-shirt E-Commerce platform.

## Prerequisites
- A Stripe account (sign up at https://stripe.com)
- Node.js and npm installed
- The application running locally or deployed

## Installation

The required packages are already installed:
```json
{
  "stripe": "^19.1.0",
  "@stripe/stripe-js": "latest",
  "@stripe/react-stripe-js": "latest"
}
```

If you need to reinstall them:
```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

## Step 1: Get Your Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. You'll see two types of keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

> ⚠️ **Important**: Use test keys for development (`pk_test_` and `sk_test_`)

## Step 2: Configure Environment Variables

Update your `.env.local` file with your Stripe keys:

```env
# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_YOUR_SECRET_KEY_HERE"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_YOUR_PUBLISHABLE_KEY_HERE"
STRIPE_WEBHOOK_SECRET="whsec_YOUR_WEBHOOK_SECRET_HERE"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> 📝 **Note**: For production, replace test keys with live keys and update `NEXT_PUBLIC_APP_URL`

## Step 3: Set Up Stripe Webhook

Webhooks allow Stripe to notify your application when payment events occur.

### For Local Development:

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli):
   ```bash
   # Windows
   scoop install stripe
   
   # Or download from: https://github.com/stripe/stripe-cli/releases
   ```

2. Log in to Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhook events to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Copy the webhook signing secret from the output (starts with `whsec_`)

5. Add it to your `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_YOUR_WEBHOOK_SECRET_FROM_CLI"
   ```

### For Production:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**

2. Click **Add endpoint**

3. Set the endpoint URL:
   ```
   https://yourdomain.com/api/webhooks/stripe
   ```

4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

5. Click **Add endpoint**

6. Copy the **Signing secret** (starts with `whsec_`)

7. Add it to your production environment variables

## Step 4: Test the Integration

### Test Checkout Flow:

1. Start your application:
   ```bash
   npm run dev
   ```

2. Add items to cart

3. Go to checkout and fill in the form

4. Select "Credit/Debit Card (Stripe)" as payment method

5. Click "Proceed to Payment"

6. You'll be redirected to Stripe Checkout

7. Use test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **3D Secure**: `4000 0025 0000 3155`
   - Use any future expiry date, any 3-digit CVC, any ZIP code

8. Complete the payment

9. You should be redirected to the success page

### Test Webhook Events:

If using Stripe CLI, you'll see webhook events in your terminal:
```
✔ Received event: checkout.session.completed
✔ Received event: payment_intent.succeeded
```

Check your application logs to confirm orders are being created.

## File Structure

The Stripe integration includes the following files:

```
src/
├── lib/
│   └── stripe.ts                           # Stripe configuration
├── app/
│   ├── api/
│   │   ├── checkout/
│   │   │   ├── route.ts                    # Create checkout session
│   │   │   └── session/
│   │   │       └── route.ts                # Retrieve session details
│   │   └── webhooks/
│   │       └── stripe/
│   │           └── route.ts                # Webhook handler
│   └── checkout/
│       ├── page.tsx                        # Checkout form
│       ├── success/
│       │   └── page.tsx                    # Success page
│       └── cancel/
│           └── page.tsx                    # Cancel page
```

## Key Features

### ✅ Implemented Features:

1. **Checkout Session Creation**
   - Creates Stripe checkout sessions with cart items
   - Includes shipping cost calculation
   - Collects shipping and billing addresses
   - Stores customer metadata

2. **Payment Processing**
   - Secure redirect to Stripe Checkout
   - Support for multiple payment methods
   - Automatic currency conversion

3. **Webhook Handling**
   - Signature verification for security
   - Order creation on successful payment
   - Payment status logging
   - Error handling

4. **Success/Cancel Pages**
   - Order confirmation display
   - Payment status indicators
   - Next steps information
   - Navigation options

5. **Cart Management**
   - Automatic cart clearing on success
   - Cart preservation on cancellation

## API Endpoints

### POST /api/checkout
Creates a Stripe checkout session.

**Request Body:**
```json
{
  "items": [
    {
      "id": "123",
      "name": "T-Shirt",
      "price": 29.99,
      "quantity": 2,
      "size": "M",
      "color": "Blue",
      "image": "/images/tshirt.jpg"
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "US"
  }
}
```

**Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

### POST /api/webhooks/stripe
Receives Stripe webhook events.

**Events Handled:**
- `checkout.session.completed` - Creates order in database
- `payment_intent.succeeded` - Logs successful payment
- `payment_intent.payment_failed` - Logs failed payment

### GET /api/checkout/session?session_id=...
Retrieves checkout session details.

**Response:**
```json
{
  "orderId": "123",
  "amount": 6497,
  "currency": "usd",
  "status": "paid",
  "email": "customer@example.com",
  "customerName": "John Doe"
}
```

## Troubleshooting

### Issue: "Stripe failed to load"
**Solution**: Check that `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set correctly and starts with `pk_test_` or `pk_live_`

### Issue: Webhook signature verification failed
**Solution**: 
- Ensure `STRIPE_WEBHOOK_SECRET` is set correctly
- Verify the webhook endpoint URL is correct
- Check that you're using the correct secret for your environment (test vs. live)

### Issue: Order not created after payment
**Solution**:
- Check webhook events are being received (Stripe CLI or Dashboard)
- Verify database connection is working
- Check server logs for errors in webhook handler

### Issue: Redirect to Stripe not working
**Solution**:
- Verify `NEXT_PUBLIC_APP_URL` is set correctly
- Check browser console for errors
- Ensure checkout session was created successfully

### Issue: "No checkout URL returned"
**Solution**:
- Check API response in network tab
- Verify Stripe API keys are valid
- Check server logs for API errors

## Security Best Practices

1. **Never expose secret keys**
   - Keep `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` server-side only
   - Only `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` should be in client code

2. **Verify webhook signatures**
   - Always verify webhook signatures to prevent unauthorized requests
   - Use the provided webhook handler which includes verification

3. **Use HTTPS in production**
   - Stripe requires HTTPS for webhook endpoints in production
   - Ensure your domain has a valid SSL certificate

4. **Validate amounts server-side**
   - Never trust client-submitted prices
   - Always calculate totals on the server

5. **Handle errors gracefully**
   - Provide clear error messages to users
   - Log errors for debugging
   - Don't expose sensitive error details to clients

## Testing in Production

Before going live:

1. ✅ Switch to live API keys
2. ✅ Update `NEXT_PUBLIC_APP_URL` to production domain
3. ✅ Configure production webhook endpoint
4. ✅ Test with real cards (small amounts)
5. ✅ Verify order creation in database
6. ✅ Test email notifications
7. ✅ Review Stripe Dashboard for successful payments

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing Cards](https://stripe.com/docs/testing)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe API Reference](https://stripe.com/docs/api)

## Support

For issues or questions:
- Check [Stripe Documentation](https://stripe.com/docs)
- Visit [Stripe Support](https://support.stripe.com)
- Review application logs
- Test with Stripe CLI for debugging

---

**Last Updated**: November 2025
**Stripe API Version**: 2024-11-20.acacia
