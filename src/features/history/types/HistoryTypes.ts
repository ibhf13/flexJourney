export type Unit = 'kg' | 'lbs' | 'sec'

export interface ExerciseSet {
    weight: number
    reps: number
    time: number | null
    unit: Unit
}

export interface ExerciseLog {
    exerciseId: string
    exerciseName: string
    sets: ExerciseSet[]
    completedAt: string
}

export interface TrainingHistoryEntry {
    id: string
    _documentId?: string
    planId: string
    planName: string
    dayId: string
    dayName: string
    exercises: ExerciseLog[]
    date: string
    userId: string
    createdAt: Date
    updatedAt: Date
}

export interface HistoryFilters {
    startDate?: Date
    endDate?: Date
    planId?: string
    dayId?: string
}