import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Users, Sparkles, Heart, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-white py-24 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Shirt Canary</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We&apos;re passionate about delivering premium quality t-shirts that combine 
              comfort, style, and sustainability.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20 animate-fade-in-up">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg">
                <p>
                  Founded in 2024, Shirt Canary began with a simple mission: to create 
                  the perfect t-shirt. We believe that a great t-shirt should be more 
                  than just clothing—it should be an expression of who you are.
                </p>
                <p>
                  What started as a small workshop has grown into a beloved brand, but 
                  our commitment to quality and customer satisfaction remains unchanged. 
                  Every shirt is crafted with attention to detail and a passion for excellence.
                </p>                <p>
                  Today, we&apos;re proud to serve thousands of customers worldwide, delivering 
                  premium t-shirts that people love to wear every day.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl animate-fade-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <Sparkles className="h-24 w-24 mx-auto mb-4 animate-pulse-slow" />
                  <p className="text-2xl font-semibold">Quality & Craftsmanship</p>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white animate-fade-in-up">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up border-gray-200 dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Quality First</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We never compromise on quality. Every product is thoroughly tested 
                  and made with premium materials.
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up border-gray-200 dark:border-gray-700">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Sustainability</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We&apos;re committed to sustainable practices, from sourcing to packaging, 
                  to protect our planet.
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up border-gray-200 dark:border-gray-700">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Customer Focus</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Your satisfaction is our priority. We&apos;re always here to ensure 
                  you have the best experience.
                </p>
              </Card>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-3xl p-12 mb-20 text-white animate-fade-in-up shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                <div className="text-white/80">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-white/80">Products Sold</div>
              </div>              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
                <div className="text-white/80">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                <div className="text-white/80">Quality Guaranteed</div>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose Shirt Canary?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">                    <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Premium Quality</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      100% premium cotton, pre-shrunk, and designed to last. Our shirts 
                      maintain their shape and softness wash after wash.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Trendy Designs</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Stay ahead of fashion with our constantly updated collection of 
                      modern designs and classic styles.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Perfect Fit</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Available in a wide range of sizes (XS-XXL) with detailed sizing 
                      guides to help you find your perfect fit.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-lg">
                    <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Customer Care</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Dedicated support team, easy returns, and a satisfaction guarantee. 
                      We're here for you every step of the way.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Experience the Difference?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
              Join thousands of satisfied customers who&apos;ve made the switch to Shirt Canary.
            </p>
            <Button size="lg" asChild className="group">
              <Link href="/shop" className="flex items-center justify-center">
                Shop Now
                <Sparkles className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
