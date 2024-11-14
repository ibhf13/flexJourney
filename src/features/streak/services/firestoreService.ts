import { createDocument, getDocument, updateDocument } from '@/config/firebase/operations/database'
import { COLLECTIONS } from '@/config/firebase/types/collections'
import { handleFirebaseError } from '@/config/firebase/utils/errors'
import { getUserCollection } from '@/config/firebase/utils/helpers'
import { dateToTimestamp } from '@/config/firebase/utils/transforms'
import { UserBadges, UserStats } from '../types/streakTypes'

const STATS_COLLECTION = COLLECTIONS.USERS.SUB_COLLECTIONS.STATS

export const firestoreService = {
    async getUserStreakData(userId: string): Promise<UserStats | null> {
        try {
            const statsRef = getUserCollection(userId, 'STATS')
            const stats = await getDocument<UserStats>(statsRef, userId)

            if (!stats) {
                return await this.initializeUserStats(userId)
            }

            return stats
        } catch (error) {
            throw handleFirebaseError(error)
        }
    },

    async updateUserStreakData(
        userId: string,
        streak: number,
        dates: string[],
        lastWorkoutDate: string | null,
        badges: UserBadges
    ): Promise<UserStats> {
        try {
            const data = {
                userId,
                streak,
                dates,
                lastWorkoutDate: lastWorkoutDate ? dateToTimestamp(new Date(lastWorkoutDate)) : null,
                badges,
                updatedAt: new Date()
            }

            await updateDocument(getUserCollection(userId, 'STATS'), userId, data)

            return data as UserStats
        } catch (error) {
            throw handleFirebaseError(error)
        }
    },

    async initializeUserStats(userId: string): Promise<UserStats> {
        try {
            const initialData = {
                userId,
                streak: 0,
                dates: [],
                lastWorkoutDate: null,
                badges: {
                    userId,
                    unlockedBadges: [],
                    achievements: [],
                },
                highestStreak: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            return await createDocument<UserStats>(
                { collection: STATS_COLLECTION },
                initialData,
                userId
            )
        } catch (error) {
            throw handleFirebaseError(error)
        }
    },

    async resetUserStreak(userId: string): Promise<void> {
        try {
            const currentStats = await this.getUserStreakData(userId)

            if (!currentStats) return

            await updateDocument(getUserCollection(userId, 'STATS'), userId, {
                streak: 0,
                dates: [],
                lastWorkoutDate: null,
                updatedAt: new Date()
            })
        } catch (error) {
            throw handleFirebaseError(error)
        }
    }
}