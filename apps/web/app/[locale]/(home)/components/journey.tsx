'use client';

import type { Dictionary } from '@repo/internationalization';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Lock, 
  Brain, 
  MessageCircle, 
  ChevronDown,
  Users,
  Target,
  Lightbulb
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@repo/design-system/components/ui/button';
import { env } from '@/env';
import Link from 'next/link';

const journeySteps = [
  {
    step: "Step 1",
    title: "Connect & Feel Understood",
    description: "Open up in a safe, judgment-free space where every emotion matters",
    detailedContent: [
      "Start with whatever's on your mind - no scripts needed",
      "Ki listens with advanced emotional intelligence",
      "Your feelings are validated and understood in real-time",
      "Complete privacy ensures you can be fully authentic"
    ],
    icon: MessageCircle,
    gradient: "from-blue-500 to-purple-500",
    accentColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    step: "Step 2", 
    title: "Discover Your Patterns",
    description: "Ki surfaces repeating triggers and blind-spots, turning chaos into clear, actionable insights",
    detailedContent: [
      "Identify recurring relationship patterns and triggers",
      "Understand the root causes behind conflicts",
      "Gain clarity on emotional blind spots you couldn't see before",
      "Receive personalized insights based on your conversation history"
    ],
    icon: Lightbulb,
    gradient: "from-purple-500 to-pink-500",
    accentColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    step: "Step 3",
    title: "Build Emotional Intelligence",
    description: "Practice proven communication techniques and get personalized guidance for difficult conversations",
    detailedContent: [
      "Practice proven communication techniques with Ki",
      "Learn de-escalation strategies for heated moments",
      "Get personalized scripts for difficult conversations",
      "Master emotional regulation through guided exercises"
    ],
    icon: Brain,
    gradient: "from-indigo-500 to-blue-500", 
    accentColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    step: "Step 4",
    title: "Reconnect as Partners",
    description: "Ki facilitates balanced conversations with your partner, ending with actionable commitments",
    detailedContent: [
      "Ki facilitates balanced conversations with your partner",
      "Both sides get equal time to be heard and understood",
      "Work together toward concrete solutions and commitments",
      "End each session with clear next steps and renewed connection"
    ],
    icon: Heart,
    gradient: "from-green-500 to-teal-500",
    accentColor: "text-green-600", 
    bgColor: "bg-green-50",
  },
];

type JourneyProps = {
  dictionary: Dictionary;
};

export const Journey = ({ dictionary }: JourneyProps) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50">
      {/* Decorative background blob */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/5 to-green-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            From Tension to Teamwork in 4 Guided Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A science-backed path that moves you from confusion to connection—typically in &lt; 12 min.
          </p>
          
          {/* Badge Strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">🔒 100% Private</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
              <Brain className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">🧠 Therapist-informed</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">💬 3000+ guided sessions</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Journey Steps - Accordion Layout */}
        <div className="max-w-4xl mx-auto space-y-4">
          {journeySteps.map((step, index) => {
            const isExpanded = expandedStep === index;
            
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                {/* Accordion Header */}
                <motion.button
                  onClick={() => toggleStep(index)}
                  className={`w-full bg-white rounded-2xl p-6 border-2 transition-all duration-300 text-left ${
                    isExpanded 
                      ? `border-transparent bg-gradient-to-r ${step.gradient} text-white` 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Step Icon */}
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isExpanded 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : `${step.bgColor}`
                      }`}>
                        <step.icon className={`w-7 h-7 transition-all duration-300 ${
                          isExpanded ? 'text-white' : step.accentColor
                        }`} strokeWidth={1.5} />
                      </div>
                      
                      {/* Step Content */}
                      <div>
                        <div className={`text-sm font-semibold mb-1 transition-all duration-300 ${
                          isExpanded ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {step.step}
                        </div>
                        <h3 className={`text-xl md:text-2xl font-bold transition-all duration-300 ${
                          isExpanded ? 'text-white' : 'text-gray-800'
                        }`}>
                          {step.title}
                        </h3>
                        {!isExpanded && (
                          <p className="text-gray-600 mt-2 text-sm md:text-base">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Expand/Collapse Icon */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`transition-all duration-300 ${
                        isExpanded ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </div>
                </motion.button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white border-2 border-t-0 border-gray-200 rounded-b-2xl p-6 -mt-2">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Left: Description */}
                          <div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                              {step.description}
                            </p>
                          </div>

                          {/* Right: Detailed Points */}
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">What You'll Experience:</h4>
                            <ul className="space-y-2">
                              {step.detailedContent.map((point, pointIndex) => (
                                <motion.li
                                  key={pointIndex}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: pointIndex * 0.1 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient} mt-2 flex-shrink-0`} />
                                  <span className="text-gray-600 text-sm leading-relaxed">
                                    {point}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};