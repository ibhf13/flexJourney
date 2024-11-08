import * as yup from 'yup'
import { ProfileFormData } from '../types/ProfileTypes'

export const profileSchema = yup.object().shape({
    firstName: yup.string().trim(),
    lastName: yup.string().trim(),
    displayName: yup.string().required('Display name is required').trim(),
    bio: yup.string().trim(),
    height: yup.number().positive().nullable(),
    weight: yup.number().positive().nullable(),
    fitnessLevel: yup.string().oneOf(['Beginner', 'Intermediate', 'Advanced']),
    gender: yup.string().oneOf(['Male', 'Female', 'Other', 'Prefer not to say']).required(),
    birthDate: yup.date().nullable(),
    phoneNumber: yup.string().trim(),
    fitnessGoals: yup.array().of(yup.string()),
}) as yup.ObjectSchema<ProfileFormData>
