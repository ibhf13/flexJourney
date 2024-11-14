import { deleteDocument, getDocument, queryCollection } from '@/config/firebase/operations/database'
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
  const collectionRef = getGlobalCollection('WORKOUT_PLANS')

  return await getDocument<WorkoutPlan>(collectionRef, planId)
}

export const deleteWorkoutPlan = async (planId: string): Promise<void> => {
  const collectionRef = getGlobalCollection('WORKOUT_PLANS')

  await deleteDocument(collectionRef, planId)
}
