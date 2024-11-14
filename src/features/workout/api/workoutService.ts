import { deleteDocument, getDocument, queryCollection } from '@/config/firebase/operations/database'
import { COLLECTIONS } from '@/config/firebase/types/collections'
import { getGlobalCollection } from '@/config/firebase/utils/helpers'
import { WorkoutPlan } from '../types/WorkoutTypes'

export const fetchWorkoutPlans = async (): Promise<WorkoutPlan[]> => {
  const collectionRef = getGlobalCollection('WORKOUT_PLANS')

  return await queryCollection<WorkoutPlan>(collectionRef, {
    orderBy: {
      field: 'createdAt',
      direction: 'desc'
    }
  })
}

export const fetchWorkoutPlanById = async (planId: string): Promise<WorkoutPlan | null> => {
  return await getDocument<WorkoutPlan>(COLLECTIONS.GLOBAL.WORKOUT_PLANS, planId)
}

export const deleteWorkoutPlan = async (planId: string): Promise<void> => {
  await deleteDocument(COLLECTIONS.GLOBAL.WORKOUT_PLANS, planId)
}