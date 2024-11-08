import { useAuthContext } from '@/contexts/AuthContext'
import { useNotification } from '@/features/Feedback'
import { v4 as uuidv4 } from 'uuid'
import { ExerciseLog, HistoryFilters } from '../types/HistoryTypes'
import { useHistoryQueries } from './useHistoryQueries'

export const useHistory = (filters?: HistoryFilters) => {
    const { currentUser } = useAuthContext()
    const { showNotification } = useNotification()
    const { 
        useTrainingHistory,
        useCreateHistory,
        useDeleteHistory,
        useUpdateHistory 
    } = useHistoryQueries()

    const { data: history, isLoading, error } = useTrainingHistory(filters)
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
            showNotification({
                message: 'Please sign in to save your progress',
                severity: 'error'
            })
            throw new Error('User not authenticated')
        }

        const entry = {
            id: uuidv4(),
            planId,
            planName,
            dayId,
            dayName,
            exercises: [exerciseLog],
            date: new Date().toISOString(),
            userId: currentUser.uid
        }

        await createHistory(entry)
    }

    return {
        history: history ?? [],
        isLoading,
        error,
        fetchHistory: () => {}, // React Query handles refetching
        deleteEntry: deleteHistory,
        updateEntry: (entryId: string, updates: any) => 
            updateHistory({ entryId, updates }),
        saveExerciseLog
    }
}