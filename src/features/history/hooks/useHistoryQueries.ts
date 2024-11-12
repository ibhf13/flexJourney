import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { historyService } from '../services/historyService'
import { HistoryFilters, TrainingHistoryEntry } from '../types/HistoryTypes'


const HISTORY_KEYS = {
    all: ['trainingHistory'] as const,
    list: (userId: string, filters?: HistoryFilters) =>
        [...HISTORY_KEYS.all, 'list', userId, JSON.stringify(filters)] as const,
    detail: (userId: string, entryId: string) =>
        [...HISTORY_KEYS.all, 'detail', userId, entryId] as const,
}

export const useHistoryQueries = () => {
    const queryClient = useQueryClient()
    const { handleError, showMessage } = useErrorHandler()
    const { currentUser } = useAuthContext()

    const useTrainingHistory = (filters?: HistoryFilters) => {
        return useQuery({
            queryKey: HISTORY_KEYS.list(currentUser?.uid ?? '', filters),
            queryFn: async () => {
                if (!currentUser?.uid) {
                    return []
                }

                return historyService.getAll(currentUser.uid, filters)
            },
            enabled: !!currentUser?.uid,
            staleTime: 5 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
        })
    }

    const useCreateHistory = () => {
        return useMutation({
            mutationFn: (entry: TrainingHistoryEntry) => {
                if (!currentUser?.uid) {
                    return Promise.reject(new Error('No user authenticated'))
                }

                return historyService.create(currentUser.uid, entry)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['training-history'] })
                showMessage('Training history saved successfully', 'success')
            },
            onError: (error) => {
                console.error('Create history error:', error)
                handleError('Failed to save training history', 'error')
            }
        })
    }

    const useDeleteHistory = () => {
        return useMutation({
            mutationFn: (entryId: string) => {
                if (!currentUser?.uid) {
                    return Promise.reject(new Error('No user authenticated'))
                }

                return historyService.delete(currentUser.uid, entryId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['training-history'] })
                showMessage('Entry deleted successfully', 'success')
            },
            onError: (error) => {
                console.error('Delete history error:', error)
                handleError('Failed to delete entry', 'error')
            }
        })
    }

    const useUpdateHistory = () => {
        return useMutation({
            mutationFn: ({ entryId, updates }: {
                entryId: string,
                updates: Partial<TrainingHistoryEntry>
            }) => {
                if (!currentUser?.uid) {
                    return Promise.reject(new Error('No user authenticated'))
                }

                return historyService.update(currentUser.uid, entryId, updates)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['training-history'] })
                showMessage('Entry updated successfully', 'success')
            },
            onError: (error) => {
                console.error('Update history error:', error)
                handleError('Failed to update entry', 'error')
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