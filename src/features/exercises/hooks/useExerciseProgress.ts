import { useExerciseContext } from '../contexts/ExerciseContext'

export const useExerciseProgress = () => {
    const { exercises, completedExercises } = useExerciseContext()

    const areAllExercisesCompleted = exercises.length > 0 &&
        exercises.every(exercise => completedExercises.has(exercise.id))

    return {
        areAllExercisesCompleted,
        totalExercises: exercises.length,
        completedCount: completedExercises.size
    }
}