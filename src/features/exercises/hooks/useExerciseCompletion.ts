import { useExerciseContext } from '@/features/exercises/contexts/ExerciseContext'
import { Exercise, ExerciseFormData } from '@/features/exercises/types/ExerciseTypes'
import { useWorkoutContext } from '@/features/workout/contexts/WorkoutContext'
import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'
import { useCallback } from 'react'


export const useExerciseCompletion = () => {
    const { completeExercise, updateExerciseProgress } = useWorkoutContext()
    const { toggleExerciseCompletion } = useExerciseContext()

    const handleExerciseComplete = useCallback(
        (exercise: Exercise, day: WorkoutDay, formData: ExerciseFormData) => {
            try {
                // Update exercise progress with the latest set data
                const lastSet = formData.sets[formData.sets.length - 1]

                if (lastSet) {
                    updateExerciseProgress(
                        exercise.id,
                        lastSet.weight || 0,
                        lastSet.repetitions || 0
                    )
                }

                // Mark exercise as complete
                completeExercise(exercise.id)
                toggleExerciseCompletion(exercise.id)

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