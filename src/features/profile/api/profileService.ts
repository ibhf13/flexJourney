import { db } from '@/config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { ProfileStats, UserProfile } from '../types/ProfileTypes'

export const initializeUserProfile = async (userId: string, email: string, displayName: string) => {
    const initialProfile: UserProfile = {
        id: userId,
        email,
        displayName: displayName || email.split('@')[0],
        weightUnit: 'kg',
        experienceLevel: 'beginner',
        fitnessGoals: [],
        joinedDate: serverTimestamp(),
    }

    const initialStats: ProfileStats = {
        totalWorkouts: 0,
        totalExercises: 0,
        streakDays: 0,
        weightProgress: []
    }

    try {
        await Promise.all([
            setDoc(doc(db, 'users', userId), initialProfile),
            setDoc(doc(db, 'userStats', userId), initialStats)
        ])
    } catch (error) {
        console.error('Error initializing user profile:', error)
        throw error
    }
}