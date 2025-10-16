'use client'

import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Search, User, LogOut } from 'lucide-react'

export function Header() {
  const { state } = useCart()
  const { data: session } = useSession()

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            TShirtStore
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-gray-700 hover:text-gray-900">
              Shop All
            </Link>
            <Link href="/shop/men" className="text-gray-700 hover:text-gray-900">
              Men
            </Link>
            <Link href="/shop/women" className="text-gray-700 hover:text-gray-900">
              Women
            </Link>
            <Link href="/shop/kids" className="text-gray-700 hover:text-gray-900">
              Kids
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            {session ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Hi, {session.user?.name}</span>
                <Button variant="ghost" size="icon" onClick={() => signOut()}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}