"use client"

import { motion } from 'framer-motion'

function ComplexBackgroundAnimations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Complex gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(59,130,246,0.2) 50%, transparent 100%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, rgba(168,85,247,0.2) 50%, transparent 100%)'
        }}
        animate={{
          scale: [1, 1.4, 1],
          rotate: [360, 180, 0],
          x: [0, -80, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      {/* Flowing lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.path
          d="M0,100 Q400,50 800,100 T1600,100"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,200 Q400,250 800,200 T1600,200"
          stroke="url(#gradient2)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(168,85,247,0.6)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.6)" />
            <stop offset="100%" stopColor="rgba(34,197,94,0.6)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34,197,94,0.4)" />
            <stop offset="50%" stopColor="rgba(168,85,247,0.4)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.4)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default ComplexBackgroundAnimations