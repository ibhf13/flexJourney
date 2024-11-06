import { useAuthContext } from '@/contexts/AuthContext'
import { useNotification } from '@/features/Feedback'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { trainingHistoryService } from '../services/trainingHistoryService'
import { ExerciseLog, TrainingHistoryEntry } from '../types/TrainingHistoryTypes'

export const useTrainingHistory = () => {
    const [isLoading, setIsLoading] = useState(false)
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

            await trainingHistoryService.saveTrainingHistory(currentUser.uid, entry)
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

    return {
        isLoading,
        saveExerciseLog
    }
}