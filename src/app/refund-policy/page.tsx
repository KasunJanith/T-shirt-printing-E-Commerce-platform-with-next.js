import { Card } from '@/components/ui/card'
import { DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund Policy</h1>
          <p className="text-xl text-white/90">
            Transparent and fair refund process
          </p>
          <p className="text-white/80 mt-2">Last updated: November 1, 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Quick Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">            <Card className="p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900">Full Refunds</h3>
              <p className="text-sm text-gray-700">For eligible returns</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900">5-7 Days</h3>
              <p className="text-sm text-gray-700">Processing time</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900">Original Method</h3>
              <p className="text-sm text-gray-700">Refunded to source</p>
            </Card>
          </div>          {/* Refund Eligibility */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Refund Eligibility</h2>
            
            <p className="text-gray-700 mb-4">
              We offer full refunds for products returned within 30 days of delivery, provided they meet our return criteria:
            </p>
            
            <div className="space-y-4">              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Items must be unworn and unwashed</h3>
                  <p className="text-gray-700 text-sm">
                    Products should be in the same condition as received
                  </p>
                </div>
              </div>              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Original tags attached</h3>
                  <p className="text-gray-700 text-sm">
                    All original tags and labels must still be attached
                  </p>
                </div>
              </div>              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Original packaging (if possible)</h3>
                  <p className="text-gray-700 text-sm">
                    Returns in original packaging are processed faster
                  </p>
                </div>
              </div>              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Proof of purchase</h3>
                  <p className="text-gray-700 text-sm">
                    Order confirmation or receipt required
                  </p>
                </div>
              </div>
            </div>
          </Card>          {/* Refund Process */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Refund Process</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Initiate Return</h3>
                  <p className="text-gray-700">
                    Log in to your account and request a return from your order history. 
                    You'll receive return instructions and a prepaid label (if eligible).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Ship the Item</h3>
                  <p className="text-gray-700">
                    Pack the item securely and ship it back using the provided label. 
                    We recommend keeping your tracking number.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Item Inspection</h3>
                  <p className="text-gray-700">
                    Once we receive your return, our team will inspect it to ensure it 
                    meets our return criteria. This typically takes 1-2 business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Refund Issued</h3>
                  <p className="text-gray-700">
                    After approval, your refund will be processed within 5-7 business days 
                    to your original payment method.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Confirmation</h3>
                  <p className="text-gray-700">
                    You'll receive an email confirmation once your refund has been processed. 
                    Bank processing times may vary.
                  </p>
                </div>
              </div>
            </div>
          </Card>          {/* Refund Amounts */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Refund Amounts</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">What's Included in Your Refund</h3>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• Full product price</li>
                  <li>• Original shipping costs (if order was defective)</li>
                  <li>• Applicable taxes</li>
                </ul>
              </div>              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">What's NOT Refunded</h3>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• Return shipping costs (unless item was defective)</li>
                  <li>• Original shipping costs (unless item was defective)</li>
                  <li>• Expedited shipping fees</li>
                </ul>
              </div>
            </div>
          </Card>          {/* Special Cases */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Special Refund Cases</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-900">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                  Defective or Damaged Items
                </h3>
                <p className="text-gray-700 mb-2">
                  If you receive a defective or damaged product:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• Contact us within 7 days of delivery</li>
                  <li>• Provide photos of the defect or damage</li>
                  <li>• We'll provide a prepaid return label</li>
                  <li>• Full refund including all shipping costs</li>
                  <li>• Option to receive a replacement instead</li>
                </ul>
              </div>              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Wrong Item Received</h3>
                <p className="text-gray-700 mb-2">
                  If we sent the wrong item:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• Contact us immediately</li>
                  <li>• We'll send the correct item at no extra charge</li>
                  <li>• Free return shipping for the wrong item</li>
                  <li>• Full refund if correct item is unavailable</li>
                </ul>
              </div>              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Partial Refunds</h3>
                <p className="text-gray-700 mb-2">
                  A partial refund may be issued if:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• Item shows obvious signs of use</li>
                  <li>• Item is returned without original tags</li>
                  <li>• Item is damaged due to customer handling</li>
                  <li>• Return is made after 30 days but within 60 days</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Late or Missing Refunds */}
          <Card className="p-8 mb-8 bg-yellow-50 border-yellow-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <AlertCircle className="h-6 w-6 mr-3 text-yellow-600" />
              Late or Missing Refunds
            </h2>
            
            <p className="text-gray-700 mb-4">
              If you haven't received your refund after the expected time:
            </p>
            
            <ol className="space-y-3 text-gray-700 ml-6">
              <li>1. Check your bank account again (processing can take time)</li>
              <li>2. Contact your credit card company (it may take time to officially post)</li>
              <li>3. Contact your bank (processing time varies by institution)</li>
              <li>4. If you've done all of this and still haven't received your refund, contact us at refunds@shirtcanary.com</li>
            </ol>
          </Card>          {/* Sale Items */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Sale Items</h2>
            
            <p className="text-gray-700 mb-4">
              Sale items are refundable under the same conditions as regular-priced items, 
              unless marked as "Final Sale."
            </p>
            
            <p className="text-gray-700">
              <strong>Final Sale items</strong> are not eligible for return or refund. 
              These items are clearly marked as "Final Sale" on the product page.
            </p>
          </Card>          {/* Refund Methods */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Refund Methods</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-gray-900">Credit/Debit Card</h3>
                <p className="text-gray-700">
                  Refunded to the original card used for purchase. Bank processing: 5-10 business days.
                </p>
              </div>              <div>
                <h3 className="font-semibold mb-2 text-gray-900">PayPal</h3>
                <p className="text-gray-700">
                  Refunded to your PayPal account. Typically appears within 3-5 business days.
                </p>
              </div>              <div>
                <h3 className="font-semibold mb-2 text-gray-900">Gift Cards</h3>
                <p className="text-gray-700">
                  If purchased with a gift card, refund will be issued as store credit.
                </p>
              </div>              <div>
                <h3 className="font-semibold mb-2 text-gray-900">Cash on Delivery</h3>
                <p className="text-gray-700">
                  For COD orders, refunds are processed via bank transfer. Bank account details required.
                </p>
              </div>
            </div>
          </Card>          {/* Contact */}
          <Card className="p-8 bg-blue-50 border-blue-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Questions About Refunds?</h2>
            <p className="text-gray-700 mb-4">
              Our customer service team is here to help with any refund questions:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> refunds@shirtcanary.com</p>
              <p><strong>Phone:</strong> +1 (234) 567-890</p>
              <p><strong>Hours:</strong> Monday-Friday, 8am-6pm EST</p>
            </div>
            <p className="text-gray-700 mt-4">
              Please include your order number when contacting us for faster assistance.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
