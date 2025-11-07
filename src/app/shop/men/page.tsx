'use client'

import { useState, useEffect } from 'react'
import { ProductGrid } from '@/components/products/product-grid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  stock: number
}

export default function MenShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      const menProducts = data.filter((p: Product) => 
        p.category.toLowerCase() === 'men'
      )
      setProducts(menProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center bg-white/10 px-4 py-2 rounded-full mb-4 backdrop-blur-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Trending Now</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Men's Collection</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Discover premium quality t-shirts designed for the modern man. 
              From casual to sporty, find your perfect style.
            </p>            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/shop" className="flex items-center">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">👔</div>
              <h3 className="font-semibold mb-1 text-gray-900">Premium Fabric</h3>
              <p className="text-sm text-gray-700">100% cotton comfort</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-semibold mb-1 text-gray-900">Modern Fits</h3>
              <p className="text-sm text-gray-700">Tailored for your style</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold mb-1 text-gray-900">Bold Designs</h3>
              <p className="text-sm text-gray-700">Stand out from the crowd</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 py-12">        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-700">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">No products available</h3>
            <p className="text-gray-700 mb-6">Check back soon for new arrivals</p>
            <Button asChild>
              <Link href="/shop">Browse All Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Men's T-Shirts</h2>
              <p className="text-gray-700">
                Showing {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            <ProductGrid products={products} />
          </>
        )}
      </div>
    </div>
  )
}
