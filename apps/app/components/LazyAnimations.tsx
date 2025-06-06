"use client"

import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'

// Lazy load heavy animation components
const HeavyParticleSystem = lazy(() => import('./HeavyParticleSystem'))
const ComplexBackgroundAnimations = lazy(() => import('./ComplexBackgroundAnimations'))

interface LazyAnimationsProps {
  enableHeavyEffects: boolean
  particleCount: number
  children: React.ReactNode
}

export function LazyAnimations({ enableHeavyEffects, particleCount, children }: LazyAnimationsProps) {
  return (
    <div className="relative">
      {/* Always render children */}
      {children}
      
      {/* Conditionally render heavy effects */}
      {enableHeavyEffects && (
        <Suspense
          fallback={
            <div className="absolute inset-0 pointer-events-none">
              {/* Simple fallback animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-blue-400/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          }
        >
          <HeavyParticleSystem count={particleCount} />
          <ComplexBackgroundAnimations />
        </Suspense>
      )}
    </div>
  )
}

// Performance-optimized motion component
export function OptimizedMotion({ 
  children, 
  reduceMotion = false, 
  ...motionProps 
}: any) {
  if (reduceMotion) {
    // Return static version for reduced motion
    return <div {...motionProps}>{children}</div>
  }
  
  return <motion.div {...motionProps}>{children}</motion.div>
}