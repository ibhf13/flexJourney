import { db } from '@/config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { UserProfile } from '../types/ProfileTypes'

export const createInitialProfile = async (
    uid: string,
    email: string | null,
    displayName: string | null
): Promise<void> => {
    const initialProfile: UserProfile = {
        id: uid,
        email: email || '',
        displayName: displayName || 'New User',
        weightUnit: 'kg',
        experienceLevel: 'beginner',
        joinedDate: new Date().toISOString(),
        preferredWorkoutDays: ['Monday', 'Wednesday', 'Friday'],
        fitnessGoals: ['General Fitness'],
        bio: 'Hey there! Im new to fitness journey.',
        height: null,
        weight: null,
        photoURL: null
    }

    const userRef = doc(db, 'users', uid)

    await setDoc(userRef, initialProfile)
}