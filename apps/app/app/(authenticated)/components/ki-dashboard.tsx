'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { KiChat } from './ki-chat';
import { Ki } from '@repo/design-system';
import { Button } from '@repo/design-system/components/ui/button';
import { MessageCircle, Sun, Moon, Sunset, Clock } from 'lucide-react';

type View = 'dashboard' | 'chat';

type KiDashboardProps = {
  firstName: string;
};

export const KiDashboard = ({ firstName }: KiDashboardProps) => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return { greeting: 'Good Morning', icon: Sun, color: 'from-yellow-400 to-orange-400' };
    if (hour >= 12 && hour < 17) return { greeting: 'Good Afternoon', icon: Sun, color: 'from-orange-400 to-yellow-500' };
    if (hour >= 17 && hour < 21) return { greeting: 'Good Evening', icon: Sunset, color: 'from-orange-500 to-pink-500' };
    return { greeting: 'Good Night', icon: Moon, color: 'from-blue-500 to-purple-500' };
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (currentView === 'chat') {
    return (
      <KiChat 
        userName={firstName} 
        onBack={() => setCurrentView('dashboard')} 
      />
    );
  }

  const timeData = getTimeGreeting();
  const TimeIcon = timeData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200/20 to-blue-200/20 dark:from-purple-400/10 dark:to-blue-400/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-gradient-to-br from-pink-200/20 to-purple-200/20 dark:from-pink-400/10 dark:to-purple-400/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div 
          className="w-full max-w-2xl mx-auto text-center space-y-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Time and Date Display */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3">
              <TimeIcon className={`w-8 h-8 bg-gradient-to-r ${timeData.color} bg-clip-text text-transparent`} />
              <h1 className={`text-5xl md:text-6xl font-light bg-gradient-to-r ${timeData.color} bg-clip-text text-transparent`}>
                {formatTime()}
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-light">
              {formatDate()}
            </p>
          </motion.div>

          {/* Personalized Greeting */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className={`text-4xl md:text-5xl font-medium bg-gradient-to-r ${timeData.color} bg-clip-text text-transparent`}>
              {timeData.greeting}, {firstName}
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light max-w-lg mx-auto leading-relaxed">
              How are you feeling today?
            </p>
          </motion.div>

          {/* Ki Avatar */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              className="relative"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {/* Soft glow around Ki */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-green-400/20 blur-2xl scale-150"
                animate={{
                  scale: [1.5, 1.7, 1.5],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <Ki
                state="idle"
                size="large"
                theme="default"
                enhancedGlow={true}
                autoCycle={false}
                audioIntensity={0.5}
                className="relative z-10 w-32 h-32 md:w-40 md:h-40"
              />
            </motion.div>
          </motion.div>

          {/* Talk to Ki Button */}
          <motion.div 
            className="pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                onClick={() => setCurrentView('chat')}
                className="relative group bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 hover:from-purple-700 hover:via-blue-700 hover:to-green-700 text-white font-semibold px-12 py-6 rounded-full shadow-2xl text-xl md:text-2xl transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: "0 10px 40px rgba(147, 51, 234, 0.3)",
                }}
              >
                {/* Button gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-4">
                  <MessageCircle className="w-8 h-8" />
                  Talk to Ki
                </span>

                {/* Enhanced glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 -z-10 scale-110" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Subtle info text */}
          <motion.p 
            className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            I'm here to help strengthen your relationship ✨
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};