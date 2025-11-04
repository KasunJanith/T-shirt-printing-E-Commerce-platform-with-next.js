'use client'

import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Search, User, LogOut, Menu, X, LayoutDashboard, ShieldCheck } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export function Header() {
  const { state } = useCart()
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const isAdmin = session?.user?.role === 'ADMIN'

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 pl-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shirt Canary
            </div>
          </Link>{/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/shop" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Shop All
            </Link>
            <Link 
              href="/shop/men" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Men
            </Link>
            <Link 
              href="/shop/women" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Women
            </Link>
            <Link 
              href="/shop/kids" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Kids
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="hidden sm:inline-flex hover:bg-gray-100"
            >
              <Search className="h-5 w-5 text-gray-700" />
            </Button>
            
            {/* User Menu */}
            {session ? (
              <div className="relative" ref={userMenuRef}>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="hover:bg-gray-100"
                >
                  <User className="h-5 w-5 text-gray-700" />
                </Button>
                
                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                    
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="mr-3 h-4 w-4" />
                        My Dashboard
                      </Link>
                      
                      {isAdmin && (
                        <Link
                          href="/admin/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <ShieldCheck className="mr-3 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      
                      <button
                        onClick={() => {
                          setUserMenuOpen(false)
                          signOut({ callbackUrl: '/' })
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100">
                <Link href="/login">
                  <User className="h-5 w-5 text-gray-700" />
                </Link>
              </Button>
            )}
            
            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-gray-100" 
              asChild
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-medium">
                    {state.itemCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/shop"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop All
              </Link>
              <Link
                href="/shop/men"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Men
              </Link>
              <Link
                href="/shop/women"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Women
              </Link>              <Link
                href="/shop/kids"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kids
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {session && (
                <>
                  <div className="border-t pt-4 mt-4">
                    <Link
                      href="/dashboard"
                      className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="mr-2 h-5 w-5" />
                      My Dashboard
                    </Link>
                  </div>
                  
                  {isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ShieldCheck className="mr-2 h-5 w-5" />
                      Admin Dashboard
                    </Link>
                  )}
                </>
              )}
              
              <div className="sm:hidden border-t pt-4 mt-4">
                <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors w-full">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}