'use client';

import { useEffect, useState } from 'react';

type KiAvatarProps = {
  size?: 'small' | 'medium' | 'large';
  state?: 'idle' | 'listening' | 'thinking' | 'speaking';
  showSpeechBubble?: boolean;
};

export const KiAvatar = ({ 
  size = 'large', 
  state = 'idle',
  showSpeechBubble = true 
}: KiAvatarProps) => {
  const [currentState, setCurrentState] = useState(state);
  const [speechText, setSpeechText] = useState("Ready to strengthen your relationship? 💕");

  const sizeClasses = {
    small: 'h-20 w-20',
    medium: 'h-40 w-40',
    large: 'h-80 w-80 md:h-96 md:w-96'
  };

  const speechTexts = [
    "Ready to strengthen your relationship? 💕",
    "I understand both of you 💭",
    "Let's work through this together ✨",
    "Every relationship has unique beauty 🌸",
    "Trust the process of growth 🌱"
  ];

  useEffect(() => {
    if (state !== 'idle') {
      setCurrentState(state);
      return;
    }

    // Cycle through states when idle
    const stateInterval = setInterval(() => {
      const states = ['idle', 'listening', 'thinking', 'speaking'];
      const randomState = states[Math.floor(Math.random() * states.length)] as typeof currentState;
      setCurrentState(randomState);
    }, 4000);

    // Change speech text periodically
    const speechInterval = setInterval(() => {
      const randomText = speechTexts[Math.floor(Math.random() * speechTexts.length)];
      setSpeechText(randomText);
    }, 6000);

    return () => {
      clearInterval(stateInterval);
      clearInterval(speechInterval);
    };
  }, [state]);

  const getStateColor = () => {
    switch (currentState) {
      case 'listening':
        return 'from-blue-500 to-purple-500';
      case 'thinking':
        return 'from-yellow-500 to-orange-500';
      case 'speaking':
        return 'from-green-500 to-blue-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  const getAnimationClass = () => {
    switch (currentState) {
      case 'listening':
        return 'ki-pulse scale-105';
      case 'thinking':
        return 'animate-spin-slow';
      case 'speaking':
        return 'ki-float scale-110';
      default:
        return 'ki-pulse';
    }
  };

  return (
    <div className="relative">
      {/* Ki Avatar Container */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer glow ring */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getStateColor()}/20 blur-xl animate-pulse`} />
        
        {/* Main avatar circle */}
        <div className={`relative h-full w-full rounded-full bg-gradient-to-br ${getStateColor()} p-1 transition-all duration-1000 ${getAnimationClass()}`}>
          <div className="h-full w-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center relative overflow-hidden">
            {/* Ki Character */}
            <div className={`font-bold bg-gradient-to-br ${getStateColor()} bg-clip-text text-transparent transition-all duration-500 ${
              size === 'small' ? 'text-2xl' : 
              size === 'medium' ? 'text-4xl md:text-5xl' : 
              'text-8xl md:text-9xl'
            }`}>
              Ki
            </div>
            
            {/* State-based effects */}
            {currentState === 'listening' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-full rounded-full border-4 border-blue-300 dark:border-blue-600 animate-ping opacity-20" />
              </div>
            )}
            
            {currentState === 'thinking' && (
              <>
                <div className="absolute top-1/4 right-1/4 h-2 w-2 rounded-full bg-yellow-400 animate-bounce delay-0" />
                <div className="absolute top-1/3 right-1/3 h-1.5 w-1.5 rounded-full bg-orange-400 animate-bounce delay-200" />
                <div className="absolute top-1/2 right-1/2 h-1 w-1 rounded-full bg-yellow-300 animate-bounce delay-400" />
              </>
            )}
            
            {currentState === 'speaking' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-3/4 w-3/4 rounded-full border-2 border-green-300 dark:border-green-600 animate-pulse opacity-30" />
                <div className="absolute h-1/2 w-1/2 rounded-full border-2 border-green-400 dark:border-green-500 animate-pulse opacity-50 delay-300" />
              </div>
            )}
          </div>
        </div>
        
        {/* Floating orbital elements */}
        <div className={`absolute -top-4 -right-4 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 animate-bounce delay-500 ${
          size === 'small' ? 'h-3 w-3 -top-2 -right-2' : 
          size === 'medium' ? 'h-6 w-6 -top-3 -right-3' : ''
        }`} />
        <div className={`absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 animate-bounce delay-1000 ${
          size === 'small' ? 'h-2 w-2 -bottom-1 -left-1' : 
          size === 'medium' ? 'h-4 w-4 -bottom-2 -left-2' : ''
        }`} />
        <div className={`absolute top-1/4 -left-6 h-4 w-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 animate-bounce delay-1500 ${
          size === 'small' ? 'h-2 w-2 -left-2' : 
          size === 'medium' ? 'h-3 w-3 -left-3' : ''
        }`} />
      </div>

      {/* Speech bubble */}
      {showSpeechBubble && size !== 'small' && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-fade-in delay-2000">
          <div className="rounded-xl bg-white dark:bg-gray-800 px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs">
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
              {speechText}
            </p>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800" />
          </div>
        </div>
      )}
    </div>
  );
};