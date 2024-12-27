import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import { z } from 'zod'

export const GENDER = ['Male', 'Female', 'Other', 'Prefer not to say'] as const

export const profileSchema = z.object({
    firstName: z.string().trim().nullable(),
    lastName: z.string().trim().nullable(),
    displayName: z.string()
        .min(1, 'Display name is required')
        .trim(),
    bio: z.string().trim().nullable(),
    height: z.number()
        .nullable()
        .or(z.literal(''))
        .transform(value =>
            !value || isNaN(Number(value)) || Number(value) === 0 ? null : Number(value)
        ),
    weight: z.number()
        .nullable()
        .or(z.literal(''))
        .transform(value =>
            !value || isNaN(Number(value)) || Number(value) === 0 ? null : Number(value)
        ),
    fitnessLevel: z.nativeEnum(DifficultyLevel).nullable(),
    gender: z.enum(GENDER).nullable(),
    fitnessGoals: z.array(z.string()).nullable(),
})

export const passwordSchema = z.object({
    currentPassword: z.string().optional(),
    newPassword: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
})

export type ProfileFormData = z.infer<typeof profileSchema>