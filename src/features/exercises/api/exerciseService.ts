import { db } from '@/config/firebase'
import { COLLECTIONS } from '@/config/firebase/collections'
import { Exercise } from "@/features/exercises/types/ExerciseTypes"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'

const EXERCISES_COLLECTION = COLLECTIONS.GLOBAL.EXERCISES

export const fetchExercises = async (): Promise<Exercise[]> => {
  try {
    const exercisesRef = collection(db, EXERCISES_COLLECTION)
    const snapshot = await getDocs(exercisesRef)

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Exercise))
  } catch (error) {
    console.error('Error fetching exercises:', error)
    throw error
  }
}

export const fetchExerciseById = async (exerciseId: string): Promise<Exercise | undefined> => {
  try {
    const exerciseRef = doc(db, EXERCISES_COLLECTION, exerciseId)
    const snapshot = await getDoc(exerciseRef)

    return snapshot.exists() ? (snapshot.data() as Exercise) : undefined
  } catch (error) {
    console.error('Error fetching exercise:', error)
    throw error
  }
}

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const exercisesRef = collection(db, EXERCISES_COLLECTION)
    const snapshot = await getDocs(exercisesRef)

    const categories = new Set<string>()

    snapshot.docs.forEach(doc => {
      const exercise = doc.data() as Exercise

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

export const updateExercise = async (exerciseId: string, updates: Partial<Exercise>): Promise<void> => {
  try {
    const exerciseRef = doc(db, EXERCISES_COLLECTION, exerciseId)
    const timestamp = new Date()

    const updateData = {
      ...updates,
      updatedAt: timestamp,
      ...(updates.imageUrl && { imageUrl: updates.imageUrl }),
    }

    await updateDoc(exerciseRef, updateData)
  } catch (error) {
    console.error('Error updating exercise:', error)
    throw error
  }
}

export const createExercise = async (exerciseData: Omit<Exercise, 'id'>): Promise<string> => {
  try {
    const exercisesRef = collection(db, EXERCISES_COLLECTION)
    const timestamp = new Date()

    const newExercise = {
      ...exerciseData,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    const docRef = await addDoc(exercisesRef, newExercise)

    return docRef.id
  } catch (error) {
    console.error('Error creating exercise:', error)
    throw error
  }
}

export const deleteExercise = async (exerciseId: string): Promise<void> => {
  if (!exerciseId) {
    throw new Error('Exercise ID is required')
  }

  try {
    const exerciseRef = doc(db, EXERCISES_COLLECTION, exerciseId)

    await deleteDoc(exerciseRef)
  } catch (error) {
    console.error('Error deleting exercise:', error)
    throw error
  }
}
