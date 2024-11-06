import { useQuery } from '@tanstack/react-query'
import { fetchWorkoutPlanById } from '../api/mockData'
import { useWorkoutContext } from '../contexts/WorkoutContext'
import { WorkoutDay } from '../types/WorkoutTypes'

export const useDayDetails = (planId: string | undefined, dayId: string | undefined) => {
    const { selectedPlan, selectPlan } = useWorkoutContext()

    return useQuery({
        queryKey: ['workoutDay', planId, dayId],
        queryFn: async (): Promise<WorkoutDay> => {
            if (!planId || !dayId) {
                throw new Error('Missing required parameters')
            }

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
        },
        enabled: Boolean(planId && dayId),
    })
}