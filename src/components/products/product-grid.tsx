import { ProductCard } from './product-card'

// Mock data - replace with actual data from database
const mockProducts = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    price: 29.99,
    images: ['/images/tshirt-1.jpg'],
    category: 'men',
    inStock: true,
  },
  {
    id: '2',
    name: 'Premium Fit T-Shirt',
    price: 39.99,
    images: ['/images/tshirt-2.jpg'],
    category: 'men',
    inStock: true,
  },
  {
    id: '3',
    name: 'V-Neck T-Shirt',
    price: 34.99,
    images: ['/images/tshirt-3.jpg'],
    category: 'women',
    inStock: true,
  },
  {
    id: '4',
    name: 'Kids Graphic Tee',
    price: 24.99,
    images: ['/images/tshirt-4.jpg'],
    category: 'kids',
    inStock: true,
  },
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}