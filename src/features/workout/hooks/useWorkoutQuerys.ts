import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { ErrorSeverity } from '@/features/errorHandling/types/errorTypes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteWorkoutPlan, fetchWorkoutPlanById, fetchWorkoutPlans } from '../api/workoutService'

export const useWorkoutDays = (planId: string | undefined) => {
    return useQuery({
        queryKey: ['workoutPlan', planId],
        queryFn: () => fetchWorkoutPlanById(planId),
        enabled: planId !== undefined
    })
}

export const useWorkoutPlans = (userId: string) => {
    return useQuery({
        queryKey: ['workoutPlans', userId],
        queryFn: () => fetchWorkoutPlans(userId),
        enabled: !!userId
    })
}

export const useRefreshWorkoutPlans = () => {
    const queryClient = useQueryClient()
    const refreshPlans = () => queryClient.invalidateQueries({ queryKey: ['workoutPlans'] })

    return refreshPlans
}

export const useDeleteWorkoutPlan = () => {
    const { handleError, showMessage } = useErrorHandler()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteWorkoutPlan,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['workoutPlans']
            })
            showMessage('Plan deleted successfully', ErrorSeverity.SUCCESS)
        },
        onError: (error) => {
            handleError(error, ErrorSeverity.ERROR)
        }
    })
}
