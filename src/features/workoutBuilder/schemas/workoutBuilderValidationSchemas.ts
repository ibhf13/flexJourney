import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import { z } from 'zod'

export const planBasicsSchema = z.object({
    title: z.string()
        .min(3, 'Plan name must be at least 3 characters')
        .max(50, 'Plan name must be less than 50 characters'),
    description: z.string()
        .max(500, 'Description must be less than 500 characters'),
    level: z.nativeEnum(DifficultyLevel, {
        required_error: 'Please select a difficulty level'
    })
})

export const trainingDaySchema = z.object({
    title: z.string()
        .min(3, 'Day title must be at least 3 characters')
        .max(30, 'Day title must be less than 30 characters'),
})

export const trainingDaysSchema = z.object({
    days: z.array(trainingDaySchema)
        .min(1, 'Please add at least one training day')
        .max(7, 'Maximum 7 training days allowed')
})

export const exerciseSelectionSchema = z.object({
    days: z.array(z.object({
        id: z.string(),
        title: z.string(),
        exercises: z.array(z.object({
            id: z.string(),
            title: z.string()
        })).min(1, 'Please select at least one exercise for each day')
    }))
})

export const reviewSchema = z.object({
    description: z.string()
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must be less than 500 characters'),
    level: z.nativeEnum(DifficultyLevel, {
        required_error: 'Please select a difficulty level'
    })
})

export type PlanBasicsFormData = z.infer<typeof planBasicsSchema>
export type TrainingDaysFormData = z.infer<typeof trainingDaysSchema>
export type ExerciseSelectionFormData = z.infer<typeof exerciseSelectionSchema>
export type ReviewFormData = z.infer<typeof reviewSchema>