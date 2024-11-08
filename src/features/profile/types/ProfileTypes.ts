export interface UserProfile {
    id: string
    email: string
    displayName: string
    photoURL?: string
    avatarUpdatedAt?: string
    firstName?: string
    lastName?: string
    bio?: string
    height?: number
    weight?: number
    targetWeight?: number
    fitnessLevel?: 'Beginner' | 'Intermediate' | 'Advanced'
    fitnessGoals?: string[]
    birthDate?: string
    gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say'
    phoneNumber?: string
    createdAt?: string
    updatedAt?: string
}

export type UpdateProfileData = Partial<Omit<UserProfile, 'id' | 'email' | 'createdAt'>>

export interface ProfileFormData extends Omit<UpdateProfileData, 'photoURL' | 'birthDate'> {
    birthDate?: Date
    avatar?: File
}