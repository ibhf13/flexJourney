import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createExercise, deleteExercise, updateExercise } from '../api/exerciseService'
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
            handleError(`Failed to update exercise: ${error}`)
        },
    })

    const createExerciseMutation = useMutation({
        mutationFn: (exerciseData: Omit<Exercise, 'id'>) =>
            createExercise(exerciseData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exercises'] })
            showMessage('Exercise created successfully', 'success')
        },
        onError: (error) => {
            handleError(`Failed to create exercise: ${error}`)
        },
    })

    const deleteExerciseMutation = useMutation({
        mutationFn: (exerciseId: string) => deleteExercise(exerciseId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exercises'] })
            showMessage('Exercise deleted successfully', 'success')
        },
        onError: (error) => {
            handleError(`Failed to delete exercise: ${error}`)
        },
    })

    return {
        updateExercise: updateExerciseMutation.mutate,
        createExercise: createExerciseMutation.mutate,
        isUpdating: updateExerciseMutation.isPending,
        isCreating: createExerciseMutation.isPending,
        deleteExercise: deleteExerciseMutation.mutate,
        isDeleting: deleteExerciseMutation.isPending,
    }
} 