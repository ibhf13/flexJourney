import { useCallback } from 'react'
import { useWorkoutContext } from '../contexts/WorkoutContext'
import { useExerciseContext } from '../contexts/ExerciseContext'
import { ExerciseFormData } from '../types/ExerciseTypes'
import { Exercise } from '../types/WorkoutTypes'

export const useExerciseCompletion = () => {
    const { completeExercise, updateExerciseProgress } = useWorkoutContext()
    const { toggleExerciseCompletion } = useExerciseContext()

    const handleExerciseComplete = useCallback(
        async (exercise: Exercise, formData: ExerciseFormData, onSuccess?: () => void) => {
            try {
                const lastSet = formData.sets[formData.sets.length - 1]
                if (lastSet) {
                    updateExerciseProgress(
                        exercise.id,
                        lastSet.weight || 0,
                        lastSet.repetitions
                    )
                }

                completeExercise(exercise.id)
                toggleExerciseCompletion(exercise.id)
                onSuccess?.()
                return true
            } catch (error) {
                console.error('Failed to complete exercise:', error)
                return false
            }
        },
        [completeExercise, toggleExerciseCompletion, updateExerciseProgress]
    )

    return { handleExerciseComplete }
}