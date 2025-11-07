import { Card } from '@/components/ui/card'
import { RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Return & Exchange Policy</h1>
          <p className="text-xl text-white/90">
            We want you to love your purchase. Returns are easy!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">            <Card className="p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900">30 Days</h3>
              <p className="text-sm text-gray-700">Return window for all items</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900">Free Returns</h3>
              <p className="text-sm text-gray-700">On defective products</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900">Easy Process</h3>
              <p className="text-sm text-gray-700">Simple return steps</p>
            </Card>
          </div>          {/* Return Policy */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Return Policy</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Eligible Returns
                </h3>
                <ul className="space-y-2 text-gray-700 ml-7">
                  <li>• Items must be returned within 30 days of delivery</li>
                  <li>• Products must be unworn and unwashed</li>
                  <li>• Original tags must be attached</li>
                  <li>• Items must be in original packaging</li>
                  <li>• Proof of purchase required</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <XCircle className="h-5 w-5 mr-2 text-red-600" />
                  Non-Returnable Items
                </h3>
                <ul className="space-y-2 text-gray-700 ml-7">
                  <li>• Custom or personalized items</li>
                  <li>• Items marked as final sale</li>
                  <li>• Products without original tags</li>
                  <li>• Worn, washed, or damaged items</li>
                  <li>• Items past the 30-day return window</li>
                </ul>
              </div>
            </div>
          </Card>          {/* How to Return */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">How to Return an Item</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Log in to Your Account</h3>
                  <p className="text-gray-700">
                    Go to your order history and select the order you'd like to return.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Request a Return</h3>
                  <p className="text-gray-700">
                    Click "Return Item" and select the reason for your return. We'll provide 
                    a prepaid return label if eligible.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Pack Your Item</h3>
                  <p className="text-gray-700">
                    Place the item in its original packaging (if possible) and attach the 
                    return label to the outside of the package.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Ship It Back</h3>
                  <p className="text-gray-700">
                    Drop off your package at any authorized shipping location. Keep your 
                    tracking number for your records.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Get Your Refund</h3>
                  <p className="text-gray-700">
                    Once we receive and inspect your return, we'll process your refund within 
                    5-7 business days to your original payment method.
                  </p>
                </div>
              </div>
            </div>
          </Card>          {/* Exchanges */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Exchanges</h2>
            <p className="text-gray-700 mb-4">
              We currently don't offer direct exchanges. If you need a different size or color:
            </p>
            <ol className="space-y-2 text-gray-700 ml-6">
              <li>1. Return your original item for a refund</li>
              <li>2. Place a new order for the item you want</li>
            </ol>
            <p className="text-gray-700 mt-4">
              This ensures you get your preferred item as quickly as possible.
            </p>
          </Card>          {/* Defective Items */}
          <Card className="p-8 mb-8 bg-red-50 border-red-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Defective or Damaged Items</h2>
            <p className="text-gray-700 mb-4">
              If you receive a defective or damaged item, we'll make it right:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Contact us within 7 days of delivery</li>
              <li>• Provide photos of the defect or damage</li>
              <li>• We'll send a replacement or offer a full refund</li>
              <li>• Free return shipping on defective items</li>
            </ul>
          </Card>          {/* Contact */}
          <Card className="p-8 bg-blue-50 border-blue-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              Our customer service team is here to assist with any return questions:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> returns@shirtcanary.com</p>
              <p><strong>Phone:</strong> +1 (234) 567-890</p>
              <p><strong>Hours:</strong> Monday-Friday, 8am-6pm EST</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
