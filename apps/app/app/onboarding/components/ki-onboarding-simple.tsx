'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type OnboardingData = {
  name: string;
  age: string;
  location: string;
  relationshipStatus: string;
  relationshipLength: string;
  goals: string[];
  partnerEmail?: string;
};

export const KiOnboarding = ({ onComplete }: { onComplete: (data: OnboardingData) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-purple-600 mb-4">
            Ki Onboarding
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enhanced onboarding flow is being loaded...
          </p>
          <button
            onClick={() => onComplete({
              name: 'Test User',
              age: '25',
              location: 'Test City',
              relationshipStatus: 'dating',
              relationshipLength: '1 year',
              goals: ['communication'],
              partnerEmail: 'test@example.com'
            })}
            className="mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Continue with Test Data
          </button>
        </motion.div>
      </div>
    </div>
  );
};