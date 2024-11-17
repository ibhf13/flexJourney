import { useProgressQuery } from './useProgressQuery'

export const useCompletedExercises = (dayId: string) => {
    const { progress } = useProgressQuery()

    const getCompletedExercises = () => {
        if (!progress || !dayId) {
            return new Set<string>()
        }

        const dayProgress = progress.exercises[dayId]

        if (!dayProgress) {
            return new Set<string>()
        }

        return new Set(
            dayProgress.exercises
                .filter(exercise => exercise.isCompleted)
                .map(exercise => exercise.exerciseId)
        )
    }

    const completedExercises = getCompletedExercises()

    const isExerciseCompleted = (exerciseId: string): boolean => {
        return completedExercises.has(exerciseId)
    }

    return {
        isExerciseCompleted,
        completedExercises
    }
}