import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // Update session every 1 hour
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60, // 24 hours
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.role = (user as any).role
        token.iat = Math.floor(Date.now() / 1000) // Issued at
        token.exp = Math.floor(Date.now() / 1000) + (24 * 60 * 60) // Expires in 24 hours
      }
      
      // Check if token is expired
      if (token.exp && typeof token.exp === 'number') {
        const currentTime = Math.floor(Date.now() / 1000)
        if (currentTime > token.exp) {
          // Token expired - return token but session will be invalid
          return { ...token, expired: true }
        }
      }
      
      return token
    },    async session({ session, token }) {
      // Check if token is valid and not expired
      if (!token || !token.sub) {
        // Return null session instead of throwing error
        return null as any
      }
      
      // If token is expired, return null to force re-login
      if ((token as any).expired) {
        return null as any
      }
      
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // If user is logging in, check their role and redirect accordingly
      if (url === baseUrl || url === `${baseUrl}/`) {
        // Get the user's role from the session (you'll need to pass this)
        // For now, this will be handled in the login page
        return url
      }
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url
      return baseUrl    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async signOut({ token }) {
      // Log sign out event
      console.log('User signed out:', token?.sub)
    },
    async session({ session }) {
      // Update last accessed time
      console.log('Session accessed:', session?.user?.email)
    },
  },
}