'use client'

import { useRouter } from 'next/navigation'
import { XCircle, ShoppingCart, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CheckoutCancelPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Cancel Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-4">
            <XCircle className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Cancelled
          </h1>
          <p className="text-gray-600">
            Your payment was cancelled. No charges were made to your account.
          </p>
        </div>

        {/* Information Card */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">What happened?</h2>
          <p className="text-gray-700 mb-4">
            You cancelled the payment process before completing your order. Your cart items have been saved
            and you can complete your purchase whenever you're ready.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="font-medium text-gray-900 mb-2">Your items are still in your cart</h3>
            <p className="text-sm text-gray-600">
              Don't worry! All the items you selected are still waiting for you in your shopping cart.
            </p>
          </div>
        </div>

        {/* Common Reasons */}
        <div className="bg-gray-50 border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Common reasons for cancellation:</h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Changed your mind about the purchase</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Need to add or remove items from your cart</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Want to use a different payment method</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Need more time to review your order</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => router.push('/cart')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Return to Cart
          </Button>
          <Button
            onClick={() => router.push('/products')}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Having issues with checkout?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
            <a
              href="/contact"
              className="text-blue-600 hover:underline font-medium"
            >
              Contact Support
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a
              href="/shipping"
              className="text-blue-600 hover:underline font-medium"
            >
              Shipping Information
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a
              href="/returns"
              className="text-blue-600 hover:underline font-medium"
            >
              Return Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
