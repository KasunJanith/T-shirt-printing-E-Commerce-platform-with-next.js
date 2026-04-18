import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Truck, Shield, Sparkles, Star, Award, Clock, TrendingUp, ArrowRight, Package } from 'lucide-react'
import { prisma } from '@/lib/db'

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 8,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        variants: true,
      },
    })
    return products
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section with Animation */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-10 dark:opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-10 dark:opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-10 dark:opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-bounce-slow">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">Custom Printing Services 2025</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-in-left">
                Design Your Own
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200 dark:from-yellow-300 dark:to-pink-300 animate-gradient">
                  Custom T-Shirts
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-blue-50 dark:text-blue-100 leading-relaxed animate-fade-in">
                High-quality custom t-shirt printing with fast turnaround. Perfect for events, teams, businesses, and personal style.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-500">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-indigo-600 dark:text-indigo-900 font-semibold shadow-xl hover:shadow-2xl border border-white/70 hover:bg-white/90 hover:scale-105 transition-all duration-300 text-lg px-8 py-6 group focus-visible:ring-offset-0"
                >
                  <Link href="/products" className="flex items-center justify-center gap-2 text-current">
                    <Package className="h-5 w-5 group-hover:animate-bounce" />
                    Start Designing
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 hover:scale-105 hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6">
                  <Link href="/products">
                    View Catalog
                  </Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-in-up animation-delay-1000">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">15K+</div>
                  <div className="text-sm text-blue-100 dark:text-blue-200">Orders Printed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">24hr</div>
                  <div className="text-sm text-blue-100 dark:text-blue-200">Fast Turnaround</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">4.9★</div>
                  <div className="text-sm text-blue-100 dark:text-blue-200">Customer Rating</div>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="hidden lg:block animate-fade-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:scale-105 transition-transform duration-500 shadow-2xl">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    <Image
                      src="/images/products/tshirt1.jpeg"
                      alt="Custom Printed T-Shirts"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce-slow">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-sm">Premium Quality</span>
                    </div>
                    
                    {/* Bottom Info Card */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">Custom Printing</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Any Design, Any Color</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Order Now
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Features Section with Animation */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Our Printing Service</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Professional custom t-shirt printing with exceptional quality and service for businesses, events, and individuals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Premium Quality"
              description="High-quality prints that last"
              color="blue"
              delay="0"
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title="Fast Turnaround"
              description="24-hour production time"
              color="purple"
              delay="100"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Custom Designs"
              description="Any design, any color"
              color="pink"
              delay="200"
            />
            <FeatureCard
              icon={<Truck className="w-8 h-8" />}
              title="Free Shipping"
              description="On bulk orders over $50"
              color="green"
              delay="300"
            />
          </div>
        </div>
      </section>

      {/* Print Sizes Section with Animation */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Choose Your Print Size</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From subtle logos to bold all-over designs, we offer custom printing in three sizes to match your vision
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PrintSizeCard
              title="Small Print"
              description="Perfect for subtle logos or text"
              icon="📏"
              size='4" x 4"'
              href="/products?printSize=SMALL"
            />
            <PrintSizeCard
              title="Medium Print"
              description="Standard design covering chest area"
              icon="🖼️"
              size='10" x 12"'
              href="/products?printSize=MEDIUM"
            />
            <PrintSizeCard
              title="Full Print"
              description="All-over design for maximum impact"
              icon="🎯"
              size='12" x 16"'
              href="/products?printSize=FULL"
            />
          </div>
        </div>
      </section>

      {/* Featured Products - Dynamic */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Recently Added</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Check out our latest arrivals and trending designs
            </p>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
              <p className="text-gray-600 dark:text-gray-400">No products available yet</p>
            </div>
          )}
          
          <div className="text-center mt-12 animate-fade-in-up">
            <Button asChild size="lg" className="group">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 text-blue-100 dark:text-blue-200">
              Subscribe to our newsletter for exclusive offers and new arrivals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button size="lg" className="bg-white text-white-600 hover:bg-gray-100 dark:hover:bg-gray-200">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PrintSizeCard({ title, description, icon, size, href }: { 
  title: string
  description: string
  icon: string
  size: string
  href: string 
}) {
  return (
    <Link href={href} className="group animate-fade-in-up">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 border-2 border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-400 dark:group-hover:border-blue-500 group-hover:-translate-y-2 group-hover:scale-105">
        <div className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
        <div className="inline-block px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-900 dark:text-gray-100">
          Print Size: {size}
        </div>
        <p className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium mt-4 flex items-center">
          Explore {title} 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
        </p>
      </div>
    </Link>
  )
}

function FeatureCard({ icon, title, description, color, delay }: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  delay: string
}) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  }

  return (
    <div 
      className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-fade-in-up border border-gray-200 dark:border-gray-700"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClasses[color as keyof typeof colorClasses]} mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

function ProductCard({ product, index }: { product: any; index: number }) {
  const formatPrice = (price: any) => {
    return `$${Number(price).toFixed(2)}`
  }

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-105">
        <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600" />
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-gray-900 dark:text-white line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">4.9</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function CategoryCard({ title, href, image }: { title: string; href: string; image: string }) {
  return (
    <Link href={href} className="group">
      <div className="relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 aspect-[4/5]">
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