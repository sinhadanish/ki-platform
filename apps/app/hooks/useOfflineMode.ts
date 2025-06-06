"use client"

import { useState, useEffect, useCallback } from 'react'

interface OfflineData {
  onboardingData: any
  timestamp: number
  syncStatus: 'pending' | 'synced' | 'failed'
}

interface UseOfflineModeReturn {
  isOnline: boolean
  hasOfflineData: boolean
  offlineQueue: OfflineData[]
  saveOfflineData: (data: any) => void
  syncOfflineData: () => Promise<void>
  clearOfflineData: () => void
  getOfflineCapabilities: () => {
    canSaveProgress: boolean
    canCompleteBasicOnboarding: boolean
    canUseVoiceInput: boolean
  }
}

const OFFLINE_STORAGE_KEY = 'ki-offline-data'
const MAX_OFFLINE_ENTRIES = 10

export function useOfflineMode(): UseOfflineModeReturn {
  const [isOnline, setIsOnline] = useState(true)
  const [offlineQueue, setOfflineQueue] = useState<OfflineData[]>([])
  const [hasOfflineData, setHasOfflineData] = useState(false)

  // Monitor online/offline status
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    // Set initial status
    updateOnlineStatus()

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  // Load offline data on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(OFFLINE_STORAGE_KEY)
      if (stored) {
        const parsedData = JSON.parse(stored) as OfflineData[]
        setOfflineQueue(parsedData)
        setHasOfflineData(parsedData.length > 0)
      }
    } catch (error) {
      console.warn('Failed to load offline data:', error)
    }
  }, [])

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && offlineQueue.length > 0) {
      // Delay sync to allow for stable connection
      const timer = setTimeout(() => {
        syncOfflineData()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isOnline, offlineQueue.length])

  const saveOfflineData = useCallback((data: any) => {
    const offlineEntry: OfflineData = {
      onboardingData: data,
      timestamp: Date.now(),
      syncStatus: 'pending'
    }

    setOfflineQueue(prev => {
      const updated = [...prev, offlineEntry]
      
      // Keep only the most recent entries
      if (updated.length > MAX_OFFLINE_ENTRIES) {
        updated.splice(0, updated.length - MAX_OFFLINE_ENTRIES)
      }

      try {
        localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(updated))
      } catch (error) {
        console.warn('Failed to save offline data:', error)
      }

      return updated
    })

    setHasOfflineData(true)
  }, [])

  const syncOfflineData = useCallback(async () => {
    if (!isOnline || offlineQueue.length === 0) return

    const pendingEntries = offlineQueue.filter(entry => entry.syncStatus === 'pending')
    
    for (const entry of pendingEntries) {
      try {
        // Attempt to sync with server
        const response = await fetch('/api/user/onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...entry.onboardingData,
            offlineTimestamp: entry.timestamp,
            syncedAt: new Date().toISOString()
          })
        })

        if (response.ok) {
          // Mark as synced
          setOfflineQueue(prev => 
            prev.map(item => 
              item.timestamp === entry.timestamp 
                ? { ...item, syncStatus: 'synced' as const }
                : item
            )
          )
        } else {
          // Mark as failed
          setOfflineQueue(prev => 
            prev.map(item => 
              item.timestamp === entry.timestamp 
                ? { ...item, syncStatus: 'failed' as const }
                : item
            )
          )
        }
      } catch (error) {
        console.warn('Failed to sync offline data:', error)
        
        // Mark as failed
        setOfflineQueue(prev => 
          prev.map(item => 
            item.timestamp === entry.timestamp 
              ? { ...item, syncStatus: 'failed' as const }
              : item
          )
        )
      }
    }

    // Update localStorage with sync status
    try {
      localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(offlineQueue))
    } catch (error) {
      console.warn('Failed to update offline data sync status:', error)
    }
  }, [isOnline, offlineQueue])

  const clearOfflineData = useCallback(() => {
    setOfflineQueue([])
    setHasOfflineData(false)
    
    try {
      localStorage.removeItem(OFFLINE_STORAGE_KEY)
    } catch (error) {
      console.warn('Failed to clear offline data:', error)
    }
  }, [])

  const getOfflineCapabilities = useCallback(() => {
    return {
      canSaveProgress: true, // Can always save to localStorage
      canCompleteBasicOnboarding: true, // Basic flow works offline
      canUseVoiceInput: false // Voice recognition requires internet
    }
  }, [])

  return {
    isOnline,
    hasOfflineData,
    offlineQueue,
    saveOfflineData,
    syncOfflineData,
    clearOfflineData,
    getOfflineCapabilities
  }
}