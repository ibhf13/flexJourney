import { useEffect } from 'react'
import { useExerciseContext } from '../contexts/ExerciseContext'
import { useWorkoutContext } from '../contexts/WorkoutContext'
import { WorkoutDay } from '../types/WorkoutTypes'

export const useExerciseList = (day: WorkoutDay | undefined) => {
    const { setExercises, setLoading, setError } = useExerciseContext()
    const { completedExercises } = useWorkoutContext()

    useEffect(() => {
        if (day) {
            try {
                setLoading(true)
                setExercises(day.exercises)
            } catch (error) {
                setError(error as Error)
            } finally {
                setLoading(false)
            }
        }
    }, [day, setExercises, setError, setLoading])

    const isExerciseCompleted = (exerciseId: string) => {
        return completedExercises.includes(exerciseId)
    }

    return {
        isExerciseCompleted,
    }
}