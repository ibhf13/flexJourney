import { WorkoutProgress } from "../types/ProgressTypes"

export const hasCompletedDays = (progress: WorkoutProgress): boolean => {
    if (!progress?.exercises) return false

    return Object.values(progress.exercises).some(day => day.isCompleted)
}