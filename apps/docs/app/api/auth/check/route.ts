import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tier = searchParams.get('tier')

    if (!tier || !['tech', 'investor'].includes(tier)) {
      return NextResponse.json(
        { message: 'Invalid tier' },
        { status: 400 }
      )
    }

    const cookieStore = cookies()
    const authCookie = cookieStore.get(`ki-auth-${tier}`)

    if (!authCookie) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    // Validate the session token
    const sessionToken = authCookie.value
    if (isValidSessionToken(sessionToken, tier)) {
      return NextResponse.json({ authenticated: true })
    } else {
      // Invalid or expired token, clear the cookie
      cookieStore.delete(`ki-auth-${tier}`)
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    )
  }
}

function isValidSessionToken(token: string, tier: string): boolean {
  try {
    const parts = token.split('-')
    if (parts.length !== 3) return false

    const [tokenTier, timestamp, random] = parts

    // Check if tier matches
    if (tokenTier !== tier) return false

    // Check if token is not expired (24 hours)
    const tokenTime = parseInt(timestamp)
    const now = Date.now()
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

    return (now - tokenTime) < maxAge
  } catch (error) {
    return false
  }
}