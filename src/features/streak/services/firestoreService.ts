import { db } from '@/config/firebase/firebase'
import { COLLECTIONS } from '@/config/firebase/types/firestore'
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    Timestamp,
    updateDoc
} from 'firebase/firestore'
import { UserBadges } from '../types/streakTypes'

const STATISTICS_COLLECTION = COLLECTIONS.statistics

export const firestoreService = {
    async getUserStreakData(userId: string) {
        try {
            const userStatsRef = doc(db, STATISTICS_COLLECTION, userId)
            const userStatsDoc = await getDoc(userStatsRef)

            if (!userStatsDoc.exists()) {
                // If no data exists, initialize the user stats
                return await this.initializeUserStats(userId)
            }

            const data = userStatsDoc.data()

            return undefined
        } catch (error) {
            console.error('Error fetching user streak data:', error)
            throw error
        }
    },

    async updateUserStreakData(
        userId: string,
        streak: number,
        dates: string[],
        lastWorkoutDate: string | null,
        badges: UserBadges | null
    ) {
        try {
            const userStatsRef = doc(db, STATISTICS_COLLECTION, userId)

            const data = {
                userId,
                streak,
                dates,
                lastWorkoutDate: lastWorkoutDate ? Timestamp.fromDate(new Date(lastWorkoutDate)) : null,
                badges,
                lastUpdated: serverTimestamp(),
            }

            await setDoc(userStatsRef, data, { merge: true })

            return data
        } catch (error) {
            console.error('Error updating user streak data:', error)
            throw error
        }
    },

    async initializeUserStats(userId: string) {

        try {
            const userStatsRef = doc(db, STATISTICS_COLLECTION, userId)
            const userStatsDoc = await getDoc(userStatsRef)

            if (!userStatsDoc.exists()) {
                const initialData = {
                    userId,
                    streak: 12,
                    dates: [],
                    lastWorkoutDate: null,
                    badges: {
                        userId,
                        unlockedBadges: [],
                        achievements: [],
                        lastUpdated: serverTimestamp(),
                    },
                    createdAt: serverTimestamp(),
                    lastUpdated: serverTimestamp(),
                }

                await setDoc(userStatsRef, initialData)

                return initialData
            }

            return userStatsDoc.data()
        } catch (error) {
            console.error('Error initializing user stats:', error)
            throw error
        }
    },

    async resetUserStreak(userId: string) {
        try {
            const userStatsRef = doc(db, STATISTICS_COLLECTION, userId)
            const userStatsDoc = await getDoc(userStatsRef)

            if (userStatsDoc.exists()) {
                const currentBadges = userStatsDoc.data().badges

                await updateDoc(userStatsRef, {
                    streak: 0,
                    dates: [],
                    lastWorkoutDate: null,
                    badges: currentBadges, // Preserve badges
                    lastUpdated: serverTimestamp(),
                })
            }
        } catch (error) {
            console.error('Error resetting user streak:', error)
            throw error
        }
    },
}