import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import { z } from 'zod'
import { Genders } from '../types/ProfileTypes'

const checkNumber = (value: number | null | "") => {
    return !value || isNaN(Number(value)) || Number(value) === 0 ? null : Number(value)
}

export const profileSchema = z.object({
    baseInfo: z.object({
        firstName: z.string().trim().nullable(),
        lastName: z.string().trim().nullable(),
        displayName: z.string()
            .min(1, 'Display name is required')
            .trim(),
        bio: z.string().trim().nullable(),
        photoURL: z.string().trim().nullable(),
        gender: z.nativeEnum(Genders).nullable(),
    }),
    profileMetrics: z.object({
        height: z.number()
            .nullable()
            .or(z.literal(''))
            .transform((value) => checkNumber(value)),
        weight: z.number()
            .nullable()
            .or(z.literal(''))
            .transform((value) => checkNumber(value)),
        targetWeight: z.number()
            .nullable()
            .or(z.literal(''))
            .transform((value) => checkNumber(value)),
        age: z.number().nullable(),
    }),
    fitnessDetails: z.object({
        fitnessLevel: z.nativeEnum(DifficultyLevel).nullable(),
        fitnessGoals: z.array(z.string()).nullable(),
    }),
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


