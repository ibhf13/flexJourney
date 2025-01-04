import { COLLECTIONS } from '@/config/firebase/collections'
import { db } from '@/config/firebase/firebaseConfig'
import { doc, FirestoreError, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { FitnessLevels, UserProfile } from '../types/ProfileTypes'
import { cleanProfileData } from '../utils/profileDataCleaner'


export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    if (!userId?.trim()) {
        throw new Error('Invalid user ID provided')
    }

    try {
        const userRef = doc(db, COLLECTIONS.USERS.COLLECTION, userId)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
            return null
        }

        return userSnap.data() as UserProfile
    } catch (error) {
        const firestoreError = error as FirestoreError

        console.error(`Firestore error (${firestoreError.code}):`, firestoreError.message)
        throw new Error('Failed to fetch user profile. Please try again later.')
    }
}

export const updateUserProfile = async (userId: string, data: UserProfile): Promise<void> => {
    if (!userId?.trim()) {
        throw new Error('Invalid user ID provided')
    }

    if (!data || Object.keys(data).length === 0) {
        throw new Error('No update data provided')
    }

    try {
        const userRef = doc(db, COLLECTIONS.USERS.COLLECTION, userId)
        const docSnap = await getDoc(userRef)
        const timestamp = Timestamp.now()
        const cleanedData = cleanProfileData(data)

        if (docSnap.exists()) {
            const existingData = docSnap.data()
            const updateData = {
                ...existingData,
                ...cleanedData,
                updatedAt: timestamp,
                photoURL: cleanedData.baseInfo?.photoURL || existingData.baseInfo?.photoURL,
            }

            await updateDoc(userRef, updateData)
        } else {
            const newUserData: UserProfile = {
                id: userId,
                baseInfo: {
                    email: data.baseInfo.email || '',
                    displayName: data.baseInfo.displayName || 'Anonymous User',
                },
                profileMetrics: {
                    height: data.profileMetrics?.height || 0,
                    weight: data.profileMetrics?.weight || 0,
                    targetWeight: data.profileMetrics?.targetWeight || 0,
                    age: data.profileMetrics?.age || 0,
                },
                fitnessDetails: {
                    fitnessLevel: data.fitnessDetails?.fitnessLevel || FitnessLevels.BEGINNER,
                    fitnessGoals: data.fitnessDetails?.fitnessGoals || [],
                },
                timestampFields: {
                    updatedAt: timestamp.toDate(),
                },
            }
            const cleanedUserData = cleanProfileData(newUserData)

            await setDoc(userRef, cleanedUserData)
        }
    } catch (error) {
        const firestoreError = error as FirestoreError

        console.error(`Firestore error (${firestoreError.code}):`, firestoreError.message)
        throw new Error('Failed to update user profile. Please try again later.')
    }
}