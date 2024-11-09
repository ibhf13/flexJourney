export interface WorkoutStat {
    totalWorkouts: number
    completedWorkouts: number
    currentStreak: number
    longestStreak: number
    totalSets: number
    totalReps: number
    totalWeight: number
    weeklyAverage: number
    monthlyAverage: number
    completionRate: number
    lastWorkoutDate: string | null
    startDate: string
    favoriteExercises: {
        exerciseId: string
        name: string
        count: number
    }[]
    workoutsByMonth: {
        month: string
        count: number
    }[]
    updatedAt: string
}

export interface ExerciseProgress {
    exerciseId: string
    name: string
    personalBest: {
        weight: number
        reps: number
        date: string
    }
    history: {
        date: string
        weight: number
        reps: number
    }[]
    updatedAt: string
}

export interface UserStats {
    id: string
    userId: string
    workoutStats: WorkoutStat
    exerciseProgress: ExerciseProgress[]
    createdAt: string
    updatedAt: string
}