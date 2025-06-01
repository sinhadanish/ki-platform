'use client';

import { env } from '@/env';
import { Button } from '@repo/design-system/components/ui/button';
import { Ki, SpeechBubble } from '@repo/design-system';
import type { Dictionary } from '@repo/internationalization';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

type HeroSectionEnhancedProps = {
  dictionary: Dictionary;
};

export const HeroSectionEnhanced = ({ dictionary }: HeroSectionEnhancedProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [liveStats, setLiveStats] = useState({
    conversations: 3247,
    breakthroughTime: 12,
    successRate: 94,
    activeUsers: 150
  });
  const [kiState, setKiState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');

  // Initialize animations
  useEffect(() => {
    setIsAnimating(true);
    
    // Auto-cycle Ki states for demo
    const stateInterval = setInterval(() => {
      const states = ['idle', 'listening', 'thinking', 'speaking'] as const;
      const newState = states[Math.floor(Math.random() * states.length)];
      setKiState(newState);
    }, 4000);

    return () => clearInterval(stateInterval);
  }, []);

  // Static stats - no longer changing
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setLiveStats(prev => ({
  //       conversations: prev.conversations + Math.floor(Math.random() * 3),
  //       breakthroughTime: 12 + Math.floor(Math.random() * 3) - 1,
  //       successRate: 94 + Math.floor(Math.random() * 3) - 1,
  //       activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2
  //     }));
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  // Dynamic messages based on Ki state - deterministic for SSR
  const getMessageForState = (state: string, index: number = 0) => {
    const messages = {
      idle: [
        "Ready to strengthen your relationship? 💕",
        "Let's grow together ✨",
        "Your journey to deeper connection starts here 🌱"
      ],
      listening: [
        "I'm here to listen... 👂",
        "Tell me what's on your heart 💙", 
        "I understand both perspectives 🤝"
      ],
      thinking: [
        "Processing with empathy... 🧠",
        "Finding the right words... 💭",
        "Understanding your feelings... ❤️"
      ],
      speaking: [
        "Here's what I notice... 🗣️",
        "Let's work through this together ✨",
        "Every relationship has unique beauty 🌸"
      ]
    };
    
    const stateMessages = messages[state as keyof typeof messages] || messages.idle;
    return stateMessages[index % stateMessages.length];
  };

  const [currentMessage, setCurrentMessage] = useState(getMessageForState('idle', 0));
  const messageIndexRef = useRef(0);

  // Update message when Ki state changes
  useEffect(() => {
    messageIndexRef.current += 1;
    setCurrentMessage(getMessageForState(kiState, messageIndexRef.current));
  }, [kiState]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 h-32 w-32 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-xl"
          animate={{
            scale: [1, 1.1, 1.2, 1.1, 1],
            x: [0, 15, 30, 15, 0],
            y: [0, -8, -15, -8, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        />
        <motion.div
          className="absolute top-60 right-20 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl"
          animate={{
            scale: [1, 1.05, 1.1, 1.05, 1],
            x: [0, -10, -20, -10, 0],
            y: [0, 10, 20, 10, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 h-20 w-20 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 blur-xl"
          animate={{
            scale: [1, 1.15, 1.3, 1.15, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-20 lg:py-32">
        <div className="grid min-h-[80vh] grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Main Content - Left 7 columns */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            {/* Announcement Badge */}
            <motion.div
              className={`transform transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/50">
                <Sparkles className="h-4 w-4" />
                World's first Human-AI-Human relationship intelligence
              </div>
            </motion.div>

            {/* Main Heading with Enhanced Gradient Animation */}
            <motion.div
              className={`transform transition-all duration-1000 delay-200 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
                <motion.span 
                  className="block"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "50% 50%", "100% 50%", "50% 50%", "0% 50%"],
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1]
                  }}
                  style={{
                    backgroundImage: "linear-gradient(to right, #9333EA, #7C3AED, #5B6EE8, #3B82F6, #9333EA)",
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Feel Heard and Heal Together with Ki
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              className={`transform transition-all duration-1000 delay-400 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6">
                Your emotionally intelligent AI companion for navigating conflict and deepening connection in your relationship.
              </p>
            </motion.div>

            {/* Enhanced Value Proposition Badge */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-500/20">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Transform conflicts into deeper connections.
                </span>
              </div>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              className={`transform transition-all duration-1000 delay-600 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="h-2 w-2 rounded-full bg-green-500"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity 
                    }}
                  />
                  <span className="font-mono">{liveStats.conversations.toLocaleString()}+ conversations</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  <span>{liveStats.successRate}% success rate</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  <span>{liveStats.breakthroughTime} min avg breakthrough</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-5 pt-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-start">
                <Link href={`${env.NEXT_PUBLIC_APP_URL}/demo`}>
                  <motion.button
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-purple-500/40 transition-all duration-500 overflow-hidden"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                    
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                      <MessageCircle className="w-5 h-5" />
                      Try Ki
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </Link>

                <Link href="/signin">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-purple-200 hover:border-purple-400 dark:border-purple-700 dark:hover:border-purple-500 w-full px-8 py-4 text-lg font-semibold"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Ki Avatar Section - Right 5 columns */}
          <div className="flex justify-center lg:col-span-5">
            <motion.div
              className="relative max-w-full"
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Enhanced glow effects */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-green-400/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ width: "140%", height: "140%", left: "-20%", top: "-20%" }}
              />
              
              {/* Orbiting elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(6)].map((_, i) => {
                  const baseAngle = i * 60; // Fixed base angles for each circle
                  const radius = 120; // Increased radius for larger Ki
                  return (
                    <motion.div
                      key={`orbit-${i}`} // Stable key to prevent repositioning on state changes
                      className="absolute w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg"
                      style={{
                        left: "50%",
                        top: "50%",
                        marginLeft: "-6px", // Center the circle
                        marginTop: "-6px", // Center the circle
                      }}
                      animate={{
                        x: [
                          Math.cos((baseAngle + 0) * Math.PI / 180) * radius,
                          Math.cos((baseAngle + 90) * Math.PI / 180) * radius,
                          Math.cos((baseAngle + 180) * Math.PI / 180) * radius,
                          Math.cos((baseAngle + 270) * Math.PI / 180) * radius,
                          Math.cos((baseAngle + 360) * Math.PI / 180) * radius
                        ],
                        y: [
                          Math.sin((baseAngle + 0) * Math.PI / 180) * radius,
                          Math.sin((baseAngle + 90) * Math.PI / 180) * radius,
                          Math.sin((baseAngle + 180) * Math.PI / 180) * radius,
                          Math.sin((baseAngle + 270) * Math.PI / 180) * radius,
                          Math.sin((baseAngle + 360) * Math.PI / 180) * radius
                        ],
                        rotate: [0, 360],
                        scale: [0.7, 1.3, 0.7],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        x: {
                          duration: 12,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.2,
                        },
                        y: {
                          duration: 12,
                          repeat: Infinity,
                          ease: "linear", 
                          delay: i * 0.2,
                        },
                        rotate: {
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.3,
                        },
                        scale: {
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.4,
                        },
                        opacity: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        }
                      }}
                    />
                  );
                })}
              </div>
              
              {/* Container for Ki and speech bubble */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Speech Bubble - positioned above Ki */}
                <motion.div
                  key={currentMessage} // Trigger re-animation when message changes
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative z-20 mb-6"
                >
                  <SpeechBubble
                    message={currentMessage}
                    visible={true}
                    position="top"
                    size="medium"
                    animationType="fade-in-words"
                    autoHide={false}
                    className="relative"
                  />
                </motion.div>
              
                {/* Ki Avatar */}
                <Ki
                  state={kiState}
                  size="large"
                  theme="default"
                  enhancedGlow={true}
                  autoCycle={false}
                  audioIntensity={0.6}
                  className="drop-shadow-2xl w-80 h-80 sm:w-96 sm:h-96 md:w-[30rem] md:h-[30rem] lg:w-[36rem] lg:h-[36rem] xl:w-[42rem] xl:h-[42rem]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};