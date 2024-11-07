import { db } from '@/config/firebase/firebase'
import { Exercise } from "@/features/exercises/types/ExerciseTypes"
import { collection, doc, getDoc, getDocs, writeBatch } from 'firebase/firestore'
import { extractUniqueExercises } from '../utils/exerciseExtractor'

const COLLECTION_NAME = 'exercises'

export const seedExercises = async () => {
  try {
    const exercises = extractUniqueExercises()
    const batch = writeBatch(db)
    
    exercises.forEach(exercise => {
      const docRef = doc(db, COLLECTION_NAME, exercise.id)

      batch.set(docRef, exercise)
    })
    
    await batch.commit()
    console.log('Exercises seeded successfully')
  } catch (error) {
    console.error('Error seeding exercises:', error)
    throw error
  }
}

export const fetchExercises = async (): Promise<Exercise[]> => {
  try {
    const exercisesRef = collection(db, COLLECTION_NAME)
    const snapshot = await getDocs(exercisesRef)
    
    return snapshot.docs.map(doc => doc.data() as Exercise)
  } catch (error) {
    console.error('Error fetching exercises:', error)
    throw error
  }
}

export const fetchExerciseById = async (exerciseId: string): Promise<Exercise | undefined> => {
  try {
    const exerciseRef = doc(db, COLLECTION_NAME, exerciseId)
    const snapshot = await getDoc(exerciseRef)
    
    return snapshot.exists() ? (snapshot.data() as Exercise) : undefined
  } catch (error) {
    console.error('Error fetching exercise:', error)
    throw error
  }
}