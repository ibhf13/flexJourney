import { Exercise } from "@/features/exercises/types/ExerciseTypes"

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface WorkoutSet {
  id: string
  repetitions?: number
  weight?: number
  time?: number
  unit: 'kg' | 'sec'
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
