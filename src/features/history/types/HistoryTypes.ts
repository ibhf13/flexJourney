import { BaseDocument, WithUserId } from '@/config/firebase/types/firebaseTypes'

export interface ExerciseSet {
    weight: number
    reps: number
    time?: number
    unit: 'kg' | 'lbs' | 'sec'
}

export interface ExerciseLog {
    exerciseId: string
    exerciseName: string
    sets: ExerciseSet[]
    completedAt: string
}

export interface TrainingHistoryEntry extends BaseDocument, WithUserId {
    planId: string
    planName: string
    dayId: string
    dayName: string
    exercises: ExerciseLog[]
    date: string
}

export interface HistoryFilters {
    startDate?: Date
    endDate?: Date
    planId?: string
}