'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Heart, Star, Truck, RotateCcw, Shield, ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { dispatch } = useCart()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string)
    }
  }, [params.id])

  const fetchProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`)
      if (res.ok) {
        const data = await res.json()
        setProduct(data)
        if (data.sizes.length > 0) setSelectedSize(data.sizes[0])
        if (data.colors.length > 0) setSelectedColor(data.colors[0])
      } else {
        router.push('/shop')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      router.push('/shop')
    } finally {
      setLoading(false)
    }
  }
  const handleAddToCart = () => {
    if (!product || !selectedSize) return

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product.id}-${selectedSize}-${selectedColor}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
        quantity: quantity
      }
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  if (loading) {
    return (      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-700">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/shop" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <Card className="p-4 mb-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={product.images[selectedImageIndex] || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-blue-600 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
              
              {/* Rating */}              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-gray-700">(4.9) • 128 reviews</span>              </div>

              <div className="text-4xl font-bold text-blue-600 mb-6">
                ${Number(product.price).toFixed(2)}
              </div>

              <p className="text-gray-700 text-lg mb-6">{product.description}</p>
            </div>            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Select Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Select Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 border-2 rounded-lg font-medium capitalize transition-all ${
                        selectedColor === color
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-gray-400 font-bold"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center text-gray-900">{quantity}</span>                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-gray-400 font-bold"
                >
                  +
                </button>
                <span className="text-gray-700 ml-4">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || !selectedSize}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </Button>
              
              <Button size="lg" variant="outline" className="w-full">
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>            {/* Features */}
            <Card className="p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <Truck className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Free Shipping</h3>
                  <p className="text-sm text-gray-700">Free shipping on orders over $50</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <RotateCcw className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">30-Day Returns</h3>
                  <p className="text-sm text-gray-700">Easy returns within 30 days</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Quality Guarantee</h3>
                  <p className="text-sm text-gray-700">Premium materials, built to last</p>
                </div>
              </div>
            </Card>
          </div>
        </div>        {/* Product Details */}
        <div className="mt-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Product Details</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-gray-900">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description} Made with premium quality materials for ultimate 
                  comfort and durability. Perfect for everyday wear, casual outings, or 
                  lounging at home.
                </p>              </div>
              <div>
                <h3 className="font-semibold mb-4 text-gray-900">Specifications</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 100% Premium Cotton</li>
                  <li>• Pre-shrunk fabric</li>
                  <li>• Reinforced stitching</li>
                  <li>• Machine washable</li>
                  <li>• Available sizes: {product.sizes.join(', ')}</li>
                  <li>• Colors: {product.colors.join(', ')}</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
