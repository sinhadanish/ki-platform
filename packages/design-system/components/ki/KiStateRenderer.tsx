'use client';

import { motion } from 'framer-motion';
import type { KiState } from './types';

interface KiStateRendererProps {
  state: KiState;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  audioIntensity?: number;
  speedMultiplier: number;
  gradientId: string;
  glowGradientId: string;
  isTransitioning?: boolean;
}

export const KiStateRenderer = ({
  state,
  colors,
  audioIntensity = 0,
  speedMultiplier,
  gradientId,
  glowGradientId,
  isTransitioning = false,
}: KiStateRendererProps) => {
  // Use faster transitions when transitioning between states
  const transitionDuration = isTransitioning ? 0.15 : 0.3;

  switch (state) {
    case 'idle':
      return <IdleState colors={colors} glowGradientId={glowGradientId} />;
    case 'listening':
      return (
        <ListeningState
          colors={colors}
          audioIntensity={audioIntensity}
          speedMultiplier={speedMultiplier}
          transitionDuration={transitionDuration}
        />
      );
    case 'thinking':
      return <ThinkingState colors={colors} speedMultiplier={speedMultiplier} transitionDuration={transitionDuration} />;
    case 'speaking':
      return <SpeakingState colors={colors} speedMultiplier={speedMultiplier} transitionDuration={transitionDuration} />;
    case 'typing':
      return <TypingState colors={colors} speedMultiplier={speedMultiplier} transitionDuration={transitionDuration} />;
    default:
      return null;
  }
};

// Idle state renderer
const IdleState = ({ colors, glowGradientId }: { colors: any; glowGradientId: string }) => (
  <>
    {/* Pulsing glow effect */}
    <motion.circle
      cx="100"
      cy="85"
      r="28"
      fill={`url(#${glowGradientId})`}
      animate={{
        opacity: [0.3, 0.5, 0.3],
        r: [26, 30, 26],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />

    {/* Central dot */}
    <motion.circle
      cx="100"
      cy="85"
      r="4.69"
      fill="rgba(255, 255, 255, 0.7)"
      filter="url(#glow)"
      animate={{
        scale: [0.9, 1.1, 0.9],
        opacity: [0.6, 0.8, 0.6],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  </>
);

// Listening state renderer
const ListeningState = ({
  colors,
  audioIntensity = 0,
  speedMultiplier,
  transitionDuration,
}: {
  colors: any;
  audioIntensity?: number;
  speedMultiplier: number;
  transitionDuration: number;
}) => (
  <g>
    {/* Listening "ears" */}
    <motion.path
      d="M81.25,85 C76.56,75.63 71.88,70.94 67.19,75.63 C62.5,80.31 64.38,89.69 70,94.38 C73.75,97.19 79.38,94.38 81.25,89.69 Z"
      fill="rgba(255, 255, 255, 0.7)"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0.8, 1, 0.8],
        opacity: [0.6, 0.8, 0.6],
      }}
      transition={{
        duration: 2 * speedMultiplier,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: 0,
      }}
      style={{
        scale: 0.8 + audioIntensity * 0.4,
      }}
    />

    <motion.path
      d="M118.75,85 C123.44,75.63 128.13,70.94 132.81,75.63 C137.5,80.31 135.63,89.69 130,94.38 C126.25,97.19 120.63,94.38 118.75,89.69 Z"
      fill="rgba(255, 255, 255, 0.7)"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0.8, 1, 0.8],
        opacity: [0.6, 0.8, 0.6],
      }}
      transition={{
        duration: 2 * speedMultiplier,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: 0.3,
      }}
      style={{
        scale: 0.8 + audioIntensity * 0.4,
      }}
    />

    {/* Sound particles */}
    {[...Array(8)].map((_, i) => {
      const angle = (i * Math.PI) / 4;
      // Deterministic values based on index instead of random
      const radiusVariation = (i % 3) * 6.25; // Creates variation: 0, 6.25, 12.5
      const startRadius = 56.25 + radiusVariation;
      const endRadius = 14.06 + (i % 2) * 4.69; // Creates variation: 0, 4.69

      const startX = 100 + Math.cos(angle) * startRadius;
      const startY = 85 + Math.sin(angle) * startRadius;
      const endX = 100 + Math.cos(angle) * endRadius;
      const endY = 85 + Math.sin(angle) * endRadius;

      return (
        <motion.circle
          key={i}
          cx={startX}
          cy={startY}
          r={1.41 + (i % 4) * 0.23 + audioIntensity * 1.5} // Deterministic size variation
          fill="rgba(255, 255, 255, 0.8)"
          initial={{ opacity: 0 }}
          animate={{
            x: [0, endX - startX],
            y: [0, endY - startY],
            opacity: [0, 0.8, 0],
            scale: [1, 0.5],
          }}
          transition={{
            duration: 1.5 + (i % 3) * 0.17, // Deterministic duration variation
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2 * speedMultiplier,
            ease: "easeIn",
          }}
        />
      );
    })}

    {/* Attentive "eye" */}
    <motion.circle
      cx="100"
      cy="85"
      r={5.63 + audioIntensity * 2}
      fill="white"
      style={{
        opacity: 0.7 + audioIntensity * 0.3,
      }}
    />
  </g>
);

// Thinking state renderer
const ThinkingState = ({
  colors,
  speedMultiplier,
  transitionDuration,
}: {
  colors: any;
  speedMultiplier: number;
  transitionDuration: number;
}) => (
  <g>
    {/* Thought bubbles */}
    {[0, 1, 2].map((i) => {
      const size = 4.69 + i * 1.88;
      const delay = i * 0.4 * speedMultiplier;
      const baseX = 118.75 + i * 9.38;
      const baseY = 70.31 - i * 9.38;

      return (
        <motion.circle
          key={i}
          cx={baseX}
          cy={baseY}
          r={size}
          fill={colors.accent}
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="1"
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -14.06, -28.13],
            x: [0, i % 2 === 0 ? 4.69 : -4.69, 0],
          }}
          transition={{
            duration: 2.5 * speedMultiplier,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: delay,
          }}
        />
      );
    })}
  </g>
);

// Speaking state renderer
const SpeakingState = ({
  colors,
  speedMultiplier,
  transitionDuration,
}: {
  colors: any;
  speedMultiplier: number;
  transitionDuration: number;
}) => (
  <g>
    {/* Concentric circles */}
    {[0, 1, 2].map((i) => {
      const delay = i * 0.2 * speedMultiplier;
      const duration = (1.2 + i * 0.2) * speedMultiplier;

      return (
        <motion.circle
          key={i}
          cx="100"
          cy="85"
          r={7.5 + i * 5.63}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth={3 - i * 0.5}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.8 - i * 0.2, 0.4 - i * 0.1, 0],
            scale: [0.8, 1.2, 1.5],
          }}
          transition={{
            duration: duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
            delay: delay,
          }}
        />
      );
    })}

    {/* Central dot */}
    <motion.circle
      cx="100"
      cy="85"
      r="3.75"
      fill="white"
      animate={{
        opacity: [0.7, 1, 0.7],
        r: [3.75, 4.69, 3.75],
      }}
      transition={{
        duration: 0.8 * speedMultiplier,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  </g>
);

// Typing state renderer
const TypingState = ({
  colors,
  speedMultiplier,
  transitionDuration,
}: {
  colors: any;
  speedMultiplier: number;
  transitionDuration: number;
}) => (
  <g>
    {/* Typing indicator dots */}
    {[0, 1, 2].map((i) => (
      <motion.circle
        key={i}
        cx={95 + i * 5}
        cy={85}
        r={2.5}
        fill="rgba(255, 255, 255, 0.9)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.2 * speedMultiplier,
          repeat: Number.POSITIVE_INFINITY,
          delay: i * 0.2 * speedMultiplier,
          ease: "easeInOut",
        }}
      />
    ))}
  </g>
);