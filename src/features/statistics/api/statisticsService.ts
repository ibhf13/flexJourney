import { db } from '@/config/firebase/firebase'
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from 'firebase/firestore'
import { ExerciseProgress, UserStats, WorkoutStat } from '../types/StatisticsTypes'

export const statisticsService = {
    async initializeUserStats(userId: string): Promise<UserStats> {
        const initialWorkoutStats: WorkoutStat = {
            totalWorkouts: 0,
            completedWorkouts: 0,
            currentStreak: 0,
            longestStreak: 0,
            totalSets: 0,
            totalReps: 0,
            totalWeight: 0,
            weeklyAverage: 0,
            monthlyAverage: 0,
            completionRate: 0,
            lastWorkoutDate: null,
            startDate: new Date().toISOString(),
            favoriteExercises: [],
            workoutsByMonth: [],
            updatedAt: new Date().toISOString()
        }

        const newStats: UserStats = {
            id: userId, // Use userId as the document ID
            userId,
            workoutStats: initialWorkoutStats,
            exerciseProgress: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        try {
            const userStatsRef = doc(db, 'userStats', userId)

            await setDoc(userStatsRef, {
                ...newStats,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })

            return newStats
        } catch (error) {
            console.error('Error initializing user stats:', error)
            throw error
        }
    },

    async getUserStats(userId: string): Promise<UserStats | null> {
        try {
            const userStatsRef = doc(db, 'userStats', userId)
            const userStatsDoc = await getDoc(userStatsRef)

            if (!userStatsDoc.exists()) {
                return this.initializeUserStats(userId)
            }

            return {
                ...userStatsDoc.data(),
                id: userStatsDoc.id
            } as UserStats
        } catch (error) {
            console.error('Error fetching user stats:', error)
            throw error
        }
    },

    async updateWorkoutStats(
        userId: string,
        updateData: Partial<WorkoutStat>
    ): Promise<void> {
        try {
            const userStatsRef = doc(db, 'userStats', userId)

            await updateDoc(userStatsRef, {
                'workoutStats': updateData,
                'updatedAt': serverTimestamp()
            })
        } catch (error) {
            console.error('Error updating workout stats:', error)
            throw error
        }
    },

    async updateExerciseProgress(
        userId: string,
        exerciseId: string,
        weight: number,
        reps: number
    ): Promise<void> {
        try {
            const userStatsRef = doc(db, 'userStats', userId)
            const userStatsDoc = await getDoc(userStatsRef)

            if (!userStatsDoc.exists()) {
                await this.initializeUserStats(userId)
                // Fetch the newly created document
                const newStatsDoc = await getDoc(userStatsRef)

                if (!newStatsDoc.exists()) {
                    throw new Error('Failed to initialize user stats')
                }
            }

            const currentStats = userStatsDoc.data() as UserStats
            const exerciseProgress = currentStats.exerciseProgress || []

            const exerciseIndex = exerciseProgress.findIndex(
                p => p.exerciseId === exerciseId
            )

            const newProgressEntry = {
                date: new Date().toISOString(),
                weight,
                reps
            }

            const updatedProgress = [...exerciseProgress]

            if (exerciseIndex === -1) {
                // New exercise
                const newExerciseProgress: ExerciseProgress = {
                    exerciseId,
                    name: '', // You'll need to fetch this from your exercises data
                    personalBest: {
                        weight,
                        reps,
                        date: new Date().toISOString()
                    },
                    history: [newProgressEntry],
                    updatedAt: new Date().toISOString()
                }

                updatedProgress.push(newExerciseProgress)
            } else {
                // Existing exercise
                const currentProgress = { ...updatedProgress[exerciseIndex] }

                currentProgress.history = [...currentProgress.history, newProgressEntry]

                // Update personal best if applicable
                if (weight > currentProgress.personalBest.weight ||
                    (weight === currentProgress.personalBest.weight &&
                        reps > currentProgress.personalBest.reps)) {
                    currentProgress.personalBest = {
                        weight,
                        reps,
                        date: new Date().toISOString()
                    }
                }

                currentProgress.updatedAt = new Date().toISOString()
                updatedProgress[exerciseIndex] = currentProgress
            }

            await updateDoc(userStatsRef, {
                exerciseProgress: updatedProgress,
                updatedAt: serverTimestamp()
            })
        } catch (error) {
            console.error('Error updating exercise progress:', error)
            throw error
        }
    },

    async calculateAndUpdateStreak(userId: string): Promise<number> {
        try {
            const userStatsRef = doc(db, 'userStats', userId)
            const userStatsDoc = await getDoc(userStatsRef)

            if (!userStatsDoc.exists()) {
                await this.initializeUserStats(userId)

                return 0
            }

            const currentStats = userStatsDoc.data() as UserStats
            const today = new Date()
            const lastWorkoutDate = currentStats.workoutStats.lastWorkoutDate
                ? new Date(currentStats.workoutStats.lastWorkoutDate)
                : null

            let newStreak = currentStats.workoutStats.currentStreak

            if (!lastWorkoutDate) {
                newStreak = 1
            } else {
                const diffDays = Math.floor(
                    (today.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24)
                )

                if (diffDays <= 1) {
                    newStreak += 1
                } else {
                    newStreak = 1
                }
            }

            const newLongestStreak = Math.max(
                newStreak,
                currentStats.workoutStats.longestStreak || 0
            )

            const updatedWorkoutStats = {
                ...currentStats.workoutStats,
                currentStreak: newStreak,
                longestStreak: newLongestStreak,
                lastWorkoutDate: today.toISOString()
            }

            await updateDoc(userStatsRef, {
                workoutStats: updatedWorkoutStats,
                updatedAt: serverTimestamp()
            })

            return newStreak
        } catch (error) {
            console.error('Error calculating streak:', error)
            throw error
        }
    }
}