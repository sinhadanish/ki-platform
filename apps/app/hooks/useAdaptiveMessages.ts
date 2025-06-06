"use client"

import { useMemo } from 'react'
import type { OnboardingData } from './useOnboardingProgress'

export type MessageContext = {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  isReturningUser: boolean
  completedSteps: string[]
  userTone: 'formal' | 'casual' | 'friendly'
  deviceType: 'mobile' | 'desktop'
}

export type AdaptiveMessage = {
  message: string
  tone: 'warm' | 'encouraging' | 'celebratory' | 'empathetic' | 'curious'
  followUp?: string
}

interface UseAdaptiveMessagesReturn {
  getWelcomeMessage: () => AdaptiveMessage
  getStepMessage: (stepId: string, data: OnboardingData) => AdaptiveMessage
  getErrorMessage: (errorType: string) => AdaptiveMessage
  getSuccessMessage: (achievement: string) => AdaptiveMessage
  getMotivationalMessage: () => AdaptiveMessage
}

export function useAdaptiveMessages(
  data: OnboardingData,
  context: MessageContext
): UseAdaptiveMessagesReturn {
  
  const getTimeBasedGreeting = () => {
    const greetings = {
      morning: ['Good morning', 'Rise and shine', 'Morning'],
      afternoon: ['Good afternoon', 'Hope your day is going well', 'Afternoon'],
      evening: ['Good evening', 'Hope you had a great day', 'Evening'],
      night: ['Good evening', 'Thanks for taking time tonight', 'Evening']
    }
    
    const options = greetings[context.timeOfDay]
    return options[Math.floor(Math.random() * options.length)]
  }

  const getPersonalizedName = () => {
    if (!data.name) return ''
    
    // Add variety to how we address the user
    const variations = [
      data.name,
      `${data.name}!`,
      `${data.name} 💫`,
    ]
    
    return variations[Math.floor(Math.random() * variations.length)]
  }

  const getRelationshipContext = () => {
    if (!data.relationshipStatus) return ''
    
    const statusMessages = {
      dating: 'As someone who\'s dating',
      partnered: 'As partners',
      engaged: 'As an engaged couple',
      married: 'As a married couple'
    }
    
    return statusMessages[data.relationshipStatus as keyof typeof statusMessages] || ''
  }

  const getWelcomeMessage = (): AdaptiveMessage => {
    const greeting = getTimeBasedGreeting()
    
    if (context.isReturningUser) {
      return {
        message: `${greeting}, welcome back! Ready to continue strengthening your relationship? 💕`,
        tone: 'warm',
        followUp: "I'm excited to pick up where we left off!"
      }
    }
    
    if (context.deviceType === 'mobile') {
      return {
        message: `${greeting}! I'm Ki, and I'm here to help strengthen your relationship 💕`,
        tone: 'warm',
        followUp: "This will just take a few minutes!"
      }
    }
    
    return {
      message: `${greeting}! I'm Ki, your relationship companion. Ready to build something beautiful together? 💕`,
      tone: 'warm',
      followUp: "I'll guide you through a few questions to personalize your experience."
    }
  }

  const getStepMessage = (stepId: string, currentData: OnboardingData): AdaptiveMessage => {
    const name = getPersonalizedName()
    const relationshipContext = getRelationshipContext()
    
    switch (stepId) {
      case 'name':
        return {
          message: context.deviceType === 'mobile' 
            ? "I'm Ki! What's your name?" 
            : "I'm Ki, your relationship guide. What should I call you?",
          tone: 'curious'
        }
        
      case 'age':
        if (name) {
          const ageMessages = [
            `Nice to meet you, ${name}! How old are you?`,
            `Great to connect, ${name}! What's your age?`,
            `Hello ${name}! Could you share your age with me?`
          ]
          return {
            message: ageMessages[Math.floor(Math.random() * ageMessages.length)],
            tone: 'warm'
          }
        }
        return {
          message: "How old are you?",
          tone: 'curious'
        }
        
      case 'location':
        const locationMessages = [
          "Where are you located?",
          "What city or area are you in?",
          "Where do you call home?"
        ]
        return {
          message: locationMessages[Math.floor(Math.random() * locationMessages.length)],
          tone: 'curious'
        }
        
      case 'relationship':
        if (name) {
          return {
            message: `${name}, tell me about your relationship status`,
            tone: 'empathetic',
            followUp: "This helps me understand your unique situation better."
          }
        }
        return {
          message: "Tell me about your relationship status",
          tone: 'empathetic'
        }
        
      case 'length':
        if (currentData.relationshipStatus === 'married') {
          return {
            message: "How long have you been married?",
            tone: 'warm',
            followUp: "Every year together is worth celebrating! 💍"
          }
        } else if (currentData.relationshipStatus === 'engaged') {
          return {
            message: "How long have you been engaged?",
            tone: 'celebratory',
            followUp: "How exciting - wedding planning can bring couples closer! 💕"
          }
        } else if (currentData.relationshipStatus === 'dating') {
          return {
            message: "How long have you been dating?",
            tone: 'curious',
            followUp: "Every relationship journey is unique and special! 🌟"
          }
        }
        return {
          message: "How long have you been together?",
          tone: 'curious'
        }
        
      case 'goals':
        if (relationshipContext) {
          return {
            message: `${relationshipContext}, what aspects would you like to strengthen together?`,
            tone: 'encouraging',
            followUp: "Choose as many as feel right for your relationship!"
          }
        }
        return {
          message: "What would you like to work on together?",
          tone: 'encouraging'
        }
        
      case 'partner':
        if (currentData.relationshipStatus === 'married') {
          return {
            message: "Would you like to invite your spouse to join Ki?",
            tone: 'encouraging',
            followUp: "Couples who grow together, stay together! 💑"
          }
        }
        return {
          message: "Would you like to invite your partner to join Ki?",
          tone: 'encouraging',
          followUp: "Shared growth creates stronger bonds! 💕"
        }
        
      case 'complete':
        const goalCount = currentData.goals.length
        let completionMessage = `Welcome to Ki, ${name || 'beautiful soul'}! `
        
        if (goalCount > 0) {
          completionMessage += `I'm excited to help you work on ${goalCount} area${goalCount > 1 ? 's' : ''} of growth. `
        }
        
        completionMessage += "Let's begin this beautiful journey together! ✨"
        
        return {
          message: completionMessage,
          tone: 'celebratory',
          followUp: relationshipContext ? `${relationshipContext}, you're taking such a meaningful step!` : undefined
        }
        
      default:
        return {
          message: "Let's continue your journey...",
          tone: 'encouraging'
        }
    }
  }

  const getErrorMessage = (errorType: string): AdaptiveMessage => {
    switch (errorType) {
      case 'network':
        return {
          message: "Looks like there's a connection hiccup! No worries, let's try that again.",
          tone: 'empathetic'
        }
      case 'voice-not-supported':
        return {
          message: "Voice input isn't available right now, but typing works perfectly! 💭",
          tone: 'encouraging'
        }
      case 'microphone-access':
        return {
          message: "I'd love to hear your voice! Could you allow microphone access? 🎤",
          tone: 'friendly'
        }
      default:
        return {
          message: "Oops! Something didn't work as expected. Let's give it another try! 💪",
          tone: 'encouraging'
        }
    }
  }

  const getSuccessMessage = (achievement: string): AdaptiveMessage => {
    switch (achievement) {
      case 'voice-recognized':
        return {
          message: "Perfect! I heard you clearly ✨",
          tone: 'celebratory'
        }
      case 'step-completed':
        return {
          message: "Wonderful! Moving right along 🌟",
          tone: 'encouraging'
        }
      case 'progress-saved':
        return {
          message: "Your progress is safely saved! 💾",
          tone: 'warm'
        }
      default:
        return {
          message: "Great job! 🎉",
          tone: 'celebratory'
        }
    }
  }

  const getMotivationalMessage = (): AdaptiveMessage => {
    const messages = [
      {
        message: "You're doing amazing! Every step matters 💫",
        tone: 'encouraging' as const
      },
      {
        message: "Look at you, investing in your relationship! 💕",
        tone: 'celebratory' as const
      },
      {
        message: "This is such beautiful work you're doing together 🌟",
        tone: 'warm' as const
      },
      {
        message: "Strong relationships are built one conversation at a time 💬",
        tone: 'encouraging' as const
      }
    ]
    
    return messages[Math.floor(Math.random() * messages.length)]
  }

  return {
    getWelcomeMessage,
    getStepMessage,
    getErrorMessage,
    getSuccessMessage,
    getMotivationalMessage
  }
}