import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

// Environment variables for password hashes
const TECH_PASSWORD = process.env.TECH_PASSWORD || 'TECH2025'
const INVESTOR_PASSWORD = process.env.INVESTOR_PASSWORD || 'INVEST2025'

export async function POST(request: NextRequest) {
  try {
    const { password, tier } = await request.json()

    if (!password || !tier) {
      return NextResponse.json(
        { message: 'Password and tier are required' },
        { status: 400 }
      )
    }

    let isValid = false
    const expectedPassword = tier === 'tech' ? TECH_PASSWORD : INVESTOR_PASSWORD

    // For now, using simple password comparison
    // In production, use bcrypt for hashed passwords
    isValid = password === expectedPassword

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      )
    }

    // Set authentication cookie
    const cookieStore = cookies()
    const sessionToken = generateSessionToken(tier)
    
    cookieStore.set(`ki-auth-${tier}`, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    )
  }
}

function generateSessionToken(tier: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2)
  return `${tier}-${timestamp}-${random}`
}