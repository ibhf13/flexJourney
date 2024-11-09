import { db } from '@/config/firebase/firebase'
import { COLLECTIONS } from '@/config/firebase/types/firestore'
import { cleanData } from '@/utils/dataUtils'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { UpdateProfileData, UserProfile } from '../types/ProfileTypes'

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
        const userRef = doc(db, COLLECTIONS.users, userId)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
            return null
        }

        return userSnap.data() as UserProfile
    } catch (error) {
        console.error('Error fetching user profile:', error)
        throw error
    }
}

export const updateUserProfile = async (userId: string, data: UpdateProfileData): Promise<void> => {
    try {
        const userRef = doc(db, COLLECTIONS.users, userId)
        const docSnap = await getDoc(userRef)
        const timestamp = new Date().toISOString()

        // Clean the data using the new utility
        const cleanedData = cleanData(data)

        if (docSnap.exists()) {
            // Preserve existing data that's not being updated
            const existingData = docSnap.data()
            const updateData = {
                ...existingData, // Keep existing data
                ...cleanedData,  // Override with new data
                updatedAt: timestamp,
                photoURL: cleanedData.photoURL || existingData.photoURL,
            }

            await updateDoc(userRef, updateData)
        } else {
            const newUserData: UserProfile = {
                id: userId,
                email: data.email || '',
                displayName: data.displayName || 'Anonymous User',
                ...cleanedData,
                createdAt: timestamp,
                updatedAt: timestamp,
            }

            await setDoc(userRef, cleanData(newUserData))
        }
    } catch (error) {
        console.error('Error updating user profile:', error)
        throw error
    }
}