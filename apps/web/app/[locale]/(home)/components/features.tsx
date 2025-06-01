'use client';

import type { Dictionary } from '@repo/internationalization';
import { Brain, Heart, MessageCircle, Shield, Users, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

type FeaturesProps = {
  dictionary: Dictionary;
};

const Features = ({ dictionary }: FeaturesProps) => {

  const features = [
    {
      icon: Users,
      title: "Human-AI-Human Framework",
      description: "First platform to process both partners simultaneously while maintaining private channels and shared context.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950"
    },
    {
      icon: Brain,
      title: "Emotional Intelligence AI",
      description: "Advanced empathy processing that understands emotional nuances and responds with genuine care.",
      gradient: "from-blue-500 to-purple-500",
      bgGradient: "from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
    },
    {
      icon: Heart,
      title: "Conflict Resolution",
      description: "Thomas-Kilmann style analysis with personalized strategies that strengthen rather than judge.",
      gradient: "from-pink-500 to-red-500",
      bgGradient: "from-pink-50 to-red-50 dark:from-pink-950 dark:to-red-950"
    },
    {
      icon: MessageCircle,
      title: "Real-time Conversations",
      description: "Voice-first interface with sub-2-second response times for natural, flowing dialogue.",
      gradient: "from-green-500 to-blue-500",
      bgGradient: "from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950"
    },
    {
      icon: Shield,
      title: "Privacy-First Design",
      description: "End-to-end encryption with separate private channels. Your relationship data stays yours.",
      gradient: "from-gray-600 to-gray-800",
      bgGradient: "from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
    },
    {
      icon: Zap,
      title: "Pattern Recognition",
      description: "Identifies relationship dynamics and growth opportunities without clinical labeling.",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      
      {/* Animated decorative orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-green-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-semibold text-gray-700">
              Comprehensive Support
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Why Choose Ki?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of emotional support with cutting-edge AI that truly understands you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                {/* Gradient border effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="absolute inset-[1px] bg-white rounded-2xl" />
                
                {/* Background gradient decoration */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.bgGradient} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
                
                <div className="relative">
                  {/* Icon with gradient background */}
                  <motion.div 
                    className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                      <feature.icon 
                        className="w-8 h-8 text-gray-700" 
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export { Features };