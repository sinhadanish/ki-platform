"use client"

import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Type, Send, X, Edit3 } from 'lucide-react'
import { useInputMode } from '../hooks/useInputMode'

interface VoiceTextInputProps {
  onSendMessage: (message: string, mode: 'voice' | 'text') => void
  placeholder?: string
  disabled?: boolean
  className?: string
  isMobile?: boolean
}

export function VoiceTextInput({ 
  onSendMessage, 
  placeholder = "Speak or type your message...", 
  disabled = false,
  className = "",
  isMobile = false
}: VoiceTextInputProps) {
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
    onSendMessage,
    disabled 
  })

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

  return (
    <div className={`relative w-full ${className}`}>
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-12 left-0 right-0 bg-red-500/90 text-white text-sm px-3 py-2 rounded-lg backdrop-blur-sm z-20"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main input container */}
      <motion.div
        className={`
          relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl 
          shadow-2xl overflow-hidden transition-all duration-300
          ${inputMode === 'listening' ? 'border-green-400/50 shadow-green-500/20' : ''}
          ${inputMode === 'typing' ? 'border-purple-400/50 shadow-purple-500/20' : ''}
        `}
        animate={{
          scale: inputMode !== 'idle' ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Listening animation background */}
        <AnimatePresence>
          {inputMode === 'listening' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-green-400/20"
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
          {/* Voice button */}
          {isVoiceSupported && (
            <motion.button
              onClick={inputMode === 'listening' ? stopListening : startListening}
              disabled={disabled || inputMode === 'typing'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-3 rounded-2xl transition-all duration-200 mr-2
                ${inputMode === 'listening' 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                  : inputMode === 'typing'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }
              `}
            >
              <AnimatePresence mode="wait">
                {inputMode === 'listening' ? (
                  <motion.div
                    key="recording"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MicOff className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -180 }}
                    transition={{ duration: 0.2 }}
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
                  className="w-full bg-transparent border-none px-4 py-3 text-white placeholder-white/60 focus:outline-none text-lg"
                />
              ) : (
                <motion.div
                  key="display-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 py-3 min-h-[48px] flex items-center"
                  onClick={startTyping}
                >
                  {displayText ? (
                    <div className="text-white text-lg">
                      <span className="opacity-100">{voiceTranscript}</span>
                      {interimTranscript && (
                        <span className="opacity-70 italic">{interimTranscript}</span>
                      )}
                    </div>
                  ) : (
                    <div className="text-white/60 text-lg flex items-center">
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
            {/* Switch to text button (when listening) */}
            {inputMode === 'listening' && displayText && (
              <motion.button
                onClick={switchToTextFromVoice}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
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
                className="p-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}

            {/* Send button */}
            {!isInputEmpty && (
              <motion.button
                onClick={inputMode === 'typing' ? sendTextMessage : stopListening}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 90 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 200 }}
                className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Send className="w-5 h-5" />
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

      {/* Keyboard shortcuts hint */}
      {!isMobile && inputMode === 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-xs text-center text-white/60 flex justify-center space-x-4"
        >
          <span className="flex items-center">
            <kbd className="px-2 py-1 bg-white/10 rounded text-white/70 text-xs font-mono mr-1">Space</kbd>
            <span>to speak</span>
          </span>
          <span className="flex items-center">
            <kbd className="px-2 py-1 bg-white/10 rounded text-white/70 text-xs font-mono mr-1">Type</kbd>
            <span>to write</span>
          </span>
          <span className="flex items-center">
            <kbd className="px-2 py-1 bg-white/10 rounded text-white/70 text-xs font-mono mr-1">Esc</kbd>
            <span>to cancel</span>
          </span>
        </motion.div>
      )}
    </div>
  )
}