'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Package, User, Settings, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

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

  const getStatusBadgeVariant = (status: string) => {
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-700 mt-2">Welcome back, {session?.user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <Button
                    variant={activeTab === 'orders' ? 'default' : 'ghost'}
                    className={`justify-start ${activeTab === 'orders' ? '' : 'text-gray-900'}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </Button>
                  <Button
                    variant={activeTab === 'profile' ? 'default' : 'ghost'}
                    className={`justify-start ${activeTab === 'profile' ? '' : 'text-gray-900'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-6">                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">My Orders</CardTitle>
                    <CardDescription className="text-gray-700">View and track your orders</CardDescription>
                  </CardHeader>
                  <CardContent>{orders.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-700 mb-6">Start shopping to see your orders here</p>
                        <Button asChild>
                          <Link href="/shop">Browse Products</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <Card key={order.id} variant="outlined">
                            <CardContent className="p-6">                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h4 className="font-semibold text-lg text-gray-900">Order #{order.orderNumber}</h4>
                                  <p className="text-sm text-gray-700">
                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <Badge variant={getStatusBadgeVariant(order.status)}>
                                    {order.status}
                                  </Badge>
                                  <p className="text-lg font-bold mt-2 text-gray-900">${order.total.toFixed(2)}</p>
                                </div>
                              </div>
                              <div className="border-t pt-4">
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex items-center gap-4 py-2">                                    <div className="flex-1">
                                      <p className="font-medium text-gray-900">{item.product.name}</p>
                                      <p className="text-sm text-gray-700">
                                        Quantity: {item.quantity} × ${Number(item.price).toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900">Profile Settings</CardTitle>
                  <CardDescription className="text-gray-700">Manage your account information</CardDescription>
                </CardHeader>
                <CardContent><form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Name
                      </label>
                      <Input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={profileData.email}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
