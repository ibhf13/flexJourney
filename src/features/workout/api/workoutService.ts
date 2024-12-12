import { db } from '@/config/firebase'
import { COLLECTIONS } from '@/config/firebase/collections'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import { WorkoutPlan } from '../types/WorkoutTypes'

const WORKOUT_PLANS_COLLECTION = COLLECTIONS.GLOBAL.WORKOUT_PLANS
const ADMIN_USER_ID = 'VvjUP3SpQGNwARNFQl1HjG725Ly1'

export const fetchWorkoutPlans = async (userId: string): Promise<WorkoutPlan[]> => {
  try {
    const plansRef = collection(db, WORKOUT_PLANS_COLLECTION)
    const snapshot = await getDocs(plansRef)

    const plans = snapshot.docs.map(doc => doc.data() as WorkoutPlan)

    // Admin can see all plans
    if (userId === ADMIN_USER_ID) {
      return plans
    }

    // Regular users can only see default plans and their own custom plans
    return plans.filter(plan =>
      plan.type === 'default' ||
      (plan.type === 'custom' && plan.userId === userId)
    )
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