import { useCallback } from 'react'
import { useWorkoutContext } from '@/features/workout/contexts/WorkoutContext'
import { useExerciseContext } from '@/features/exercises/contexts/ExerciseContext'
import { ExerciseFormData } from '@/features/exercises/types/ExerciseTypes'
import { Exercise } from '@/features/exercises/types/ExerciseTypes'

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