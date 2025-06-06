"use client"

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface HeavyParticleSystemProps {
  count: number
}

function HeavyParticleSystem({ count }: HeavyParticleSystemProps) {
  // Memoize particle configuration to prevent recalculation
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
      color: `hsl(${Math.random() * 60 + 240}, 70%, 60%)` // Purple to blue range
    }))
  }, [count])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            filter: 'blur(1px)'
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.sin(particle.id) * 50, 0],
            scale: [0.5, 1, 0.5],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default HeavyParticleSystem