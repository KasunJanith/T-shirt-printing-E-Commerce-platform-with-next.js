'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Upload, Image as ImageIcon, Package, DollarSign, Layers, Palette, Ruler, Sparkles } from 'lucide-react'
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <Button variant="ghost" asChild className="mb-4 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Link href="/admin/products" className="flex items-center text-gray-600 dark:text-gray-400">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Create a stunning product listing for your store</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up animation-delay-500">
          {/* Product Information */}
          <Card className="overflow-hidden border-0 shadow-lg dark:bg-gray-900">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Sparkles className="mr-2 h-6 w-6" />
                Product Information
              </h2>
              <p className="text-blue-100 mt-1">Basic details about your product</p>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Product Name */}
              <div className="group">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Product Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g., Classic Cotton T-Shirt"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 text-lg"
                />
              </div>

              {/* Description */}
              <div className="group">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  required
                  placeholder="Describe your product in detail..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                />
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Price *
                  </label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    required
                    placeholder="29.99"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full h-12 text-lg"
                  />
                </div>

                <div className="group">
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <Layers className="h-4 w-4 mr-1" />
                    Print Size Category *
                  </label>
                  <select
                    id="category"
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select print size...</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stock */}
              <div className="group">
                <label htmlFor="stock" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                  <Package className="h-4 w-4 mr-1" />
                  Stock Quantity *
                </label>
                <Input
                  id="stock"
                  type="number"
                  required
                  placeholder="100"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full h-12 text-lg"
                />
              </div>
            </div>
          </Card>

          {/* Media & Variants */}
          <Card className="overflow-hidden border-0 shadow-lg dark:bg-gray-900">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <ImageIcon className="mr-2 h-6 w-6" />
                Media & Variants
              </h2>
              <p className="text-purple-100 mt-1">Images, sizes, and color options</p>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Images */}
              <div className="group">
                <label htmlFor="images" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Image URLs (comma-separated) *
                </label>
                <textarea
                  id="images"
                  required
                  placeholder="/images/products/tshirt-1.jpg, /images/products/tshirt-2.jpg"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <Upload className="h-4 w-4 mr-1" />
                  Separate multiple image URLs with commas
                </p>
              </div>

              {/* Sizes */}
              <div className="group">
                <label htmlFor="sizes" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                  <Ruler className="h-4 w-4 mr-1" />
                  Available Sizes (comma-separated) *
                </label>
                <Input
                  id="sizes"
                  type="text"
                  required
                  placeholder="S,M,L,XL,XXL"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                  className="w-full h-12 text-lg"
                />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Example: S,M,L,XL,XXL
                </p>
              </div>

              {/* Colors */}
              <div className="group">
                <label htmlFor="colors" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                  <Palette className="h-4 w-4 mr-1" />
                  Available Colors (comma-separated) *
                </label>
                <Input
                  id="colors"
                  type="text"
                  required
                  placeholder="Black,White,Gray,Navy,Red"
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  className="w-full h-12 text-lg"
                />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Example: Black,White,Gray,Navy,Red
                </p>
              </div>
            </div>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Product...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Create Product
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/products')}
              className="px-8 h-14 text-lg font-semibold"
            >
              Cancel
            </Button>
          </div>

          {/* Help Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Pro Tips for Great Product Listings
              </h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                  <span>Use clear, descriptive product names that customers will search for</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                  <span>Write detailed descriptions highlighting key features and benefits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                  <span>Use high-quality images (store in /public/images/products/)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                  <span>Choose the correct print size category for accurate product display</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                  <span>Set realistic stock levels to prevent overselling</span>
                </li>
              </ul>
            </div>
          </Card>
        </form>
      </div>
    </div>
  )
}
