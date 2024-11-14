import { useAuthContext } from '@/features/auth/contexts/AuthContext'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { statisticsService } from '../api/statisticsService'
import { WorkoutStat } from '../types/StatisticsTypes'

const QUERY_KEYS = {
    statistics: 'statistics'
} as const

export const useStatistics = () => {
    const { currentUser } = useAuthContext()
    const queryClient = useQueryClient()
    const { handleError, showMessage } = useErrorHandler()

    const { data: stats, isLoading, error } = useQuery({
        queryKey: [QUERY_KEYS.statistics, currentUser?.uid],
        queryFn: () => currentUser ? statisticsService.getUserStats(currentUser.uid) : null,
        enabled: !!currentUser,
    })

    const invalidateStats = () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.statistics] })
    }

    const { mutate: updateStats } = useMutation({
        mutationFn: (updateData: Partial<WorkoutStat>) => {
            if (!currentUser) throw new Error('No user authenticated')

            return statisticsService.updateWorkoutStats(currentUser.uid, updateData)
        },
        onSuccess: invalidateStats,
        onError: (error) => {
            handleError(error instanceof Error ? error.message : 'Failed to update stats')
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