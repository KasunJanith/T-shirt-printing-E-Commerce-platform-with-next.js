'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Eye } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
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

interface ProductCardProps {
  product: Product
  onClick: () => void
}

const printSizeLabels = {
  SMALL: { label: 'Small Print', color: 'bg-green-100 text-green-700', icon: '📏' },
  MEDIUM: { label: 'Medium Print', color: 'bg-blue-100 text-blue-700', icon: '🖼️' },
  FULL: { label: 'Full Print', color: 'bg-purple-100 text-purple-700', icon: '🎯' },
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { dispatch } = useCart()
  const { data: session } = useSession()
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Check if user is logged in
    if (!session) {
      setShowLoginModal(true)
      return
    }
    
    setIsAdding(true)
    
    // Default selection for quick add
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product.id}-M-White`,
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: 1,
        image: product.images[0] || '/images/products/tshirt-1.jpg',
        size: 'M', // Default size
        color: 'White', // Default color
      }
    })

    setShowSuccess(true)
    setTimeout(() => {
      setIsAdding(false)
      setShowSuccess(false)
    }, 2000)
  }

  const printSizeInfo = printSizeLabels[product.printSize]

  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-gray-100 hover:border-blue-200"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.images[0] || '/images/products/tshirt-1.jpg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 bg-white/90 hover:bg-white text-gray-900"
              onClick={(e) => {
                e.stopPropagation()
                onClick()
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        </div>

        {/* Print Size Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${printSizeInfo.color} border-0 shadow-lg`}>
            <span className="mr-1">{printSizeInfo.icon}</span>
            {printSizeInfo.label}
          </Badge>
        </div>        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute top-3 right-3">
            <Badge variant="danger" className="shadow-lg">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className={`transition-all duration-200 ${
              showSuccess 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {showSuccess ? (
              <>
                <span className="mr-2">✓</span>
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </>
            )}
          </Button>
        </div>
      </div>      {/* Success Animation */}
      {showSuccess && (
        <div className="absolute inset-0 bg-green-500/20 animate-pulse pointer-events-none"></div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </Card>
  )
}
