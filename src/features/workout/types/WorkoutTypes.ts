export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'

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
  type: string
  defaultRestPeriod: number // in seconds
  category: string
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
