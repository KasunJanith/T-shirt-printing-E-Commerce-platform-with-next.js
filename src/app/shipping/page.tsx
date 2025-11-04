import { Card } from '@/components/ui/card'
import { Truck, Package, MapPin, Clock } from 'lucide-react'

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping Information</h1>
          <p className="text-xl text-white/90">
            Fast, reliable shipping to your doorstep
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Shipping Methods */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">            <Card className="p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Standard Shipping</h3>
              <p className="text-gray-800 mb-4">3-5 business days</p>
              <p className="text-2xl font-bold text-gray-900">FREE</p>
              <p className="text-sm text-gray-700">on orders over $50</p>
            </Card>

            <Card className="p-6">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Express Shipping</h3>
              <p className="text-gray-800 mb-4">1-2 business days</p>
              <p className="text-2xl font-bold text-gray-900">$14.99</p>
              <p className="text-sm text-gray-700">Get it faster</p>
            </Card>
          </div>

          {/* Shipping Details */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Domestic Shipping (United States)
                </h3>
                <ul className="space-y-2 text-gray-700 ml-7">
                  <li>• Free standard shipping on orders over $50</li>
                  <li>• Standard shipping (3-5 business days): $5.99</li>
                  <li>• Express shipping (1-2 business days): $14.99</li>
                  <li>• We ship to all 50 states, including Alaska and Hawaii</li>
                  <li>• P.O. boxes accepted</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-blue-600" />
                  International Shipping
                </h3>
                <ul className="space-y-2 text-gray-700 ml-7">
                  <li>• We ship to over 50 countries worldwide</li>
                  <li>• International shipping rates vary by destination</li>
                  <li>• Delivery time: 7-14 business days</li>
                  <li>• Customs fees may apply (paid by recipient)</li>
                  <li>• Limited tracking available for some countries</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Processing Time
                </h3>
                <ul className="space-y-2 text-gray-700 ml-7">
                  <li>• Orders are processed within 1-2 business days</li>
                  <li>• Orders placed on weekends/holidays are processed the next business day</li>
                  <li>• You'll receive a tracking number once your order ships</li>
                  <li>• Custom orders may take additional time</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Order Tracking */}
          <Card className="p-8 mb-8 bg-blue-50 border-blue-200">
            <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>
            <p className="text-gray-700 mb-4">
              Once your order ships, you'll receive an email with your tracking number. 
              You can also track your order status by logging into your account and 
              viewing your order history.
            </p>
            <p className="text-gray-700">
              <strong>Having issues?</strong> Contact our customer service team at 
              support@shirtcanary.com
            </p>
          </Card>

          {/* FAQs */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Shipping FAQs</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Can I change my shipping address after placing an order?</h3>
                <p className="text-gray-700">
                  Please contact us immediately if you need to change your shipping address. 
                  We can update it if the order hasn't been shipped yet.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Do you offer same-day shipping?</h3>
                <p className="text-gray-700">
                  We don't currently offer same-day shipping, but orders placed before 2 PM EST 
                  are typically processed and shipped the same business day.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What if my package is lost or damaged?</h3>
                <p className="text-gray-700">
                  If your package arrives damaged or doesn't arrive at all, please contact us 
                  within 7 days. We'll work with you to resolve the issue quickly.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Do you ship to military addresses (APO/FPO)?</h3>
                <p className="text-gray-700">
                  Yes! We're proud to ship to APO/FPO addresses. These orders are processed 
                  as domestic shipments.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
