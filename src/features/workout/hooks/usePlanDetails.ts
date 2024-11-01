import { useState, useEffect } from 'react'
import { WorkoutPlan } from '../types/WorkoutTypes'
import { useWorkoutContext } from '../contexts/WorkoutContext'
import { fetchWorkoutPlanById } from '../api/mockData'

interface PlanDetailsState {
    isLoading: boolean
    error: string | null
    currentPlan: WorkoutPlan | null
}

export const usePlanDetails = (planId: string | undefined) => {
    const { selectedPlan, selectPlan } = useWorkoutContext()
    const [state, setState] = useState<PlanDetailsState>({
        isLoading: false,
        error: null,
        currentPlan: null
    })

    useEffect(() => {
        const loadPlan = async () => {
            if (!planId) return
            if (selectedPlan?.id === planId) {
                setState(prev => ({ ...prev, currentPlan: selectedPlan }))
                return
            }

            try {
                setState(prev => ({ ...prev, isLoading: true }))
                const plan = await fetchWorkoutPlanById(planId)
                if (!plan) {
                    setState(prev => ({
                        ...prev,
                        error: 'Workout plan not found',
                        isLoading: false
                    }))
                    return
                }
                selectPlan(plan)
                setState(prev => ({
                    ...prev,
                    currentPlan: plan,
                    isLoading: false
                }))
            } catch (err) {
                setState(prev => ({
                    ...prev,
                    error: 'Failed to load workout plan',
                    isLoading: false
                }))
                console.error(err)
            }
        }

        loadPlan()
    }, [planId, selectedPlan, selectPlan])

    return state
}