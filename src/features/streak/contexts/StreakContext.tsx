import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as BadgeService from '../services/badgeService'
import { firestoreService } from '../services/firestoreService'
import { getMockStreakData, updateMockStreakData } from '../services/mockStreakService'
import * as StreakService from '../services/streakService'
import { Badge, UserBadges } from '../types/streakTypes'

interface StreakData {
    dates: string[]
    streak: number
    lastDate: string | null
    badges: UserBadges | null
    highestStreak: number
}

interface StreakContextType {
    currentStreak: number
    lastWorkoutDate: string | null
    unlockedBadges: Badge[]
    nextBadge: Badge | undefined
    progressToNextBadge: number
    updateStreak: (workoutDate: string) => Promise<void>
    resetStreak: () => Promise<void>
    highestStreak: number
    isLoading: boolean
    error: Error | null
}

const INITIAL_STREAK_DATA: StreakData = {
    dates: [],
    streak: 0,
    lastDate: null,
    badges: null,
    highestStreak: 0,
}

const StreakContext = createContext<StreakContextType | undefined>(undefined)

export const StreakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useAuthContext()
    const { handleError, showMessage } = useErrorHandler()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [streakData, setStreakData] = useState<StreakData>(INITIAL_STREAK_DATA)

    // Load initial streak data
    const loadStreakData = useCallback(async () => {
        if (!currentUser?.uid) {
            setIsLoading(false)

            return
        }

        try {
            setIsLoading(true)
            setError(null)

            const data = await getMockStreakData(currentUser.uid)

            // Update streak data with proper fallbacks
            setStreakData({
                dates: data?.dates || [],
                streak: data?.streak || 0,
                lastDate: data?.lastWorkoutDate || null,
                badges: data?.badges || null,
                highestStreak: data?.highestStreak || 0,
            })
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load streak data'

            setError(new Error(errorMessage))
            handleError(errorMessage, 'error')
        } finally {
            setIsLoading(false)
        }
    }, [currentUser?.uid, handleError])

    useEffect(() => {
        loadStreakData()
    }, [loadStreakData])

    // Handle notifications for new badges
    const handleBadgeNotifications = useCallback((previousStreak: number, newStreak: number) => {
        const newBadges = BadgeService.getUnlockedBadges(newStreak)
        const previousBadges = BadgeService.getUnlockedBadges(previousStreak)

        const justUnlocked = newBadges.filter(
            badge => !previousBadges.find(prev => prev.id === badge.id)
        )

        justUnlocked.forEach(badge => {
            showMessage(`🎉 New Badge Unlocked: ${badge.name}!`, 'success')
        })

        return newBadges
    }, [handleError, showMessage])

    // Update streak with optimistic updates
    const updateStreak = useCallback(async (workoutDate: string) => {
        if (!currentUser?.uid) {
            throw new Error('User must be authenticated to update streak')
        }

        // Optimistic update
        const newDates = [...new Set([...streakData.dates, workoutDate])].sort()
        const newStreak = StreakService.calculateStreak(newDates)
        const newHighestStreak = Math.max(streakData.highestStreak, newStreak)

        try {
            // Update local state immediately
            setStreakData(prev => ({
                ...prev,
                dates: newDates,
                streak: newStreak,
                lastDate: workoutDate,
                highestStreak: newHighestStreak,
            }))

            // Handle badge notifications
            const unlockedBadges = handleBadgeNotifications(streakData.streak, newStreak)

            // Update backend
            const updatedData = await updateMockStreakData(currentUser.uid, workoutDate)

            // Show milestone notification if applicable
            const milestone = StreakService.getStreakMilestone(newStreak)

            if (milestone) {
                showMessage(StreakService.getStreakMessage(newStreak), 'success')
            }

            // Update final state with server response
            setStreakData(prev => ({
                ...prev,
                badges: updatedData.badges,
            }))
        } catch (err) {
            // Revert optimistic update on error
            setStreakData(prev => ({
                ...prev,
                dates: streakData.dates,
                streak: streakData.streak,
                lastDate: streakData.lastDate,
                highestStreak: streakData.highestStreak,
            }))

            const errorMessage = err instanceof Error ? err.message : 'Failed to update streak'

            setError(new Error(errorMessage))
            handleError(errorMessage, 'error')
            throw err
        }
    }, [currentUser?.uid, streakData, handleBadgeNotifications, handleError, showMessage])

    // Reset streak with optimistic updates
    const resetStreak = useCallback(async () => {
        if (!currentUser?.uid) {
            throw new Error('User must be authenticated to reset streak')
        }

        const previousData = { ...streakData }

        try {
            // Optimistic update
            setStreakData(prev => ({
                ...INITIAL_STREAK_DATA,
                badges: prev.badges,
                highestStreak: prev.highestStreak,
            }))

            await firestoreService.resetUserStreak(currentUser.uid)

            showMessage('Streak reset. Start fresh tomorrow! 💪', 'info')
        } catch (err) {
            // Revert optimistic update on error
            setStreakData(previousData)

            const errorMessage = err instanceof Error ? err.message : 'Failed to reset streak'

            setError(new Error(errorMessage))
            handleError(errorMessage, 'error')
            throw err
        }
    }, [currentUser?.uid, streakData, handleError, showMessage])

    // Memoized values
    const unlockedBadges = useMemo(() =>
        streakData.badges?.unlockedBadges || [],
        [streakData.badges]
    )

    const nextBadge = useMemo(() =>
        BadgeService.getNextBadge(streakData.streak),
        [streakData.streak]
    )

    const progressToNextBadge = useMemo(() =>
        BadgeService.getProgressToNextBadge(streakData.streak),
        [streakData.streak]
    )

    // Context value
    const value = useMemo(() => ({
        currentStreak: streakData.streak,
        lastWorkoutDate: streakData.lastDate,
        unlockedBadges,
        nextBadge,
        progressToNextBadge,
        updateStreak,
        resetStreak,
        highestStreak: streakData.highestStreak,
        isLoading,
        error,
    }), [
        streakData,
        unlockedBadges,
        nextBadge,
        progressToNextBadge,
        updateStreak,
        resetStreak,
        isLoading,
        error,
    ])

    return (
        <StreakContext.Provider value={value}>
            {children}
        </StreakContext.Provider>
    )
}

export const useStreak = () => {
    const context = useContext(StreakContext)

    if (context === undefined) {
        throw new Error('useStreak must be used within a StreakProvider')
    }

    return context
}