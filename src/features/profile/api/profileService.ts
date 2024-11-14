import { createDocument, getDocument, updateDocument } from '@/config/firebase/operations'
import { getUserCollection } from '@/config/firebase/utils/helpers'
import { dateToTimestamp } from '@/config/firebase/utils/transforms'
import { UpdateProfileData, UserProfile } from '../types/ProfileTypes'


export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    if (!userId?.trim()) {
        throw new Error('Invalid user ID provided')
    }

    const userProfileCollectionRef = getUserCollection(userId, 'PROFILE')

    return await getDocument<UserProfile>(userProfileCollectionRef, userId)
}

export const updateUserProfile = async (userId: string, data: UpdateProfileData): Promise<void> => {
    if (!userId?.trim()) {
        throw new Error('Invalid user ID provided')
    }

    if (!data || Object.keys(data).length === 0) {
        throw new Error('No update data provided')
    }

    const timestamp = new Date()
    const userRef = getUserCollection(userId, 'PROFILE')
    const existingProfile = await getDocument<UserProfile>(userRef, userId)

    if (existingProfile) {
        const updateData = {
            ...data,
            updatedAt: dateToTimestamp(timestamp),
            photoURL: data.photoURL || existingProfile.photoURL,
        }

        await updateDocument<UserProfile>(userRef, userId, updateData)
    } else {
        const newUserData: Omit<UserProfile, 'id'> = {
            email: data.email || '',
            displayName: data.displayName || 'Anonymous User',
            ...data,
            createdAt: dateToTimestamp(timestamp),
            updatedAt: dateToTimestamp(timestamp),
        }

        await createDocument<UserProfile>(userRef, newUserData, userId)
    }
}