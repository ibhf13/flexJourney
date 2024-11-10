import { useCallback, useEffect, useState } from 'react'
import { fetchWorkoutPlans } from '../api/workoutService'
import { WorkoutPlan } from '../types/WorkoutTypes'

export const useWorkoutPlans = () => {
    const [plans, setPlans] = useState<WorkoutPlan[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const refreshPlans = useCallback(() => {
        setRefreshTrigger(prev => prev + 1)
    }, [])

    useEffect(() => {
        const loadPlans = async () => {
            try {
                setIsLoading(true)
                const data = await fetchWorkoutPlans()

                setPlans(data)
            } catch (err) {
                setError(err as Error)
                console.error('Error loading workout plans:', err)
            } finally {
                setIsLoading(false)
            }
        }

        loadPlans()
    }, [refreshTrigger])

    return { plans, isLoading, error, refreshPlans }
}
