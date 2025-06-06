'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ki } from '@repo/design-system';
import { Button } from '@repo/design-system/components/ui/button';
import { Send, Heart, Sparkles } from 'lucide-react';
import { ImprovedVoiceTextInput } from '../../../components/ImprovedVoiceTextInput';
import { ThemeToggle } from '../../../components/ThemeToggle';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ki';
  timestamp: Date;
};

type KiChatProps = {
  userName?: string;
  onBack?: () => void;
};

export const KiChat = ({ userName = 'there', onBack }: KiChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Welcome back, ${userName}! I'm here to help strengthen your relationship. What's on your mind today? 💕`,
      sender: 'ki',
      timestamp: new Date()
    }
  ]);
  const [kiState, setKiState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [isKiTyping, setIsKiTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string, mode: 'voice' | 'text') => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setKiState('thinking');
    setIsKiTyping(true);

    // Simulate Ki thinking and responding
    setTimeout(() => {
      setKiState('speaking');
      
      // Generate a thoughtful response based on the user's message
      const responses = [
        "I hear you. That sounds like something many couples experience. Let's explore this together.",
        "Thank you for sharing that with me. I can sense this is important to you.",
        "I understand how that might feel. Every relationship has its unique dynamics.",
        "That's a meaningful observation. What emotions come up for you when you think about this?",
        "I appreciate your openness. Let's work through this step by step.",
      ];
      
      const kiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ki',
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, kiResponse]);
        setIsKiTyping(false);
        setKiState('idle');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 overflow-hidden relative transition-colors duration-500">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Back Button */}
      {onBack && (
        <motion.button
          onClick={onBack}
          className="absolute top-4 left-4 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200/50 dark:border-white/20 hover:bg-white/90 dark:hover:bg-gray-900/90 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}

      {/* Enhanced animated background - same as onboarding */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary floating orbs */}
        <motion.div
          className="absolute top-20 left-20 h-48 w-48 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-400/30 dark:to-pink-400/30 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-60 right-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-400/15 dark:from-blue-400/25 dark:to-cyan-400/25 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />

        <motion.div
          className="absolute bottom-20 left-1/3 h-56 w-56 rounded-full bg-gradient-to-br from-green-400/15 to-blue-400/15 dark:from-green-400/20 dark:to-blue-400/20 blur-3xl"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 1.25, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => {
          const leftPosition = (i * 17 + 23) % 100;
          const topPosition = (i * 31 + 47) % 100;
          const duration = 8 + (i % 4);
          const delay = (i * 0.5) % 5;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-300/40 dark:bg-white/20 rounded-full"
              style={{
                left: `${leftPosition}%`,
                top: `${topPosition}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            />
          );
        })}

        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-purple-100/20 dark:from-black/20 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header with Ki Avatar - same positioning as onboarding */}
        <motion.div 
          className="flex flex-col items-center justify-center pt-8 pb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Ki Avatar with enhanced presence - same styling as onboarding */}
          <motion.div 
            className="relative"
            animate={{ 
              y: [0, -15, 0],
              rotateY: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {/* Multiple glow rings around Ki - same as onboarding */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-green-400/20 blur-3xl scale-150"
              animate={{
                scale: [1.5, 1.8, 1.5],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/15 via-purple-400/15 to-blue-400/15 blur-2xl scale-125"
              animate={{
                scale: [1.25, 1.4, 1.25],
                opacity: [0.4, 0.7, 0.4],
                rotate: [360, 180, 0],
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />

            {/* Ki Avatar - smaller size for chat */}
            <Ki
              state={isKiTyping ? 'thinking' : kiState}
              size="large"
              theme="default"
              enhancedGlow={true}
              autoCycle={false}
              audioIntensity={0.8}
              className="relative z-10 drop-shadow-2xl w-[16rem] h-[16rem] md:w-[20rem] md:h-[20rem] lg:w-[24rem] lg:h-[24rem]"
            />
          </motion.div>
        </motion.div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 max-w-4xl mx-auto w-full">
          <div className="space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-center'}`}
                >
                  {message.sender === 'ki' ? (
                    /* Ki message bubble - same styling as onboarding speech bubble */
                    <div className="relative" style={{ maxWidth: 'calc(100vw - 40px)' }}>
                      <div
                        className="bg-white dark:bg-gray-900/95 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-600/30 relative pointer-events-auto p-6 md:p-8 backdrop-blur-sm"
                        style={{
                          boxShadow: "0 4px 25px rgba(168, 85, 247, 0.15)",
                          minHeight: "60px",
                          maxWidth: "500px",
                          minWidth: "250px",
                        }}
                      >
                        {/* Subtle gradient overlay matching onboarding */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white dark:from-purple-500/10 dark:to-blue-500/5 rounded-2xl opacity-50" />

                        {/* Content container */}
                        <div className="relative z-10">
                          <div className="font-medium text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                            {message.content}
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

                      {/* Speech bubble tail pointing up to Ki */}
                      <div
                        className="absolute w-0 h-0 top-0 left-1/2 -translate-x-1/2 -translate-y-full"
                        style={{
                          borderLeft: "10px solid transparent",
                          borderRight: "10px solid transparent",
                          borderBottom: "10px solid var(--speech-bubble-bg, white)",
                          filter: "drop-shadow(0 2px 4px rgba(168, 85, 247, 0.1))",
                        }}
                      />
                      <style jsx>{`
                        :global(.dark) {
                          --speech-bubble-bg: rgba(17, 24, 39, 0.95);
                        }
                        :global(:root) {
                          --speech-bubble-bg: white;
                        }
                      `}</style>
                    </div>
                  ) : (
                    /* User message bubble */
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl p-4 md:p-6 shadow-lg backdrop-blur-sm"
                      style={{
                        maxWidth: "400px",
                        boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)",
                      }}
                    >
                      <div className="font-medium text-lg leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Ki typing indicator */}
            {isKiTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-center"
              >
                <div className="bg-white dark:bg-gray-900/95 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-600/30 p-4 backdrop-blur-sm">
                  <div className="flex space-x-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-purple-500 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 max-w-2xl mx-auto w-full">
          <ImprovedVoiceTextInput
            onSendMessage={handleSendMessage}
            placeholder="Share what's on your mind..."
            className="w-full"
            isMobile={false}
            disabled={isKiTyping}
          />
        </div>
      </div>
    </div>
  );
};