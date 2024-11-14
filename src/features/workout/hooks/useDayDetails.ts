import { getErrorMessage, isFirebaseError } from '@/config/firebase/utils/errors'
import { useQuery } from '@tanstack/react-query'
import { fetchWorkoutPlanById } from '../api/workoutService'
import { useWorkoutContext } from '../contexts/WorkoutContext'
import { WorkoutDay } from '../types/WorkoutTypes'

export const useDayDetails = (planId: string | undefined, dayId: string | undefined) => {
    const { selectedPlan, selectPlan } = useWorkoutContext()

    return useQuery<WorkoutDay, Error>({
        queryKey: ['workoutDay', planId, dayId],
        queryFn: async () => {
            if (!planId || !dayId) {
                throw new Error('Missing required parameters')
            }

            try {
                const plan = selectedPlan?.id === planId
                    ? selectedPlan
                    : await fetchWorkoutPlanById(planId)

                if (!plan) {
                    throw new Error('Workout plan not found')
                }

                if (!selectedPlan || selectedPlan.id !== plan.id) {
                    selectPlan(plan)
                }

                const day = plan.days.find(d => d.id === dayId)

                if (!day) {
                    throw new Error('Workout day not found')
                }

                return day
            } catch (error) {
                if (isFirebaseError(error)) {
                    throw new Error(getErrorMessage(error.code))
                }

                throw error
            }
        },
        enabled: Boolean(planId && dayId),
    })
}