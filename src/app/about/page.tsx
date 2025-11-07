import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Users, Sparkles, Heart, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Shirt Canary</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We're passionate about delivering premium quality t-shirts that combine 
              comfort, style, and sustainability.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-800 text-lg">
                <p>
                  Founded in 2024, Shirt Canary began with a simple mission: to create 
                  the perfect t-shirt. We believe that a great t-shirt should be more 
                  than just clothing—it should be an expression of who you are.
                </p>
                <p>
                  What started as a small workshop has grown into a beloved brand, but 
                  our commitment to quality and customer satisfaction remains unchanged. 
                  Every shirt is crafted with attention to detail and a passion for excellence.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers worldwide, delivering 
                  premium t-shirts that people love to wear every day.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <Sparkles className="h-24 w-24 mx-auto mb-4" />
                  <p className="text-2xl font-semibold">Quality & Craftsmanship</p>
                </div>
              </div>
            </div>
          </div>          {/* Values */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8"><Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Quality First</h3>
                <p className="text-gray-700">
                  We never compromise on quality. Every product is thoroughly tested 
                  and made with premium materials.
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Sustainability</h3>
                <p className="text-gray-700">
                  We're committed to sustainable practices, from sourcing to packaging, 
                  to protect our planet.
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Customer Focus</h3>
                <p className="text-gray-700">
                  Your satisfaction is our priority. We're always here to ensure 
                  you have the best experience.
                </p>
              </Card>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 mb-20 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                <div className="text-white/80">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-white/80">Products Sold</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
                <div className="text-white/80">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                <div className="text-white/80">Quality Guaranteed</div>
              </div>
            </div>
          </div>          {/* Why Choose Us */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Shirt Canary?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">Premium Quality</h3>
                    <p className="text-gray-700">
                      100% premium cotton, pre-shrunk, and designed to last. Our shirts 
                      maintain their shape and softness wash after wash.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">Trendy Designs</h3>
                    <p className="text-gray-700">
                      Stay ahead of fashion with our constantly updated collection of 
                      modern designs and classic styles.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">Perfect Fit</h3>
                    <p className="text-gray-700">
                      Available in a wide range of sizes (XS-XXL) with detailed sizing 
                      guides to help you find your perfect fit.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Heart className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">Customer Care</h3>
                    <p className="text-gray-700">
                      Dedicated support team, easy returns, and a satisfaction guarantee. 
                      We're here for you every step of the way.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Experience the Difference?</h2>
            <p className="text-gray-700 mb-8 text-lg">
              Join thousands of satisfied customers who've made the switch to Shirt Canary.
            </p>            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/shop" className="flex items-center justify-center">
                Shop Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
