export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

export interface WorkoutSet {
  id: string
  repetitions?: number
  weight?: number
  time?: number
  unit: 'kg' | 'sec'
}

export interface Exercise {
  id: string
  title: string
  description: string
  imageUrl: string
  videoUrl: string
  level: DifficultyLevel
  type: 'weight' | 'cardio' | 'bodyweight' | 'cable' | 'machine'
  defaultRestPeriod: number // in seconds
  isCompleted?: boolean
  sets?: WorkoutSet[]
}

export interface WorkoutDay {
  id: string
  title: string
  description: string
  imageUrl: string
  level: DifficultyLevel
  exercises: Exercise[]
}

export interface WorkoutPlan {
  id: string
  title: string
  description: string
  imageUrl: string
  level: DifficultyLevel
  days: WorkoutDay[]
}
