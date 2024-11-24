import { COLLECTIONS } from '@/config/firebase/collections'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { historyService } from '../api/historyService'
import { HistoryFilters, TrainingHistoryEntry } from '../types/HistoryTypes'

const HISTORY_KEYS = {
    all: [COLLECTIONS.USERS.SUB_COLLECTIONS.TRAINING_HISTORY] as const,
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
                queryClient.invalidateQueries({
                    queryKey: HISTORY_KEYS.all,
                    exact: false
                })
            },
            onError: (error) => {
                console.error('Create history error:', error)
                handleError('Failed to save training history', 'error')
            }
        })
    }

    const useDeleteHistory = () => {
        return useMutation({
            mutationFn: ({ userId, entryId }: { userId?: string; entryId: string }) => {
                if (!userId) {
                    throw new Error('No user authenticated')
                }

                return historyService.delete(userId, entryId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: HISTORY_KEYS.all,
                    exact: false
                })
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
                queryClient.invalidateQueries({
                    queryKey: HISTORY_KEYS.all,
                    exact: false
                })
            },
            onError: (error) => {
                const errorMessage = error instanceof Error && error.message.includes('not found')
                    ? 'Training entry not found'
                    : 'Failed to update entry'

                console.error('Update history error:', error)
                handleError(errorMessage, 'error')
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
