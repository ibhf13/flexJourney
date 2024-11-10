import { useAuthContext } from '@/contexts/AuthContext'
import { useNotificationContext } from '@/features/Feedback'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { statisticsService } from '../api/statisticsService'
import { WorkoutStat } from '../types/StatisticsTypes'

export const useStatistics = () => {
    const { currentUser } = useAuthContext()
    const queryClient = useQueryClient()
    const { showNotification } = useNotificationContext()

    const { data: stats, isLoading, error } = useQuery({
        queryKey: ['userStats', currentUser?.uid],
        queryFn: () => currentUser ? statisticsService.getUserStats(currentUser.uid) : null,
        enabled: !!currentUser,
    })

    const { mutate: updateStats } = useMutation({
        mutationFn: (updateData: Partial<WorkoutStat>) => {
            if (!currentUser) throw new Error('No user authenticated')

            return statisticsService.updateWorkoutStats(currentUser.uid, updateData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userStats'] })
        },
        onError: (error) => {
            showNotification({
                message: error instanceof Error ? error.message : 'Failed to update stats',
                severity: 'error',
            })
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
            queryClient.invalidateQueries({ queryKey: ['userStats'] })
        },
        onError: (error) => {
            showNotification({
                message: error instanceof Error ? error.message : 'Failed to update exercise progress',
                severity: 'error',
            })
        },
    })

    const { mutate: updateStreak } = useMutation({
        mutationFn: () => {
            if (!currentUser) throw new Error('No user authenticated')

            return statisticsService.calculateAndUpdateStreak(currentUser.uid)
        },
        onSuccess: (newStreak) => {
            queryClient.invalidateQueries({ queryKey: ['userStats'] })
            showNotification({
                message: `Workout streak: ${newStreak} days!`,
                severity: 'success',
            })
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