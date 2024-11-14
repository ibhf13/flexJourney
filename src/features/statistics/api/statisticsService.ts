import { createDocument, getDocument, updateDocument } from '@/config/firebase/operations/database'
import { COLLECTIONS } from '@/config/firebase/types/collections'
import { handleFirebaseError } from '@/config/firebase/utils/errors'
import { getUserCollection } from '@/config/firebase/utils/helpers'
import { ExerciseProgress, UserStats, WorkoutStat } from '../types/StatisticsTypes'

const STATISTICS_DOCUMENT = COLLECTIONS.USERS.SUB_COLLECTIONS.STATS

export const statisticsService = {
    async initializeUserStats(userId: string): Promise<UserStats> {
        try {
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

            const newStats: Omit<UserStats, 'id'> = {
                userId,
                workoutStats: initialWorkoutStats,
                exerciseProgress: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            const collectionRef = getUserCollection(userId, 'STATS')

            return await createDocument<UserStats>(collectionRef, newStats, userId)
        } catch (error) {
            throw handleFirebaseError(error)
        }
    },

    async getUserStats(userId: string): Promise<UserStats | null> {
        try {
            const statsRef = getUserCollection(userId, 'STATS')
            const stats = await getDocument<UserStats>(statsRef, userId)

            if (!stats) {
                return this.initializeUserStats(userId)
            }

            return stats
        } catch (error) {
            throw handleFirebaseError(error)
        }
    },

    async updateWorkoutStats(userId: string, updateData: Partial<WorkoutStat>): Promise<void> {
        const statsRef = getUserCollection(userId, 'STATS')

        try {
            await updateDocument(
                statsRef,
                userId,
                {
                    workoutStats: updateData,
                    updatedAt: new Date().toISOString()
                }
            )
        } catch (error) {
            throw handleFirebaseError(error)
        }
    },

    async updateExerciseProgress(
        userId: string,
        exerciseId: string,
        weight: number,
        reps: number
    ): Promise<void> {
        try {
            const stats = await this.getUserStats(userId)

            if (!stats) {
                throw new Error('User stats not found')
            }

            const exerciseProgress = stats.exerciseProgress || []
            const exerciseIndex = exerciseProgress.findIndex(p => p.exerciseId === exerciseId)
            const newProgressEntry = {
                date: new Date().toISOString(),
                weight,
                reps
            }

            const updatedProgress = [...exerciseProgress]

            if (exerciseIndex === -1) {
                const newExerciseProgress: ExerciseProgress = {
                    exerciseId,
                    name: '',
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
                const currentProgress = { ...updatedProgress[exerciseIndex] }

                currentProgress.history = [...currentProgress.history, newProgressEntry]

                if (weight > currentProgress.personalBest.weight ||
                    (weight === currentProgress.personalBest.weight && reps > currentProgress.personalBest.reps)) {
                    currentProgress.personalBest = {
                        weight,
                        reps,
                        date: new Date().toISOString()
                    }
                }

                currentProgress.updatedAt = new Date().toISOString()
                updatedProgress[exerciseIndex] = currentProgress
            }

            await updateDocument(
                getUserCollection(userId, 'STATS'),
                userId,
                {
                    exerciseProgress: updatedProgress,
                    updatedAt: new Date().toISOString()
                }
            )
        } catch (error) {
            throw handleFirebaseError(error)
        }
    },

    async calculateAndUpdateStreak(userId: string): Promise<number> {
        try {
            const stats = await this.getUserStats(userId)

            if (!stats) {
                throw new Error('User stats not found')
            }

            const { workoutStats } = stats
            const today = new Date()
            const lastWorkoutDate = workoutStats.lastWorkoutDate
                ? new Date(workoutStats.lastWorkoutDate)
                : null

            let newStreak = workoutStats.currentStreak

            // If this is the first workout
            if (!lastWorkoutDate) {
                newStreak = 1
            } else {
                const diffInDays = Math.floor(
                    (today.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24)
                )

                if (diffInDays === 1) {
                    // Consecutive day workout
                    newStreak += 1
                } else if (diffInDays === 0) {
                    // Same day workout, maintain streak
                    newStreak = workoutStats.currentStreak
                } else {
                    // Streak broken
                    newStreak = 1
                }
            }

            const updateData: Partial<WorkoutStat> = {
                currentStreak: newStreak,
                lastWorkoutDate: today.toISOString(),
                longestStreak: Math.max(newStreak, workoutStats.longestStreak),
                updatedAt: new Date().toISOString()
            }

            await this.updateWorkoutStats(userId, updateData)

            return newStreak
        } catch (error) {
            throw handleFirebaseError(error)
        }
    }
}