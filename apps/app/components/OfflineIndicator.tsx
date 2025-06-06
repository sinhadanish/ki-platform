"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, WifiOff, CloudOff, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@repo/design-system/components/ui/button'

interface OfflineIndicatorProps {
  isOnline: boolean
  hasOfflineData: boolean
  isSyncing: boolean
  onSync: () => void
  onClearOfflineData: () => void
  className?: string
}

export function OfflineIndicator({ 
  isOnline, 
  hasOfflineData, 
  isSyncing, 
  onSync, 
  onClearOfflineData,
  className = ""
}: OfflineIndicatorProps) {
  const getStatusConfig = () => {
    if (!isOnline && hasOfflineData) {
      return {
        icon: CloudOff,
        color: 'bg-orange-500',
        textColor: 'text-orange-600 dark:text-orange-400',
        message: 'Offline - Data saved locally',
        description: 'Your progress is saved and will sync when online'
      }
    }
    
    if (!isOnline) {
      return {
        icon: WifiOff,
        color: 'bg-red-500',
        textColor: 'text-red-600 dark:text-red-400',
        message: 'Offline Mode',
        description: 'Limited functionality available'
      }
    }
    
    if (hasOfflineData && isSyncing) {
      return {
        icon: Loader2,
        color: 'bg-blue-500',
        textColor: 'text-blue-600 dark:text-blue-400',
        message: 'Syncing data...',
        description: 'Uploading saved progress'
      }
    }
    
    if (hasOfflineData && isOnline) {
      return {
        icon: AlertCircle,
        color: 'bg-yellow-500',
        textColor: 'text-yellow-600 dark:text-yellow-400',
        message: 'Offline data available',
        description: 'Click to sync saved progress'
      }
    }
    
    return {
      icon: Wifi,
      color: 'bg-green-500',
      textColor: 'text-green-600 dark:text-green-400',
      message: 'Online',
      description: 'All features available'
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <AnimatePresence>
      {(!isOnline || hasOfflineData) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
            <div className="flex items-center space-x-3">
              {/* Status indicator */}
              <div className={`w-3 h-3 ${config.color} rounded-full animate-pulse`} />
              
              {/* Icon */}
              <Icon 
                className={`w-5 h-5 ${config.textColor} ${isSyncing ? 'animate-spin' : ''}`} 
              />
              
              {/* Content */}
              <div className="flex-1">
                <p className={`font-medium ${config.textColor} text-sm`}>
                  {config.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {config.description}
                </p>
              </div>
            </div>
            
            {/* Action buttons */}
            {hasOfflineData && isOnline && !isSyncing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 flex space-x-2"
              >
                <Button
                  onClick={onSync}
                  size="sm"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Sync Now
                </Button>
                <button
                  onClick={onClearOfflineData}
                  className="text-xs py-2 px-3 text-gray-500 hover:text-gray-700 rounded transition-colors"
                >
                  Clear
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}