'use client'

import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { useTheme } from '@/context/theme-context'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { 
  ShoppingCart, 
  User, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  ShieldCheck,
  Sun,
  Moon,
  Package,
  Users,
  FileText,
  BarChart3
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export function Header() {
  const { state } = useCart()
  const { theme, toggleTheme } = useTheme()
  const { data: session } = useSession()
  const router = useRouter()
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
    <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-50 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isAdmin ? "/admin/dashboard" : "/"} className="flex items-center space-x-2 pl-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shirt Canary
            </div>
          </Link>

          {/* Desktop Navigation - ADMIN */}
          {isAdmin ? (
            <nav className="hidden lg:flex items-center space-x-6">
              <Link 
                href="/admin/dashboard" 
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link 
                href="/admin/products" 
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2"
              >
                <Package className="h-4 w-4" />
                Products
              </Link>
              <Link 
                href="/admin/orders" 
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Orders
              </Link>
              <Link 
                href="/admin/users" 
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Users
              </Link>
              <Link 
                href="/admin/analytics" 
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Link>
            </nav>
          ) : (
            /* Desktop Navigation - CUSTOMER */
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                href="/products" 
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Browse Products
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              ) : (
                <Sun className="h-5 w-5 text-gray-200" />
              )}
            </Button>
            
            {/* User Menu */}
            {session ? (
              <div className="relative" ref={userMenuRef}>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <User className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </Button>
                
                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {session.user?.email}
                      </p>
                      {isAdmin && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium rounded">
                          Admin
                        </span>
                      )}
                    </div>
                    
                    <div className="py-1">
                      {!isAdmin && (
                        <Link
                          href="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="mr-3 h-4 w-4" />
                          My Dashboard
                        </Link>
                      )}
                      
                      <button
                        onClick={() => {
                          setUserMenuOpen(false)
                          signOut({ callbackUrl: '/' })
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <Link href="/login" className="flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </Link>
              </Button>
            )}

            {/* Cart Button - Only for customers */}
            {!isAdmin && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-gray-100 dark:hover:bg-gray-700" 
                asChild
              >
                <Link href="/cart" className="flex items-center justify-center relative">
                  <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                  {state.itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 dark:bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-medium">
                      {state.itemCount}
                    </span>
                  )}
                </Link>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t dark:border-gray-700 py-4">
            {isAdmin ? (
              /* Admin Mobile Menu */
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/products"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Package className="h-4 w-4" />
                  Products
                </Link>
                <Link
                  href="/admin/orders"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText className="h-4 w-4" />
                  Orders
                </Link>
                <Link
                  href="/admin/users"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users className="h-4 w-4" />
                  Users
                </Link>
                <Link
                  href="/admin/analytics"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Link>
              </nav>
            ) : (
              /* Customer Mobile Menu */
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/products"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Products
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
