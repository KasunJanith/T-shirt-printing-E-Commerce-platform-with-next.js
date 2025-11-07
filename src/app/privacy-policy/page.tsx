import { Card } from '@/components/ui/card'
import { Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-white/90">
            Your privacy is important to us
          </p>
          <p className="text-white/80 mt-2">Last updated: November 1, 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="p-8 mb-8">
            <p className="text-gray-700 leading-relaxed">
              At Shirt Canary, we are committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you 
              visit our website or make a purchase from us.
            </p>
          </Card>

          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">            <Card className="p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900">Secure</h3>
              <p className="text-sm text-gray-700">Your data is protected</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900">Transparent</h3>
              <p className="text-sm text-gray-700">We're open about data use</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900">Your Control</h3>
              <p className="text-sm text-gray-700">You own your data</p>
            </Card>
          </div>

          {/* Information We Collect */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Database className="h-6 w-6 mr-3 text-blue-600" />
              Information We Collect
            </h2>
              <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Personal Information</h3>
                <p className="text-gray-700 mb-2">
                  When you make a purchase or create an account, we may collect:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• Name and contact information (email, phone number)</li>
                  <li>• Billing and shipping addresses</li>
                  <li>• Payment information (processed securely by our payment processors)</li>
                  <li>• Order history and preferences</li>
                  <li>• Account credentials</li>
                </ul>
              </div>              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Automatically Collected Information</h3>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• IP address and browser type</li>
                  <li>• Device information</li>
                  <li>• Pages visited and time spent on site</li>
                  <li>• Referral source</li>
                  <li>• Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* How We Use Your Information */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Lock className="h-6 w-6 mr-3 text-blue-600" />
              How We Use Your Information
            </h2>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Process Orders:</strong> To fulfill your purchases, process payments, 
                and arrange shipping</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Customer Service:</strong> To respond to your inquiries and provide 
                support</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Marketing:</strong> To send you promotional emails about new products 
                and special offers (you can opt out anytime)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Improve Services:</strong> To analyze trends and improve our website 
                and products</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Security:</strong> To prevent fraud and protect our users</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Legal Compliance:</strong> To comply with applicable laws and 
                regulations</span>
              </li>
            </ul>
          </Card>          {/* Information Sharing */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Information Sharing and Disclosure</h2>
            
            <p className="text-gray-700 mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-gray-900">Service Providers</h3>
                <p className="text-gray-700">
                  Third-party companies that help us operate our business (payment processors, 
                  shipping companies, email service providers). They are contractually obligated 
                  to protect your information.
                </p>
              </div>              <div>
                <h3 className="font-semibold mb-2 text-gray-900">Legal Requirements</h3>
                <p className="text-gray-700">
                  When required by law, court order, or to protect our rights and safety.
                </p>
              </div>              <div>
                <h3 className="font-semibold mb-2 text-gray-900">Business Transfers</h3>
                <p className="text-gray-700">
                  In connection with a merger, acquisition, or sale of assets, your information 
                  may be transferred to the new owner.
                </p>
              </div>
            </div>
          </Card>

          {/* Data Security */}
          <Card className="p-8 mb-8 bg-green-50 border-green-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-3 text-green-600" />
              Data Security
            </h2>
            
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• SSL encryption for data transmission</li>
              <li>• Secure servers and databases</li>
              <li>• Regular security audits</li>
              <li>• Limited employee access to personal data</li>
              <li>• PCI DSS compliance for payment processing</li>
            </ul>
            
            <p className="text-gray-700 mt-4">
              However, no method of transmission over the internet is 100% secure. We cannot 
              guarantee absolute security.
            </p>
          </Card>          {/* Your Rights */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Privacy Rights</h2>
            
            <p className="text-gray-700 mb-4">You have the right to:</p>
            
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate data</li>
              <li>• Request deletion of your data</li>
              <li>• Opt out of marketing communications</li>
              <li>• Object to certain data processing</li>
              <li>• Export your data</li>
            </ul>
            
            <p className="text-gray-700 mt-4">
              To exercise these rights, contact us at privacy@shirtcanary.com
            </p>
          </Card>

          {/* Cookies */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Cookies and Tracking</h2>
            
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to:
            </p>
            
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Remember your preferences and shopping cart</li>
              <li>• Analyze site traffic and usage</li>
              <li>• Personalize content and ads</li>
              <li>• Improve site functionality</li>
            </ul>
            
            <p className="text-gray-700 mt-4">
              You can control cookies through your browser settings. Note that disabling cookies 
              may affect site functionality.
            </p>
          </Card>

          {/* Children's Privacy */}
          <Card className="p-8 mb-8 bg-yellow-50 border-yellow-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-3 text-yellow-600" />
              Children's Privacy
            </h2>
            
            <p className="text-gray-700">
              Our services are not directed to children under 13. We do not knowingly collect 
              personal information from children under 13. If you believe we have collected 
              information from a child under 13, please contact us immediately.
            </p>
          </Card>

          {/* Changes to Policy */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Changes to This Policy</h2>
            
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new policy on this page and updating the "Last Updated" 
              date. We encourage you to review this policy periodically.
            </p>
          </Card>

          {/* Contact */}
          <Card className="p-8 bg-blue-50 border-blue-200">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> privacy@shirtcanary.com</p>
              <p><strong>Phone:</strong> +1 (234) 567-890</p>
              <p><strong>Mail:</strong> Shirt Canary, 123 Fashion Street, New York, NY 10001</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
