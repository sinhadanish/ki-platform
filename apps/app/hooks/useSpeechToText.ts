"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface SpeechToTextOptions {
  language?: string
  continuous?: boolean
  interimResults?: boolean
  maxAlternatives?: number
}

interface UseSpeechToTextReturn {
  isSupported: boolean
  isListening: boolean
  transcript: string
  interimTranscript: string
  error: string | null
  confidence: number
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
}

export function useSpeechToText(options: SpeechToTextOptions = {}): UseSpeechToTextReturn {
  const {
    language = 'en-US',
    continuous = true,
    interimResults = true,
    maxAlternatives = 1
  } = options

  const [isSupported, setIsSupported] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      
      if (SpeechRecognition) {
        setIsSupported(true)
        
        const recognition = new SpeechRecognition()
        recognition.continuous = continuous
        recognition.interimResults = interimResults
        recognition.lang = language
        recognition.maxAlternatives = maxAlternatives

        recognition.onstart = () => {
          setIsListening(true)
          setError(null)
        }

        recognition.onend = () => {
          setIsListening(false)
          setInterimTranscript('')
          
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }
        }

        recognition.onerror = (event) => {
          setError(event.error)
          setIsListening(false)
          setInterimTranscript('')
          
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
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
              setConfidence(result[0].confidence || 0)
            } else {
              interimText += transcriptPart
            }
          }

          if (finalTranscript) {
            setTranscript(prev => prev + finalTranscript)
            setInterimTranscript('')
          } else {
            setInterimTranscript(interimText)
          }

          // Auto-stop after 3 seconds of silence
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          
          timeoutRef.current = setTimeout(() => {
            if (recognitionRef.current && isListening) {
              recognitionRef.current.stop()
            }
          }, 3000)
        }

        recognitionRef.current = recognition
      } else {
        setIsSupported(false)
        setError('Speech recognition not supported in this browser')
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [language, continuous, interimResults, maxAlternatives])

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setError(null)
      setTranscript('')
      setInterimTranscript('')
      setConfidence(0)
      
      try {
        recognitionRef.current.start()
      } catch (err) {
        setError('Failed to start speech recognition')
      }
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isListening])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setInterimTranscript('')
    setConfidence(0)
    setError(null)
  }, [])

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    confidence,
    startListening,
    stopListening,
    resetTranscript
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}