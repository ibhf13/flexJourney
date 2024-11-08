import { db } from '@/config/firebase/firebase'
import { COLLECTIONS } from '@/config/firebase/types/firestore'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { UpdateProfileData, UserProfile } from '../types/ProfileTypes'

export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    try {
        const userRef = doc(db, COLLECTIONS.users, userId)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
            throw new Error('User profile not found')
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

        if (docSnap.exists()) {
            // Update existing document
            const updateData = {
                ...data,
                updatedAt: timestamp,
            }

            await updateDoc(userRef, updateData)
        } else {
            // Create new document with required fields
            const newUserData = {
                id: userId,
                email: '', // Will be updated by auth listener
                displayName: '', // Will be updated by auth listener
                ...data,
                createdAt: timestamp,
                updatedAt: timestamp,
            }

            await setDoc(userRef, newUserData)
        }
    } catch (error) {
        console.error('Error updating user profile:', error)
        throw error
    }
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
        const userRef = doc(db, COLLECTIONS.users, userId)
        const docSnap = await getDoc(userRef)

        if (docSnap.exists()) {
            return docSnap.data() as UserProfile
        }

        return null
    } catch (error) {
        console.error('Error fetching user profile:', error)
        throw error
    }
}