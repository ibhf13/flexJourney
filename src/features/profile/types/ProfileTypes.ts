export enum FitnessLevels {
    BEGINNER = 'Beginner',
    INTERMEDIATE = 'Intermediate',
    ADVANCED = 'Advanced'
}

export enum Genders {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other'
}

export enum FitnessGoals {
    WEIGHT_LOSS = 'Weight Loss',
    MUSCLE_GAIN = 'Muscle Gain',
    STRENGTH_TRAINING = 'Strength Training',
    ENDURANCE = 'Endurance',
    FLEXIBILITY = 'Flexibility',
    GENERAL_FITNESS = 'General Fitness',
    SPORTS_PERFORMANCE = 'Sports Performance',
}

export interface WeightGoalInfo {
    type: 'gain' | 'loss'
    currentWeight: number
    idealWeight: number
    remainingWeight: number
}

export type FitnessGoal = `${FitnessGoals}`
export type FitnessLevel = `${FitnessLevels}`
export type Gender = `${Genders}`


export interface ProfileMetrics {
    height?: number
    weight?: number
    targetWeight?: number
    age?: number
}

export interface FitnessDetails {
    fitnessLevel: FitnessLevel
    fitnessGoals: FitnessGoal[]
}

export interface TimestampFields {
    updatedAt: Date
    createdAt?: Date
    avatarUpdatedAt?: Date
}
export interface BaseProfile {
    firstName?: string
    lastName?: string
    displayName: string
    bio?: string
    email?: string
    photoURL?: string
    gender?: Gender
}

export interface UserProfile {
    id: string
    baseInfo: BaseProfile
    profileMetrics?: ProfileMetrics
    fitnessDetails?: FitnessDetails
    timestampFields?: TimestampFields
}

export interface PasswordFormData {
    currentPassword?: string
    newPassword: string
    confirmPassword: string
}