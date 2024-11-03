import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNotification } from '@/features/Feedback'
import { trainingHistoryService } from '../services/trainingHistoryService'
import { TrainingHistoryEntry, ExerciseLog } from '../types/TrainingHistoryTypes'
import { v4 as uuidv4 } from 'uuid'

export const useTrainingHistory = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { currentUser } = useAuth()
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