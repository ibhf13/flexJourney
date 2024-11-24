import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { useQueryClient } from '@tanstack/react-query'
import { historyService } from '../api/historyService'
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

        const sanitizedSets = exerciseLog.sets.map(set => ({
            weight: set.weight || 0,
            reps: set.reps || 0,
            time: set.time || null,
            unit: set.unit
        }))

        const sanitizedExerciseLog = {
            ...exerciseLog,
            sets: sanitizedSets,
            completedAt: exerciseLog.completedAt || new Date().toISOString()
        }

        try {
            // Get today's date at midnight for consistent document ID
            const today = new Date()

            today.setHours(0, 0, 0, 0)

            // Generate a consistent document ID for the day
            const documentId = `${today.toISOString().split('T')[0]}_${dayId}_${planId}`

            // Try to get existing entry for today
            const existingEntries = await historyService.getAll(currentUser.uid, {
                startDate: today,
                endDate: today,
                planId,
                dayId
            })

            const existingEntry = existingEntries[0]

            if (existingEntry) {
                // Update existing entry by adding the new exercise
                const updatedExercises = [...existingEntry.exercises]
                const exerciseIndex = updatedExercises.findIndex(
                    ex => ex.exerciseId === sanitizedExerciseLog.exerciseId
                )

                if (exerciseIndex !== -1) {
                    updatedExercises[exerciseIndex] = sanitizedExerciseLog
                } else {
                    updatedExercises.push(sanitizedExerciseLog)
                }

                await updateHistory({
                    entryId: existingEntry._documentId!,
                    updates: {
                        exercises: updatedExercises,
                        updatedAt: new Date()
                    }
                })
            } else {
                // Create new entry for today
                const entry: TrainingHistoryEntry = {
                    id: documentId,
                    planId,
                    planName,
                    dayId,
                    dayName,
                    exercises: [sanitizedExerciseLog],
                    date: today.toISOString(),
                    userId: currentUser.uid,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }

                await createHistory(entry)
            }

            queryClient.invalidateQueries({ queryKey: ['training-history'] })
            showMessage('Exercise progress saved to history', 'success')

            return true
        } catch (error) {
            console.error('Save exercise log error:', error)
            handleError('Failed to save exercise progress to history')

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
                handleError(error)

                return false
            }
        }

        return false
    }

    const deleteEntry = async (documentId: string) => {
        if (!currentUser?.uid) {
            showMessage('Please sign in to delete entries', 'error')

            return false
        }

        try {
            await deleteHistory({
                userId: currentUser.uid,
                entryId: documentId
            })

            return true
        } catch (error) {
            console.error('Delete entry error:', error)
            handleError('Failed to delete entry')

            return false
        }
    }

    const updateEntry = async (updates: Partial<TrainingHistoryEntry>, entryId: string) => {
        if (!currentUser?.uid) {
            showMessage('Please sign in to update entries', 'error')

            return false
        }

        try {
            // First get the entry to find its Firestore document ID
            const historyEntries = await historyService.getAll(currentUser.uid)
            const entryToUpdate = historyEntries.find(entry => entry.id === entryId)

            if (!entryToUpdate || !entryToUpdate._documentId) {
                throw new Error('Entry not found')
            }

            await updateHistory({
                entryId: entryToUpdate._documentId, // Use Firestore document ID
                updates
            })

            queryClient.invalidateQueries({ queryKey: ['training-history'] })
            showMessage('Entry updated successfully', 'success')

            return true
        } catch (error) {
            console.error('Update entry error:', error)
            handleError(error)

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
        updateEntry,
        saveExerciseLog
    }
}