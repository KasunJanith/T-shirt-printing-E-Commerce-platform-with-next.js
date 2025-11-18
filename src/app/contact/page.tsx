'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you. 
              Our team is here to help!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}            <Card className="p-6 hover:shadow-lg transition-shadow dark:border-gray-700 dark:bg-gray-800">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Email Us</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                Send us an email anytime
              </p>
              <a href="mailto:support@shirtcanary.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                support@shirtcanary.com
              </a>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow dark:border-gray-700 dark:bg-gray-800">
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Call Us</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                Mon-Fri from 8am to 6pm
              </p>
              <a href="tel:+1234567890" className="text-blue-600 dark:text-blue-400 hover:underline">
                +1 (234) 567-890
              </a>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow dark:border-gray-700 dark:bg-gray-800">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Visit Us</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                Come say hello at our office
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                123 Fashion Street<br />
                New York, NY 10001
              </p>
            </Card>
          </div>          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Send us a Message</h2>
              
              {isSubmitted ? (
                <Card className="p-8 text-center bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-2">Message Sent!</h3>
                  <p className="text-green-700 dark:text-green-400">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </Card>
              ) : (
                <Card className="p-8 dark:border-gray-700 dark:bg-gray-800">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell us more about your inquiry..."
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Card>
              )}
            </div>            {/* Additional Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              
              <div className="space-y-4">                <Card className="p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="font-semibold text-lg mb-2 flex items-center text-gray-900 dark:text-white">
                    <MessageSquare className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    What are your shipping times?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We typically ship orders within 1-2 business days. Delivery usually 
                    takes 3-5 business days within the US.
                  </p>
                </Card>                <Card className="p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="font-semibold text-lg mb-2 flex items-center text-gray-900 dark:text-white">
                    <MessageSquare className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    What is your return policy?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We offer a 30-day return policy for all unworn items with original 
                    tags. Free returns for defective products.
                  </p>
                </Card>                <Card className="p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="font-semibold text-lg mb-2 flex items-center text-gray-900 dark:text-white">
                    <MessageSquare className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Do you offer international shipping?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Yes! We ship to over 50 countries worldwide. International shipping 
                    times vary by location (7-14 business days).
                  </p>
                </Card>                <Card className="p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="font-semibold text-lg mb-2 flex items-center text-gray-900 dark:text-white">
                    <MessageSquare className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    How do I track my order?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Once your order ships, you'll receive a tracking number via email. 
                    You can also check your order status in your dashboard.
                  </p>
                </Card>
              </div>              <Card className="p-6 mt-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Business Hours</h3>
                    <div className="space-y-1 text-gray-700 dark:text-gray-300">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                      <p>Saturday: 9:00 AM - 4:00 PM EST</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
