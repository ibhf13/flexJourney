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

export type ProfileFormData = z.infer<typeof profileSchema>