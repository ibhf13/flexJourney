import { useEffect, useCallback } from 'react'
import { useExerciseContext } from '../contexts/ExerciseContext'
import { useWorkoutContext } from '../contexts/WorkoutContext'
import { WorkoutDay } from '../types/WorkoutTypes'

export const useExerciseList = (day: WorkoutDay | null) => {
    const { setExercises, setLoading, setError, toggleExerciseCompletion } = useExerciseContext()
    const { completedExercises } = useWorkoutContext()

    useEffect(() => {
        if (day) {
            try {
                setLoading(true)
                setExercises(day.exercises)
                completedExercises.forEach(id => {
                    toggleExerciseCompletion(id)
                })
            } catch (error) {
                setError(error as Error)
            } finally {
                setLoading(false)
            }
        }
    }, [day, setExercises, setError, setLoading, completedExercises, toggleExerciseCompletion])

    const isExerciseCompleted = useCallback((exerciseId: string) => {
        return completedExercises.includes(exerciseId)
    }, [completedExercises])

    return {
        isExerciseCompleted,
    }
}