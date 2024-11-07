import { db } from '@/config/firebase/firebase'
import { collection, doc, getDoc, getDocs, writeBatch } from 'firebase/firestore'
import { WorkoutPlan } from '../types/WorkoutTypes'
import { WORKOUT_PLANS } from './mockData'

const COLLECTION_NAME = 'workoutPlans'

export const seedWorkoutPlans = async () => {
  try {
    const batch = writeBatch(db)
    
    for (const plan of WORKOUT_PLANS) {
      const docRef = doc(db, COLLECTION_NAME, plan.id)

      batch.set(docRef, plan)
    }
    
    await batch.commit()
    console.log('Workout plans seeded successfully')
  } catch (error) {
    console.error('Error seeding workout plans:', error)
    throw error
  }
}

export const fetchWorkoutPlans = async (): Promise<WorkoutPlan[]> => {
  try {
    const plansRef = collection(db, COLLECTION_NAME)
    const snapshot = await getDocs(plansRef)
    
    return snapshot.docs.map(doc => doc.data() as WorkoutPlan)
  } catch (error) {
    console.error('Error fetching workout plans:', error)
    throw error
  }
}

export const fetchWorkoutPlanById = async (planId: string): Promise<WorkoutPlan | undefined> => {
  try {
    const planRef = doc(db, COLLECTION_NAME, planId)
    const snapshot = await getDoc(planRef)
    
    return snapshot.exists() ? (snapshot.data() as WorkoutPlan) : undefined
  } catch (error) {
    console.error('Error fetching workout plan:', error)
    throw error
  }
}