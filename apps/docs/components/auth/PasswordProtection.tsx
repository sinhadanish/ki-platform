'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface PasswordProtectionProps {
  tier: 'tech' | 'investor'
  children: React.ReactNode
}

export function PasswordProtection({ tier, children }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`/api/auth/check?tier=${tier}`)
        if (response.ok) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      }
    }
    checkAuth()
  }, [tier])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, tier }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        setPassword('')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Invalid password')
      }
    } catch (error) {
      setError('Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  const tierConfig = {
    tech: {
      title: 'Technical Documentation Access',
      description: 'This section contains internal technical documentation for the development team.',
      icon: '🔧',
      color: 'border-blue-200 bg-blue-50',
    },
    investor: {
      title: 'Investor Portal Access',
      description: 'This section contains confidential investor materials and financial information.',
      icon: '💼',
      color: 'border-purple-200 bg-purple-50',
    },
  }

  const config = tierConfig[tier]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className={`w-full max-w-md ${config.color} border-2`}>
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">{config.icon}</div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {config.title}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {config.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Access Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !password.trim()}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Access Documentation
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Need access? Contact{' '}
              <a
                href="mailto:team@ki.com"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                team@ki.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PasswordProtection