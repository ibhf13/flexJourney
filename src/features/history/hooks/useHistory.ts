import { useAuthContext } from '@/contexts/AuthContext'
import { useNotification } from '@/features/Feedback'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { historyService } from '../services/historyService'
import { ExerciseLog, HistoryFilters, TrainingHistoryEntry } from '../types/HistoryTypes'

export const useHistory = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [history, setHistory] = useState<TrainingHistoryEntry[]>([])
    const { currentUser } = useAuthContext()
    const { showNotification } = useNotification()

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

        setIsLoading(true)
        try {
            const entry: TrainingHistoryEntry = {
                id: uuidv4(),
                planId,
                planName,
                dayId,
                dayName,
                exercises: [exerciseLog],
                date: new Date().toISOString(),
                userId: currentUser.uid
            }

            await historyService.saveTrainingHistory(currentUser.uid, entry)
            showNotification({
                message: 'Progress saved successfully',
                severity: 'success'
            })
        } catch (error) {
            console.error('Error saving exercise log:', error)
            showNotification({
                message: 'Failed to save progress. Please try again.',
                severity: 'error'
            })
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const fetchHistory = async (filters?: HistoryFilters) => {
        if (!currentUser) {
            setError('User not authenticated')
            showNotification({
                message: 'Please sign in to view your history',
                severity: 'error'
            })

            return
        }

        setIsLoading(true)
        setError(null)
        
        try {
            const data = await historyService.getTrainingHistory(currentUser.uid, filters)

            setHistory(data)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'

            setError(errorMessage)
            showNotification({
                message: 'Failed to fetch history. Please try again.',
                severity: 'error'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        history,
        saveExerciseLog,
        fetchHistory
    }
}