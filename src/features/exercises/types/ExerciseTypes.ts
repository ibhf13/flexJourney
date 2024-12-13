import { DifficultyLevel } from "@/features/workout/types/WorkoutTypes"

export const PREDEFINED_EXERCISE_TYPES = {
    STRENGTH: 'STRENGTH',
    CARDIO: 'CARDIO',
    FLEXIBILITY: 'FLEXIBILITY',
    BALANCE: 'BALANCE',
} as const

export type ExerciseType = (typeof PREDEFINED_EXERCISE_TYPES)[keyof typeof PREDEFINED_EXERCISE_TYPES] | string

export interface Exercise {
    id: string
    title: string
    description: string
    imageUrl?: string
    videoUrl?: string
    category: string
    type: ExerciseType
    level: DifficultyLevel
    defaultRestPeriod: number
    createdAt?: Date
    updatedAt?: Date
}

export interface ExerciseSet {
    id: string
    repetitions: number
    weight?: number
    time?: number
    restPeriod: number
}

export interface ExerciseFormData {
    sets: ExerciseSet[]
}

export type ExerciseFormProps = {
    exerciseType: string
    defaultRestPeriod: number
    onSubmit: (data: ExerciseFormData) => void
    onCancel: () => void
    onChange: () => void
    initialData?: ExerciseFormData
}