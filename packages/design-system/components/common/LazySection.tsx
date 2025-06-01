'use client';

import { motion } from 'framer-motion';
import { type ReactNode, useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  /** Content to render when in view */
  children: ReactNode;
  /** Loading component to show while content loads */
  loading?: ReactNode;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Intersection threshold */
  threshold?: number;
  /** Animation variants */
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'scale' | 'none';
  /** Animation duration */
  duration?: number;
  /** Stagger delay for child animations */
  staggerDelay?: number;
  /** Custom className */
  className?: string;
  /** Callback when section becomes visible */
  onVisible?: () => void;
  /** Whether to trigger animation only once */
  triggerOnce?: boolean;
}

const defaultLoading = (
  <div className="flex justify-center items-center py-20">
    <div className="relative">
      {/* Ki-style loading animation */}
      <motion.div
        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute inset-0 w-12 h-12 rounded-full border-2 border-purple-300"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
    </div>
  </div>
);

export const LazySection = ({
  children,
  loading = defaultLoading,
  rootMargin = '200px',
  threshold = 0.1,
  animation = 'fade',
  duration = 0.6,
  staggerDelay = 0.1,
  className = '',
  onVisible,
  triggerOnce = true
}: LazySectionProps) => {
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          onVisible?.();
          
          if (triggerOnce) {
            setHasTriggered(true);
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, onVisible, triggerOnce]);

  // Load content when in view
  useEffect(() => {
    if (isInView && !isLoaded) {
      // Simulate loading delay for smooth UX
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, isLoaded]);

  // Animation variants
  const getAnimationVariants = () => {
    switch (animation) {
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration,
              ease: "easeOut"
            }
          }
        };
      
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: {
              duration,
              ease: "easeOut"
            }
          }
        };
      
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              duration,
              ease: "easeOut"
            }
          }
        };
      
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              duration,
              ease: "easeOut"
            }
          }
        };
      
      case 'none':
      default:
        return {
          hidden: {},
          visible: {}
        };
    }
  };

  const variants = getAnimationVariants();

  // Container variants for staggered children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  const shouldShowContent = isInView && isLoaded;
  const shouldAnimate = isInView && (!triggerOnce || !hasTriggered);

  return (
    <div ref={ref} className={className}>
      {shouldShowContent ? (
        animation !== 'none' ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            className="w-full"
          >
            <motion.div variants={variants}>
              {children}
            </motion.div>
          </motion.div>
        ) : (
          children
        )
      ) : isInView ? (
        loading
      ) : null}
    </div>
  );
};