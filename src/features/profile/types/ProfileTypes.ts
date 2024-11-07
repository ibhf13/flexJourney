export interface UserProfile {
    id: string
    email: string
    displayName: string
    photoURL: string | null
    bio: string
    fitnessGoals: string[]
    weightUnit: 'kg' | 'lbs'
    height: number | null
    weight: number | null
    joinedDate: string
    preferredWorkoutDays: string[]
    experienceLevel: 'beginner' | 'intermediate' | 'advanced'
}

export interface ProfileStats {
    totalWorkouts: number
    totalExercises: number
    streakDays: number
    weightProgress?: {
        date: string
        weight: number
    }[]
}