import { cleanData } from '@/utils/dataUtils'
import { ProfileFormData, UpdateProfileData } from '../types/ProfileTypes'

export const FITNESS_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const
export const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'] as const

export const cleanFormData = (formData: ProfileFormData): UpdateProfileData => {
    const cleaned = cleanData(formData, {
        removeEmpty: true,
        convertNumbers: true,
        dateFields: ['birthDate']
    })

    return {
        ...cleaned,
        updatedAt: new Date().toISOString()
    } as UpdateProfileData
}