import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { useQueryClient } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import { ExerciseLog, HistoryFilters, TrainingHistoryEntry } from '../types/HistoryTypes'
import { useHistoryQueries } from './useHistoryQueries'

export const useHistory = (filters?: HistoryFilters) => {
    const { currentUser } = useAuthContext()
    const { handleError, showMessage } = useErrorHandler()
    const queryClient = useQueryClient()

    const {
        useTrainingHistory,
        useCreateHistory,
        useDeleteHistory,
        useUpdateHistory
    } = useHistoryQueries()

    const {
        data: history,
        isLoading,
        error,
        refetch,
        isError,
        isFetching
    } = useTrainingHistory(filters)

    const { mutateAsync: createHistory } = useCreateHistory()
    const { mutateAsync: deleteHistory } = useDeleteHistory()
    const { mutateAsync: updateHistory } = useUpdateHistory()

    const saveExerciseLog = async (
        planId: string,
        planName: string,
        dayId: string,
        dayName: string,
        exerciseLog: ExerciseLog
    ) => {
        if (!currentUser) {
            showMessage('Please sign in to save your progress', 'error')
            throw new Error('User not authenticated')
        }

        const entry: TrainingHistoryEntry = {
            id: uuidv4(),
            planId,
            planName,
            dayId,
            dayName,
            exercises: [exerciseLog],
            date: new Date().toISOString(),
            userId: currentUser.uid,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        try {
            await createHistory(entry)
            queryClient.invalidateQueries({ queryKey: ['training-history'] })

            return true
        } catch (error) {
            console.error('Save exercise log error:', error)

            return false
        }
    }

    const fetchHistory = async () => {
        if (currentUser?.uid) {
            try {
                await refetch()

                return true
            } catch (error) {
                console.error('Fetch history error:', error)

                return false
            }
        }

        return false
    }

    const deleteEntry = async (id: string) => {
        if (!currentUser?.uid) {
            showMessage('Please sign in to delete entries', 'error')

            return false
        }

        try {
            await deleteHistory({
                userId: currentUser.uid,
                entryId: id
            })

            await queryClient.invalidateQueries({
                queryKey: ['training-history', currentUser.uid]
            })

            return true
        } catch (error) {
            console.error('Delete entry error:', error)
            showMessage('Failed to delete entry', 'error')

            return false
        }
    }

    return {
        history: history ?? [],
        isLoading: isLoading || isFetching,
        error,
        isError,
        fetchHistory,
        deleteEntry,
        updateEntry: async (entryId: string, updates: any) => {
            try {
                await updateHistory({ entryId, updates })
                queryClient.invalidateQueries({ queryKey: ['trainingHistory'] })

                return true
            } catch (error) {
                console.error('Update entry error:', error)

                return false
            }
        },
        saveExerciseLog
    }
}