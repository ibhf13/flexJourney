import { Exercise } from '../types/WorkoutTypes'

export const reorderExercises = (
    exercises: Exercise[],
    completedExercises: string[]
): Exercise[] => {
    console.log('Completed exercises:', completedExercises)
    return [...exercises].sort((a, b) => {
        const aCompleted = completedExercises.includes(a.id)
        const bCompleted = completedExercises.includes(b.id)

        // Move completed exercises to the end
        if (aCompleted && !bCompleted) return 1
        if (!aCompleted && bCompleted) return -1

        // Maintain original order for exercises with same completion status
        return exercises.indexOf(a) - exercises.indexOf(b)
    })
}