import { FieldValue } from 'firebase/firestore'

export enum DifficultyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface Exercise {
  id: string
  title: string
  description: string
  imageUrl: string
  videoUrl: string
  level: DifficultyLevel
  type: string
  defaultRestPeriod: number
  category: string
  isCompleted?: boolean
  createdBy?: string
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
  userId?: string
  type: 'custom' | 'default'
  createdAt: Date | FieldValue
  updatedAt: Date | FieldValue
}
