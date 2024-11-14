import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { fetchWorkoutPlans } from '../api/workoutService'
import { WorkoutPlan } from '../types/WorkoutTypes'

export const useWorkoutPlans = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const {
        data: plans = [],
        isLoading,
        error,
        refetch
    } = useQuery<WorkoutPlan[], Error>({
        queryKey: ['workoutPlans', refreshTrigger],
        queryFn: fetchWorkoutPlans,
    })

    const refreshPlans = useCallback(() => {
        setRefreshTrigger(prev => prev + 1)
        refetch()
    }, [refetch])

    return { plans, isLoading, error, refreshPlans }
}
