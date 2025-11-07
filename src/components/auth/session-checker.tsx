'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useRef } from 'react'

export function SessionChecker() {
  const { data: session, status } = useSession()
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    // Check session every 5 minutes
    checkIntervalRef.current = setInterval(() => {
      if (status === 'authenticated' && session) {
        // Force session refresh to check if still valid
        fetch('/api/auth/session')
          .then(res => res.json())
          .then(data => {
            if (!data || !data.user) {
              // Session invalid or expired
              signOut({ callbackUrl: '/login?session=expired' })
            }
          })
          .catch(() => {
            // Error checking session
            signOut({ callbackUrl: '/login?session=expired' })
          })
      }
    }, 5 * 60 * 1000) // 5 minutes
    
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current)
      }
    }
  }, [status, session])
  
  // Also check on window focus
  useEffect(() => {
    const handleFocus = async () => {
      if (status === 'authenticated') {
        try {
          const res = await fetch('/api/auth/session')
          const data = await res.json()
          if (!data || !data.user) {
            signOut({ callbackUrl: '/login?session=expired' })
          }
        } catch (error) {
          console.error('Session check failed:', error)
        }
      }
    }
    
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [status])
  
  return null
}
