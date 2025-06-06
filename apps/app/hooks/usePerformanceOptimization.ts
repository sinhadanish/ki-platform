"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'

interface PerformanceMetrics {
  isLowEndDevice: boolean
  shouldReduceAnimations: boolean
  connectionType: 'slow' | 'normal' | 'fast'
  memoryUsage: 'low' | 'normal' | 'high'
}

interface UsePerformanceOptimizationReturn {
  metrics: PerformanceMetrics
  optimizedConfig: {
    reduceMotion: boolean
    enableLazyLoading: boolean
    particleCount: number
    animationDuration: number
    enableHeavyEffects: boolean
  }
  preloadCriticalAssets: () => void
  measurePerformance: (label: string) => () => void
}

export function usePerformanceOptimization(): UsePerformanceOptimizationReturn {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    isLowEndDevice: false,
    shouldReduceAnimations: false,
    connectionType: 'normal',
    memoryUsage: 'normal'
  })

  // Detect device capabilities
  useEffect(() => {
    const detectDeviceCapabilities = () => {
      const hardwareConcurrency = navigator.hardwareConcurrency || 4
      const deviceMemory = (navigator as any).deviceMemory || 4
      const connection = (navigator as any).connection
      
      // Detect low-end device
      const isLowEndDevice = hardwareConcurrency <= 2 || deviceMemory <= 2
      
      // Check user preference for reduced motion
      const shouldReduceAnimations = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      // Determine connection type
      let connectionType: 'slow' | 'normal' | 'fast' = 'normal'
      if (connection) {
        const effectiveType = connection.effectiveType
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          connectionType = 'slow'
        } else if (effectiveType === '4g') {
          connectionType = 'fast'
        }
      }
      
      // Estimate memory usage
      let memoryUsage: 'low' | 'normal' | 'high' = 'normal'
      if (deviceMemory <= 2) {
        memoryUsage = 'low'
      } else if (deviceMemory >= 8) {
        memoryUsage = 'high'
      }
      
      setMetrics({
        isLowEndDevice,
        shouldReduceAnimations,
        connectionType,
        memoryUsage
      })
    }

    detectDeviceCapabilities()
    
    // Listen for changes in user preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      setMetrics(prev => ({ ...prev, shouldReduceAnimations: e.matches }))
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  // Optimized configuration based on device capabilities
  const optimizedConfig = useMemo(() => {
    return {
      reduceMotion: metrics.shouldReduceAnimations || metrics.isLowEndDevice,
      enableLazyLoading: metrics.connectionType === 'slow' || metrics.memoryUsage === 'low',
      particleCount: metrics.isLowEndDevice ? 4 : metrics.memoryUsage === 'high' ? 12 : 8,
      animationDuration: metrics.shouldReduceAnimations ? 0.2 : metrics.isLowEndDevice ? 0.3 : 0.5,
      enableHeavyEffects: !metrics.isLowEndDevice && metrics.memoryUsage !== 'low'
    }
  }, [metrics])

  // Preload critical assets for better performance
  const preloadCriticalAssets = useCallback(() => {
    // Preload critical images
    const criticalImages = [
      '/ki-avatar-idle.webp',
      '/ki-avatar-listening.webp',
      '/ki-avatar-thinking.webp'
    ]
    
    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
    
    // Preload critical fonts
    const criticalFonts = [
      '/fonts/inter-var.woff2'
    ]
    
    criticalFonts.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  // Performance measurement utility
  const measurePerformance = useCallback((label: string) => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      
      // Log slow operations in development
      if (process.env.NODE_ENV === 'development' && duration > 16.67) { // > 1 frame at 60fps
        console.warn(`Slow operation detected: ${label} took ${duration.toFixed(2)}ms`)
      }
      
      // Send to analytics in production (if available)
      if (process.env.NODE_ENV === 'production' && duration > 100) {
        // Analytics.track('performance', { operation: label, duration })
      }
      
      return duration
    }
  }, [])

  // Monitor memory usage
  useEffect(() => {
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory
        if (memory) {
          const usedMemoryMB = memory.usedJSHeapSize / 1048576 // Convert to MB
          const totalMemoryMB = memory.totalJSHeapSize / 1048576
          
          if (usedMemoryMB > 100) { // If using more than 100MB
            console.warn(`High memory usage detected: ${usedMemoryMB.toFixed(2)}MB used`)
            
            // Update metrics to reflect high memory usage
            setMetrics(prev => ({ ...prev, memoryUsage: 'high' }))
          }
        }
      }
      
      // Check memory usage every 30 seconds
      const interval = setInterval(checkMemory, 30000)
      
      return () => clearInterval(interval)
    }
  }, [])

  return {
    metrics,
    optimizedConfig,
    preloadCriticalAssets,
    measurePerformance
  }
}