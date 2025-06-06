'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@repo/design-system/components/ui/button';
import { Calendar, Clock, User, Heart, X, Play, RotateCcw } from 'lucide-react';

interface OnboardingData {
  name: string;
  age: string;
  location: string;
  relationshipStatus: string;
  relationshipLength: string;
  goals: string[];
  partnerEmail?: string;
  completedSteps: string[];
  lastActiveStep: number;
  startedAt: string;
  lastUpdated: string;
}

interface ProgressResumeModalProps {
  isOpen: boolean;
  savedProgress: OnboardingData;
  onResume: () => void;
  onStartOver: () => void;
  onClose: () => void;
}

export function ProgressResumeModal({ 
  isOpen, 
  savedProgress, 
  onResume, 
  onStartOver, 
  onClose 
}: ProgressResumeModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    } catch {
      return 'Recently';
    }
  };

  const getProgressPercentage = () => {
    const totalSteps = 9; // Total number of onboarding steps
    return Math.round((savedProgress.completedSteps.length / totalSteps) * 100);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: isClosing ? 0 : 1, 
            scale: isClosing ? 0.9 : 1, 
            y: isClosing ? 20 : 0 
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 m-4 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Play className="w-8 h-8 text-white" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Welcome back!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We found your saved progress from earlier
            </p>
          </div>

          {/* Progress Summary */}
          <div className="space-y-4 mb-6">
            {/* User Info */}
            {savedProgress.name && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{savedProgress.name}</p>
                  {savedProgress.relationshipStatus && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {savedProgress.relationshipStatus}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progress
                </span>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                  {getProgressPercentage()}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                />
              </div>
            </div>

            {/* Goals Preview */}
            {savedProgress.goals.length > 0 && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Selected Goals
                  </span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  {savedProgress.goals.length} goal{savedProgress.goals.length > 1 ? 's' : ''} selected
                </p>
              </div>
            )}

            {/* Last Updated */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Last updated {formatDate(savedProgress.lastUpdated)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={onResume}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Play className="w-5 h-5 mr-2" />
                Continue Where I Left Off
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={onStartOver}
                variant="outline"
                className="w-full border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-300 font-medium py-4 rounded-2xl transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Start Over
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}