'use client'

import { useState } from 'react'
import { useCart } from '@/context/cart-context'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const { data: session } = useSession()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    email: session?.user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'card' as 'card' | 'cod'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: state.items,
          total: state.total + 5,
          shippingAddress: formData,
          paymentMethod: formData.paymentMethod,
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`
        })
      })

      if (response.ok) {
        const order = await response.json()
        dispatch({ type: 'CLEAR_CART' })
        router.push(`/order-confirmation/${order.id}`)
      } else {
        alert('Failed to create order')
      }
    } catch (error) {
      alert('An error occurred')
    }
  }

  if (state.items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full p-3 border rounded-md"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="First Name"
                className="p-3 border rounded-md"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
              <input
                type="text"
                required
                placeholder="Last Name"
                className="p-3 border rounded-md"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            <input
              type="text"
              required
              placeholder="Address"
              className="w-full p-3 border rounded-md mt-4"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                required
                placeholder="City"
                className="p-3 border rounded-md"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
              <input
                type="text"
                required
                placeholder="State"
                className="p-3 border rounded-md"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              />
            </div>
            <input
              type="text"
              required
              placeholder="ZIP Code"
              className="w-full p-3 border rounded-md mt-4"
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
            />
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={() => setFormData({...formData, paymentMethod: 'card'})}
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => setFormData({...formData, paymentMethod: 'cod'})}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-2 border-t pt-4">
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
          
          <Button type="submit" className="w-full mt-6">
            Place Order
          </Button>
        </div>
      </form>
    </div>
  )
}