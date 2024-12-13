import * as yup from 'yup'
import { ProfileFormData } from '../types/ProfileTypes'

export const profileSchema = yup.object().shape({
    firstName: yup.string().trim().nullable(),
    lastName: yup.string().trim().nullable(),
    displayName: yup.string().required('Display name is required').trim(),
    bio: yup.string().trim().nullable(),
    height: yup.number().transform((value) =>
        isNaN(value) || value === 0 ? undefined : value
    ).nullable(),
    weight: yup.number().transform((value) =>
        isNaN(value) || value === 0 ? undefined : value
    ).nullable(),
    fitnessLevel: yup.string().oneOf(['Beginner', 'Intermediate', 'Advanced']).nullable(),
    gender: yup.string().oneOf(['Male', 'Female', 'Other', 'Prefer not to say']).nullable(),
    birthDate: yup.date().nullable().transform((curr, orig) => orig === '' ? null : curr),
    phoneNumber: yup.string().trim().nullable(),
    fitnessGoals: yup.string().nullable(),
}) as yup.ObjectSchema<ProfileFormData>