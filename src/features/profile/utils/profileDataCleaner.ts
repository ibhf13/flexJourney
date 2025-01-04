import { BaseProfile, FitnessDetails, ProfileMetrics, UserProfile } from '../types/ProfileTypes'

interface ProfileCleaningOptions {
    removeEmpty: boolean
    convertMetrics: boolean
}

const DEFAULT_OPTIONS: ProfileCleaningOptions = {
    removeEmpty: true,
    convertMetrics: true,
}

const cleanBaseInfo = (baseInfo: Partial<BaseProfile>): Partial<BaseProfile> => {
    const cleaned: Partial<BaseProfile> = {}

    if (baseInfo.displayName?.trim()) {
        cleaned.displayName = baseInfo.displayName.trim()
    }

    if (baseInfo.email?.trim()) {
        cleaned.email = baseInfo.email.trim()
    }

    if (baseInfo.firstName?.trim()) {
        cleaned.firstName = baseInfo.firstName.trim()
    }

    if (baseInfo.lastName?.trim()) {
        cleaned.lastName = baseInfo.lastName.trim()
    }

    if (baseInfo.bio?.trim()) {
        cleaned.bio = baseInfo.bio.trim()
    }

    if (baseInfo.photoURL?.trim()) {
        cleaned.photoURL = baseInfo.photoURL.trim()
    }

    if (baseInfo.gender) {
        cleaned.gender = baseInfo.gender
    }

    return cleaned
}

const cleanMetrics = (metrics: Partial<ProfileMetrics>): Partial<ProfileMetrics> => {
    const cleaned: Partial<ProfileMetrics> = {}

    if (metrics.height) {
        const height = Number(metrics.height)

        if (!isNaN(height) && height > 0) {
            cleaned.height = height
        }
    }

    if (metrics.weight) {
        const weight = Number(metrics.weight)

        if (!isNaN(weight) && weight > 0) {
            cleaned.weight = weight
        }
    }

    if (metrics.targetWeight) {
        const targetWeight = Number(metrics.targetWeight)

        if (!isNaN(targetWeight) && targetWeight > 0) {
            cleaned.targetWeight = targetWeight
        }
    }

    if (metrics.age) {
        cleaned.age = metrics.age
    }

    return cleaned
}

const cleanFitnessDetails = (details: Partial<FitnessDetails>): Partial<FitnessDetails> => {
    const cleaned: Partial<FitnessDetails> = {}

    if (details.fitnessLevel) {
        cleaned.fitnessLevel = details.fitnessLevel
    }

    if (Array.isArray(details.fitnessGoals) && details.fitnessGoals.length > 0) {
        cleaned.fitnessGoals = [...details.fitnessGoals]
    }

    return cleaned
}

export const cleanProfileData = (
    profile: Partial<UserProfile>,
    options: Partial<ProfileCleaningOptions> = {}
): Partial<UserProfile> => {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options }
    const cleaned: Partial<UserProfile> = {}

    if (profile.id) {
        cleaned.id = profile.id
    }

    if (profile.baseInfo) {
        const cleanedBaseInfo = cleanBaseInfo(profile.baseInfo)

        if (Object.keys(cleanedBaseInfo).length > 0) {
            cleaned.baseInfo = cleanedBaseInfo as BaseProfile
        }
    }

    if (profile.profileMetrics && mergedOptions.convertMetrics) {
        const cleanedMetrics = cleanMetrics(profile.profileMetrics)

        if (Object.keys(cleanedMetrics).length > 0) {
            cleaned.profileMetrics = cleanedMetrics
        }
    }

    if (profile.fitnessDetails) {
        const cleanedFitness = cleanFitnessDetails(profile.fitnessDetails)

        if (Object.keys(cleanedFitness).length > 0) {
            cleaned.fitnessDetails = cleanedFitness as FitnessDetails
        }
    }

    if (profile.timestampFields) {
        cleaned.timestampFields = profile.timestampFields
    }

    return cleaned
} 