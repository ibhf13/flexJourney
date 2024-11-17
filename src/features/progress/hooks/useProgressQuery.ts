import { useAuth } from '@/features/auth/hooks/useAuth'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCurrentProgress, initializeProgress, saveExerciseProgress } from '../api/progressService'
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
            dayId,
            exercise
        }: {
            userId: string
            dayId: string
            exercise: WorkoutExercise
        }) => saveExerciseProgress(userId, dayId, exercise),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [PROGRESS_CONSTANTS.QUERY_KEYS.WORKOUT_PROGRESS]
            })
            showMessage(PROGRESS_CONSTANTS.MESSAGES.SUCCESS.EXERCISE_SAVED, 'success')
        },
        onError: (error) => {
            handleError(
                `${PROGRESS_CONSTANTS.MESSAGES.ERROR.SAVE_FAILED}: ${error}`,
                'error'
            )
        }
    })

    const initializeUserProgress = async (planId: string) => {
        if (!user) throw new Error(PROGRESS_CONSTANTS.MESSAGES.ERROR.NO_USER)
        await initProgressMutation.mutateAsync({ userId: user.uid, planId })
    }

    const saveUserExerciseProgress = async (dayId: string, exercise: WorkoutExercise) => {
        if (!user) throw new Error(PROGRESS_CONSTANTS.MESSAGES.ERROR.NO_USER)
        await saveExerciseMutation.mutateAsync({ userId: user.uid, dayId, exercise })
    }

    return {
        progress: progressQuery.data,
        isLoading: progressQuery.isLoading,
        error: progressQuery.error,
        initializeUserProgress,
        saveUserExerciseProgress,
        isInitializing: initProgressMutation.isPending,
        isSaving: saveExerciseMutation.isPending
    }
}