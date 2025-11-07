'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ShoppingCart, Check, Minus, Plus, Ruler, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/context/cart-context'
import { useSession } from 'next-auth/react'
import { LoginModal } from '@/components/modals/login-modal'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  printSize: 'SMALL' | 'MEDIUM' | 'FULL'
  inStock: boolean
}

interface ProductModalProps {
  product: Product
  onClose: () => void
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const colors = [
  { name: 'White', hex: '#FFFFFF', border: true },
  { name: 'Black', hex: '#000000' },
  { name: 'Navy', hex: '#1E3A8A' },
  { name: 'Gray', hex: '#6B7280' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Green', hex: '#16A34A' },
  { name: 'Yellow', hex: '#EAB308' },
]

const printSizeInfo = {
  SMALL: {
    label: 'Small Print',
    description: 'Perfect for subtle logos or text on chest area (4" x 4")',
    icon: '📏',
    color: 'bg-green-100 text-green-700'
  },
  MEDIUM: {
    label: 'Medium Print',
    description: 'Standard design size covering chest area (10" x 12")',
    icon: '🖼️',
    color: 'bg-blue-100 text-blue-700'
  },
  FULL: {
    label: 'Full Print',
    description: 'All-over design covering entire front (12" x 16")',
    icon: '🎯',
    color: 'bg-purple-100 text-purple-700'
  },
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { dispatch } = useCart()
  const { data: session } = useSession()
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('White')
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const printInfo = printSizeInfo[product.printSize]

  const handleAddToCart = () => {
    // Check if user is logged in
    if (!session) {
      setShowLoginModal(true)
      return
    }
    
    setIsAdding(true)

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product.id}-${selectedSize}-${selectedColor}`,
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        quantity,
        image: product.images[0] || '/images/products/tshirt-1.jpg',
        size: selectedSize,
        color: selectedColor,
      }
    })

    setShowSuccess(true)
    setTimeout(() => {
      setIsAdding(false)
      setShowSuccess(false)
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-lg">
              <Image
                src={product.images[currentImage] || '/images/products/tshirt-1.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      currentImage === index
                        ? 'border-blue-500 scale-95'
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

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-blue-600">
                  ${Number(product.price).toFixed(2)}
                </span>
                <Badge className={printInfo.color}>
                  <span className="mr-1">{printInfo.icon}</span>
                  {printInfo.label}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Print Size Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">{printInfo.icon}</span>
                {printInfo.label}
              </h4>
              <p className="text-sm text-gray-700">
                {printInfo.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                Select Size
              </label>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-2 rounded-lg font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Select Color
              </label>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative group`}
                    title={color.name}
                  >
                    <div
                      className={`w-12 h-12 rounded-full transition-all ${
                        selectedColor === color.name
                          ? 'ring-4 ring-blue-500 scale-110'
                          : 'ring-2 ring-gray-300 hover:ring-gray-400'
                      } ${color.border ? 'ring-1 ring-gray-300' : ''}`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="h-6 w-6 text-white drop-shadow-lg" style={{
                            color: color.name === 'White' ? '#000' : '#fff'
                          }} />
                        </div>
                      )}
                    </div>
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4 text-gray-600" />
                  </button>
                  <span className="px-6 py-2 font-semibold text-gray-900 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  Total: <span className="font-bold text-gray-900 text-lg">
                    ${(Number(product.price) * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              className={`w-full h-14 text-lg font-semibold transition-all ${
                showSuccess
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white shadow-lg hover:shadow-xl`}
            >
              {showSuccess ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {isAdding ? 'Adding...' : 'Add to Cart'}
                </>
              )}
            </Button>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>100% Cotton</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>Free Shipping $50+</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>Eco-Friendly Ink</span>              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  )
}
