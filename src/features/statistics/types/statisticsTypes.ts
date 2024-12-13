export enum ChartType {
    WEIGHT = 'weight',
    REPS = 'reps',
    VOLUME = 'volume'
}

export interface ProgressDataPoint {
    date: string
    weight: number
    reps: number
    volume: number
}

export interface ExerciseStats {
    totalSets: number
    totalReps: number
    maxWeight: number
    maxReps: number
    averageWeight: number
    averageReps: number
    lastWeight: number
    lastReps: number
    progressData: ProgressDataPoint[]
}

export interface MonthlyActivity {
    month: string
    workouts: number
}

export interface Statistics {
    totalTrainingDays: number
    mostFrequentExercise: {
        name: string
        count: number
    }
    totalVolume: number
    monthlyActivity: MonthlyActivity[]
    exerciseStats: Record<string, ExerciseStats>
    averageWorkoutsPerMonth: string
}

export interface StatCard {
    icon: React.ReactNode
    title: string
    value: string | number
    subtitle: string
}

export interface ExerciseProgress {
    exerciseId: string
    exerciseName: string
    progressData: ProgressDataPoint[]
    maxWeight: number
    maxReps: number
    averageWeight: number
    averageReps: number
}

