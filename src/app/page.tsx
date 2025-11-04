import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ProductGrid } from '@/components/products/product-grid'
import { ShoppingBag, Truck, Shield, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative container mx-auto px-4 py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">New Collection 2025</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Premium Quality
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                T-Shirts
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-50 leading-relaxed">
              Discover our exclusive collection of comfortable and stylish t-shirts for every occasion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 transition-transform text-lg px-8 py-6">
                <Link href="/shop">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-6">
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Free Shipping</h3>
              <p className="text-gray-700">On orders over $50</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Secure Payment</h3>
              <p className="text-gray-700">100% secure transactions</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Premium Quality</h3>
              <p className="text-gray-700">Best fabric & print quality</p>
            </div>
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
              image="/images/categories/mens-category.jpg"
            />
            <CategoryCard
              title="Women's Collection"
              href="/shop/women"
              image="/images/categories/womens-category.jpg"
            />
            <CategoryCard
              title="Kids' Collection"
              href="/shop/kids"
              image="/images/categories/kids-category.jpg"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Products</h2>
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
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white z-10">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-blue-200 group-hover:text-white transition-colors">
            Shop Now →
          </p>
        </div>
      </div>
    </Link>
  )
}