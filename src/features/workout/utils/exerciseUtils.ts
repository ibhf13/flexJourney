import { Exercise } from '../types/WorkoutTypes'

export const reorderExercises = (
    exercises: Exercise[],
    completedExercises: string[]
): Exercise[] => {
    return [...exercises].sort((a, b) => {
        const aCompleted = completedExercises.includes(a.id)
        const bCompleted = completedExercises.includes(b.id)

        if (aCompleted && !bCompleted) return 1
        if (!aCompleted && bCompleted) return -1

        return exercises.indexOf(a) - exercises.indexOf(b)
    })
}