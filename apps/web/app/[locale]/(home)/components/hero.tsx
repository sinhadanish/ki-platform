'use client';

import { env } from '@/env';
import { Button } from '@repo/design-system/components/ui/button';
import type { Dictionary } from '@repo/internationalization';
import { Heart, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Ki, SpeechBubble } from '@repo/design-system';

type HeroProps = {
  dictionary: Dictionary;
};

export const Hero = ({ dictionary }: HeroProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [liveStats, setLiveStats] = useState({
    conversations: 3247,
    breakthroughTime: 12,
    successRate: 94
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        conversations: prev.conversations + Math.floor(Math.random() * 3),
        breakthroughTime: 12 + Math.floor(Math.random() * 3) - 1,
        successRate: 94 + Math.floor(Math.random() * 3) - 1
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 h-32 w-32 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-xl animate-pulse" />
        <div className="absolute top-60 right-20 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/4 h-20 w-20 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/30 blur-xl animate-pulse delay-2000" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid min-h-screen grid-cols-1 items-center gap-12 py-20 lg:grid-cols-12 lg:py-32">
          {/* Main Content */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            {/* Announcement Badge */}
            <div className={`transform transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/50">
                <Sparkles className="h-4 w-4" />
                World's first Human-AI-Human relationship intelligence
              </div>
            </div>

            {/* Main Heading */}
            <div className={`transform transition-all duration-1000 delay-200 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <h1 className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Transform
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  Your Relationship
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className={`transform transition-all duration-1000 delay-400 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <p className="max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:text-2xl">
                Ki uses advanced AI to understand both partners simultaneously, creating personalized insights that strengthen connection and resolve conflicts with empathy.
              </p>
            </div>

            {/* Live Stats */}
            <div className={`transform transition-all duration-1000 delay-600 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono">{liveStats.conversations.toLocaleString()}+ conversations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  <span>{liveStats.successRate}% success rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  <span>{liveStats.breakthroughTime} min avg breakthrough</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`transform transition-all duration-1000 delay-800 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                  asChild
                >
                  <Link href={`${env.NEXT_PUBLIC_APP_URL}/demo`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative flex items-center gap-2">
                      Talk to Ki - Free Demo
                      <Heart className="h-4 w-4" />
                    </span>
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-purple-200 hover:border-purple-400 dark:border-purple-700 dark:hover:border-purple-500"
                  asChild
                >
                  <Link href="/contact">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Ki Avatar Section */}
          <div className="flex justify-center lg:col-span-5">
            <div className={`relative transform transition-all duration-1000 delay-1000 ${isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
              <div className="relative flex flex-col items-center">
                {/* Speech Bubble positioned above Ki */}
                <div className="relative z-20 mb-4">
                  <SpeechBubble
                    message="Ready to strengthen your relationship? 💕"
                    visible={true}
                    position="top"
                    size="medium"
                    animationType="fade-in-words"
                    autoHide={false}
                  />
                </div>
                
                {/* Ki Avatar */}
                <Ki 
                  state="idle"
                  theme="default"
                  size="large"
                  enhancedGlow={true}
                  autoCycle={true}
                  audioIntensity={0.6}
                  className="drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
