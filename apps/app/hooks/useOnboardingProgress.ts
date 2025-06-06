"use client"

import { useState, useEffect, useCallback } from 'react'

export type OnboardingData = {
  name: string;
  age: string;
  location: string;
  relationshipStatus: 'dating' | 'engaged' | 'married' | 'partnered' | '';
  relationshipLength: string;
  goals: string[];
  partnerEmail?: string;
  completedSteps: string[];
  lastActiveStep: number;
  startedAt: string;
  lastUpdated: string;
}

const STORAGE_KEY = 'ki-onboarding-progress'

interface UseOnboardingProgressReturn {
  data: OnboardingData
  savedProgress: OnboardingData | null
  currentStep: number
  hasSavedProgress: boolean
  updateData: (field: keyof OnboardingData, value: any) => void
  updateCurrentStep: (step: number) => void
  markStepCompleted: (stepId: string) => void
  saveProgress: () => void
  loadProgress: () => void
  clearProgress: () => void
  resetToStep: (step: number) => void
}

export function useOnboardingProgress(): UseOnboardingProgressReturn {
  const getInitialData = (): OnboardingData => ({
    name: '',
    age: '',
    location: '',
    relationshipStatus: '',
    relationshipLength: '',
    goals: [],
    partnerEmail: '',
    completedSteps: [],
    lastActiveStep: 0,
    startedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  })

  const [data, setData] = useState<OnboardingData>(getInitialData())
  const [currentStep, setCurrentStep] = useState(0)
  const [savedProgress, setSavedProgress] = useState<OnboardingData | null>(null)
  const [hasSavedProgress, setHasSavedProgress] = useState(false)

  // Load saved progress on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsedData = JSON.parse(saved) as OnboardingData
          setSavedProgress(parsedData)
          setHasSavedProgress(true)
        }
      } catch (error) {
        console.warn('Failed to load onboarding progress:', error)
      }
    }
  }, [])

  const updateData = useCallback((field: keyof OnboardingData, value: any) => {
    setData(prev => ({
      ...prev,
      [field]: value,
      lastUpdated: new Date().toISOString()
    }))
  }, [])

  const updateCurrentStep = useCallback((step: number) => {
    setCurrentStep(step)
    setData(prev => ({
      ...prev,
      lastActiveStep: step,
      lastUpdated: new Date().toISOString()
    }))
  }, [])

  const markStepCompleted = useCallback((stepId: string) => {
    setData(prev => ({
      ...prev,
      completedSteps: [...new Set([...prev.completedSteps, stepId])],
      lastUpdated: new Date().toISOString()
    }))
  }, [])

  const saveProgress = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        setSavedProgress(data)
        setHasSavedProgress(true)
      } catch (error) {
        console.warn('Failed to save onboarding progress:', error)
      }
    }
  }, [data])

  const loadProgress = useCallback(() => {
    if (savedProgress) {
      setData(savedProgress)
      setCurrentStep(savedProgress.lastActiveStep)
    }
  }, [savedProgress])

  const clearProgress = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY)
        setSavedProgress(null)
        setHasSavedProgress(false)
        setData(getInitialData())
        setCurrentStep(0)
      } catch (error) {
        console.warn('Failed to clear onboarding progress:', error)
      }
    }
  }, [])

  const resetToStep = useCallback((step: number) => {
    setCurrentStep(step)
    setData(prev => ({
      ...prev,
      lastActiveStep: step,
      lastUpdated: new Date().toISOString()
    }))
  }, [])

  // Auto-save progress every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (data.name || data.age || data.location || data.relationshipStatus || data.goals.length > 0) {
        saveProgress()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [data, saveProgress])

  return {
    data,
    savedProgress,
    currentStep,
    hasSavedProgress,
    updateData,
    updateCurrentStep,
    markStepCompleted,
    saveProgress,
    loadProgress,
    clearProgress,
    resetToStep
  }
}