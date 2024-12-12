import { useHistory } from '@/features/history/hooks/useHistory'
import { ExerciseLog, TrainingHistoryEntry } from '@/features/history/types/HistoryTypes'
import { ExerciseStats, Statistics } from '../types/statistics'
import {
    calculateDailyStats,
    createProgressDataPoint,
    getMonthKey,
    updateExerciseStats
} from '../utils/statisticsCalculator'

const initializeExerciseStats = (): ExerciseStats => ({
    totalSets: 0,
    totalReps: 0,
    maxWeight: 0,
    maxReps: 0,
    averageWeight: 0,
    averageReps: 0,
    lastWeight: 0,
    lastReps: 0,
    progressData: []
})

const processExercise = (
    exerciseStats: Map<string, ExerciseStats>,
    exercise: ExerciseLog,
    entry: TrainingHistoryEntry
): [Map<string, ExerciseStats>, number] => {
    const currentStats = exerciseStats.get(exercise.exerciseId) ?? initializeExerciseStats()
    const dailyStats = calculateDailyStats(exercise.sets)

    const updatedStats = updateExerciseStats(currentStats, exercise.sets, dailyStats)

    const progressPoint = createProgressDataPoint(entry.date, dailyStats)

    updatedStats.progressData = [...updatedStats.progressData, progressPoint]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    exerciseStats.set(exercise.exerciseId, updatedStats)

    return [exerciseStats, dailyStats.dailyVolume]
}

export const useStatistics = () => {
    const { history, isLoading, error } = useHistory()

    const calculateStatistics = (): Statistics | null => {
        if (!history.length) return null

        const uniqueDays = new Set(history.map(entry => entry.date.split('T')[0])).size
        const exerciseStats = new Map<string, ExerciseStats>()
        const months = new Map<string, number>()
        let totalVolume = 0
        let mostFrequentExercise = { name: '', count: 0 }

        history.forEach(entry => {
            const monthKey = getMonthKey(entry.date)

            months.set(monthKey, (months.get(monthKey) ?? 0) + 1)

            entry.exercises.forEach(exercise => {
                const [updatedStats, exerciseVolume] = processExercise(
                    exerciseStats,
                    exercise,
                    entry
                )

                totalVolume += exerciseVolume

                const exerciseCount = updatedStats.get(exercise.exerciseId)?.totalSets ?? 0

                if (exerciseCount > mostFrequentExercise.count) {
                    mostFrequentExercise = {
                        name: exercise.exerciseName,
                        count: exerciseCount
                    }
                }
            })
        })

        const monthlyActivity = Array.from(months.entries())
            .map(([month, workouts]) => ({ month, workouts }))
            .sort((a, b) => a.month.localeCompare(b.month))

        return {
            totalTrainingDays: uniqueDays,
            mostFrequentExercise,
            totalVolume,
            monthlyActivity,
            exerciseStats: Object.fromEntries(exerciseStats),
            averageWorkoutsPerMonth: monthlyActivity.length > 0
                ? (uniqueDays / monthlyActivity.length).toFixed(1)
                : '0'
        }
    }

    return {
        stats: calculateStatistics(),
        isLoading,
        error
    }
} 