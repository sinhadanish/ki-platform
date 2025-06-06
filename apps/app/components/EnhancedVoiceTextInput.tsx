"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Type, Send, X, Edit3, Volume2, Check, AlertCircle, Wifi, WifiOff } from 'lucide-react'
import { useInputMode } from '../hooks/useInputMode'
import { Button } from '@repo/design-system/components/ui/button'

interface EnhancedVoiceTextInputProps {
  onSendMessage: (message: string, mode: 'voice' | 'text') => void
  placeholder?: string
  disabled?: boolean
  className?: string
  isMobile?: boolean
  enablePreview?: boolean
  minConfidence?: number
}

export function EnhancedVoiceTextInput({ 
  onSendMessage, 
  placeholder = "Speak or type your message...", 
  disabled = false,
  className = "",
  isMobile = false,
  enablePreview = true,
  minConfidence = 0.7
}: EnhancedVoiceTextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewMessage, setPreviewMessage] = useState('')
  const [confidence, setConfidence] = useState(1)
  const [audioLevel, setAudioLevel] = useState(0)
  const [isOnline, setIsOnline] = useState(true)
  
  const {
    inputMode,
    textInput,
    voiceTranscript,
    interimTranscript,
    isVoiceSupported,
    error,
    setTextInput,
    startTyping,
    startListening,
    stopListening,
    cancelInput,
    sendTextMessage,
    switchToTextFromVoice,
    handleKeyPress
  } = useInputMode({ 
    onSendMessage: enablePreview ? handlePreviewMessage : onSendMessage,
    disabled,
    minConfidence 
  })

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  function handlePreviewMessage(message: string, mode: 'voice' | 'text') {
    if (mode === 'voice' && enablePreview) {
      setPreviewMessage(message)
      setShowPreview(true)
    } else {
      onSendMessage(message, mode)
    }
  }

  const confirmMessage = () => {
    onSendMessage(previewMessage, 'voice')
    setShowPreview(false)
    setPreviewMessage('')
  }

  const editMessage = () => {
    setTextInput(previewMessage)
    startTyping()
    setShowPreview(false)
  }

  const cancelPreview = () => {
    setShowPreview(false)
    setPreviewMessage('')
  }

  // Auto-focus input when typing mode starts
  useEffect(() => {
    if (inputMode === 'typing' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputMode])

  const displayText = inputMode === 'listening' 
    ? voiceTranscript + interimTranscript 
    : textInput

  const isInputEmpty = !displayText.trim()

  const getStatusMessage = () => {
    if (!isOnline) return "🔴 Offline - Voice recognition unavailable"
    if (error) return `❌ ${error}`
    
    switch (inputMode) {
      case 'listening':
        if (interimTranscript) return "🎤 Ki is listening... ✨"
        return "🎤 Start speaking to Ki"
      case 'typing':
        return "💬 Type your message"
      default:
        return "🎤 Tap to speak or ⌨️ start typing"
    }
  }

  const getConfidenceColor = () => {
    if (confidence >= 0.8) return "text-green-600 dark:text-green-400"
    if (confidence >= 0.6) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Voice Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={cancelPreview}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 m-4 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <Volume2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Voice Message Preview
                </h3>
                {confidence < minConfidence && (
                  <div className="flex items-center justify-center space-x-2 text-sm text-yellow-600 dark:text-yellow-400 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Low confidence - please review</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 mb-4">
                <p className="text-gray-800 dark:text-white text-center italic">
                  "{previewMessage}"
                </p>
                {confidence < 1 && (
                  <div className="mt-2 text-center">
                    <span className={`text-xs font-medium ${getConfidenceColor()}`}>
                      {Math.round(confidence * 100)}% confidence
                    </span>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={confirmMessage}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-2xl"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Send
                </Button>
                <Button
                  onClick={editMessage}
                  variant="outline"
                  className="flex-1 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 py-3 rounded-2xl"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={cancelPreview}
                  variant="ghost"
                  className="px-4 py-3 rounded-2xl"
                >
                  <X className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status message with network indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -top-12 left-0 right-0 text-center text-sm font-medium flex items-center justify-center space-x-2"
      >
        {!isOnline && <WifiOff className="w-4 h-4 text-red-500" />}
        {isOnline && <Wifi className="w-4 h-4 text-green-500" />}
        <span className={error ? "text-red-600 dark:text-red-400" : "text-purple-600 dark:text-purple-400"}>
          {getStatusMessage()}
        </span>
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-16 left-0 right-0 bg-red-500/90 text-white text-sm px-3 py-2 rounded-lg backdrop-blur-sm z-20 text-center"
          >
            <div className="flex items-center justify-center space-x-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main input container */}
      <motion.div
        className={`
          relative bg-white/90 dark:bg-white/10 backdrop-blur-xl border rounded-3xl 
          shadow-2xl overflow-hidden transition-all duration-300 cursor-text
          ${inputMode === 'listening' 
            ? 'border-green-400/50 shadow-green-500/20 dark:border-green-400/50' 
            : inputMode === 'typing'
            ? 'border-purple-400/50 shadow-purple-500/20 dark:border-purple-400/50'
            : 'border-gray-200/50 dark:border-white/20 hover:border-purple-300/50 dark:hover:border-purple-400/30'
          }
          ${!isOnline ? 'opacity-60' : ''}
        `}
        animate={{
          scale: inputMode !== 'idle' ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        onClick={(e) => {
          if (inputMode === 'idle' && isOnline) {
            e.preventDefault()
            startTyping()
          }
        }}
      >
        {/* Listening animation background */}
        <AnimatePresence>
          {inputMode === 'listening' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-green-400/20 dark:from-green-400/30 dark:via-blue-400/30 dark:to-green-400/30"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                background: [
                  "linear-gradient(90deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(34, 197, 94, 0.2) 100%)",
                  "linear-gradient(90deg, rgba(59, 130, 246, 0.2) 0%, rgba(34, 197, 94, 0.2) 50%, rgba(59, 130, 246, 0.2) 100%)",
                  "linear-gradient(90deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(34, 197, 94, 0.2) 100%)"
                ]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </AnimatePresence>

        {/* Audio level indicator */}
        {inputMode === 'listening' && (
          <motion.div
            className="absolute left-2 top-1/2 transform -translate-y-1/2 flex space-x-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-green-400 rounded-full"
                animate={{
                  height: [4, 8 + (audioLevel * 20), 4]
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}

        <div className="relative z-10 flex items-center p-2">
          {/* Voice button - Primary action */}
          {isVoiceSupported && (
            <motion.button
              onClick={inputMode === 'listening' ? stopListening : startListening}
              disabled={disabled || inputMode === 'typing' || !isOnline}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className={`
                ${isMobile ? 'p-3' : 'p-4'} rounded-2xl transition-all duration-200 ${isMobile ? 'mr-2' : 'mr-3'} relative overflow-hidden
                ${inputMode === 'listening' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl shadow-green-500/40' 
                  : inputMode === 'typing' || !isOnline
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40'
                }
              `}
            >
              {/* Pulse animation for listening */}
              {inputMode === 'listening' && (
                <motion.div
                  className="absolute inset-0 bg-green-400 rounded-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              
              <AnimatePresence mode="wait">
                {inputMode === 'listening' ? (
                  <motion.div
                    key="recording"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <Volume2 className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -180 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <Mic className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          {/* Text input - Always rendered for instant focus */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputMode === 'listening' ? displayText : textInput}
              onChange={(e) => {
                if (inputMode !== 'listening') {
                  setTextInput(e.target.value)
                }
              }}
              onKeyDown={handleKeyPress}
              onFocus={() => {
                if (inputMode === 'idle' && isOnline) {
                  startTyping()
                }
              }}
              placeholder={inputMode === 'listening' ? "Listening..." : placeholder}
              disabled={disabled || !isOnline}
              className={`
                w-full bg-transparent border-none ${isMobile ? 'px-3 py-3 text-base' : 'px-4 py-4 text-lg'} font-medium focus:outline-none transition-all duration-200
                ${inputMode === 'listening' 
                  ? 'text-green-600 dark:text-green-400 placeholder-green-500/60 cursor-default' 
                  : 'text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 cursor-text'
                }
                ${inputMode === 'idle' ? 'cursor-text' : ''}
                ${!isOnline ? 'cursor-not-allowed' : ''}
              `}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck="false"
              readOnly={inputMode === 'listening' || !isOnline}
            />
            
            {/* Confidence indicator for voice input */}
            {inputMode === 'listening' && confidence < minConfidence && displayText && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full"
                >
                  <AlertCircle className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                    {Math.round(confidence * 100)}%
                  </span>
                </motion.div>
              </div>
            )}
            
            {/* Status icon for idle mode */}
            {inputMode === 'idle' && !textInput && isOnline && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Type className="w-4 h-4 text-gray-400 dark:text-white/40" />
              </div>
            )}
            
            {/* Listening indicator */}
            {inputMode === 'listening' && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 ml-2">
            {/* Switch to text button (when listening with content) */}
            {inputMode === 'listening' && displayText && (
              <motion.button
                onClick={switchToTextFromVoice}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className={`${isMobile ? 'p-1.5' : 'p-2'} rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-all duration-200`}
                title="Edit as text"
              >
                <Edit3 className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
              </motion.button>
            )}

            {/* Cancel button */}
            {inputMode !== 'idle' && (
              <motion.button
                onClick={cancelInput}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className={`${isMobile ? 'p-1.5' : 'p-2'} rounded-xl bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/30 transition-all duration-200`}
              >
                <X className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
              </motion.button>
            )}

            {/* Send button - Fast and responsive */}
            {!isInputEmpty && (
              <motion.button
                onClick={inputMode === 'typing' ? sendTextMessage : stopListening}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15, type: "spring", stiffness: 400 }}
                className={`${isMobile ? 'p-2.5' : 'p-3'} rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-150`}
              >
                <Send className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Enhanced glow effects */}
        <div 
          className={`
            absolute inset-0 rounded-3xl blur-xl -z-10 scale-110 transition-opacity duration-300
            ${inputMode === 'listening' ? 'bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-100' : 'opacity-0'}
          `} 
        />
        <div 
          className={`
            absolute inset-0 rounded-3xl blur-2xl -z-20 scale-125 transition-opacity duration-300
            ${inputMode === 'typing' ? 'bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-100' : 'opacity-0'}
          `} 
        />
      </motion.div>

      {/* Help hint - simplified for mobile */}
      {inputMode === 'idle' && isOnline && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className={`${isMobile ? 'mt-2 text-xs' : 'mt-4 text-xs'} text-center text-gray-400 dark:text-white/50`}
        >
          <span className="inline-flex items-center space-x-2">
            {!isMobile && (
              <>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                  Press spacebar to speak
                </span>
                <span>•</span>
              </>
            )}
            <span>{isMobile ? 'Tap mic to speak or type below' : 'Just start typing to write'}</span>
            {enablePreview && !isMobile && (
              <>
                <span>•</span>
                <span>Voice messages can be previewed</span>
              </>
            )}
          </span>
        </motion.div>
      )}
    </div>
  )
}