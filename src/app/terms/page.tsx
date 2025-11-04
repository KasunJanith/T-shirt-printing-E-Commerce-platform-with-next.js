import { Card } from '@/components/ui/card'
import { FileText, Scale, AlertCircle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-white/90">
            Please read these terms carefully before using our services
          </p>
          <p className="text-white/80 mt-2">Last updated: November 1, 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="p-8 mb-8">
            <p className="text-gray-700 leading-relaxed">
              Welcome to Shirt Canary. By accessing or using our website and services, you agree 
              to be bound by these Terms of Service. If you do not agree to these terms, please 
              do not use our services.
            </p>
          </Card>

          {/* Agreement to Terms */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FileText className="h-6 w-6 mr-3 text-blue-600" />
              1. Agreement to Terms
            </h2>
            
            <p className="text-gray-700 mb-4">
              By using our website, you agree to:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Comply with all applicable laws and regulations</li>
              <li>• Provide accurate and complete information</li>
              <li>• Maintain the security of your account</li>
              <li>• Accept responsibility for all activities under your account</li>
            </ul>
          </Card>

          {/* Use of Services */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">2. Use of Services</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Eligibility</h3>
                <p className="text-gray-700">
                  You must be at least 18 years old to make purchases. By using our services, 
                  you represent that you meet this requirement.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Account Registration</h3>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• You are responsible for maintaining account confidentiality</li>
                  <li>• You must provide accurate, current information</li>
                  <li>• You may not share your account credentials</li>
                  <li>• We reserve the right to suspend or terminate accounts for violations</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Prohibited Activities</h3>
                <p className="text-gray-700 mb-2">You may not:</p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• Use our services for illegal purposes</li>
                  <li>• Attempt to interfere with or disrupt our services</li>
                  <li>• Upload malicious code or viruses</li>
                  <li>• Infringe on intellectual property rights</li>
                  <li>• Engage in fraudulent activities</li>
                  <li>• Scrape or harvest data from our site</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Products and Orders */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">3. Products and Orders</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Product Descriptions</h3>
                <p className="text-gray-700">
                  We strive for accuracy in product descriptions and images. However, we do not 
                  warrant that descriptions are error-free. Colors may vary due to monitor settings.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Pricing</h3>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• Prices are subject to change without notice</li>
                  <li>• We reserve the right to correct pricing errors</li>
                  <li>• All prices are in USD unless otherwise stated</li>
                  <li>• Applicable taxes and shipping costs will be added at checkout</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Order Acceptance</h3>
                <p className="text-gray-700">
                  We reserve the right to refuse or cancel any order for any reason, including 
                  suspected fraud, pricing errors, or product unavailability.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Payment</h3>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• Payment must be received before order fulfillment</li>
                  <li>• We accept major credit cards and other payment methods</li>
                  <li>• You authorize us to charge your payment method</li>
                  <li>• Payment processing is handled by secure third-party providers</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Shipping and Delivery */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">4. Shipping and Delivery</h2>
            
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Shipping times are estimates and not guaranteed</li>
              <li>• Risk of loss passes to you upon delivery to the carrier</li>
              <li>• You are responsible for providing accurate shipping information</li>
              <li>• Additional customs fees may apply for international orders</li>
            </ul>
          </Card>

          {/* Returns and Refunds */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">5. Returns and Refunds</h2>
            
            <p className="text-gray-700 mb-4">
              Please refer to our Return Policy for detailed information. Key points:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• 30-day return window for eligible items</li>
              <li>• Items must be unworn with original tags</li>
              <li>• Refunds processed within 5-7 business days after receipt</li>
              <li>• Custom items are non-returnable</li>
            </ul>
          </Card>

          {/* Intellectual Property */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Scale className="h-6 w-6 mr-3 text-blue-600" />
              6. Intellectual Property
            </h2>
            
            <p className="text-gray-700 mb-4">
              All content on our website, including:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Text, graphics, logos, and images</li>
              <li>• Product designs and photographs</li>
              <li>• Software and code</li>
              <li>• Trademarks and brand names</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Are owned by or licensed to Shirt Canary and protected by copyright and trademark 
              laws. You may not use, reproduce, or distribute any content without our express 
              written permission.
            </p>
          </Card>

          {/* Limitation of Liability */}
          <Card className="p-8 mb-8 bg-yellow-50 border-yellow-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <AlertCircle className="h-6 w-6 mr-3 text-yellow-600" />
              7. Limitation of Liability
            </h2>
            
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• We are not liable for indirect, incidental, or consequential damages</li>
              <li>• Our total liability is limited to the amount you paid for products</li>
              <li>• We do not guarantee uninterrupted or error-free service</li>
              <li>• We are not responsible for third-party content or services</li>
            </ul>
          </Card>

          {/* Indemnification */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">8. Indemnification</h2>
            
            <p className="text-gray-700">
              You agree to indemnify and hold harmless Shirt Canary, its officers, directors, 
              employees, and agents from any claims, damages, losses, or expenses arising from:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6 mt-4">
              <li>• Your violation of these Terms</li>
              <li>• Your violation of any laws or rights of third parties</li>
              <li>• Your use of our services</li>
            </ul>
          </Card>

          {/* Governing Law */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">9. Governing Law</h2>
            
            <p className="text-gray-700">
              These Terms are governed by the laws of the State of New York, United States, 
              without regard to conflict of law principles. Any disputes will be resolved in 
              the courts of New York.
            </p>
          </Card>

          {/* Changes to Terms */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">10. Changes to Terms</h2>
            
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. Changes will be effective 
              immediately upon posting. Your continued use of our services after changes 
              constitutes acceptance of the modified Terms.
            </p>
          </Card>

          {/* Severability */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">11. Severability</h2>
            
            <p className="text-gray-700">
              If any provision of these Terms is found to be unenforceable, the remaining 
              provisions will continue in full force and effect.
            </p>
          </Card>

          {/* Contact */}
          <Card className="p-8 bg-blue-50 border-blue-200">
            <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> legal@shirtcanary.com</p>
              <p><strong>Phone:</strong> +1 (234) 567-890</p>
              <p><strong>Mail:</strong> Shirt Canary, 123 Fashion Street, New York, NY 10001</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
