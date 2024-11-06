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
    completedAt: string // ISO string format
}

export interface TrainingHistoryEntry {
    id: string
    planId: string
    planName: string
    dayId: string
    dayName: string
    exercises: ExerciseLog[]
    date: string // ISO string format
    userId: string
}

export interface HistoryFilters {
    startDate?: Date
    endDate?: Date
    planId?: string
}