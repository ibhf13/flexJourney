import { useAuth } from '@/features/auth/hooks/useAuth'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { ErrorSeverity } from '@/features/errorHandling/types/errorTypes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCurrentProgress, initializeProgress, resetProgress, saveExerciseProgress } from '../api/progressService'
import { WorkoutExercise } from '../types/ProgressTypes'
import { hasCompletedDays } from '../utils/progressUtils'

export const useProgressQuery = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const { handleError, showMessage } = useErrorHandler()

    const progressQuery = useQuery({
        queryKey: ['workoutProgress', user?.uid],
        queryFn: () => {
            if (!user?.uid) throw new Error('User must be logged in')

            return getCurrentProgress(user.uid)
        },
        enabled: !!user,
    })

    const initProgressMutation = useMutation({
        mutationFn: ({ userId, planId }: { userId: string; planId: string }) =>
            initializeProgress(userId, planId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['workoutProgress']
            })
            showMessage('Progress initialized successfully', ErrorSeverity.SUCCESS)
        },
        onError: (error) => {
            handleError(
                `Failed to initialize progress: ${error}`,
                ErrorSeverity.ERROR
            )
        }
    })

    const saveExerciseMutation = useMutation({
        mutationFn: ({
            userId,
            progressId,
            dayId,
            exercise
        }: {
            userId: string
            progressId: string
            dayId: string
            exercise: WorkoutExercise
        }) => {
            if (!userId || !progressId || !dayId || !exercise || !exercise.exerciseId) {
                throw new Error(
                    `Invalid parameters: ${JSON.stringify({
                        userId: !!userId,
                        progressId: !!progressId,
                        dayId: !!dayId,
                        exercise: !!exercise,
                        exerciseId: exercise?.exerciseId
                    })}`
                )
            }

            return saveExerciseProgress(userId, progressId, dayId, exercise)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['workoutProgress']
            })
        },
        onError: (error) => {
            console.error('Mutation error details:', error)
            handleError(
                `Failed to save exercise progress: ${error}`,
                ErrorSeverity.ERROR
            )
        }
    })

    const resetProgressMutation = useMutation({
        mutationFn: ({ userId, progressId }: { userId: string; progressId: string }) =>
            resetProgress(userId, progressId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['workoutProgress']
            })
            showMessage('Progress has been reset successfully', ErrorSeverity.SUCCESS)
        },
        onError: (error) => {
            handleError(
                `Failed to reset progress: ${error}`,
                ErrorSeverity.ERROR
            )
        }
    })

    const initializeUserProgress = async (planId: string) => {
        if (!user) throw new Error('User must be logged in')

        return initProgressMutation.mutateAsync({ userId: user.uid, planId })
    }

    const saveUserExerciseProgress = async (
        progressId: string,
        dayId: string,
        exercise: WorkoutExercise
    ) => {
        if (!user) throw new Error('User must be logged in')

        const isExerciseCompleted = exercise.sets.every(set => set.isCompleted)
        const exerciseWithStatus = {
            ...exercise,
            isCompleted: isExerciseCompleted,
            completedAt: isExerciseCompleted ? new Date() : undefined
        }

        await saveExerciseMutation.mutateAsync({
            userId: user.uid,
            progressId,
            dayId,
            exercise: exerciseWithStatus
        })
    }

    const resetUserProgress = async (progressId: string) => {
        if (!user) throw new Error('User must be logged in')
        await resetProgressMutation.mutateAsync({
            userId: user.uid,
            progressId
        })
    }

    return {
        progress: progressQuery.data,
        hasProgress: progressQuery.data ? hasCompletedDays(progressQuery.data) : false,
        isLoading: progressQuery.isLoading,
        error: progressQuery.error,
        initializeUserProgress,
        saveUserExerciseProgress,
        isInitializing: initProgressMutation.isPending,
        isSaving: saveExerciseMutation.isPending,
        resetUserProgress,
        isResetting: resetProgressMutation.isPending
    }
}