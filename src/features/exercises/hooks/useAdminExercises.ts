import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateExercise } from '../api/exerciseService'
import { Exercise } from '../types/ExerciseTypes'

export const useAdminExercises = () => {
    const queryClient = useQueryClient()
    const { handleError, showMessage } = useErrorHandler()

    const updateExerciseMutation = useMutation({
        mutationFn: ({ exerciseId, updates }: { exerciseId: string; updates: Partial<Exercise> }) =>
            updateExercise(exerciseId, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exercises'] })
            showMessage('Exercise updated successfully', 'success')
        },
        onError: (error) => {
            handleError(`Failed to update exercise ${error}`)
        },
    })

    return {
        updateExercise: updateExerciseMutation.mutate,
        isUpdating: updateExerciseMutation.isPending,
    }
} 