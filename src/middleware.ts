import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
    const isCustomerPage = req.nextUrl.pathname.startsWith('/products') || 
                          req.nextUrl.pathname.startsWith('/cart') ||
                          req.nextUrl.pathname.startsWith('/checkout')
    
    // Protect admin routes - only ADMIN role can access
    if (isAdminPage && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Redirect admins away from customer pages to admin dashboard
    if (isCustomerPage && token?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to checkout only if authenticated
        if (req.nextUrl.pathname.startsWith('/checkout')) {
          return !!token
        }
        // Allow access to admin routes (role check happens in middleware function)
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token
        }
        // Allow access to dashboard for authenticated users
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token
        }
        return true
      },
    },
  }
)

// Only run middleware on protected routes
export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/checkout',
    '/products/:path*',
    '/cart',
  ],
}
