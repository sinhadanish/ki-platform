"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Type, Send, X, Edit3, Volume2 } from 'lucide-react'
import { useInputMode } from '../hooks/useInputMode'

interface ImprovedVoiceTextInputProps {
  onSendMessage: (message: string, mode: 'voice' | 'text') => void
  placeholder?: string
  disabled?: boolean
  className?: string
  isMobile?: boolean
}

export function ImprovedVoiceTextInput({ 
  onSendMessage, 
  placeholder = "Speak or type your message...", 
  disabled = false,
  className = "",
  isMobile = false
}: ImprovedVoiceTextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  
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
    onSendMessage: (message, mode) => {
      // Always send immediately - no confirmation needed
      onSendMessage(message, mode)
    },
    disabled 
  })

  // Auto-focus input when typing mode starts
  useEffect(() => {
    if (inputMode === 'typing' && inputRef.current) {
      // Use a small delay to ensure the input is rendered first
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          inputRef.current.select() // Also select any existing text
        }
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [inputMode])

  const displayText = inputMode === 'listening' 
    ? voiceTranscript + interimTranscript 
    : textInput

  const isInputEmpty = !displayText.trim()


  const getStatusMessage = () => {
    switch (inputMode) {
      case 'listening':
        if (interimTranscript) return "Ki is listening... ✨"
        return "🎤 Start speaking to Ki"
      case 'typing':
        return "💬 Type your message"
      default:
        return "🎤 Tap to speak or ⌨️ start typing"
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Status message - Always visible for clear guidance */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -top-10 left-0 right-0 text-center text-sm text-purple-600 dark:text-purple-400 font-medium"
      >
        {getStatusMessage()}
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-12 left-0 right-0 bg-red-500/90 text-white text-sm px-3 py-2 rounded-lg backdrop-blur-sm z-20 text-center"
          >
            {error}
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
        `}
        animate={{
          scale: inputMode !== 'idle' ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        onClick={(e) => {
          // If not in typing mode and user clicks anywhere on container, start typing
          if (inputMode === 'idle') {
            e.preventDefault()
            startTyping()
            setTimeout(() => {
              if (inputRef.current) {
                inputRef.current.focus()
                inputRef.current.select()
              }
            }, 10)
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

        <div className="relative z-10 flex items-center p-2">
          {/* Voice button - Primary action */}
          {isVoiceSupported && (
            <motion.button
              onClick={inputMode === 'listening' ? stopListening : startListening}
              disabled={disabled || inputMode === 'typing'}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className={`
                p-4 rounded-2xl transition-all duration-200 mr-3 relative overflow-hidden
                ${inputMode === 'listening' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl shadow-green-500/40' 
                  : inputMode === 'typing'
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
                    <Volume2 className="w-5 h-5" />
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
                    <Mic className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          {/* Text input */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {inputMode === 'typing' ? (
                <motion.input
                  key="text-input"
                  ref={inputRef}
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={placeholder}
                  disabled={disabled}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-transparent border-none px-4 py-4 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:outline-none text-lg font-medium"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck="false"
                />
              ) : (
                <motion.div
                  key="display-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 py-4 min-h-[52px] flex items-center cursor-text hover:bg-white/5 rounded-xl transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    startTyping()
                    // Try to focus immediately and also after a short delay
                    setTimeout(() => {
                      if (inputRef.current) {
                        inputRef.current.focus()
                        inputRef.current.select()
                      }
                    }, 10)
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault() // Prevent default selection behavior
                  }}
                >
                  {displayText ? (
                    <div className="text-gray-800 dark:text-white text-lg">
                      <span className="opacity-100">{voiceTranscript}</span>
                      {interimTranscript && (
                        <span className="opacity-70 italic text-blue-600 dark:text-blue-400">{interimTranscript}</span>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-500 dark:text-white/60 text-lg flex items-center">
                      {inputMode === 'listening' ? (
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="flex items-center"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="w-2 h-2 bg-green-400 rounded-full mr-2"
                          />
                          Listening...
                        </motion.div>
                      ) : (
                        <div className="flex items-center">
                          <Type className="w-4 h-4 mr-2" />
                          {placeholder}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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
                className="p-2 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-all duration-200"
                title="Edit as text"
              >
                <Edit3 className="w-4 h-4" />
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
                className="p-2 rounded-xl bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/30 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}

            {/* Send button - Prominent and rewarding */}
            {!isInputEmpty && (
              <motion.button
                onClick={inputMode === 'typing' ? sendTextMessage : stopListening}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 90 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Success animation background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <Send className="w-6 h-6 relative z-10" />
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


      {/* Simplified help hint */}
      {!isMobile && inputMode === 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-4 text-xs text-center text-gray-400 dark:text-white/50"
        >
          <span className="inline-flex items-center space-x-4">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
              Press spacebar to speak instantly
            </span>
            <span>•</span>
            <span>Just start typing to write</span>
          </span>
        </motion.div>
      )}
    </div>
  )
}