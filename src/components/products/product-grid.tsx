'use client'

import { useState } from 'react'
import { ProductCard, type StorefrontProduct } from './product-card'
import { ProductModal } from './product-modal'

interface Product {
  id: string
  name: string
  price: number
  description?: string
  images?: string[]
  category?: string
  inStock?: boolean
  stock?: number
  printSize?: 'SMALL' | 'MEDIUM' | 'FULL'
}

interface ProductGridProps {
  products?: Product[]
}

const mockProducts: StorefrontProduct[] = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    description: 'Soft, breathable cotton with a relaxed fit for everyday comfort.',
    price: 29.99,
    images: ['/images/products/tshirt-1.jpg'],
    printSize: 'MEDIUM',
    inStock: true,
  },
  {
    id: '2',
    name: 'Premium Fit T-Shirt',
    description: 'Tailored silhouette crafted with premium stretch cotton.',
    price: 39.99,
    images: ['/images/products/tshirt-2.jpg'],
    printSize: 'FULL',
    inStock: true,
  },
  {
    id: '3',
    name: 'V-Neck T-Shirt',
    description: 'A flattering v-neck cut designed to elevate casual outfits.',
    price: 34.99,
    images: ['/images/products/tshirt-3.jpg'],
    printSize: 'SMALL',
    inStock: true,
  },
  {
    id: '4',
    name: 'Kids Graphic Tee',
    description: 'Play-ready graphic tee made with durable, easy-care fabric.',
    price: 24.99,
    images: ['/images/products/tshirt-4.jpg'],
    printSize: 'MEDIUM',
    inStock: true,
  },
]

const normalizeProduct = (product: Product): StorefrontProduct => ({
  id: product.id,
  name: product.name,
  description: product.description?.trim() || 'Premium comfort and vibrant prints for every occasion.',
  price: Number(product.price) || 0,
  images:
    product.images && product.images.length > 0
      ? product.images
      : ['/images/products/tshirt-1.jpg'],
  printSize: (product.printSize as StorefrontProduct['printSize']) || 'MEDIUM',
  inStock: product.inStock ?? (product.stock ? product.stock > 0 : true),
})

export function ProductGrid({ products }: ProductGridProps) {
  const normalizedProducts =
    products && products.length > 0 ? products.map(normalizeProduct) : mockProducts
  const [selectedProduct, setSelectedProduct] = useState<StorefrontProduct | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {normalizedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  )
}