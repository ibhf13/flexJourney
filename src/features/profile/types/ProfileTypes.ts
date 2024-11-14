import { FirebaseDocument } from '@/config/firebase/types/firebaseTypes'
import { Timestamp } from 'firebase/firestore'

export type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say'

export interface BaseProfileData {
    firstName?: string
    lastName?: string
    displayName: string
    bio?: string
    height?: number
    weight?: number
    targetWeight?: number
    fitnessLevel?: FitnessLevel
    fitnessGoals?: string[]
    gender?: Gender
    phoneNumber?: string
}

export interface UserProfile extends BaseProfileData, FirebaseDocument<BaseProfileData> {
    email: string
    photoURL?: string
    avatarUpdatedAt?: string
    birthDate?: string
}

export interface ProfileFormData extends BaseProfileData {
    birthDate?: Date
    avatar?: File
}

export type UpdateProfileData = Partial<BaseProfileData> & {
    birthDate?: string
    photoURL?: string
    updatedAt: Timestamp
    avatarUpdatedAt?: string
    email?: string
}