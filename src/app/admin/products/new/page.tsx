'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Upload, X } from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
}

export default function NewProduct() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    images: '',
    sizes: 'S,M,L,XL,XXL',
    colors: 'Black,White,Gray,Navy,Red',
    stock: '100',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      if (session?.user?.role !== 'ADMIN') {
        router.push('/')
      } else {
        fetchCategories()
      }
    }
  }, [status, session, router])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
        if (data.categories && data.categories.length > 0) {
          setFormData(prev => ({ ...prev, categoryId: data.categories[0].id }))
        }
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          categoryId: formData.categoryId,
          images: formData.images.split(',').map(img => img.trim()).filter(img => img),
          sizes: formData.sizes.split(',').map(size => size.trim()).filter(size => size),
          colors: formData.colors.split(',').map(color => color.trim()).filter(color => color),
          stock: parseInt(formData.stock),
        }),
      })

      if (response.ok) {
        alert('Product created successfully!')
        router.push('/admin/products')
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to create product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Error creating product')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-700 mt-2">Fill in the details to create a new product</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                  Product Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g., Classic Cotton T-Shirt"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  required
                  placeholder="Enter product description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-900 mb-2">
                    Price ($) *
                  </label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    required
                    placeholder="29.99"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stock */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-900 mb-2">
                  Stock Quantity *
                </label>
                <Input
                  id="stock"
                  type="number"
                  required
                  placeholder="100"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>

              {/* Images */}
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-900 mb-2">
                  Image URLs (comma-separated) *
                </label>
                <textarea
                  id="images"
                  required
                  placeholder="/images/products/tshirt-1.jpg, /images/products/tshirt-2.jpg"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
                <p className="mt-1 text-sm text-gray-700">
                  Enter image paths or URLs separated by commas
                </p>
              </div>

              {/* Sizes */}
              <div>
                <label htmlFor="sizes" className="block text-sm font-medium text-gray-900 mb-2">
                  Available Sizes (comma-separated) *
                </label>
                <Input
                  id="sizes"
                  type="text"
                  required
                  placeholder="S,M,L,XL,XXL"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                />
                <p className="mt-1 text-sm text-gray-700">
                  e.g., S,M,L,XL,XXL
                </p>
              </div>

              {/* Colors */}
              <div>
                <label htmlFor="colors" className="block text-sm font-medium text-gray-900 mb-2">
                  Available Colors (comma-separated) *
                </label>
                <Input
                  id="colors"
                  type="text"
                  required
                  placeholder="Black,White,Gray,Navy,Red"
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                />
                <p className="mt-1 text-sm text-gray-700">
                  e.g., Black,White,Gray,Navy,Red
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? 'Creating...' : 'Create Product'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/products')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Product Creation Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use clear and descriptive product names</li>
                <li>• Write detailed descriptions to help customers make informed decisions</li>
                <li>• Ensure image paths are correct (store images in public/images/products/)</li>
                <li>• Set appropriate stock levels to prevent overselling</li>
                <li>• Double-check prices before submitting</li>
              </ul>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
