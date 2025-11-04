import { ProductCard } from './product-card'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  category: string
  inStock?: boolean
  stock?: number
}

interface ProductGridProps {
  products?: Product[]
}

// Mock data - replace with actual data from database
const mockProducts = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    price: 29.99,
    images: ['/images/products/tshirt-1.jpg'],
    category: 'men',
    inStock: true,
  },
  {
    id: '2',
    name: 'Premium Fit T-Shirt',
    price: 39.99,
    images: ['/images/products/tshirt-2.jpg'],
    category: 'men',
    inStock: true,
  },
  {
    id: '3',
    name: 'V-Neck T-Shirt',
    price: 34.99,
    images: ['/images/products/tshirt-3.jpg'],
    category: 'women',
    inStock: true,
  },
  {
    id: '4',
    name: 'Kids Graphic Tee',
    price: 24.99,
    images: ['/images/products/tshirt-4.jpg'],
    category: 'kids',
    inStock: true,
  },
]

export function ProductGrid({ products }: ProductGridProps) {
  const displayProducts = products || mockProducts
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={{
            ...product,
            inStock: product.inStock ?? (product.stock ? product.stock > 0 : true)
          }} 
        />
      ))}
    </div>
  )
}