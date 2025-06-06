"use client"

import { useState, useCallback, useEffect, useRef } from "react"

type InputMode = 'idle' | 'typing' | 'listening' | 'processing'

interface UseInputModeOptions {
  onSendMessage: (message: string, mode: 'voice' | 'text') => void
  disabled?: boolean
  minConfidence?: number
  autoSend?: boolean
}

interface UseInputModeReturn {
  inputMode: InputMode
  textInput: string
  voiceTranscript: string
  interimTranscript: string
  isVoiceSupported: boolean
  error: string | null
  confidence: number
  setTextInput: (text: string) => void
  startTyping: () => void
  startListening: () => void
  stopListening: () => void
  cancelInput: () => void
  sendTextMessage: () => void
  switchToTextFromVoice: () => void
  handleKeyPress: (e: React.KeyboardEvent) => void
}

export function useInputMode({ 
  onSendMessage, 
  disabled = false, 
  minConfidence = 0.7,
  autoSend = true 
}: UseInputModeOptions): UseInputModeReturn {
  const [inputMode, setInputMode] = useState<InputMode>('idle')
  const [textInput, setTextInput] = useState('')
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isVoiceSupported, setIsVoiceSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(1)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      
      if (SpeechRecognition) {
        setIsVoiceSupported(true)
        
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US'

        recognition.onstart = () => {
          setInputMode('listening')
          setError(null)
        }

        recognition.onend = () => {
          if (inputMode === 'listening') {
            setInputMode('idle')
          }
          setInterimTranscript('')
          
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current)
            silenceTimeoutRef.current = null
          }
        }

        recognition.onerror = (event) => {
          let errorMessage = 'Speech recognition error'
          
          switch (event.error) {
            case 'network':
              errorMessage = 'Network error - check your connection'
              break
            case 'not-allowed':
              errorMessage = 'Microphone access denied'
              break
            case 'no-speech':
              errorMessage = 'No speech detected - try speaking closer to microphone'
              break
            case 'audio-capture':
              errorMessage = 'Microphone not found or not working'
              break
            case 'service-not-allowed':
              errorMessage = 'Speech service not available'
              break
            default:
              errorMessage = `Speech recognition error: ${event.error}`
          }
          
          setError(errorMessage)
          setInputMode('idle')
          setInterimTranscript('')
          setConfidence(0)
          
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current)
            silenceTimeoutRef.current = null
          }
          
          // Auto-clear error after 5 seconds
          setTimeout(() => setError(null), 5000)
        }

        recognition.onresult = (event) => {
          let finalTranscript = ''
          let interimText = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i]
            const transcriptPart = result[0].transcript

            if (result.isFinal) {
              finalTranscript += transcriptPart
            } else {
              interimText += transcriptPart
            }
          }

          if (finalTranscript) {
            setVoiceTranscript(prev => prev + finalTranscript)
            setInterimTranscript('')
            
            // Get confidence from final result
            const finalResult = event.results[event.results.length - 1]
            if (finalResult && finalResult[0]) {
              setConfidence(finalResult[0].confidence || 1)
            }
          } else {
            setInterimTranscript(interimText)
          }

          // Reset silence timeout
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current)
          }
          
          // Auto-stop after 2 seconds of silence for better UX
          silenceTimeoutRef.current = setTimeout(() => {
            if (recognitionRef.current && inputMode === 'listening') {
              recognitionRef.current.stop()
              
              // If we have transcript and auto-send is enabled
              const finalText = voiceTranscript + finalTranscript
              if (finalText.trim() && autoSend) {
                const currentConfidence = confidence || 1
                
                // Only auto-send if confidence is high enough
                if (currentConfidence >= minConfidence) {
                  onSendMessage(finalText.trim(), 'voice')
                  setVoiceTranscript('')
                  setConfidence(1)
                }
              }
            }
          }, 2000)
        }

        recognitionRef.current = recognition
      } else {
        setIsVoiceSupported(false)
        setError('Speech recognition not supported in this browser')
      }
    }

    return () => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [inputMode, voiceTranscript, onSendMessage])

  // Keyboard shortcuts
  useEffect(() => {
    if (disabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Space key to toggle listening (when not typing)
      if (e.code === "Space" && inputMode !== 'typing' && !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
        // Only trigger when not in an input field
        if (
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA" &&
          !(document.activeElement instanceof HTMLElement && document.activeElement.isContentEditable)
        ) {
          e.preventDefault()

          if (inputMode === "listening") {
            stopListening()
          } else if (inputMode === "idle") {
            startListening()
          }
          return
        }
      }

      // ESC to cancel current input
      if (e.key === "Escape") {
        e.preventDefault()
        cancelInput()
        return
      }

      // Any printable key starts typing mode (when idle)
      if (
        inputMode === 'idle' &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey &&
        e.key.length === 1 &&
        !["Control", "Alt", "Shift", "Meta"].includes(e.key) &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA" &&
        !(document.activeElement instanceof HTMLElement && document.activeElement.isContentEditable)
      ) {
        startTyping()
        setTextInput(e.key)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [disabled, inputMode])

  const startTyping = useCallback(() => {
    if (disabled) return
    
    // If currently listening, stop first
    if (inputMode === 'listening' && recognitionRef.current) {
      recognitionRef.current.stop()
    }
    
    setInputMode('typing')
    setError(null)
  }, [disabled, inputMode])

  const startListening = useCallback(() => {
    if (disabled || !isVoiceSupported) return
    
    if (recognitionRef.current && inputMode !== 'listening') {
      setError(null)
      setVoiceTranscript('')
      setInterimTranscript('')
      setConfidence(1)
      
      try {
        recognitionRef.current.start()
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to start speech recognition'
        setError(errorMessage)
        
        // Retry after 2 seconds if it's a temporary error
        if (errorMessage.includes('already started')) {
          retryTimeoutRef.current = setTimeout(() => {
            try {
              if (recognitionRef.current) {
                recognitionRef.current.stop()
                setTimeout(() => {
                  if (recognitionRef.current) {
                    recognitionRef.current.start()
                  }
                }, 100)
              }
            } catch (retryErr) {
              setError('Unable to start voice recognition')
            }
          }, 2000)
        }
      }
    }
  }, [disabled, isVoiceSupported, inputMode])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && inputMode === 'listening') {
      recognitionRef.current.stop()
      
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
        silenceTimeoutRef.current = null
      }
    }
  }, [inputMode])

  const cancelInput = useCallback(() => {
    if (inputMode === 'listening' && recognitionRef.current) {
      recognitionRef.current.stop()
    }
    
    setInputMode('idle')
    setTextInput('')
    setVoiceTranscript('')
    setInterimTranscript('')
    setError(null)
    setConfidence(1)
    
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current)
      silenceTimeoutRef.current = null
    }
    
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
      retryTimeoutRef.current = null
    }
  }, [inputMode])

  const sendTextMessage = useCallback(() => {
    if (textInput.trim()) {
      onSendMessage(textInput.trim(), 'text')
      setTextInput('')
      setInputMode('idle')
    }
  }, [textInput, onSendMessage])

  const switchToTextFromVoice = useCallback(() => {
    if (inputMode === 'listening') {
      stopListening()
      
      // Copy current voice transcript to text input
      const currentText = voiceTranscript + interimTranscript
      if (currentText.trim()) {
        setTextInput(currentText.trim())
        setInputMode('typing')
      } else {
        setInputMode('idle')
      }
      
      setVoiceTranscript('')
      setInterimTranscript('')
    }
  }, [inputMode, voiceTranscript, interimTranscript, stopListening])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      sendTextMessage()
    } else if (e.key === "Escape") {
      e.preventDefault()
      cancelInput()
    }
  }, [sendTextMessage, cancelInput])

  return {
    inputMode,
    textInput,
    voiceTranscript,
    interimTranscript,
    isVoiceSupported,
    error,
    confidence,
    setTextInput,
    startTyping,
    startListening,
    stopListening,
    cancelInput,
    sendTextMessage,
    switchToTextFromVoice,
    handleKeyPress
  }
}