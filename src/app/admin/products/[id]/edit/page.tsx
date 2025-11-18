'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Sparkles, DollarSign, Layers, Package, ImageIcon, Ruler, Palette, Save, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
}

export default function EditProduct() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    images: '',
    inStock: true,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      if (session?.user?.role !== 'ADMIN') {
        router.push('/')
      } else {
        fetchCategories()
        fetchProduct()
      }
    }
  }, [status, session, router])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      if (response.ok) {
        const product = await response.json()
        setFormData({
          name: product.name,
          description: product.description || '',
          price: product.price.toString(),
          categoryId: product.categoryId,
          images: Array.isArray(product.images) ? product.images.join(', ') : product.images,
          inStock: product.inStock,
        })
      } else {
        alert('Product not found')
        router.push('/admin/products')
      }
    } catch (error) {
      console.error('Failed to fetch product:', error)
      alert('Error loading product')
      router.push('/admin/products')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          categoryId: formData.categoryId,
          images: formData.images.split(',').map(img => img.trim()).filter(img => img),
          inStock: formData.inStock,
        }),
      })

      if (response.ok) {
        alert('Product updated successfully!')
        router.push('/admin/products')
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to update product')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Error updating product')
    } finally {
      setLoading(false)
    }
  }
  if (status === 'loading' || fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Header with Gradient */}
        <div className="mb-8 animate-fade-in-up">
          <Button variant="ghost" asChild className="mb-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <Link href="/admin/products" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-xl">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Edit Product</h1>
            </div>
            <p className="text-blue-100 text-lg">Update your product information and settings</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up animation-delay-500">
          {/* Product Information Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Sparkles className="mr-2 h-6 w-6" />
                Product Information
              </h2>
              <p className="text-blue-100 mt-1">Update basic details about your product</p>
            </div>
            <div className="p-8 space-y-6">
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  <Layers className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Product Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g., Classic Cotton T-Shirt"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 text-base border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  <Package className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter a detailed product description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full min-h-[140px] px-4 py-3 text-base border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Price and Print Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    <DollarSign className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
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
                    className="w-full h-12 text-base border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    <Ruler className="mr-2 h-5 w-5 text-pink-600 dark:text-pink-400" />
                    Print Size Category *
                  </label>
                  <select
                    id="category"
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full h-12 px-4 text-base border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white"
                  >
                    <option value="">Select print size</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stock Status */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="mr-3 h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center">
                    <Package className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Product is in stock</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Media & Images Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <ImageIcon className="mr-2 h-6 w-6" />
                Product Images
              </h2>
              <p className="text-purple-100 mt-1">Update product image URLs</p>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label htmlFor="images" className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  <ImageIcon className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Image URLs (comma-separated) *
                </label>
                <textarea
                  id="images"
                  required
                  placeholder="/images/products/tshirt-1.jpg, /images/products/tshirt-2.jpg"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full min-h-[100px] px-4 py-3 text-base border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-start">
                  <span className="mr-2">💡</span>
                  Enter image paths or URLs separated by commas
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Updating Product...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Update Product
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/products')}
              className="flex-1 h-14 text-lg font-semibold border-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
          </div>

          {/* Pro Tips Card */}
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Update Checklist 📝</h3>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <span className="mr-2 text-blue-600 dark:text-blue-400">✓</span>
                    Ensure all product information is accurate and up-to-date
                  </li>
                  <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <span className="mr-2 text-blue-600 dark:text-blue-400">✓</span>
                    Verify image URLs are valid and accessible
                  </li>
                  <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <span className="mr-2 text-blue-600 dark:text-blue-400">✓</span>
                    Update stock status to reflect current inventory
                  </li>
                  <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <span className="mr-2 text-blue-600 dark:text-blue-400">✓</span>
                    Review pricing changes carefully before saving
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
