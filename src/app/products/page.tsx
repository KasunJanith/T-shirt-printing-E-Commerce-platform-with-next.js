'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/products/product-card-new'
import { ProductModal } from '@/components/products/product-modal'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Filter, SlidersHorizontal, Search, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  printSize: 'SMALL' | 'MEDIUM' | 'FULL'
  inStock: boolean
  featured: boolean
}

type PrintSizeFilter = 'ALL' | 'SMALL' | 'MEDIUM' | 'FULL'

export default function BrowseProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)
  
  // Filters
  const [printSizeFilter, setPrintSizeFilter] = useState<PrintSizeFilter>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState<'ALL' | 'LOW' | 'MID' | 'HIGH'>('ALL')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, printSizeFilter, searchQuery, priceRange])
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }
  const filterProducts = () => {
    if (!Array.isArray(products)) {
      setFilteredProducts([])
      return
    }
    
    let filtered = [...products]

    // Print size filter
    if (printSizeFilter !== 'ALL') {
      filtered = filtered.filter(p => p.printSize === printSizeFilter)
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Price range filter
    if (priceRange !== 'ALL') {
      filtered = filtered.filter(p => {
        const price = Number(p.price)
        if (priceRange === 'LOW') return price < 20
        if (priceRange === 'MID') return price >= 20 && price < 35
        if (priceRange === 'HIGH') return price >= 35
        return true
      })
    }

    setFilteredProducts(filtered)
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const printSizeOptions = [
    { value: 'ALL', label: 'All Sizes', icon: '🎨' },
    { value: 'SMALL', label: 'Small Print', description: 'Subtle logo or text', icon: '📏' },
    { value: 'MEDIUM', label: 'Medium Print', description: 'Standard design', icon: '🖼️' },
    { value: 'FULL', label: 'Full Print', description: 'All-over design', icon: '🎯' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
              Custom T-Shirt Printing
            </h1>
            <p className="text-xl text-white/90 mb-6">
              High-quality prints on premium t-shirts. Choose your design size and create something amazing!
            </p>
            <div className="flex items-center justify-center gap-3 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">✓</span>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">✓</span>
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">✓</span>
                <span>Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <Card className="p-6 shadow-lg border-2 border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search t-shirts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-gray-900 border-gray-300 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Toggle Filters Button (Mobile) */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden text-gray-900"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Filters Section */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-6 pt-6 border-t`}>
              {/* Print Size Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Print Size
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {printSizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPrintSizeFilter(option.value as PrintSizeFilter)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        printSizeFilter === option.value
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{option.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 text-sm">
                            {option.label}
                          </div>
                          {option.description && (
                            <div className="text-xs text-gray-600 mt-1">
                              {option.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    variant={priceRange === 'ALL' ? 'default' : 'outline'}
                    onClick={() => setPriceRange('ALL')}
                    className="text-gray-900"
                  >
                    All Prices
                  </Button>
                  <Button
                    variant={priceRange === 'LOW' ? 'default' : 'outline'}
                    onClick={() => setPriceRange('LOW')}
                    className="text-gray-900"
                  >
                    Under $20
                  </Button>
                  <Button
                    variant={priceRange === 'MID' ? 'default' : 'outline'}
                    onClick={() => setPriceRange('MID')}
                    className="text-gray-900"
                  >
                    $20 - $35
                  </Button>
                  <Button
                    variant={priceRange === 'HIGH' ? 'default' : 'outline'}
                    onClick={() => setPriceRange('HIGH')}
                    className="text-gray-900"
                  >
                    $35+
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-700">
            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
          {(printSizeFilter !== 'ALL' || searchQuery || priceRange !== 'ALL') && (
            <Button
              variant="ghost"
              onClick={() => {
                setPrintSizeFilter('ALL')
                setSearchQuery('')
                setPriceRange('ALL')
              }}
              className="text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-700 mb-6">
              Try adjusting your filters or search query
            </p>
            <Button
              onClick={() => {
                setPrintSizeFilter('ALL')
                setSearchQuery('')
                setPriceRange('ALL')
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Clear All Filters
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {showModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setShowModal(false)
            setSelectedProduct(null)
          }}
        />
      )}
    </div>
  )
}
