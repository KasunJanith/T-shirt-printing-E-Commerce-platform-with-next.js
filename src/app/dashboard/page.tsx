'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Package, User, Settings, LogOut, ShoppingBag, TrendingUp, Clock, CheckCircle, Truck, MapPin, Mail, Phone } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: {
    id: string
    product: {
      name: string
      images: string[]
    }
    quantity: number
    price: number
  }[]
}

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders')
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchOrders()
      setProfileData({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
      })
    }
  }, [status, router, session])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }
  const getStatusBadgeVariant = (status: string): "default" | "info" | "success" | "warning" | "danger" | undefined => {
    switch (status.toUpperCase()) {
      case 'DELIVERED':
        return 'success'
      case 'SHIPPED':
        return 'info'
      case 'PROCESSING':
        return 'warning'
      case 'CANCELLED':
        return 'danger'
      default:
        return 'default'
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

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between animate-fade-in-up">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">My Dashboard</h1>
              <p className="text-white/90 text-lg">Welcome back, {session?.user?.name}! 👋</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 animate-fade-in-left">
            <Card className="dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-center">{session?.user?.name}</h3>
                <p className="text-white/80 text-center text-sm mt-1">{session?.user?.email}</p>
              </div>
              
              <div className="p-4 space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'orders'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span className="font-medium">My Orders</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'profile'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Profile Settings</span>
                </button>

                <Button
                  variant="ghost"
                  onClick={() => signOut()}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="dark:bg-gray-900 dark:border-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-700 dark:text-gray-300">Total Orders</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{orders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">Total Spent</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 animate-fade-in-up animation-delay-500">
            {activeTab === 'orders' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h2>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Link href="/products">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>

                {orders.length === 0 ? (
                  <Card className="dark:bg-gray-900 dark:border-gray-800 p-12 text-center">
                    <Package className="h-24 w-24 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No orders yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Start shopping to see your orders here!</p>
                    <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="dark:bg-gray-900 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                  Order #{order.orderNumber}
                                </h3>
                                <Badge variant={getStatusBadgeVariant(order.status)} className="flex items-center space-x-1">
                                  {getStatusIcon(order.status)}
                                  <span>{order.status}</span>
                                </Badge>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Placed on {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${order.total.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <div className="border-t dark:border-gray-800 pt-4">
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4">
                                  <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                    {item.product.images[0] ? (
                                      <Image
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Package className="h-8 w-8 text-gray-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.product.name}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      Quantity: {item.quantity} × ${item.price.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Card className="dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                  <h2 className="text-3xl font-bold text-white flex items-center">
                    <User className="mr-3 h-8 w-8" />
                    Profile Settings
                  </h2>
                  <p className="text-white/80 mt-1">Manage your account information</p>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Full Name
                      </label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        placeholder="Your name"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        Email Address
                      </label>
                      <Input
                        value={profileData.email}
                        disabled
                        className="h-12 bg-gray-100 dark:bg-gray-800"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t dark:border-gray-800">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Save Changes
                    </Button>
                  </div>

                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Account Security</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                      Keep your account secure by using a strong password
                    </p>
                    <Button variant="outline">Change Password</Button>
                  </Card>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
