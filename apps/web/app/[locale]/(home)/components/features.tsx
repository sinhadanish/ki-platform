'use client';

import type { Dictionary } from '@repo/internationalization';
import { Brain, Heart, MessageCircle, Shield, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

type FeaturesProps = {
  dictionary: Dictionary;
};

export const Features = ({ dictionary }: FeaturesProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <div className="w-full py-20 lg:py-40 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-16">
          {/* Section Header */}
          <div className={`flex flex-col items-center text-center gap-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/50">
              <Brain className="h-4 w-4" />
              Relationship Intelligence Technology
            </div>
            <h2 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Human-AI-Human
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Framework
              </span>
            </h2>
            <p className="max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:text-2xl">
              The world's first relationship platform designed for two partners simultaneously. Advanced AI that understands both perspectives while maintaining privacy and trust.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.bgGradient} p-8 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 hover:shadow-xl hover:scale-105 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className={`relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative space-y-4">
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Floating background element */}
                  <div className={`absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className={`flex flex-col items-center text-center gap-6 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 border border-purple-200/50 dark:border-purple-700/50 max-w-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Ready to transform your relationship?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join thousands of couples already strengthening their connection with Ki's relationship intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="ki-button-primary px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg">
                  Start Free Demo
                </button>
                <button className="px-6 py-3 rounded-lg font-medium border-2 border-purple-200 hover:border-purple-400 dark:border-purple-700 dark:hover:border-purple-500 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};