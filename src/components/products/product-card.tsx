'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Eye } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { KeyboardEvent, useState } from 'react'

export type StorefrontProduct = {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  printSize: 'SMALL' | 'MEDIUM' | 'FULL'
  inStock: boolean
}

interface ProductCardProps {
  product: StorefrontProduct
  onClick: () => void
}

const printSizeLabels = {
  SMALL: {
    label: 'Small Print',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200',
    icon: '📏',
  },
  MEDIUM: {
    label: 'Medium Print',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200',
    icon: '🖼️',
  },
  FULL: {
    label: 'Full Print',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-200',
    icon: '🎯',
  },
} as const

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { dispatch } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const primaryImage = product.images?.[0] || '/images/products/tshirt-1.jpg'
  const printSizeInfo = printSizeLabels[product.printSize] ?? printSizeLabels.MEDIUM

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsAdding(true)

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product.id}-quick-add`,
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: 1,
        image: primaryImage,
        size: 'M',
        color: 'White',
      },
    })

    setShowSuccess(true)
    setTimeout(() => {
      setIsAdding(false)
      setShowSuccess(false)
    }, 1600)
  }

  const handleViewDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onClick()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200 dark:hover:border-blue-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 bg-white/90 text-gray-900 hover:bg-white dark:bg-gray-900/90 dark:text-gray-100 dark:hover:bg-gray-900"
              onClick={handleViewDetails}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        </div>

        <div className="absolute top-3 left-3">
          <Badge className={`${printSizeInfo.color} border-0 shadow-lg`}>
            <span className="mr-1">{printSizeInfo.icon}</span>
            {printSizeInfo.label}
          </Badge>
        </div>

        {!product.inStock && (
          <div className="absolute top-3 right-3">
            <Badge variant="danger" className="shadow-lg">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${Number(product.price).toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className={`transition-all duration-200 text-white ${
              showSuccess
                ? 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            }`}
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
      </div>

      {showSuccess && (
        <div className="absolute inset-0 bg-green-500/20 animate-pulse pointer-events-none" aria-hidden="true"></div>
      )}
    </Card>
  )
}