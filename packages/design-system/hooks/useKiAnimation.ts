'use client';

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { type KiState } from '../components/ki/KiThemes';

// Animation state interface
interface AnimationState {
  current: KiState;
  previous: KiState;
  isTransitioning: boolean;
  transitionProgress: number;
  frameCount: number;
  lastUpdate: number;
}

// Performance metrics for monitoring
interface AnimationMetrics {
  frameRate: number;
  averageFrameTime: number;
  droppedFrames: number;
  isOptimal: boolean;
}

// Configuration for the animation hook
interface UseKiAnimationConfig {
  /** Initial state */
  initialState?: KiState;
  /** Whether to auto-optimize based on performance */
  autoOptimize?: boolean;
  /** Target frame rate */
  targetFps?: number;
  /** Whether to enable performance monitoring */
  enableMetrics?: boolean;
  /** Callback for performance updates */
  onPerformanceUpdate?: (metrics: AnimationMetrics) => void;
  /** Whether to use reduced motion */
  reduceMotion?: boolean;
  /** Custom transition durations */
  transitionDurations?: Partial<Record<KiState, number>>;
}

// Hook return interface
interface UseKiAnimationReturn {
  /** Current animation state */
  animationState: AnimationState;
  /** Current performance metrics */
  metrics: AnimationMetrics;
  /** Function to change state with optimized transitions */
  changeState: (newState: KiState, options?: { force?: boolean; duration?: number }) => void;
  /** Function to reset animation */
  reset: () => void;
  /** Whether animation is currently running */
  isAnimating: boolean;
  /** Current animation frame */
  frame: number;
  /** Breathing scale factor for idle state */
  breathingScale: number;
  /** Optimized update function for RAF */
  requestUpdate: () => void;
  /** Function to pause/resume animations */
  setPaused: (paused: boolean) => void;
  /** Whether animations are paused */
  isPaused: boolean;
}

const DEFAULT_CONFIG: Required<UseKiAnimationConfig> = {
  initialState: 'idle',
  autoOptimize: true,
  targetFps: 60,
  enableMetrics: false,
  onPerformanceUpdate: () => {},
  reduceMotion: false,
  transitionDurations: {
    idle: 800,
    listening: 600,
    thinking: 1000,
    speaking: 400,
    typing: 500
  }
};

export const useKiAnimation = (config: UseKiAnimationConfig = {}): UseKiAnimationReturn => {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Animation state
  const [animationState, setAnimationState] = useState<AnimationState>({
    current: mergedConfig.initialState,
    previous: mergedConfig.initialState,
    isTransitioning: false,
    transitionProgress: 0,
    frameCount: 0,
    lastUpdate: Date.now()
  });

  // Performance metrics
  const [metrics, setMetrics] = useState<AnimationMetrics>({
    frameRate: mergedConfig.targetFps,
    averageFrameTime: 1000 / mergedConfig.targetFps,
    droppedFrames: 0,
    isOptimal: true
  });

  // Animation control
  const [isPaused, setIsPaused] = useState(false);
  const [frame, setFrame] = useState(0);

  // Refs for performance tracking
  const animationRef = useRef<number>();
  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(Date.now());
  const transitionStartRef = useRef<number>(0);
  const currentTransitionDurationRef = useRef<number>(800);

  // Calculate breathing scale with optimized sine wave
  const breathingScale = useMemo(() => {
    if (animationState.current !== 'idle' || mergedConfig.reduceMotion || isPaused) return 1;
    
    const time = frame * 0.02;
    const baseScale = 1 + Math.sin(time) * 0.03;
    
    // Optimize: only recalculate when needed
    return Math.round(baseScale * 1000) / 1000; // Round to 3 decimal places
  }, [frame, animationState.current, mergedConfig.reduceMotion, isPaused]);

  // Optimized state change function
  const changeState = useCallback((
    newState: KiState, 
    options: { force?: boolean; duration?: number } = {}
  ) => {
    const { force = false, duration } = options;
    
    // Skip if same state and not forced
    if (animationState.current === newState && !force) return;
    
    const now = Date.now();
    const transitionDuration = duration || mergedConfig.transitionDurations[newState];
    
    setAnimationState(prev => ({
      ...prev,
      previous: prev.current,
      current: newState,
      isTransitioning: true,
      transitionProgress: 0,
      lastUpdate: now
    }));
    
    transitionStartRef.current = now;
    currentTransitionDurationRef.current = transitionDuration;
  }, [animationState.current, mergedConfig.transitionDurations]);

  // Reset animation state
  const reset = useCallback(() => {
    setAnimationState({
      current: mergedConfig.initialState,
      previous: mergedConfig.initialState,
      isTransitioning: false,
      transitionProgress: 0,
      frameCount: 0,
      lastUpdate: Date.now()
    });
    
    setFrame(0);
    frameTimesRef.current = [];
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [mergedConfig.initialState]);

  // Performance monitoring and optimization
  const updateMetrics = useCallback(() => {
    const now = Date.now();
    const frameTimes = frameTimesRef.current;
    
    if (frameTimes.length > 0) {
      const averageFrameTime = frameTimes.reduce((sum, time) => sum + time, 0) / frameTimes.length;
      const currentFps = Math.round(1000 / averageFrameTime);
      const droppedFrames = Math.max(0, mergedConfig.targetFps - currentFps);
      const isOptimal = droppedFrames < 5; // Less than 5 dropped frames is optimal
      
      const newMetrics: AnimationMetrics = {
        frameRate: currentFps,
        averageFrameTime,
        droppedFrames,
        isOptimal
      };
      
      setMetrics(newMetrics);
      
      if (mergedConfig.enableMetrics) {
        mergedConfig.onPerformanceUpdate(newMetrics);
      }
      
      // Auto-optimization: reduce animation quality if performance is poor
      if (mergedConfig.autoOptimize && !isOptimal && droppedFrames > 10) {
        console.warn('Ki Animation: Performance degraded, consider reducing animation complexity');
      }
    }
    
    // Keep only last 60 frame times for rolling average
    if (frameTimes.length > 60) {
      frameTimesRef.current = frameTimes.slice(-60);
    }
  }, [mergedConfig.targetFps, mergedConfig.enableMetrics, mergedConfig.onPerformanceUpdate, mergedConfig.autoOptimize]);

  // Main animation loop
  const animate = useCallback(() => {
    if (isPaused) return;
    
    const now = Date.now();
    const deltaTime = now - lastFrameTimeRef.current;
    
    // Track frame timing for performance metrics
    frameTimesRef.current.push(deltaTime);
    lastFrameTimeRef.current = now;
    
    // Update frame counter
    setFrame(prev => prev + 1);
    
    // Update animation state
    setAnimationState(prev => {
      const newState = { ...prev };
      
      // Handle transition progress
      if (prev.isTransitioning) {
        const elapsed = now - transitionStartRef.current;
        const progress = Math.min(elapsed / currentTransitionDurationRef.current, 1);
        
        newState.transitionProgress = progress;
        newState.frameCount = prev.frameCount + 1;
        newState.lastUpdate = now;
        
        // Complete transition
        if (progress >= 1) {
          newState.isTransitioning = false;
          newState.transitionProgress = 1;
        }
      } else {
        newState.frameCount = prev.frameCount + 1;
        newState.lastUpdate = now;
      }
      
      return newState;
    });
    
    // Update performance metrics every 60 frames
    if (frame % 60 === 0) {
      updateMetrics();
    }
    
    // Continue animation loop
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, frame, updateMetrics]);

  // Request update function for external control
  const requestUpdate = useCallback(() => {
    if (!animationRef.current && !isPaused) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [animate, isPaused]);

  // Pause/resume control
  const setPaused = useCallback((paused: boolean) => {
    setIsPaused(paused);
    
    if (paused && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    } else if (!paused && !animationRef.current) {
      lastFrameTimeRef.current = Date.now();
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  // Start animation loop on mount
  useEffect(() => {
    if (!mergedConfig.reduceMotion && !isPaused) {
      lastFrameTimeRef.current = Date.now();
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, mergedConfig.reduceMotion, isPaused]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    animationState,
    metrics,
    changeState,
    reset,
    isAnimating: animationState.isTransitioning || animationState.current !== 'idle',
    frame,
    breathingScale,
    requestUpdate,
    setPaused,
    isPaused
  };
};

// Export types for external use
export type { AnimationState, AnimationMetrics, UseKiAnimationConfig, UseKiAnimationReturn };