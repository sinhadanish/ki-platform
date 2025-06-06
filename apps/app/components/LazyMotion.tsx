"use client"

import { LazyMotion, domAnimation, m } from 'framer-motion'
import { ReactNode, Suspense } from 'react'

interface LazyMotionWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function LazyMotionWrapper({ children, fallback }: LazyMotionWrapperProps) {
  return (
    <LazyMotion features={domAnimation}>
      <Suspense fallback={fallback || <div className="animate-pulse">Loading...</div>}>
        {children}
      </Suspense>
    </LazyMotion>
  )
}

// Re-export motion components for lazy loading
export { m as motion } from 'framer-motion'