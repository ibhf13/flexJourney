import { useAuth } from '@/features/auth/hooks/useAuth'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCurrentProgress, initializeProgress, resetProgress, saveExerciseProgress } from '../api/progressService'
import { PROGRESS_CONSTANTS } from '../constants/progressConstants'
import { WorkoutExercise } from '../types/ProgressTypes'

export const useProgressQuery = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const { handleError, showMessage } = useErrorHandler()

    const progressQuery = useQuery({
        queryKey: [PROGRESS_CONSTANTS.QUERY_KEYS.WORKOUT_PROGRESS, user?.uid],
        queryFn: () => {
            if (!user?.uid) throw new Error(PROGRESS_CONSTANTS.MESSAGES.ERROR.NO_USER)

            return getCurrentProgress(user.uid)
        },
        enabled: !!user,
    })

    const initProgressMutation = useMutation({
        mutationFn: ({ userId, planId }: { userId: string; planId: string }) =>
            initializeProgress(userId, planId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [PROGRESS_CONSTANTS.QUERY_KEYS.WORKOUT_PROGRESS]
            })
            showMessage(PROGRESS_CONSTANTS.MESSAGES.SUCCESS.PROGRESS_INITIALIZED, 'success')
        },
        onError: (error) => {
            handleError(
                `${PROGRESS_CONSTANTS.MESSAGES.ERROR.INIT_FAILED}: ${error}`,
                'error'
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
                queryKey: [PROGRESS_CONSTANTS.QUERY_KEYS.WORKOUT_PROGRESS]
            })
            showMessage(PROGRESS_CONSTANTS.MESSAGES.SUCCESS.EXERCISE_SAVED, 'success')
        },
        onError: (error) => {
            console.error('Mutation error details:', error)
            handleError(
                `${PROGRESS_CONSTANTS.MESSAGES.ERROR.SAVE_FAILED}: ${error}`,
                'error'
            )
        }
    })

    const resetProgressMutation = useMutation({
        mutationFn: ({ userId, progressId }: { userId: string; progressId: string }) =>
            resetProgress(userId, progressId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [PROGRESS_CONSTANTS.QUERY_KEYS.WORKOUT_PROGRESS]
            })
            showMessage('Progress has been reset successfully', 'success')
        },
        onError: (error) => {
            handleError(
                `Failed to reset progress: ${error}`,
                'error'
            )
        }
    })

    const initializeUserProgress = async (planId: string) => {
        if (!user) throw new Error(PROGRESS_CONSTANTS.MESSAGES.ERROR.NO_USER)

        return initProgressMutation.mutateAsync({ userId: user.uid, planId })
    }

    const saveUserExerciseProgress = async (
        progressId: string,
        dayId: string,
        exercise: WorkoutExercise
    ) => {
        if (!user) throw new Error(PROGRESS_CONSTANTS.MESSAGES.ERROR.NO_USER)

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
        if (!user) throw new Error(PROGRESS_CONSTANTS.MESSAGES.ERROR.NO_USER)
        await resetProgressMutation.mutateAsync({
            userId: user.uid,
            progressId
        })
    }

    return {
        progress: progressQuery.data,
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