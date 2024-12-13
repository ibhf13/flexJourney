import { FitnessLevel, Gender, ProfileFormData } from '../types/ProfileTypes'

export const FITNESS_LEVELS: FitnessLevel[] = ['Beginner', 'Intermediate', 'Advanced']

export const GENDERS: Gender[] = ['Male', 'Female', 'Other']

export const FITNESS_GOALS = [
    'Weight Loss',
    'Muscle Gain',
    'Strength Training',
    'Endurance',
    'Flexibility',
    'General Fitness',
    'Sports Performance',
    'Body Recomposition'
] as const

export type FitnessGoal = typeof FITNESS_GOALS[number]

export const DEFAULT_FORM_VALUES: Partial<ProfileFormData> = {
    firstName: '',
    lastName: '',
    displayName: '',
    bio: '',
    height: undefined,
    weight: undefined,
    targetWeight: undefined,
    fitnessLevel: undefined,
    gender: undefined,
    birthDate: undefined,
    fitnessGoals: [],
}