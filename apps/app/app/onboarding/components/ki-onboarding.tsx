'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ki, SpeechBubble } from '@repo/design-system';
import { Button } from '@repo/design-system/components/ui/button';
import { Heart, ArrowRight, MapPin, Calendar, Users, Sparkles, Send, Save, Clock } from 'lucide-react';
import { EnhancedVoiceTextInput } from '../../../components/EnhancedVoiceTextInput';
import { ThemeToggle } from '../../../components/ThemeToggle';
import { useOnboardingProgress, OnboardingData } from '../../../hooks/useOnboardingProgress';
import { ProgressResumeModal } from './progress-resume-modal';
// import { useAdaptiveMessages, MessageContext } from '../../../hooks/useAdaptiveMessages';
// import { usePerformanceOptimization } from '../../../hooks/usePerformanceOptimization';
// import { useOfflineMode } from '../../../hooks/useOfflineMode';
// import { OfflineIndicator } from '../../../components/OfflineIndicator';


type KiEmotion = 'curious' | 'excited' | 'empathetic' | 'encouraging' | 'welcoming' | 'thoughtful' | 'celebratory';

type Step = {
  id: string;
  kiState: 'idle' | 'listening' | 'thinking' | 'speaking';
  emotion: KiEmotion;
  message: string;
  inputType: 'text' | 'select' | 'multiselect' | 'email' | 'none';
  options?: Array<{ value: string; label: string; emoji: string }>;
  field: keyof OnboardingData | null;
  canSkip?: boolean;
  gesture?: 'wave' | 'nod' | 'heart' | 'thumbsUp' | 'thinking';
};

export const KiOnboarding = ({ onComplete }: { onComplete: (data: OnboardingData) => void }) => {
  const {
    data,
    savedProgress,
    currentStep,
    hasSavedProgress,
    updateData,
    updateCurrentStep,
    markStepCompleted,
    saveProgress,
    loadProgress,
    clearProgress
  } = useOnboardingProgress();
  
  const [isTyping, setIsTyping] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showAutoSave, setShowAutoSave] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  // Temporary simplified state while fixing imports
  const isOnline = true;
  const hasOfflineData = false;
  const optimizedConfig = {
    reduceMotion: false,
    particleCount: 8,
    animationDuration: 1,
    enableHeavyEffects: true
  };
  
  const saveOfflineData = () => {};
  const clearOfflineData = () => {};
  const getOfflineCapabilities = () => ({ canUseVoiceInput: true });
  
  // Simplified success message
  const getSuccessMessage = () => ({ message: 'Progress saved' });
  const getMotivationalMessage = () => ({ message: 'You\'re doing great!' });
  
  const handleSyncOfflineData = async () => {};
  
  // const [messageContext, setMessageContext] = useState<MessageContext>({
  //   timeOfDay: 'morning',
  //   isReturningUser: false,
  //   completedSteps: [],
  //   userTone: 'friendly',
  //   deviceType: 'desktop'
  // });

  // // Initialize adaptive messaging
  // const adaptiveMessages = useAdaptiveMessages(data, messageContext);
  
  // // Initialize performance optimization
  // const { optimizedConfig, preloadCriticalAssets, measurePerformance } = usePerformanceOptimization();
  
  // // Initialize offline mode
  // const { 
  //   isOnline, 
  //   hasOfflineData, 
  //   saveOfflineData, 
  //   syncOfflineData, 
  //   clearOfflineData,
  //   getOfflineCapabilities 
  // } = useOfflineMode();
  
  // // Preload critical assets on mount
  // useEffect(() => {
  //   preloadCriticalAssets();
  // }, [preloadCriticalAssets]);

  const steps: Step[] = [
    {
      id: 'welcome',
      kiState: 'idle',
      emotion: 'welcoming',
      message: "Ready to strengthen your relationship? 💕",
      inputType: 'none',
      field: null,
      gesture: 'wave'
    },
    {
      id: 'name',
      kiState: 'listening',
      emotion: 'curious',
      message: "I'm Ki. What's your name?",
      inputType: 'text',
      field: 'name',
      canSkip: false
    },
    {
      id: 'age',
      kiState: 'thinking',
      emotion: 'excited',
      message: data.name ? `Nice to meet you, ${data.name}! How old are you?` : "How old are you?",
      inputType: 'text',
      field: 'age',
      canSkip: true,
      gesture: 'nod'
    },
    {
      id: 'location',
      kiState: 'listening',
      emotion: 'curious',
      message: "Where are you located?",
      inputType: 'text',
      field: 'location',
      canSkip: true
    },
    {
      id: 'relationship',
      kiState: 'thinking',
      emotion: 'empathetic',
      message: "Tell me about your relationship status",
      inputType: 'select',
      field: 'relationshipStatus',
      canSkip: false,
      options: [
        { value: 'dating', label: 'Dating', emoji: '💕' },
        { value: 'partnered', label: 'Partnered', emoji: '💑' },
        { value: 'engaged', label: 'Engaged', emoji: '💍' },
        { value: 'married', label: 'Married', emoji: '👰‍♀️' }
      ]
    },
    {
      id: 'length',
      kiState: 'listening',
      emotion: 'thoughtful',
      message: data.relationshipStatus === 'married' ? "How long have you been married?" : 
               data.relationshipStatus === 'engaged' ? "How long have you been engaged?" :
               "How long have you been together?",
      inputType: 'text',
      field: 'relationshipLength',
      canSkip: true
    },
    {
      id: 'goals',
      kiState: 'thinking',
      emotion: 'encouraging',
      message: "What would you like to work on together?",
      inputType: 'multiselect',
      field: 'goals',
      canSkip: false,
      gesture: 'heart',
      options: [
        { value: 'communication', label: 'Better Communication', emoji: '💬' },
        { value: 'conflict', label: 'Resolve Conflicts', emoji: '🤝' },
        { value: 'intimacy', label: 'Emotional Intimacy', emoji: '❤️' },
        { value: 'trust', label: 'Build Trust', emoji: '🛡️' },
        { value: 'future', label: 'Plan Our Future', emoji: '🌟' },
        { value: 'connection', label: 'Daily Connection', emoji: '🌸' }
      ]
    },
    {
      id: 'partner',
      kiState: 'speaking',
      emotion: 'encouraging',
      message: "Would you like to invite your partner to join Ki?",
      inputType: 'email',
      field: 'partnerEmail',
      canSkip: true
    },
    {
      id: 'complete',
      kiState: 'idle',
      emotion: 'celebratory',
      message: data.name ? `Welcome to Ki, ${data.name}! I'm here to help you both grow stronger together. Let's begin your journey ✨` : "Welcome to Ki! Let's begin your journey ✨",
      inputType: 'none',
      field: null,
      gesture: 'thumbsUp'
    }
  ];

  const currentStepData = steps[currentStep];
  const [inputValue, setInputValue] = useState('');

  // Check for mobile and screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setScreenHeight(window.innerHeight);
    };
    
    // Determine time of day
    const getTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return 'morning';
      if (hour >= 12 && hour < 17) return 'afternoon';
      if (hour >= 17 && hour < 21) return 'evening';
      return 'night';
    };
    
    checkMobile();
    
    setMessageContext(prev => ({
      ...prev,
      timeOfDay: getTimeOfDay(),
      deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
      isReturningUser: hasSavedProgress,
      completedSteps: data.completedSteps
    }));
    
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [hasSavedProgress, data.completedSteps]);
  
  // Check for saved progress on mount
  useEffect(() => {
    if (hasSavedProgress && savedProgress && savedProgress.name) {
      setShowResumeModal(true);
    }
  }, [hasSavedProgress, savedProgress]);
  
  // Auto-advance welcome step
  useEffect(() => {
    if (currentStep === 0 && !showResumeModal) {
      const timer = setTimeout(() => {
        updateCurrentStep(1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, showResumeModal, updateCurrentStep]);
  
  // Show motivational messages periodically
  useEffect(() => {
    if (currentStep > 2 && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setShowMotivation(true);
        setTimeout(() => setShowMotivation(false), 4000);
      }, 10000); // Show after 10 seconds on a step
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Show input after Ki speaks
  useEffect(() => {
    if (currentStepData.inputType !== 'none') {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setShowInput(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowInput(false);
    }
  }, [currentStep, currentStepData.inputType]);

  const handleInputSubmit = (message?: string) => {
    const valueToSubmit = message || inputValue;
    
    // Allow empty values only for optional email field
    if (!valueToSubmit.trim() && currentStepData.inputType !== 'email') {
      return;
    }

    // Update data immediately
    if (currentStepData.field) {
      updateData(currentStepData.field, valueToSubmit);
    }
    
    // Mark step as completed
    markStepCompleted(currentStepData.id);
    
    // Save progress (online and offline)
    saveProgress();
    
    // Save offline backup if available
    if (!isOnline) {
      saveOfflineData({
        ...data,
        [currentStepData.field!]: valueToSubmit,
        completedSteps: [...data.completedSteps, currentStepData.id],
        lastActiveStep: currentStep + 1
      });
    }
    
    // Show auto-save indicator with success message
    setShowAutoSave(true);
    setTimeout(() => setShowAutoSave(false), 2000);
    
    // Update message context with completion - temporarily disabled
    // setMessageContext(prev => ({
    //   ...prev,
    //   completedSteps: [...prev.completedSteps, currentStepData.id]
    // }));

    // Clear input and hide immediately for better UX
    setInputValue('');
    setShowInput(false);
    
    // Small delay to ensure smooth transition and prevent rapid state updates
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        updateCurrentStep(currentStep + 1);
      } else {
        clearProgress(); // Clear saved progress on completion
        onComplete(data);
      }
    }, 300);
  };

  const handleSelectOption = (value: string) => {
    if (currentStepData.field) {
      if (currentStepData.inputType === 'multiselect') {
        const currentGoals = data.goals || [];
        const newGoals = currentGoals.includes(value)
          ? currentGoals.filter(g => g !== value)
          : [...currentGoals, value];
        
        updateData('goals', newGoals);
      } else {
        updateData(currentStepData.field, value);
        markStepCompleted(currentStepData.id);
        saveProgress();
        
        // Auto-advance for single select
        setTimeout(() => {
          setShowInput(false);
          if (currentStep < steps.length - 1) {
            updateCurrentStep(currentStep + 1);
          }
        }, 500);
      }
    }
  };

  const handleMultiselectContinue = () => {
    if (data.goals.length > 0) {
      markStepCompleted(currentStepData.id);
      saveProgress();
      setShowInput(false);
      if (currentStep < steps.length - 1) {
        updateCurrentStep(currentStep + 1);
      }
    }
  };
  
  const handleResumeProgress = () => {
    loadProgress();
    setShowResumeModal(false);
  };
  
  const handleStartOver = () => {
    clearProgress();
    clearOfflineData();
    setShowResumeModal(false);
  };
  
  // const handleSyncOfflineData = async () => {
  //   setIsSyncing(true);
  //   try {
  //     await syncOfflineData();
  //   } catch (error) {
  //     console.error('Failed to sync offline data:', error);
  //   } finally {
  //     setIsSyncing(false);
  //   }
  // };

  return (
    <>
      {/* Progress Resume Modal */}
      <ProgressResumeModal
        isOpen={showResumeModal}
        savedProgress={savedProgress!}
        onResume={handleResumeProgress}
        onStartOver={handleStartOver}
        onClose={() => setShowResumeModal(false)}
      />
      
      <div className={`min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 overflow-hidden relative transition-colors duration-500 ${isMobile ? 'pb-safe-area-inset-bottom' : ''}`}>
        {/* Theme Toggle */}
        <div className={isMobile ? 'absolute top-4 left-4 z-30' : ''}>
          <ThemeToggle />
        </div>
        
        {/* Offline Indicator - temporarily disabled */}
        {/*<OfflineIndicator
          isOnline={isOnline}
          hasOfflineData={hasOfflineData}
          isSyncing={isSyncing}
          onSync={handleSyncOfflineData}
          onClearOfflineData={clearOfflineData}
        />*/}
        
        {/* Auto-save Indicator with Adaptive Message */}
        {showAutoSave && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-4 right-4 z-30 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span className="text-sm font-medium">
              {getSuccessMessage().message}
            </span>
          </motion.div>
        )}
        
        {/* Motivational Message */}
        {currentStep > 2 && currentStep < steps.length - 1 && showInput && isOnline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-20 right-4 z-20 bg-purple-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-2xl shadow-lg max-w-xs"
          >
            <p className="text-sm font-medium">
              {getMotivationalMessage().message}
            </p>
          </motion.div>
        )}
        
        {/* Offline Capabilities Notice */}
        {!isOnline && showInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-20 left-4 right-4 z-20 bg-blue-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-2xl shadow-lg mx-auto max-w-md"
          >
            <p className="text-sm font-medium text-center">
              📶 Offline Mode: Your progress is being saved locally and will sync when you're back online!
            </p>
          </motion.div>
        )}
      {/* Enhanced animated background with multiple layers */}
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

        {/* Floating particles - performance optimized */}
        {!optimizedConfig.reduceMotion && [...Array(optimizedConfig.particleCount)].map((_, i) => {
          // Create deterministic "random" values based on index
          const leftPosition = (i * 17 + 23) % 100; // Pseudo-random distribution
          const topPosition = (i * 31 + 47) % 100;  // Different pattern
          const duration = 8 + (i % 4);             // 8-11 seconds
          const delay = (i * 0.5) % 5;              // 0-4.5 second delays
          
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
                duration: optimizedConfig.reduceMotion ? 0 : duration * optimizedConfig.animationDuration,
                repeat: optimizedConfig.reduceMotion ? 0 : Infinity,
                delay,
              }}
            />
          );
        })}

        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-purple-100/20 dark:from-black/20 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      </div>

      <div className={`relative z-10 flex flex-col items-center ${isMobile ? 'justify-start pt-16' : 'justify-center'} min-h-screen px-4`}>
        {/* Ki Avatar and Speech - Enhanced with dramatic styling */}
        <motion.div 
          className={`flex flex-col items-center ${isMobile ? 'space-y-4' : 'space-y-8'} max-w-3xl mx-auto`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Speech Bubble with enhanced styling */}
          <motion.div
            key={`speech-${currentStep}`}
            className="relative z-20 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              maxWidth: 'calc(100vw - 20px)',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div className="relative">
              {/* Main bubble with landing page styling */}
              <div
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 relative pointer-events-auto ${isMobile ? 'p-4' : 'p-6 md:p-8'}`}
                style={{
                  boxShadow: "0 4px 25px rgba(168, 85, 247, 0.15)",
                  minHeight: isMobile ? "60px" : "80px",
                  maxHeight: isMobile ? "200px" : "400px",
                  minWidth: isMobile ? "280px" : "300px",
                  maxWidth: isMobile ? "320px" : "450px",
                }}
              >
                {/* Subtle gradient overlay matching landing page */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 rounded-2xl opacity-50" />

                {/* Content container */}
                <div className={`relative z-10 overflow-auto ${isMobile ? 'max-h-[120px]' : 'max-h-[280px]'} scrollbar-hide`}>
                  <div className={`font-medium text-gray-800 dark:text-gray-200 ${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-center leading-relaxed`}>
                    <div className="flex flex-wrap justify-center">
                      {(currentStepData.message || '').split(" ").filter(Boolean).map((word, index) => (
                        <motion.span
                          key={`${word}-${index}`}
                          className="inline-block mr-1.5 mb-1"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            duration: 0.2,
                            delay: 0.05 + index * 0.02,
                            ease: "easeOut",
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </div>
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

              {/* Speech bubble tail pointing down to Ki */}
              <div
                className="absolute w-0 h-0 bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
                style={{
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: "10px solid var(--speech-bubble-bg, white)",
                  filter: "drop-shadow(0 2px 4px rgba(168, 85, 247, 0.1))",
                }}
              />
              <style jsx>{`
                :global(.dark) {
                  --speech-bubble-bg: rgb(31, 41, 55);
                }
                :global(:root) {
                  --speech-bubble-bg: white;
                }
              `}</style>
            </div>
          </motion.div>

          {/* Ki Avatar with enhanced presence */}
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
            {/* Multiple glow rings around Ki */}
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

            {/* Enhanced Ki Avatar with Emotions */}
            <motion.div
              className="relative"
              animate={{
                scale: currentStepData.emotion === 'excited' ? [1, 1.05, 1] : 
                       currentStepData.emotion === 'celebratory' ? [1, 1.1, 1] : 1,
                rotate: currentStepData.gesture === 'nod' ? [0, 5, -5, 0] : 0
              }}
              transition={{
                duration: currentStepData.emotion === 'excited' ? 2 : 
                         currentStepData.emotion === 'celebratory' ? 1.5 : 0,
                repeat: currentStepData.emotion === 'excited' || currentStepData.emotion === 'celebratory' ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <Ki
                state={isTyping ? 'thinking' : currentStepData.kiState}
                size={isMobile ? "medium" : "large"}
                theme="default"
                enhancedGlow={true}
                autoCycle={false}
                audioIntensity={0.8}
                className={`relative z-10 drop-shadow-2xl ${
                  isMobile 
                    ? 'w-[16rem] h-[16rem] sm:w-[18rem] sm:h-[18rem]' 
                    : 'w-[24rem] h-[24rem] md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[40rem] xl:h-[40rem]'
                }`}
              />
              
              {/* Breathing Animation */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl" />
              </motion.div>

              {/* Emotion-based Glow Effects */}
              <motion.div
                className={`
                  absolute inset-0 rounded-full blur-2xl scale-150 transition-all duration-1000
                  ${currentStepData.emotion === 'welcoming' ? 'bg-gradient-to-r from-green-400/30 to-blue-400/30' :
                    currentStepData.emotion === 'curious' ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20' :
                    currentStepData.emotion === 'excited' ? 'bg-gradient-to-r from-pink-400/30 to-purple-400/30' :
                    currentStepData.emotion === 'empathetic' ? 'bg-gradient-to-r from-blue-400/25 to-cyan-400/25' :
                    currentStepData.emotion === 'encouraging' ? 'bg-gradient-to-r from-green-400/25 to-emerald-400/25' :
                    currentStepData.emotion === 'thoughtful' ? 'bg-gradient-to-r from-indigo-400/20 to-blue-400/20' :
                    currentStepData.emotion === 'celebratory' ? 'bg-gradient-to-r from-yellow-400/40 to-pink-400/40' :
                    'bg-gradient-to-r from-purple-400/20 to-blue-400/20'
                  }
                `}
                animate={{
                  scale: currentStepData.emotion === 'celebratory' ? [1.5, 1.8, 1.5] : [1.5, 1.6, 1.5],
                  opacity: currentStepData.emotion === 'excited' ? [0.4, 0.7, 0.4] : [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: currentStepData.emotion === 'celebratory' ? 1 : 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Gesture Animations */}
              {currentStepData.gesture === 'wave' && (
                <motion.div
                  className="absolute top-1/4 right-1/4 w-8 h-8 bg-yellow-400 rounded-full shadow-lg"
                  animate={{
                    x: [0, 15, -15, 0],
                    y: [0, -10, 5, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: 2,
                    ease: "easeInOut"
                  }}
                />
              )}

              {currentStepData.gesture === 'heart' && (
                <motion.div
                  className="absolute top-1/3 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeOut"
                  }}
                >
                  <Heart className="w-6 h-6 text-red-400 fill-current" />
                </motion.div>
              )}

              {currentStepData.gesture === 'thumbsUp' && (
                <motion.div
                  className="absolute top-1/4 left-1/4 w-6 h-6 bg-green-400 rounded-full shadow-lg flex items-center justify-center"
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: 3,
                    ease: "easeOut"
                  }}
                >
                  <span className="text-white text-xs font-bold">✓</span>
                </motion.div>
              )}
            </motion.div>
            
            {/* Emotion-responsive orbiting particles */}
            {[...Array(currentStepData.emotion === 'celebratory' ? (isMobile ? 8 : 12) : (isMobile ? 6 : 8))].map((_, i) => {
              const particleCount = currentStepData.emotion === 'celebratory' ? (isMobile ? 8 : 12) : (isMobile ? 6 : 8);
              const angle = (i * (360 / particleCount)) * (Math.PI / 180);
              const baseRadius = isMobile ? 120 : 200;
              const radius = currentStepData.emotion === 'excited' ? baseRadius + 20 : baseRadius;
              const particleColor = currentStepData.emotion === 'welcoming' ? 'bg-green-400/60' :
                                   currentStepData.emotion === 'curious' ? 'bg-yellow-400/60' :
                                   currentStepData.emotion === 'excited' ? 'bg-pink-400/60' :
                                   currentStepData.emotion === 'empathetic' ? 'bg-blue-400/60' :
                                   currentStepData.emotion === 'encouraging' ? 'bg-green-400/60' :
                                   currentStepData.emotion === 'thoughtful' ? 'bg-indigo-400/60' :
                                   currentStepData.emotion === 'celebratory' ? 'bg-yellow-400/80' :
                                   'bg-white/60';
              
              return (
                <motion.div
                  key={`${currentStepData.emotion}-${i}`}
                  className={`absolute ${isMobile ? 'w-2 h-2' : 'w-3 h-3'} ${particleColor} rounded-full shadow-lg`}
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-6px',
                    marginTop: '-6px',
                  }}
                  animate={{
                    x: [
                      Math.cos(angle) * radius,
                      Math.cos(angle + Math.PI) * radius,
                      Math.cos(angle + 2 * Math.PI) * radius,
                    ],
                    y: [
                      Math.sin(angle) * radius,
                      Math.sin(angle + Math.PI) * radius,
                      Math.sin(angle + 2 * Math.PI) * radius,
                    ],
                    scale: currentStepData.emotion === 'celebratory' ? [0.3, 1.5, 0.3] : [0.5, 1, 0.5],
                    opacity: currentStepData.emotion === 'celebratory' ? [0.5, 1, 0.5] : [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: currentStepData.emotion === 'excited' ? 12 : 
                             currentStepData.emotion === 'celebratory' ? 8 : 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                />
              );
            })}
          </motion.div>
        </motion.div>

        {/* Skip Button for Optional Steps */}
        {showInput && currentStepData.canSkip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute ${isMobile ? 'top-2 right-2' : 'top-4 right-4'} z-20`}
          >
            <Button
              onClick={() => {
                markStepCompleted(currentStepData.id);
                saveProgress();
                setShowInput(false);
                setTimeout(() => {
                  if (currentStep < steps.length - 1) {
                    updateCurrentStep(currentStep + 1);
                  }
                }, 300);
              }}
              variant="outline"
              className={`text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-medium transition-all duration-200 ${
                isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
              }`}
            >
              Skip for now
            </Button>
          </motion.div>
        )}

        {/* Enhanced Input Section with Voice/Text Support */}
        {showInput && (
          <motion.div 
            className={`w-full ${isMobile ? 'max-w-sm px-2' : 'max-w-2xl'} ${isMobile ? 'space-y-4' : 'space-y-8'}`}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Voice/Text Input with Enhanced Interface */}
            {currentStepData.inputType === 'text' && (
              <div className={isMobile ? 'space-y-3' : 'space-y-6'}>
                <EnhancedVoiceTextInput
                  onSendMessage={(message, mode) => {
                    handleInputSubmit(message)
                  }}
                  placeholder={
                    currentStepData.field === 'name' ? (isMobile ? 'Your name...' : 'Tell me your name or type it...') :
                    currentStepData.field === 'age' ? (isMobile ? 'Your age...' : 'Your age (speak or type)...') :
                    currentStepData.field === 'location' ? (isMobile ? 'Your location...' : 'Where are you located?') :
                    (isMobile ? 'Your answer...' : 'Your answer (speak or type)...')
                  }
                  className={isMobile ? 'w-full' : 'max-w-2xl mx-auto'}
                  isMobile={isMobile}
                  enablePreview={!isMobile && isOnline}
                  minConfidence={0.6}
                  disabled={!isOnline && !getOfflineCapabilities().canUseVoiceInput}
                />
              </div>
            )}

            {/* Email Input with Voice/Text Support */}
            {currentStepData.inputType === 'email' && (
              <div className={isMobile ? 'space-y-3' : 'space-y-6'}>
                <EnhancedVoiceTextInput
                  onSendMessage={(message, mode) => {
                    handleInputSubmit(message)
                  }}
                  placeholder={isMobile ? "Partner's email (optional)" : "Partner's email (speak or type, optional)"}
                  className={isMobile ? 'w-full' : 'max-w-2xl mx-auto'}
                  isMobile={isMobile}
                  enablePreview={false}
                  minConfidence={0.8}
                  disabled={!isOnline && !getOfflineCapabilities().canUseVoiceInput}
                />

                <div className="flex gap-4">
                  <motion.div 
                    className="flex-1"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => {
                        handleInputSubmit('');
                      }}
                      className="relative group w-full bg-gray-100 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 py-4 px-6 rounded-3xl font-medium transition-all duration-300 text-lg"
                    >
                      <span className="relative z-10">Skip for now</span>
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-400/20 to-gray-300/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Enhanced Select Options with Glass Morphism */}
            {(currentStepData.inputType === 'select' || currentStepData.inputType === 'multiselect') && (
              <div className={isMobile ? 'space-y-3' : 'space-y-6'}>
                <div className={`grid ${isMobile ? 'gap-3' : 'gap-6'}`}>
                  {currentStepData.options?.map((option, index) => {
                    const isSelected = currentStepData.inputType === 'multiselect' 
                      ? data.goals.includes(option.value)
                      : data[currentStepData.field as keyof OnboardingData] === option.value;
                    
                    return (
                      <motion.div 
                        key={option.value} 
                        className="relative group"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.1,
                          ease: "easeOut"
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={() => handleSelectOption(option.value)}
                          className={`relative h-auto text-left rounded-3xl transition-all duration-500 w-full overflow-hidden ${
                            isMobile ? 'py-4 px-6' : 'py-6 px-8'
                          } ${
                            isSelected 
                              ? 'bg-gradient-to-r from-purple-500/90 via-blue-500/90 to-green-500/90 text-white shadow-2xl border border-purple-300/50 dark:border-white/30 backdrop-blur-xl transform scale-105' 
                              : 'bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 text-gray-800 dark:text-white hover:bg-white/90 dark:hover:bg-white/20 shadow-xl hover:shadow-2xl'
                          }`}
                        >
                          {/* Enhanced gradient background for selected items */}
                          {isSelected && (
                            <>
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-blue-400/30 to-green-400/30"
                                animate={{
                                  opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                            </>
                          )}
                          
                          <div className="relative flex items-center gap-6">
                            {/* Enhanced emoji container */}
                            <motion.div 
                              className={`${isMobile ? 'w-12 h-12 rounded-xl' : 'w-16 h-16 rounded-2xl'} flex items-center justify-center transition-all duration-500 ${
                                isSelected 
                                  ? 'bg-white/20 backdrop-blur-sm shadow-lg' 
                                  : 'bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm group-hover:bg-gray-200/80 dark:group-hover:bg-white/20'
                              }`}
                              animate={isSelected ? {
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              } : {}}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <span className={isMobile ? 'text-2xl' : 'text-3xl'}>{option.emoji}</span>
                            </motion.div>

                            <div className="flex-1">
                              <span className={`font-bold transition-colors ${isSelected ? 'text-white' : 'text-gray-800 dark:text-white'} ${
                                isMobile ? 'text-lg' : 'text-xl'
                              }`}>
                                {option.label}
                              </span>
                            </div>

                            {/* Enhanced selection indicator */}
                            {isSelected && currentStepData.inputType === 'multiselect' && (
                              <motion.div 
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm shadow-lg"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 500 }}
                              >
                                <Sparkles className="w-6 h-6 text-white animate-pulse" />
                              </motion.div>
                            )}
                          </div>
                          
                          {/* Enhanced shimmer effect */}
                          {!isSelected && (
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                              whileHover={{
                                x: ['0%', '100%']
                              }}
                              transition={{
                                duration: 0.8,
                                ease: "easeInOut"
                              }}
                            />
                          )}

                          {/* Multiple glow layers for selected items */}
                          {isSelected && (
                            <>
                              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400/30 to-blue-400/30 blur-xl -z-10 scale-110" />
                              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 to-purple-400/20 blur-2xl -z-20 scale-125" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
                
                {currentStepData.inputType === 'multiselect' && data.goals.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleMultiselectContinue}
                      className="relative group w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold px-10 py-6 rounded-3xl shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 overflow-hidden text-xl"
                    >
                      {/* Enhanced gradient background layers */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/60 via-blue-500/60 to-green-500/60"
                        animate={{
                          opacity: [0.6, 0.8, 0.6],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          repeatDelay: 1
                        }}
                      />
                      
                      {/* Multiple glow orbs */}
                      <div className="absolute -top-2 -left-2 h-4 w-4 bg-purple-400 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute -bottom-2 -right-2 h-3 w-3 bg-green-400 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute -top-2 -right-2 h-2 w-2 bg-blue-400 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Continue with {data.goals.length} goal{data.goals.length > 1 ? 's' : ''}
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                        </motion.div>
                      </span>
                      
                      {/* Enhanced multi-layer glow effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400/40 to-blue-400/40 blur-xl -z-10 scale-110 group-hover:scale-115 transition-transform duration-500" />
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/30 to-purple-400/30 blur-2xl -z-20 scale-125 group-hover:scale-130 transition-transform duration-500" />
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400/20 to-cyan-400/20 blur-3xl -z-30 scale-140 group-hover:scale-150 transition-transform duration-500" />
                    </Button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Complete Step Button */}
        {currentStep === steps.length - 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-8"
          >
            <Button
              onClick={() => onComplete(data)}
              className="relative group bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium px-12 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden text-lg"
            >
              <span>Start My Journey</span>
              <Heart className="inline-block ml-2 w-5 h-5" fill="currentColor" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
            </Button>
          </motion.div>
        )}

        {/* Progress Indicator */}
        <div className={`absolute ${isMobile ? 'bottom-4' : 'bottom-8'} left-1/2 transform -translate-x-1/2`}>
          <div className={`relative flex items-center bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-purple-700/50 ${
            isMobile ? 'gap-2 px-4 py-2' : 'gap-3 px-6 py-3'
          }`}>
            {steps.map((_, index) => (
              <div key={index} className="relative">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index < currentStep 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg' 
                      : index === currentStep 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50 scale-125' 
                        : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
                {index === currentStep && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-ping opacity-30" />
                )}
                {index < currentStep && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white animate-pulse" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Progress text */}
            <div className={`${isMobile ? 'ml-1 text-xs' : 'ml-2 text-sm'} font-medium text-gray-700 dark:text-gray-300`}>
              {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Add custom scrollbar hide styles for speech bubble
if (typeof document !== 'undefined') {
  const scrollbarStyles = `
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  `;
  
  const existingStyle = document.getElementById('speech-bubble-scrollbar-styles');
  if (!existingStyle) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'speech-bubble-scrollbar-styles';
    styleSheet.textContent = scrollbarStyles;
    document.head.appendChild(styleSheet);
  }
}