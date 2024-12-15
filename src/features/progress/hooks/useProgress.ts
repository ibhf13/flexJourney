import { useAuth } from '@/features/auth/hooks/useAuth'
import { useHistory } from '@/features/history/hooks/useHistory'
import { ExerciseLog, Unit } from '@/features/history/types/HistoryTypes'
import { useWorkoutPlans } from '@/features/workout/hooks/useWorkoutQuerys'
import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import { useEffect, useState } from 'react'
import { ProgressState, WorkoutExercise } from '../types/ProgressTypes'
import { useProgressQuery } from './useProgressQuery'

const initialProgressState: ProgressState = {
    currentDayIndex: 0,
    progressId: null,
    isInitialized: false
}

export const useProgress = () => {
    const { user } = useAuth()
    const { data: plans, isLoading: isPlansLoading, error: plansError } = useWorkoutPlans(user?.uid ?? '')
    const {
        progress,
        isLoading: isProgressLoading,
        error: progressError,
        initializeUserProgress,
        saveUserExerciseProgress
    } = useProgressQuery()
    const { saveExerciseLog } = useHistory()

    const [progressState, setProgressState] = useState<ProgressState>(initialProgressState)

    useEffect(() => {
        if (!progress || !plans || isPlansLoading || isProgressLoading) return

        const currentPlan = plans.find(plan => plan.id === progress.planId)

        if (currentPlan) {
            setProgressState(prev => ({
                selectedPlan: currentPlan,
                currentDayIndex: prev.currentDayIndex < currentPlan.days.length ?
                    prev.currentDayIndex :
                    progress.currentDay,
                selectedDay: currentPlan.days[prev.currentDayIndex < currentPlan.days.length ?
                    prev.currentDayIndex :
                    progress.currentDay],
                progressId: progress.progressId,
                isInitialized: true
            }))
        } else {
            setProgressState({
                ...initialProgressState,
                isInitialized: true
            })
        }
    }, [progress, plans, isPlansLoading, isProgressLoading])

    const isDayCompleted = (dayId: string): boolean => {
        if (!progress?.exercises[dayId]) return false

        const dayProgress = progress.exercises[dayId]
        const dayExercises = progressState.selectedPlan?.days.find(d => d.id === dayId)?.exercises || []

        return dayProgress.exercises.length === dayExercises.length &&
            dayProgress.exercises.every(ex => ex.isCompleted)
    }

    const completedDays = new Set(
        Object.entries(progress?.exercises || {})
            .filter(([dayId]) => isDayCompleted(dayId))
            .map(([dayId]) => dayId)
    )

    const handlePlanSelect = async (plan: WorkoutPlan) => {
        if (!user) {
            throw new Error('User must be logged in')
        }

        if (plan.type === 'custom' && plan.userId !== user.uid) {
            throw new Error('You are not authorized to access this plan')
        }

        try {
            const newProgressId = await initializeUserProgress(plan.id)

            setProgressState({
                selectedPlan: plan,
                selectedDay: plan.days[0],
                currentDayIndex: 0,
                progressId: newProgressId,
                isInitialized: true
            })
        } catch (error) {
            console.error('Failed to initialize progress', error)
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
            throw new Error('User must be logged in')
        }

        if (!progressState.progressId || !progressState.selectedPlan || !progressState.selectedDay) {
            throw new Error('Progress ID is required')
        }

        try {
            await saveUserExerciseProgress(
                progressState.progressId,
                dayId,
                exercise
            )

            if (exercise.isCompleted) {
                const historyExerciseLog = {
                    exerciseId: exercise.exerciseId,
                    exerciseName: exercise.exerciseName,
                    sets: exercise.sets.map(set => ({
                        weight: set.weight || 0,
                        reps: set.reps || 0,
                        time: set.time,
                        unit: set.unit as Unit
                    })),
                    completedAt: new Date().toISOString()
                }

                await saveExerciseLog(
                    progressState.selectedPlan.id,
                    progressState.selectedPlan.title,
                    progressState.selectedDay.id,
                    progressState.selectedDay.title,
                    historyExerciseLog as ExerciseLog
                )
            }

            return true
        } catch (error) {
            console.error('Failed to save exercise progress:', error)
            throw error
        }
    }

    return {
        plans,
        isPlansLoading,
        isProgressLoading,
        needsPlanSelection: progressState.isInitialized && !progressState.selectedPlan,
        error: plansError || progressError,
        progressState,
        completedDays,
        handlePlanSelect,
        handleDaySelect,
        handleExerciseProgress
    }
}