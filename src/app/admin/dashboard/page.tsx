'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, Users, DollarSign, ShoppingCart, Plus, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Clock, CheckCircle, Truck, Eye } from 'lucide-react'
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
          status: 'DELIVERED',
          total: 129.99,
          customerName: 'John Doe',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          orderNumber: 'ORD-002',
          status: 'SHIPPED',
          total: 89.99,
          customerName: 'Jane Smith',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '3',
          orderNumber: 'ORD-003',
          status: 'PROCESSING',
          total: 199.99,
          customerName: 'Bob Johnson',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'DELIVERED':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'SHIPPED':
        return <Truck className="h-4 w-4 text-blue-500" />
      case 'PROCESSING':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Header with Gradient */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex justify-between items-start">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Welcome back, {session?.user?.name || 'Admin'}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Here's what's happening with your store today
              </p>
            </div>
            <Button 
              asChild 
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <Link href="/admin/products/new" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid with Gradient Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 -mt-8">
          {/* Revenue Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 animate-fade-in-up">
            <div className="p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div className="flex items-center text-sm bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  20.1%
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-green-100 text-sm">Total Revenue</p>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div className="flex items-center text-sm bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  15%
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stats.totalOrders}</div>
              <p className="text-blue-100 text-sm">Total Orders</p>
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Package className="h-6 w-6" />
                </div>
                <div className="flex items-center text-sm bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  5 new
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stats.totalProducts}</div>
              <p className="text-purple-100 text-sm">Products</p>
            </div>
          </div>

          {/* Users Card */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex items-center text-sm bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  12 new
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stats.totalUsers}</div>
              <p className="text-orange-100 text-sm">Customers</p>
            </div>
          </div>
        </div>        {/* Quick Actions & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Quick Actions
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <Button asChild className="w-full justify-start h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  <Link href="/admin/products/new" className="flex items-center">
                    <Plus className="mr-2 h-5 w-5" />
                    Add New Product
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start h-12 border-2">
                  <Link href="/admin/products" className="flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Manage Products
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start h-12 border-2">
                  <Link href="/admin/orders" className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    View All Orders
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start h-12 border-2">
                  <Link href="/admin/users" className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Manage Users
                  </Link>
                </Button>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Performance
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">3.2%</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <ArrowUpRight className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Order Value</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$102.80</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Recent Orders
                  </h2>
                  <Button asChild variant="ghost" className="text-white hover:bg-white/20">
                    <Link href="/admin/orders" className="flex items-center">
                      View All
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="p-6">
                {recentOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <ShoppingCart className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <div 
                        key={order.id} 
                        className="flex items-center justify-between p-5 border-2 border-gray-100 dark:border-gray-800 rounded-xl hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-md transition-all duration-300 group"
                        style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              #{order.orderNumber}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{order.customerName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {new Date(order.createdAt).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            ${order.total.toFixed(2)}
                          </p>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span>{order.status}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button asChild className="w-full mt-6 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                  <Link href="/admin/orders" className="flex items-center justify-center">
                    <Eye className="mr-2 h-4 w-4" />
                    View All Orders
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section with Pro Tips */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Admin Pro Tips 💡</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Products:</strong> Add high-quality images and detailed descriptions for better conversions
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Orders:</strong> Process orders quickly to improve customer satisfaction
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Analytics:</strong> Monitor your dashboard daily to track store performance
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Customers:</strong> Engage with your customers through timely communication
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
