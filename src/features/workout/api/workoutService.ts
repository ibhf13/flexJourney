import { db } from '@/config/firebase'
import { COLLECTIONS } from '@/config/firebase/collections'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import { WorkoutPlan } from '../types/WorkoutTypes'

const WORKOUT_PLANS_COLLECTION = COLLECTIONS.GLOBAL.WORKOUT_PLANS

export const fetchWorkoutPlans = async (): Promise<WorkoutPlan[]> => {
  try {
    const plansRef = collection(db, WORKOUT_PLANS_COLLECTION)
    const snapshot = await getDocs(plansRef)

    return snapshot.docs.map(doc => doc.data() as WorkoutPlan)
  } catch (error) {
    console.error('Error fetching workout plans:', error)
    throw error
  }
}

export const fetchWorkoutPlanById = async (planId: string | undefined): Promise<WorkoutPlan | undefined> => {
  if (!planId) return undefined

  try {
    const planRef = doc(db, WORKOUT_PLANS_COLLECTION, planId)
    const snapshot = await getDoc(planRef)

    return snapshot.exists() ? (snapshot.data() as WorkoutPlan) : undefined
  } catch (error) {
    console.error('Error fetching workout plan:', error)
    throw error
  }
}

export const deleteWorkoutPlan = async (planId: string): Promise<void> => {
  try {
    const planRef = doc(db, WORKOUT_PLANS_COLLECTION, planId)

    await deleteDoc(planRef)
  } catch (error) {
    console.error('Error deleting workout plan:', error)
    throw error
  }
}