import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white border-t border-gray-800 dark:border-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shirt Canary</h3>
            <p className="text-gray-400 dark:text-gray-500">
              Premium quality custom printed t-shirts. Choose from small, medium, or full print designs for your perfect style.
            </p>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li><Link href="/about" className="hover:text-white dark:hover:text-gray-300 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white dark:hover:text-gray-300 transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white dark:hover:text-gray-300 transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-white dark:hover:text-gray-300 transition-colors">Returns & Refunds</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li><Link href="/privacy-policy" className="hover:text-white dark:hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white dark:hover:text-gray-300 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white dark:hover:text-gray-300 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; 2024 Shirt Canary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}