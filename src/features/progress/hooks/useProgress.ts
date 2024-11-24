import { useAuth } from '@/features/auth/hooks/useAuth'
import { useWorkoutPlans } from '@/features/workout/hooks/useWorkoutQuerys'
import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import { useEffect, useState } from 'react'
import { PROGRESS_CONSTANTS } from '../constants/progressConstants'
import { ProgressState, WorkoutExercise } from '../types/ProgressTypes'
import { useProgressQuery } from './useProgressQuery'

const initialProgressState: ProgressState = {
    currentDayIndex: 0,
    progressId: null
}

export const useProgress = () => {
    const { user } = useAuth()
    const { data: plans, isLoading: plansLoading, error: plansError } = useWorkoutPlans()
    const {
        progress,
        isLoading: progressLoading,
        initializeUserProgress,
        saveUserExerciseProgress
    } = useProgressQuery()

    const [progressState, setProgressState] = useState<ProgressState>(initialProgressState)

    // Effect to sync progress state with current plan
    useEffect(() => {
        if (!progress || !plans) return

        const currentPlan = plans.find(plan => plan.id === progress.planId)

        if (!currentPlan) return

        setProgressState({
            selectedPlan: currentPlan,
            selectedDay: currentPlan.days[progress.currentDay],
            currentDayIndex: progress.currentDay,
            progressId: progress.progressId
        })
    }, [progress, plans])

    const handlePlanSelect = async (plan: WorkoutPlan) => {
        if (!user) {
            throw new Error(PROGRESS_CONSTANTS.MESSAGES.ERROR.NO_USER)
        }

        try {
            const newProgressId = await initializeUserProgress(plan.id)

            setProgressState({
                selectedPlan: plan,
                selectedDay: plan.days[0],
                currentDayIndex: 0,
                progressId: newProgressId
            })
        } catch (error) {
            console.error(PROGRESS_CONSTANTS.MESSAGES.ERROR.INIT_FAILED, error)
            throw error
        }
    }

    const handleDaySelect = (dayIndex: number) => {
        if (!progressState.selectedPlan) return

        setProgressState(prev => ({
            ...prev,
            selectedDay: prev.selectedPlan?.days[dayIndex],
            currentDayIndex: dayIndex
        }))
    }

    const handleExerciseProgress = async (dayId: string, exercise: WorkoutExercise) => {
        if (!user?.uid) {
            throw new Error(PROGRESS_CONSTANTS.MESSAGES.ERROR.NO_USER)
        }

        if (!progressState.progressId) {
            throw new Error(PROGRESS_CONSTANTS.MESSAGES.ERROR.NO_PROGRESS_ID)
        }

        if (!dayId) {
            throw new Error('Day ID is required')
        }

        if (!exercise || !exercise.exerciseId) {
            throw new Error('Valid exercise data is required')
        }

        try {
            await saveUserExerciseProgress(
                progressState.progressId,
                dayId,
                exercise
            )
        } catch (error) {
            console.error('Failed to save exercise progress:', error)
            throw error
        }
    }

    return {
        plans,
        isLoading: plansLoading || progressLoading,
        error: plansError,
        progressState,
        handlePlanSelect,
        handleDaySelect,
        handleExerciseProgress
    }
}