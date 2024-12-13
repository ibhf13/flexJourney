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

export const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
    }
    return age
}

export const calculateBMI = (weight?: number, height?: number): number | null => {
    if (!weight || !height || height === 0) return null
    const heightInMeters = height / 100
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1))
}

export const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight'
    if (bmi < 25) return 'Normal weight'
    if (bmi < 30) return 'Overweight'
    return 'Obese'
}

export const getBMIColor = (bmi: number): string => {
    if (bmi < 18.5) return '#2196F3'
    if (bmi < 25) return '#4CAF50'
    if (bmi < 30) return '#FF9800'
    return '#F44336'
}