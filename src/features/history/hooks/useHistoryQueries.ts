import { useAuthContext } from '@/contexts/AuthContext'
import { useNotification } from '@/features/Feedback'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { historyService } from '../services/historyService'
import { HistoryFilters, TrainingHistoryEntry } from '../types/HistoryTypes'

const HISTORY_KEYS = {
    all: ['training-history'] as const,
    list: (userId: string, filters?: HistoryFilters) =>
        [...HISTORY_KEYS.all, userId, filters] as const,
    detail: (userId: string, entryId: string) =>
        [...HISTORY_KEYS.all, userId, entryId] as const,
}

export const useHistoryQueries = () => {
    const queryClient = useQueryClient()
    const { showNotification } = useNotification()
    const { currentUser } = useAuthContext()

    const useTrainingHistory = (filters?: HistoryFilters) => {
        return useQuery({
            queryKey: HISTORY_KEYS.list(currentUser?.uid ?? '', filters),
            queryFn: () => historyService.getAll(currentUser?.uid ?? '', filters),
            enabled: !!currentUser,

        })
    }

    const useCreateHistory = () => {
        return useMutation({
            mutationFn: (entry: TrainingHistoryEntry) =>
                historyService.create(currentUser?.uid ?? '', entry),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: HISTORY_KEYS.all })
                showNotification({
                    message: 'Training history saved successfully',
                    severity: 'success'
                })
            },
            onError: () => {
                showNotification({
                    message: 'Failed to save training history',
                    severity: 'error'
                })
            }
        })
    }

    const useDeleteHistory = () => {
        return useMutation({
            mutationFn: (entryId: string) =>
                historyService.delete(currentUser?.uid ?? '', entryId),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: HISTORY_KEYS.all })
                showNotification({
                    message: 'Entry deleted successfully',
                    severity: 'success'
                })
            },
            onError: () => {
                showNotification({
                    message: 'Failed to delete entry',
                    severity: 'error'
                })
            }
        })
    }

    const useUpdateHistory = () => {
        return useMutation({
            mutationFn: ({ entryId, updates }: {
                entryId: string,
                updates: Partial<TrainingHistoryEntry>
            }) => historyService.update(currentUser?.uid ?? '', entryId, updates),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: HISTORY_KEYS.all })
                showNotification({
                    message: 'Entry updated successfully',
                    severity: 'success'
                })
            },
            onError: () => {
                showNotification({
                    message: 'Failed to update entry',
                    severity: 'error'
                })
            }
        })
    }

    return {
        useTrainingHistory,
        useCreateHistory,
        useDeleteHistory,
        useUpdateHistory
    }
}