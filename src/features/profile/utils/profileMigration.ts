import { db } from '@/config/firebase'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import {
    BaseProfile,
    FitnessDetails,
    FitnessGoals,
    FitnessLevel,
    Gender,
    UserProfile as NewUserProfile,
    ProfileMetrics,
    TimestampFields
} from '../types/ProfileTypes'

interface OldUserProfile {
    firstName?: string
    lastName?: string
    displayName: string
    bio?: string
    height?: number
    weight?: number
    targetWeight?: number
    fitnessLevel?: string
    fitnessGoals?: string[]
    gender?: string
    email: string
    photoURL?: string
    avatarUpdatedAt?: string
    birthDate?: string
    id: string
    createdAt: Date
    updatedAt: Date
}

const migrateUserProfile = (oldProfile: OldUserProfile): NewUserProfile => {
    const baseInfo: BaseProfile = {
        firstName: oldProfile.firstName,
        lastName: oldProfile.lastName,
        displayName: oldProfile.displayName,
        bio: oldProfile.bio,
        email: oldProfile.email,
        photoURL: oldProfile.photoURL,
        gender: oldProfile.gender as Gender
    }

    const profileMetrics: ProfileMetrics = {
        height: oldProfile.height,
        weight: oldProfile.weight,
        targetWeight: oldProfile.targetWeight
    }

    const fitnessDetails: FitnessDetails = {
        fitnessLevel: oldProfile.fitnessLevel as FitnessLevel,
        fitnessGoals: oldProfile.fitnessGoals?.map(goal => {
            // Map old goals to new enum values
            switch (goal.toLowerCase()) {
                case 'weight loss': return FitnessGoals.WEIGHT_LOSS
                case 'muscle gain': return FitnessGoals.MUSCLE_GAIN
                case 'strength training': return FitnessGoals.STRENGTH_TRAINING
                case 'endurance': return FitnessGoals.ENDURANCE
                case 'flexibility': return FitnessGoals.FLEXIBILITY
                case 'general fitness': return FitnessGoals.GENERAL_FITNESS
                case 'sports performance': return FitnessGoals.SPORTS_PERFORMANCE
                default: return FitnessGoals.GENERAL_FITNESS
            }
        }) || []
    }

    const timestampFields: TimestampFields = {
        createdAt: oldProfile.createdAt,
        updatedAt: oldProfile.updatedAt,
        avatarUpdatedAt: oldProfile.avatarUpdatedAt ? new Date(oldProfile.avatarUpdatedAt) : undefined
    }

    return {
        id: oldProfile.id,
        baseInfo,
        profileMetrics,
        fitnessDetails,
        timestampFields
    }
}

const flattenProfile = (profile: NewUserProfile) => {
    const flattenedData: Record<string, any> = {}

    // Helper function to add non-undefined and non-null values
    const addIfValid = (key: string, value: any) => {
        if (value !== undefined && value !== null) {
            flattenedData[key] = value
        }
    }

    if (profile.baseInfo) {
        addIfValid('baseInfo.firstName', profile.baseInfo.firstName)
        addIfValid('baseInfo.lastName', profile.baseInfo.lastName)
        addIfValid('baseInfo.displayName', profile.baseInfo.displayName)
        addIfValid('baseInfo.bio', profile.baseInfo.bio)
        addIfValid('baseInfo.email', profile.baseInfo.email)
        addIfValid('baseInfo.photoURL', profile.baseInfo.photoURL)
        addIfValid('baseInfo.gender', profile.baseInfo.gender)
    }

    // Profile Metrics
    if (profile.profileMetrics) {
        addIfValid('profileMetrics.height', profile.profileMetrics.height)
        addIfValid('profileMetrics.weight', profile.profileMetrics.weight)
        addIfValid('profileMetrics.targetWeight', profile.profileMetrics.targetWeight)
        addIfValid('profileMetrics.age', profile.profileMetrics.age)
    }

    // Fitness Details
    if (profile.fitnessDetails) {
        addIfValid('fitnessDetails.fitnessLevel', profile.fitnessDetails.fitnessLevel)
        // Only add fitnessGoals if it's a non-empty array
        if (profile.fitnessDetails.fitnessGoals?.length > 0) {
            flattenedData['fitnessDetails.fitnessGoals'] = profile.fitnessDetails.fitnessGoals
        }
    }

    // Timestamp Fields
    if (profile.timestampFields) {
        if (profile.timestampFields.createdAt instanceof Date) {
            flattenedData['timestampFields.createdAt'] = profile.timestampFields.createdAt
        }

        if (profile.timestampFields.updatedAt instanceof Date) {
            flattenedData['timestampFields.updatedAt'] = profile.timestampFields.updatedAt
        }

        if (profile.timestampFields.avatarUpdatedAt instanceof Date) {
            flattenedData['timestampFields.avatarUpdatedAt'] = profile.timestampFields.avatarUpdatedAt
        }
    }

    // Only add ID if it exists and is not empty
    if (profile.id && typeof profile.id === 'string' && profile.id.trim() !== '') {
        flattenedData['id'] = profile.id
    }

    return flattenedData
}

export const migrateAllProfiles = async (): Promise<void> => {
    try {
        const usersRef = collection(db, 'users')
        const snapshot = await getDocs(usersRef)

        const migrationPromises = snapshot.docs.map(async (userDoc) => {
            try {
                const oldProfile = userDoc.data() as OldUserProfile
                const newProfile = migrateUserProfile(oldProfile)
                const flattenedProfile = flattenProfile(newProfile)

                if (Object.keys(flattenedProfile).length > 0) {
                    await updateDoc(doc(db, 'users', userDoc.id), flattenedProfile)
                } else {
                    console.warn(`Skipping update for user ${userDoc.id} - No valid data to update`)
                }
            } catch (error) {
                console.error(`Error processing user ${userDoc.id}:`, error)
                throw error
            }
        })

        await Promise.all(migrationPromises)
        console.log('Migration completed successfully')
    } catch (error) {
        console.error('Migration failed:', error)
        throw error
    }
} 