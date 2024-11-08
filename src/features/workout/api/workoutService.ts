import { db } from '@/config/firebase/firebase'
import { COLLECTIONS } from '@/config/firebase/types/firestore'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { WorkoutPlan } from '../types/WorkoutTypes'

export const fetchWorkoutPlans = async (): Promise<WorkoutPlan[]> => {
  try {
    const plansRef = collection(db, COLLECTIONS.workoutPlans)
    const snapshot = await getDocs(plansRef)
    
    return snapshot.docs.map(doc => doc.data() as WorkoutPlan)
  } catch (error) {
    console.error('Error fetching workout plans:', error)
    throw error
  }
}

export const fetchWorkoutPlanById = async (planId: string): Promise<WorkoutPlan | undefined> => {
  try {
    const planRef = doc(db, COLLECTIONS.workoutPlans, planId)
    const snapshot = await getDoc(planRef)
    
    return snapshot.exists() ? (snapshot.data() as WorkoutPlan) : undefined
  } catch (error) {
    console.error('Error fetching workout plan:', error)
    throw error
  }
}