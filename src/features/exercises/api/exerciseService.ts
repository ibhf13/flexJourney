import { getDocument, queryCollection } from '@/config/firebase/operations/database'
import { COLLECTIONS } from '@/config/firebase/types/collections'
import { getGlobalCollection } from '@/config/firebase/utils/helpers'
import { Exercise } from '@/features/exercises/types/ExerciseTypes'

export const fetchExercises = async (): Promise<Exercise[]> => {
  try {
    const collectionRef = getGlobalCollection('EXERCISES')

    return await queryCollection<Exercise>(collectionRef, {})
  } catch (error) {
    console.error('Error fetching exercises:', error)
    throw error
  }
}

export const fetchExerciseById = async (exerciseId: string): Promise<Exercise | null> => {
  try {
    return await getDocument<Exercise>(COLLECTIONS.GLOBAL.EXERCISES, exerciseId)
  } catch (error) {
    console.error('Error fetching exercise:', error)
    throw error
  }
}

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const collectionRef = getGlobalCollection('EXERCISES')
    const exercises = await queryCollection<Exercise>(collectionRef, {})

    const categories = new Set<string>()

    exercises.forEach(exercise => {
      if (exercise.category) {
        categories.add(exercise.category)
      }
    })

    return Array.from(categories).sort()
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}