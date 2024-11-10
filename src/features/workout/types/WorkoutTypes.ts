import { Exercise } from "@/features/exercises/types/ExerciseTypes"
import { FieldValue } from 'firebase/firestore'

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'

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
  userId?: string
  createdAt: Date | FieldValue
  updatedAt: Date | FieldValue
}
