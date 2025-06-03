'use client';

import { useState, useEffect } from 'react';
import { Ki, SpeechBubble } from '@repo/design-system';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Heart, ArrowRight, MapPin, Calendar, Users, Sparkles, Send } from 'lucide-react';

type OnboardingData = {
  name: string;
  age: string;
  location: string;
  relationshipStatus: 'dating' | 'engaged' | 'married' | 'partnered' | '';
  relationshipLength: string;
  goals: string[];
  partnerEmail?: string;
};

type Step = {
  id: string;
  kiState: 'idle' | 'listening' | 'thinking' | 'speaking';
  message: string;
  inputType: 'text' | 'select' | 'multiselect' | 'email' | 'none';
  options?: Array<{ value: string; label: string; emoji: string }>;
  field: keyof OnboardingData | null;
};

export const KiOnboarding = ({ onComplete }: { onComplete: (data: OnboardingData) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    age: '',
    location: '',
    relationshipStatus: '',
    relationshipLength: '',
    goals: [],
    partnerEmail: ''
  });

  const steps: Step[] = [
    {
      id: 'welcome',
      kiState: 'idle',
      message: "Ready to strengthen your relationship? 💕",
      inputType: 'none',
      field: null
    },
    {
      id: 'name',
      kiState: 'listening',
      message: "I'm Ki. What's your name?",
      inputType: 'text',
      field: 'name'
    },
    {
      id: 'age',
      kiState: 'thinking',
      message: `Nice to meet you, ${data.name}! How old are you?`,
      inputType: 'text',
      field: 'age'
    },
    {
      id: 'location',
      kiState: 'listening',
      message: "Where are you located?",
      inputType: 'text',
      field: 'location'
    },
    {
      id: 'relationship',
      kiState: 'thinking',
      message: "Tell me about your relationship status",
      inputType: 'select',
      field: 'relationshipStatus',
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
      message: "How long have you been together?",
      inputType: 'text',
      field: 'relationshipLength'
    },
    {
      id: 'goals',
      kiState: 'thinking',
      message: "What would you like to work on together?",
      inputType: 'multiselect',
      field: 'goals',
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
      message: "Would you like to invite your partner to join Ki?",
      inputType: 'email',
      field: 'partnerEmail'
    },
    {
      id: 'complete',
      kiState: 'idle',
      message: `Welcome to Ki, ${data.name}! I'm here to help you both grow stronger together. Let's begin your journey ✨`,
      inputType: 'none',
      field: null
    }
  ];

  const currentStepData = steps[currentStep];
  const [inputValue, setInputValue] = useState('');

  // Auto-advance welcome step
  useEffect(() => {
    if (currentStep === 0) {
      const timer = setTimeout(() => {
        setCurrentStep(1);
      }, 3000);
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

  const handleInputSubmit = () => {
    if (!inputValue.trim() && currentStepData.inputType !== 'email') return;

    if (currentStepData.field) {
      setData(prev => ({
        ...prev,
        [currentStepData.field!]: inputValue
      }));
    }

    setInputValue('');
    setShowInput(false);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handleSelectOption = (value: string) => {
    if (currentStepData.field) {
      if (currentStepData.inputType === 'multiselect') {
        const currentGoals = data.goals || [];
        const newGoals = currentGoals.includes(value)
          ? currentGoals.filter(g => g !== value)
          : [...currentGoals, value];
        
        setData(prev => ({ ...prev, goals: newGoals }));
      } else {
        setData(prev => ({
          ...prev,
          [currentStepData.field!]: value
        }));
        
        // Auto-advance for single select
        setTimeout(() => {
          setShowInput(false);
          if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
          }
        }, 500);
      }
    }
  };

  const handleMultiselectContinue = () => {
    if (data.goals.length > 0) {
      setShowInput(false);
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 h-32 w-32 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-xl animate-float-1" />
        <div className="absolute top-60 right-20 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl animate-float-2" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Ki Avatar and Speech */}
        <div className="flex flex-col items-center space-y-8 max-w-2xl mx-auto">
          {/* Speech Bubble */}
          <div
            key={`speech-${currentStep}`}
            className="relative z-20 animate-fade-in"
          >
            <div className="relative">
              <SpeechBubble
                message={currentStepData.message}
                visible={true}
                position="top"
                size="large"
                animationType="fade-in-words"
                autoHide={false}
                className="mb-6 shadow-2xl"
              />
              {/* Enhanced glow around speech bubble */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10 scale-110" />
            </div>
          </div>

          {/* Ki Avatar */}
          <div className="relative animate-breathe">
            <Ki
              state={isTyping ? 'thinking' : currentStepData.kiState}
              size="large"
              theme="default"
              enhancedGlow={true}
              autoCycle={false}
              audioIntensity={0.6}
              className="drop-shadow-2xl w-96 h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem]"
            />
          </div>

          {/* Input Section */}
          {showInput && (
            <div className="w-full max-w-lg space-y-6 animate-slide-up">
                {/* Text Input */}
                {currentStepData.inputType === 'text' && (
                  <div className="space-y-4">
                    <div className="relative group">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                        placeholder={
                          currentStepData.field === 'name' ? 'Your name' :
                          currentStepData.field === 'age' ? 'Your age' :
                          currentStepData.field === 'location' ? 'City, Country' :
                          'Your answer'
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none transition-colors bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300 text-center text-lg"
                        autoFocus
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    
                    <Button
                      onClick={handleInputSubmit}
                      disabled={!inputValue.trim()}
                      className="relative group w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 overflow-hidden"
                    >
                      <span>Continue</span>
                      <Send className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
                    </Button>
                  </div>
                )}

                {/* Email Input */}
                {currentStepData.inputType === 'email' && (
                  <div className="space-y-4">
                    <div className="relative group">
                      <Input
                        type="email"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                        placeholder="Partner's email (optional)"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none transition-colors bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300 text-center text-lg"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => {
                          setInputValue('');
                          handleInputSubmit();
                        }}
                        variant="outline"
                        className="flex-1 border-2 border-gray-200 hover:border-purple-400 rounded-full py-3 px-6 font-medium bg-white transition-all duration-300 hover:shadow-lg"
                      >
                        Skip for now
                      </Button>
                      <Button
                        onClick={handleInputSubmit}
                        className="relative group flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                      >
                        <span>Send invite</span>
                        <Send className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Select Options */}
                {(currentStepData.inputType === 'select' || currentStepData.inputType === 'multiselect') && (
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      {currentStepData.options?.map((option, index) => {
                        const isSelected = currentStepData.inputType === 'multiselect' 
                          ? data.goals.includes(option.value)
                          : data[currentStepData.field as keyof OnboardingData] === option.value;
                        
                        return (
                          <div key={option.value} className="relative group">
                            <Button
                              onClick={() => handleSelectOption(option.value)}
                              variant={isSelected ? "default" : "outline"}
                              className={`relative h-auto py-5 px-6 text-left rounded-3xl transition-all duration-300 w-full overflow-hidden ${
                                isSelected 
                                  ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white shadow-xl border-transparent transform scale-105' 
                                  : 'border-2 border-purple-200/70 hover:border-purple-400 hover:bg-purple-50/80 dark:border-purple-700/70 dark:hover:border-purple-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105'
                              }`}
                              style={{
                                animationDelay: `${index * 100}ms`
                              }}
                            >
                              {/* Gradient background overlay for selected items */}
                              {isSelected && (
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 animate-pulse" />
                              )}
                              
                              <div className="relative flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                  isSelected 
                                    ? 'bg-white/20 backdrop-blur-sm' 
                                    : 'bg-purple-100 dark:bg-purple-900/50'
                                }`}>
                                  <span className="text-2xl">{option.emoji}</span>
                                </div>
                                <div className="flex-1">
                                  <span className={`font-semibold text-lg transition-colors ${
                                    isSelected 
                                      ? 'text-white' 
                                      : 'text-gray-800 dark:text-gray-200'
                                  }`}>
                                    {option.label}
                                  </span>
                                </div>
                                {isSelected && currentStepData.inputType === 'multiselect' && (
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm">
                                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                                  </div>
                                )}
                              </div>
                              
                              {/* Shimmer effect on hover */}
                              {!isSelected && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                              )}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                    
                    {currentStepData.inputType === 'multiselect' && data.goals.length > 0 && (
                      <Button
                        onClick={handleMultiselectContinue}
                        className="relative group w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                      >
                        <span>Continue with {data.goals.length} goal{data.goals.length > 1 ? 's' : ''}</span>
                        <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
                      </Button>
                    )}
                  </div>
                )}
            </div>
          )}

          {/* Complete Step Button */}
          {currentStep === steps.length - 1 && (
            <div className="animate-fade-in-delayed">
              <Button
                onClick={() => onComplete(data)}
                className="relative group bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium px-12 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden text-lg"
              >
                <span>Start My Journey</span>
                <Heart className="inline-block ml-2 w-5 h-5" fill="currentColor" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
              </Button>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="relative flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-purple-200/50 dark:border-purple-700/50">
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
            <div className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};