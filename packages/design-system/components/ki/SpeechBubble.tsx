"use client"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"
import type { KiState } from "./types"

interface SpeechBubbleProps {
  message: string
  visible?: boolean
  position?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'small' | 'medium' | 'large'
  animationType?: 'fade-in-words' | 'slide-in'
  autoHide?: boolean
  className?: string
}

export function SpeechBubble({ 
  message,
  visible = true,
  position = 'top',
  size = 'medium',
  animationType = 'fade-in-words',
  autoHide = false,
  className
}: SpeechBubbleProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the bottom of the text
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [message])

  // Get tail position - always pointing down to Ki, properly centered
  const getTailClasses = () => {
    return 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full'
  }

  // Split text into words for animation
  const words = message.split(" ").filter(Boolean)

  // Size configurations
  const sizeConfig = {
    small: {
      minHeight: "40px",
      maxHeight: "160px", 
      minWidth: "140px",
      maxWidth: "220px",
      padding: "p-3",
      fontSize: "text-sm"
    },
    medium: {
      minHeight: "60px",
      maxHeight: "300px",
      minWidth: "250px", 
      maxWidth: "350px",
      padding: "p-4",
      fontSize: "text-base"
    },
    large: {
      minHeight: "80px",
      maxHeight: "400px",
      minWidth: "300px",
      maxWidth: "450px", 
      padding: "p-6",
      fontSize: "text-lg"
    }
  }

  const config = sizeConfig[size]

  return (
    <AnimatePresence>
      {message && visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ 
            duration: 0.3, 
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          className={cn("relative pointer-events-none z-50", className)}
          style={{
            maxWidth: 'calc(100vw - 20px)',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div className="relative">
            {/* Main bubble */}
            <div
              className={cn(
                "bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 relative pointer-events-auto",
                config.padding
              )}
              style={{
                boxShadow: "0 4px 25px rgba(168, 85, 247, 0.15)",
                minHeight: config.minHeight,
                maxHeight: config.maxHeight,
                minWidth: config.minWidth,
                maxWidth: config.maxWidth,
              }}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 rounded-2xl opacity-50" />

              {/* Content container */}
              <div
                ref={contentRef}
                className="relative z-10 overflow-auto max-h-[280px] scrollbar-hide"
              >
                <div className={cn("font-medium text-gray-800 dark:text-gray-200", config.fontSize)}>
                  <div className="flex flex-wrap">
                    {words.map((word, index) => (
                      <motion.span
                        key={`${word}-${index}`}
                        className="inline-block mr-1.5 mb-1"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: 0.05 + index * 0.02,
                          ease: "easeOut",
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtle shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-gray-300/10 to-transparent pointer-events-none rounded-2xl"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Speech bubble tail pointing down */}
            <div
              className={cn("absolute w-0 h-0", getTailClasses())}
              style={{
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "10px solid var(--speech-bubble-bg, white)",
                filter: "drop-shadow(0 2px 4px rgba(168, 85, 247, 0.1))",
              }}
            />
            <style jsx>{`
              :global(.dark) {
                --speech-bubble-bg: rgb(31, 41, 55);
              }
              :global(:root) {
                --speech-bubble-bg: white;
              }
            `}</style>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Add custom scrollbar hide styles
const styles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style")
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}