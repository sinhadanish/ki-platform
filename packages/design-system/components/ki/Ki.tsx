"use client"

import { motion } from "framer-motion"
import { useState, useCallback, memo, useEffect, useMemo } from "react"
import type { KiState, KiSize, KiTheme } from "./types"
import { shapeVariations, speedMultipliers, dimensionsBySize, getThemeColors } from "./KiThemes"
import { KiStateRenderer } from "./KiStateRenderer"
import { useKiAnimation } from "../../hooks/useKiAnimation"

interface KiProps {
  state?: KiState
  size?: KiSize
  theme?: KiTheme
  customColors?: {
    primary?: string
    secondary?: string
    accent?: string
  }
  animationSpeed?: "slow" | "normal" | "fast"
  onClick?: () => void
  disabled?: boolean
  className?: string
  ariaLabel?: string
  audioIntensity?: number
  isTransitioning?: boolean
  enhancedGlow?: boolean
  autoCycle?: boolean
}

// Add a custom comparison function to optimize re-renders
const Ki = memo(
  function Ki({
    state = "idle",
    size = "medium",
    theme = "default",
    customColors = {},
    animationSpeed = "normal",
    onClick,
    disabled = false,
    className = "",
    ariaLabel,
    audioIntensity = 0,
    isTransitioning = false,
    enhancedGlow = true,
    autoCycle = false,
  }: KiProps) {
    // Track previous state for transitions
    const [prevState, setPrevState] = useState<KiState>(state)

    // Use custom animation hook
    const { breathingScale, animationState, changeState } = useKiAnimation({
      initialState: state,
      autoOptimize: true,
      enableMetrics: false,
      reduceMotion: false
    })
    
    // Calculate scale and opacity based on state and audio intensity
    const currentScale = useMemo(() => {
      const validBreathingScale = Number.isFinite(breathingScale) ? breathingScale : 1
      const validAudioIntensity = Number.isFinite(audioIntensity) ? audioIntensity : 0
      
      if (state === "speaking") {
        return Math.max(0.8, Math.min(1.3, validBreathingScale + validAudioIntensity * 0.04))
      } else if (state === "listening") {
        return Math.max(0.8, Math.min(1.3, validBreathingScale + validAudioIntensity * 0.05))
      }
      return Math.max(0.8, Math.min(1.3, validBreathingScale))
    }, [breathingScale, state, audioIntensity])
    
    const currentOpacity = useMemo(() => {
      const baseOpacity = 0.85
      const validBreathingScale = Number.isFinite(breathingScale) ? breathingScale : 1
      const validAudioIntensity = Number.isFinite(audioIntensity) ? audioIntensity : 0
      
      if (state === "speaking" || state === "listening") {
        return Math.max(0.1, Math.min(1.0, baseOpacity + validAudioIntensity * 0.15))
      }
      return Math.max(0.1, Math.min(1.0, baseOpacity + (validBreathingScale - 1) * 5))
    }, [breathingScale, state, audioIntensity])

    // Handle state transitions
    useEffect(() => {
      if (prevState !== state) {
        setPrevState(state)
        changeState(state)
      }
    }, [state, prevState, changeState])

    // Get dimensions based on size
    const dimensions = dimensionsBySize[size]

    // Get colors based on theme and state
    const colors = getThemeColors(theme, state, customColors)

    // Speed multiplier for animations
    const speedMultiplier = speedMultipliers[animationSpeed]

    // Generate deterministic IDs for gradients to prevent hydration mismatch
    const gradientId = useMemo(() => `kiGradient-${state}-${theme}`, [state, theme])
    const glowGradientId = useMemo(() => `kiGlowGradient-${state}-${theme}`, [state, theme])

    // Handle click with disabled state check
    const handleClick = useCallback(() => {
      if (!disabled && onClick) {
        onClick()
      }
    }, [disabled, onClick])

    // Get appropriate ARIA label
    const getAriaLabel = () => {
      if (ariaLabel) return ariaLabel
      return `Ki assistant in ${state} state`
    }

    // Add animation variants for state transitions
    const shapeVariants = {
      idle: {
        d: shapeVariations.idle,
        transition: { duration: isTransitioning ? 0.2 : 0.4, ease: "easeOut" },
      },
      listening: {
        d: shapeVariations.listening,
        transition: { duration: isTransitioning ? 0.2 : 0.4, ease: "easeOut" },
      },
      thinking: {
        d: shapeVariations.thinking,
        transition: { duration: isTransitioning ? 0.2 : 0.4, ease: "easeOut" },
      },
      speaking: {
        d: shapeVariations.speaking,
        transition: { duration: isTransitioning ? 0.2 : 0.4, ease: "easeOut" },
      },
      typing: {
        d: shapeVariations.typing,
        transition: { duration: isTransitioning ? 0.2 : 0.4, ease: "easeOut" },
      },
    }

    return (
      <div
        style={{
          width: dimensions.width,
          height: dimensions.height,
          position: "relative",
          cursor: disabled ? "default" : "pointer",
          opacity: disabled ? 0.7 : 1,
          // Ensure the component stays centered in its container
          margin: "0 auto",
        }}
        onClick={handleClick}
        className={className}
        role="img"
        aria-label={getAriaLabel()}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled && onClick) {
            e.preventDefault()
            onClick()
          }
        }}
      >
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 200 180"
          initial={false}
          whileHover={
            !disabled
              ? {
                  scale: 1.05,
                  filter: `drop-shadow(0px 0px 8px ${colors.accent})`,
                }
              : {}
          }
          whileTap={!disabled ? { scale: 0.95 } : {}}
          style={{
            scale: currentScale,
            // Ensure SVG stays centered
            transformOrigin: "center center",
          }}
        >
          <defs>
            <motion.linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              animate={{
                x1: ["0%", "20%", "0%"],
                y1: ["0%", "20%", "0%"],
                x2: ["100%", "80%", "100%"],
                y2: ["100%", "80%", "100%"],
              }}
              transition={{
                duration: 20 * speedMultiplier,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <motion.stop
                offset="0%"
                animate={{ stopColor: colors.primary }}
                transition={{
                  duration: isTransitioning ? 0.2 : 0.8,
                  ease: "easeInOut",
                }}
              />
              <motion.stop
                offset="50%"
                animate={{ stopColor: colors.accent }}
                transition={{
                  duration: isTransitioning ? 0.2 : 0.8,
                  ease: "easeInOut",
                }}
              />
              <motion.stop
                offset="100%"
                animate={{ stopColor: colors.secondary }}
                transition={{
                  duration: isTransitioning ? 0.2 : 0.8,
                  ease: "easeInOut",
                }}
              />
            </motion.linearGradient>

            <radialGradient id={glowGradientId} cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
              <motion.stop
                offset="0%"
                animate={{ stopColor: colors.accent }}
                transition={{
                  duration: isTransitioning ? 0.2 : 0.5,
                  ease: "easeOut",
                }}
                stopOpacity="0.6"
              />
              <motion.stop
                offset="60%"
                animate={{ stopColor: colors.primary }}
                transition={{
                  duration: isTransitioning ? 0.2 : 0.5,
                  ease: "easeOut",
                }}
                stopOpacity="0.3"
              />
              <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
            </radialGradient>

            <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Enhanced glow filter for speaking state */}
            <filter id="speakingGlow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="12" result="coloredBlur" />
              <feColorMatrix in="coloredBlur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 0" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Enhanced multi-layer glow effect */}
          <motion.circle
            cx="100"
            cy="89"
            r="50"
            fill={`url(#${glowGradientId})`}
            style={{
              opacity: currentOpacity * 0.4,
              filter: "blur(20px)",
            }}
            animate={{
              r: [48, 52, 48],
              opacity: [currentOpacity * 0.35, currentOpacity * 0.45, currentOpacity * 0.35],
            }}
            transition={{
              duration: 8 * speedMultiplier,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Secondary glow layer */}
          <motion.circle
            cx="100"
            cy="89"
            r="35"
            fill={`url(#${glowGradientId})`}
            style={{
              opacity: currentOpacity * 0.6,
              filter: "blur(10px)",
            }}
            animate={{
              r: [34, 36, 34],
            }}
            transition={{
              duration: 6 * speedMultiplier,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main shape with enhanced styling */}
          <motion.path
            variants={shapeVariants}
            animate={state}
            d={shapeVariations[state]}
            fill={`url(#${gradientId})`}
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="2"
            filter={state === "speaking" ? "url(#speakingGlow)" : "url(#glow)"}
            style={{
              opacity: 0.95,
            }}
          />

          {/* State-specific rendering from the KiStateRenderer */}
          <KiStateRenderer
            state={state}
            colors={colors}
            audioIntensity={audioIntensity}
            speedMultiplier={speedMultiplier}
            gradientId={gradientId}
            glowGradientId={glowGradientId}
            isTransitioning={isTransitioning}
          />
        </motion.svg>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Only re-render if these props change
    return (
      prevProps.state === nextProps.state &&
      prevProps.size === nextProps.size &&
      prevProps.theme === nextProps.theme &&
      prevProps.animationSpeed === nextProps.animationSpeed &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.isTransitioning === nextProps.isTransitioning &&
      // For audioIntensity, only re-render if the change is significant
      Math.abs((prevProps.audioIntensity || 0) - (nextProps.audioIntensity || 0)) < 0.05 &&
      // For customColors, do a shallow comparison
      JSON.stringify(prevProps.customColors) === JSON.stringify(nextProps.customColors) &&
      // For onClick, compare by reference
      prevProps.onClick === nextProps.onClick
    )
  },
)

Ki.displayName = 'Ki'

export { Ki }