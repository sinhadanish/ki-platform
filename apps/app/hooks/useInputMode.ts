"use client"

import { useState, useCallback, useEffect, useRef } from "react"

type InputMode = 'idle' | 'typing' | 'listening' | 'processing'

interface UseInputModeOptions {
  onSendMessage: (message: string, mode: 'voice' | 'text') => void
  disabled?: boolean
}

interface UseInputModeReturn {
  inputMode: InputMode
  textInput: string
  voiceTranscript: string
  interimTranscript: string
  isVoiceSupported: boolean
  error: string | null
  setTextInput: (text: string) => void
  startTyping: () => void
  startListening: () => void
  stopListening: () => void
  cancelInput: () => void
  sendTextMessage: () => void
  switchToTextFromVoice: () => void
  handleKeyPress: (e: React.KeyboardEvent) => void
}

export function useInputMode({ onSendMessage, disabled = false }: UseInputModeOptions): UseInputModeReturn {
  const [inputMode, setInputMode] = useState<InputMode>('idle')
  const [textInput, setTextInput] = useState('')
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isVoiceSupported, setIsVoiceSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
          setError(`Speech recognition error: ${event.error}`)
          setInputMode('idle')
          setInterimTranscript('')
          
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current)
            silenceTimeoutRef.current = null
          }
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
          } else {
            setInterimTranscript(interimText)
          }

          // Reset silence timeout
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current)
          }
          
          // Auto-stop after 1.5 seconds of silence for better UX
          silenceTimeoutRef.current = setTimeout(() => {
            if (recognitionRef.current && inputMode === 'listening') {
              recognitionRef.current.stop()
              
              // If we have transcript, send it automatically
              const finalText = voiceTranscript + finalTranscript
              if (finalText.trim()) {
                onSendMessage(finalText.trim(), 'voice')
                setVoiceTranscript('')
              }
            }
          }, 1500)
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
      
      try {
        recognitionRef.current.start()
      } catch (err) {
        setError('Failed to start speech recognition')
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
    
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current)
      silenceTimeoutRef.current = null
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