import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProductGrid } from '@/components/products/product-grid'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Premium Quality T-Shirts
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover our exclusive collection of comfortable and stylish t-shirts for every occasion.
            </p>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/shop">
                Shop Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CategoryCard
              title="Men's Collection"
              href="/shop/men"
              image="/images/mens-category.jpg"
            />
            <CategoryCard
              title="Women's Collection"
              href="/shop/women"
              image="/images/womens-category.jpg"
            />
            <CategoryCard
              title="Kids' Collection"
              href="/shop/kids"
              image="/images/kids-category.jpg"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <ProductGrid />
        </div>
      </section>
    </div>
  )
}

function CategoryCard({ title, href, image }: { title: string; href: string; image: string }) {
  return (
    <Link href={href} className="group">
      <div className="relative overflow-hidden rounded-lg bg-gray-200 aspect-[4/5]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-blue-200 group-hover:text-white transition-colors">
            Shop Now →
          </p>
        </div>
      </div>
    </Link>
  )
}