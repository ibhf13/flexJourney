import { FitnessLevels, Genders, UserProfile } from '../types/ProfileTypes'

export const DEFAULT_FORM_VALUES: Partial<UserProfile> = {
    baseInfo: {
        firstName: '',
        lastName: '',
        displayName: '',
        bio: '',
        photoURL: '',
        gender: Genders.MALE,
    },
    timestampFields: {
        updatedAt: new Date(),
        avatarUpdatedAt: new Date(),
    },
    profileMetrics: {
        height: 0,
        weight: 0,
        targetWeight: 0,
        age: 0,
    },
    fitnessDetails: {
        fitnessLevel: FitnessLevels.BEGINNER,
        fitnessGoals: [],
    },

}


