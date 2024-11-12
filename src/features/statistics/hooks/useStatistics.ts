import { useAuthContext } from '@/contexts/AuthContext'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { statisticsService } from '../api/statisticsService'
import { WorkoutStat } from '../types/StatisticsTypes'

export const useStatistics = () => {
    const { currentUser } = useAuthContext()
    const queryClient = useQueryClient()
    const { handleError, showMessage } = useErrorHandler()

    const { data: stats, isLoading, error } = useQuery({
        queryKey: ['statistics', currentUser?.uid],
        queryFn: () => currentUser ? statisticsService.getUserStats(currentUser.uid) : null,
        enabled: !!currentUser,
    })

    const { mutate: updateStats } = useMutation({
        mutationFn: (updateData: Partial<WorkoutStat>) => {
            if (!currentUser) throw new Error('No user authenticated')

            return statisticsService.updateWorkoutStats(currentUser.uid, updateData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['statistics'] })
        },
        onError: (error) => {
            handleError(error instanceof Error ? error.message : 'Failed to update stats', 'error')
        },
    })

    const { mutate: updateExerciseProgress } = useMutation({
        mutationFn: ({
            exerciseId,
            weight,
            reps,
        }: {
            exerciseId: string
            weight: number
            reps: number
        }) => {
            if (!currentUser) throw new Error('No user authenticated')

            return statisticsService.updateExerciseProgress(
                currentUser.uid,
                exerciseId,
                weight,
                reps
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['statistics'] })
        },
        onError: (error) => {
            handleError(error instanceof Error ? error.message : 'Failed to update exercise progress', 'error')
        },
    })

    const { mutate: updateStreak } = useMutation({
        mutationFn: () => {
            if (!currentUser) throw new Error('No user authenticated')

            return statisticsService.calculateAndUpdateStreak(currentUser.uid)
        },
        onSuccess: (newStreak) => {
            queryClient.invalidateQueries({ queryKey: ['statistics'] })
            showMessage(`Workout streak: ${newStreak} days!`, 'success')
        },
    })

    return {
        stats: stats?.workoutStats,
        exerciseProgress: stats?.exerciseProgress,
        isLoading,
        error,
        updateStats,
        updateExerciseProgress,
        updateStreak,
    }
}