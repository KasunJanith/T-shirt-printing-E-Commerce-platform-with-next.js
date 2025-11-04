'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { validatePassword, getPasswordStrength, getPasswordRequirementsList } from '@/lib/password-validation'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
  const router = useRouter()

  const passwordStrength = getPasswordStrength(formData.password)
  const requirements = getPasswordRequirementsList()

  const handlePasswordChange = (value: string) => {
    setFormData({...formData, password: value})
    const validation = validatePassword(value)
    if (!validation.isValid && value.length > 0) {
      setPasswordError(validation.message || null)
    } else {
      setPasswordError(null)
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate password strength
    const validation = validatePassword(formData.password)
    if (!validation.isValid) {
      alert(validation.message)
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })

      if (response.ok) {
        router.push('/login')
      } else {
        const error = await response.json()
        alert(error.message || 'Registration failed')
      }
    } catch (error) {
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <input
              type="email"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>          <div>
            <input
              type="password"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onFocus={() => setShowPasswordRequirements(true)}
            />
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-700 font-medium">Password Strength:</span>
                  <span className={`text-xs font-semibold ${
                    passwordStrength === 'weak' ? 'text-red-600' :
                    passwordStrength === 'medium' ? 'text-yellow-600' :
                    passwordStrength === 'strong' ? 'text-green-600' :
                    'text-green-700'
                  }`}>
                    {passwordStrength === 'weak' ? 'Weak' :
                     passwordStrength === 'medium' ? 'Medium' :
                     passwordStrength === 'strong' ? 'Strong' :
                     'Very Strong'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength === 'weak' ? 'w-1/4 bg-red-500' :
                      passwordStrength === 'medium' ? 'w-2/4 bg-yellow-500' :
                      passwordStrength === 'strong' ? 'w-3/4 bg-green-500' :
                      'w-full bg-green-600'
                    }`}
                  />
                </div>
              </div>
            )}
            
            {/* Password Error */}
            {passwordError && (
              <div className="mt-2 flex items-start space-x-2 text-red-600">
                <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{passwordError}</p>
              </div>
            )}
            
            {/* Password Requirements */}
            {showPasswordRequirements && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-blue-600" />
                  Password Requirements:
                </p>
                <ul className="space-y-1">
                  {requirements.map((req, index) => {
                    const isValid = 
                      (index === 0 && formData.password.length >= 8) ||
                      (index === 1 && /[A-Z]/.test(formData.password)) ||
                      (index === 2 && /[a-z]/.test(formData.password)) ||
                      (index === 3 && /\d/.test(formData.password)) ||
                      (index === 4 && /[@$!%*?&]/.test(formData.password))
                    
                    return (
                      <li key={index} className={`text-sm flex items-center space-x-2 ${
                        isValid ? 'text-green-700' : 'text-gray-700'
                      }`}>
                        {isValid ? (
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-gray-400 flex-shrink-0" />
                        )}
                        <span>{req}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
          <div>
            <input
              type="password"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </Button>
          </div>

          <div className="text-center">
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}