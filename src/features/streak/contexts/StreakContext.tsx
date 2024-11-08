import { useAuthContext } from '@/contexts/AuthContext'
import { useNotification } from '@/features/Feedback'
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
    const { showNotification } = useNotification()
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

            console.log({ data })

            if (!data) {
                const initialData = await firestoreService.initializeUserStats(currentUser.uid)

                console.log({ initialData })


                setStreakData({
                    dates: initialData.dates || [],
                    streak: initialData.streak || 0,
                    lastDate: initialData.lastWorkoutDate,
                    badges: initialData.badges,
                    highestStreak: initialData.streak || 0,
                })
            } else {
                setStreakData({
                    dates: data.dates || [],
                    streak: data.streak || 0,
                    lastDate: data.lastWorkoutDate,
                    badges: data.badges,
                    highestStreak: data.streak || 0,
                })
            }
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to load streak data'))
            showNotification({
                message: 'Failed to load streak data',
                severity: 'error',
            })
        } finally {
            setIsLoading(false)
        }
    }, [currentUser?.uid, showNotification])

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
            showNotification({
                message: `🎉 New Badge Unlocked: ${badge.name}!`,
                severity: 'success',
                autoHideDuration: 6000,
            })
        })

        return newBadges
    }, [showNotification])

    // Update streak
    const updateStreak = useCallback(async (workoutDate: string) => {
        if (!currentUser?.uid) {
            throw new Error('User must be authenticated to update streak')
        }

        try {
            setError(null)
            const newDates = [...new Set([...streakData.dates, workoutDate])].sort()
            const newStreak = StreakService.calculateStreak(newDates)
            const newHighestStreak = Math.max(streakData.highestStreak, newStreak)

            // Handle badge notifications and updates
            const unlockedBadges = handleBadgeNotifications(streakData.streak, newStreak)

            const updatedBadges: UserBadges = {
                userId: currentUser.uid,
                unlockedBadges: unlockedBadges.map(badge => ({
                    ...badge,
                    unlockedAt: badge.unlockedAt || new Date().toISOString(),
                })),
                achievements: [],
                lastUpdated: new Date().toISOString(),
            }

            // Update Firestore
            const updatedData = await updateMockStreakData(currentUser.uid, workoutDate)

            // Update local state
            setStreakData({
                dates: updatedData.dates,
                streak: updatedData.streak,
                lastDate: updatedData.lastWorkoutDate,
                badges: updatedData.badges,
                highestStreak: updatedData.streak || 0,
            })

            // Show milestone notification if applicable
            const milestone = StreakService.getStreakMilestone(newStreak)

            if (milestone) {
                showNotification({
                    message: StreakService.getStreakMessage(newStreak),
                    severity: 'success',
                    autoHideDuration: 6000,
                })
            }
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to update streak')

            setError(error)
            showNotification({
                message: error.message,
                severity: 'error',
            })
            throw error
        }
    }, [currentUser?.uid, streakData, showNotification, handleBadgeNotifications])

    // Reset streak
    const resetStreak = useCallback(async () => {
        if (!currentUser?.uid) {
            throw new Error('User must be authenticated to reset streak')
        }

        try {
            setError(null)
            await firestoreService.resetUserStreak(currentUser.uid)

            setStreakData(prev => ({
                ...INITIAL_STREAK_DATA,
                badges: prev.badges, // Keep badges on reset
                highestStreak: prev.highestStreak, // Keep highest streak record
            }))

            showNotification({
                message: 'Streak reset. Start fresh tomorrow! 💪',
                severity: 'info',
                autoHideDuration: 4000,
            })
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to reset streak')

            setError(error)
            showNotification({
                message: error.message,
                severity: 'error',
            })
            throw error
        }
    }, [currentUser?.uid, showNotification])

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