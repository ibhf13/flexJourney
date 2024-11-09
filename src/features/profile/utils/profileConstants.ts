import { FitnessLevel, Gender } from '../types/ProfileTypes'

export const FITNESS_LEVELS: FitnessLevel[] = ['Beginner', 'Intermediate', 'Advanced']

export const GENDERS: Gender[] = ['Male', 'Female', 'Other', 'Prefer not to say']

export const DEFAULT_FORM_VALUES = {
    firstName: '',
    lastName: '',
    displayName: '',
    bio: '',
    height: undefined,
    weight: undefined,
    fitnessLevel: 'Beginner' as const,
    gender: 'Prefer not to say' as const,
    birthDate: undefined,
    phoneNumber: '',
    fitnessGoals: [],
}