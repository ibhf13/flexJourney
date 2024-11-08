import { db } from '@/config/firebase/firebase'
import { COLLECTIONS } from '@/config/firebase/types/firestore'
import { Exercise } from "@/features/exercises/types/ExerciseTypes"
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'


export const fetchExercises = async (): Promise<Exercise[]> => {
  try {
    const exercisesRef = collection(db, COLLECTIONS.exercises)
    const snapshot = await getDocs(exercisesRef)
    
    return snapshot.docs.map(doc => doc.data() as Exercise)
  } catch (error) {
    console.error('Error fetching exercises:', error)
    throw error
  }
}

export const fetchExerciseById = async (exerciseId: string): Promise<Exercise | undefined> => {
  try {
    const exerciseRef = doc(db, COLLECTIONS.exercises, exerciseId)
    const snapshot = await getDoc(exerciseRef)
    
    return snapshot.exists() ? (snapshot.data() as Exercise) : undefined
  } catch (error) {
    console.error('Error fetching exercise:', error)
    throw error
  }
}