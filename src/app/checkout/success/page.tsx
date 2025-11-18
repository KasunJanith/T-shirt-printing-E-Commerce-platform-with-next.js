'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { dispatch } = useCart()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // Clear cart on success
    dispatch({ type: 'CLEAR_CART' })

    // Fetch order details if session_id is present
    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/checkout/session?session_id=${sessionId}`)
        if (response.ok) {
          const data = await response.json()
          setOrderDetails(data)
        }
      } catch (error) {
        console.error('Error fetching order details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [sessionId, dispatch])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. We've received your payment.
          </p>
        </div>

        {/* Order Details */}
        {orderDetails && (
          <div className="bg-white border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between pb-3 border-b">
                <span className="font-medium">Order Number:</span>
                <span className="font-mono">{orderDetails.orderId || sessionId?.slice(-8).toUpperCase()}</span>
              </div>
              
              <div className="flex justify-between pb-3 border-b">
                <span className="font-medium">Payment Status:</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Paid
                </span>
              </div>
              
              <div className="flex justify-between pb-3 border-b">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-bold">
                  ${(orderDetails.amount / 100).toFixed(2)}
                </span>
              </div>
              
              {orderDetails.email && (
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{orderDetails.email}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* What's Next Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Order Confirmation</h3>
                <p className="text-sm text-gray-600">
                  You'll receive an order confirmation email shortly with your order details.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Order Processing</h3>
                <p className="text-sm text-gray-600">
                  We'll start processing your order right away. This usually takes 1-2 business days.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Shipping Updates</h3>
                <p className="text-sm text-gray-600">
                  You'll receive tracking information once your order ships (typically 3-5 business days).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => router.push('/products')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continue Shopping
          </Button>
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            View Orders
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Need help? Contact us at{' '}
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
