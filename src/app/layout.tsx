import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/providers/auth-provider'
import { CartProvider } from '@/context/cart-context'
import { ThemeProvider } from '@/context/theme-context'
import { Header } from '@/components/layout/header-new'
import { Footer } from '@/components/layout/footer'
import { SessionChecker } from '@/components/auth/session-checker'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shirt Canary - Premium T-Shirts",
  description: "Shop the best quality t-shirts for men, women, and kids",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const root = document.documentElement;
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  root.classList.add('dark');
                  root.dataset.theme = 'dark';
                } else if (theme === 'light') {
                  root.classList.remove('dark');
                  root.dataset.theme = 'light';
                } else {
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (prefersDark) {
                    root.classList.add('dark');
                    root.dataset.theme = 'dark';
                  } else {
                    root.classList.remove('dark');
                    root.dataset.theme = 'light';
                  }
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 transition-colors duration-200`}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <SessionChecker />
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
