'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, Users, DollarSign, ShoppingCart, Plus, Edit, Trash } from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalUsers: number
}

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  customerName: string
  createdAt: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      if (session?.user?.role !== 'ADMIN') {
        router.push('/')
      } else {
        fetchDashboardData()
      }
    }
  }, [status, session, router])

  const fetchDashboardData = async () => {
    try {
      // Fetch stats and recent orders
      // For now, using mock data
      setStats({
        totalOrders: 150,
        totalRevenue: 15420.50,
        totalProducts: 45,
        totalUsers: 320,
      })
      setRecentOrders([
        {
          id: '1',
          orderNumber: 'ORD-001',
          status: 'PENDING',
          total: 129.99,
          customerName: 'John Doe',
          createdAt: new Date().toISOString(),
        },
      ])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-700 mt-2">Manage your e-commerce store</p>          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/products" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Products
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/users" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Users
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-gray-700 mt-1">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalOrders}</div>
              <p className="text-xs text-gray-700 mt-1">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Products</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalProducts}</div>
              <p className="text-xs text-gray-700 mt-1">5 added this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Customers</CardTitle>
              <Users className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
              <p className="text-xs text-gray-700 mt-1">+12 new this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Quick Actions</CardTitle>
              </CardHeader>              <CardContent className="space-y-2">
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/admin/products" className="flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    Manage Products
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/admin/orders" className="flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    View Orders
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/admin/users" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/admin/products/new" className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Product
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Recent Orders</CardTitle>
                <CardDescription className="text-gray-700">Latest orders from customers</CardDescription>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-700">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-900">#{order.orderNumber}</p>
                          <p className="text-sm text-gray-700">{order.customerName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                          <Badge variant="warning">{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button asChild className="w-full mt-4" variant="outline">
                  <Link href="/admin/orders">View All Orders</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Admin Dashboard Guide</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Products:</strong> Add, edit, or remove products from your catalog</li>
            <li>• <strong>Orders:</strong> View and manage customer orders</li>
            <li>• <strong>Users:</strong> Manage customer accounts and admin permissions</li>
            <li>• <strong>Analytics:</strong> Monitor your store's performance and revenue</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
