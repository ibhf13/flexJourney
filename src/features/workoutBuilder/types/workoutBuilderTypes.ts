import { DifficultyLevel, WorkoutDay } from '@/features/workout/types/WorkoutTypes'

export interface ExerciseInWorkout {
    exerciseId: string
    sets: number
    reps: number
    restTime: number
}

export interface WorkoutPlan {
    id: string
    title: string
    description: string
    imageUrl: string
    level: DifficultyLevel
    days: WorkoutDay[]
    createdAt: Date
    userId: string
    type: 'custom' | 'default'
}


export enum WorkoutBuilderStepKeys {
    BASICS = 'basics',
    PLAN_DAYS = 'planDays',
    EXERCISES = 'exercises',
    REVIEW = 'review'
}

export type WorkoutBuilderStepKey = `${WorkoutBuilderStepKeys}`

export interface WorkoutBuilderStep {
    key: WorkoutBuilderStepKey
    label: string
    progress: number
}