import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteWorkoutPlan, fetchWorkoutPlanById, fetchWorkoutPlans } from '../api/workoutService'

export const useWorkoutDays = (planId: string | undefined) => {
    return useQuery({
        queryKey: ['workoutPlan', planId],
        queryFn: () => fetchWorkoutPlanById(planId),
        enabled: planId !== undefined
    })
}

export const useWorkoutPlans = () => {
    return useQuery({
        queryKey: ['workoutPlans'],
        queryFn: fetchWorkoutPlans
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
            showMessage('Plan deleted successfully', 'success')
        },
        onError: (error) => {
            handleError(error, 'error')
        }
    })
}
