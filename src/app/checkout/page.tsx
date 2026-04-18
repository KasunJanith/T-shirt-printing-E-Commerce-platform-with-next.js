'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/cart-context'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CreditCard, Lock } from 'lucide-react'

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const { data: session } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    email: session?.user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'stripe' as 'stripe' | 'cod'
  })

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    if (mounted && state.items.length === 0) {
      router.push('/cart')
    }
  }, [mounted, state.items.length, router])

  const handleStripeCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Create Stripe checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: state.items,
          shippingAddress: formData,
        })
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error || 'Failed to create checkout session')
        setLoading(false)
        return
      }

      const { url } = await response.json()
      
      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('An error occurred during checkout')
      setLoading(false)
    }
  }

  const handleCODCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: state.items,
          shippingAddress: formData,
          paymentMethod: 'cod',
        })
      })

      if (!response.ok) {
        alert('Failed to create order')
        setLoading(false)
        return
      }

      const order = await response.json()
      dispatch({ type: 'CLEAR_CART' })
      router.push(`/order-confirmation/${order.id}`)
    } catch (error) {
      console.error('Order error:', error)
      alert('An error occurred while placing order')
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    if (formData.paymentMethod === 'stripe') {
      handleStripeCheckout(e)
    } else {
      handleCODCheckout(e)
    }
  }

  if (!mounted || state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Contact Information</h2>
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full p-3 border rounded-md text-gray-900 placeholder-gray-500"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="First Name"
                className="p-3 border rounded-md text-gray-900 placeholder-gray-500"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
              <input
                type="text"
                required
                placeholder="Last Name"
                className="p-3 border rounded-md text-gray-900 placeholder-gray-500"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            <input
              type="text"
              required
              placeholder="Address"
              className="w-full p-3 border rounded-md mt-4 text-gray-900 placeholder-gray-500"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                required
                placeholder="City"
                className="p-3 border rounded-md text-gray-900 placeholder-gray-500"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
              <input
                type="text"
                required
                placeholder="State"
                className="p-3 border rounded-md text-gray-900 placeholder-gray-500"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              />
            </div>
            <input
              type="text"
              required
              placeholder="ZIP Code"
              className="w-full p-3 border rounded-md mt-4 text-gray-900 placeholder-gray-500"
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
            />
          </div>          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Payment Method</h2>            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={formData.paymentMethod === 'stripe'}
                  onChange={() => setFormData({...formData, paymentMethod: 'stripe'})}
                  className="h-4 w-4 text-blue-600"
                />
                <CreditCard className="h-5 w-5 text-gray-600" />
                <span className="text-gray-900">Credit/Debit Card (Stripe)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => setFormData({...formData, paymentMethod: 'cod'})}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-gray-900">Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit border">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-900">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-2 border-t pt-4 text-gray-900">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(state.total + 5).toFixed(2)}</span>
            </div>
          </div>
            <Button 
            type="submit" 
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              <>
                <Lock className="inline h-5 w-5 mr-2" />
                {formData.paymentMethod === 'stripe' ? 'Proceed to Payment' : 'Place Order'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}