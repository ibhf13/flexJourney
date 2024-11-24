import { WorkoutDay, WorkoutPlan } from "@/features/workout/types/WorkoutTypes"



export enum ExerciseUnitType {
    WEIGHT = 'weight',
    TIME = 'time'
}

export enum WeightUnit {
    KG = 'kg',
    LBS = 'lbs'
}

export enum TimeUnit {
    SECONDS = 'sec',
    MINUTES = 'min'
}

export interface ExerciseSet {
    weight?: number
    reps?: number
    time?: number
    unit: WeightUnit | TimeUnit
    isCompleted: boolean
}

export interface WorkoutExercise {
    exerciseId: string
    exerciseName: string
    sets: ExerciseSet[]
    completedAt?: Date
    isCompleted: boolean
}

export interface DayProgress {
    exercises: WorkoutExercise[]
    isCompleted: boolean
    completedAt?: Date
}

export interface WorkoutProgress {
    progressId: string
    planId: string
    userId: string
    currentDay: number
    isCurrentDayCompleted: boolean
    exercises: Record<string, DayProgress>
    startedAt: Date
    lastUpdatedAt: Date
}

export interface ProgressState {
    selectedPlan?: WorkoutPlan
    selectedDay?: WorkoutDay
    currentDayIndex: number
    progressId: string | null
}