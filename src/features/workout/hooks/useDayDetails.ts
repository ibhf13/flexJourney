import { useState, useEffect } from 'react'
import { WorkoutDay } from '../types/WorkoutTypes'
import { useWorkoutContext } from '../contexts/WorkoutContext'

interface DayDetailsState {
    isLoading: boolean
    error: Error | null
    currentDay: WorkoutDay | null
}

export const useDayDetails = (planId: string | undefined, dayId: string | undefined) => {
    const { selectedPlan } = useWorkoutContext()
    const [state, setState] = useState<DayDetailsState>({
        isLoading: false,
        error: null,
        currentDay: null,
    })

    useEffect(() => {
        const loadDay = () => {
            if (!planId || !dayId || !selectedPlan) {
                setState((prev) => ({
                    ...prev,
                    error: new Error('Missing required parameters'),
                }))
                return
            }

            if (selectedPlan.id !== planId) {
                setState((prev) => ({
                    ...prev,
                    error: new Error('Selected plan does not match the requested plan'),
                }))
                return
            }

            const day = selectedPlan.days.find((d) => d.id === dayId)
            if (!day) {
                setState((prev) => ({
                    ...prev,
                    error: new Error('Workout day not found'),
                }))
                return
            }

            setState((prev) => ({
                ...prev,
                currentDay: day,
                isLoading: false,
            }))
        }

        setState((prev) => ({ ...prev, isLoading: true }))
        loadDay()
    }, [planId, dayId, selectedPlan])

    return state
}