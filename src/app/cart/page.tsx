'use client'

import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">          <div className="max-w-md mx-auto">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Your cart is empty</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8">Looks like you haven't added any items to your cart yet.</p>            <Button asChild size="lg" className="w-full">
              <Link href="/shop" className="flex items-center justify-center">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="dark:border-gray-700 dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                      <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.name}</h3>                      <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="font-bold text-lg mt-2 text-gray-900 dark:text-white">${Number(item.price).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-8 dark:border-gray-700 dark:bg-gray-800">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Subtotal ({state.items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span className="font-medium">${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Shipping</span>
                    <span className="font-medium">{state.total > 50 ? 'FREE' : '$5.00'}</span>
                  </div>
                  <div className="border-t dark:border-gray-600 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>${(state.total + (state.total > 50 ? 0 : 5)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                  <Button className="w-full mb-3" size="lg" asChild>
                  <Link href="/checkout" className="flex items-center justify-center">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
                
                {state.total < 50 && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      Add <span className="font-bold">${(50 - state.total).toFixed(2)}</span> more to get <span className="font-bold">FREE shipping</span>!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
