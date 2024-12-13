export type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type Gender = 'Male' | 'Female' | 'Other'

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

export interface UserProfile extends BaseProfileData {
    email: string
    photoURL?: string
    avatarUpdatedAt?: string
    birthDate?: string
    id: string
    createdAt: Date
    updatedAt: Date
    fitnessGoals: string[]
}

export interface ProfileFormData extends BaseProfileData {
    birthDate?: Date
    avatar?: File
}

export type UpdateProfileData = Partial<BaseProfileData> & {
    birthDate?: string
    photoURL?: string
    updatedAt: string
    avatarUpdatedAt?: string
    email?: string
}