import { ExerciseSet } from '@/features/history/types/HistoryTypes'
import { format, parseISO } from 'date-fns'
import { ExerciseStats, ProgressDataPoint } from '../types/statistics'

export const calculateDailyStats = (sets: ExerciseSet[]): {
    dailyVolume: number
    dailyMaxWeight: number
    dailyTotalReps: number
} => {
    return sets.reduce((acc, set) => ({
        dailyVolume: acc.dailyVolume + (set.weight * set.reps),
        dailyMaxWeight: Math.max(acc.dailyMaxWeight, set.weight),
        dailyTotalReps: acc.dailyTotalReps + set.reps
    }), {
        dailyVolume: 0,
        dailyMaxWeight: 0,
        dailyTotalReps: 0
    })
}

export const createProgressDataPoint = (
    date: string,
    { dailyMaxWeight, dailyTotalReps, dailyVolume }: ReturnType<typeof calculateDailyStats>
): ProgressDataPoint => ({
    date,
    weight: dailyMaxWeight,
    reps: dailyTotalReps,
    volume: dailyVolume
})

export const updateExerciseStats = (
    currentStats: ExerciseStats,
    sets: ExerciseSet[],
    dailyStats: ReturnType<typeof calculateDailyStats>
): ExerciseStats => {
    const lastSet = sets[sets.length - 1]
    const totalSets = currentStats.totalSets + sets.length
    const totalReps = currentStats.totalReps + dailyStats.dailyTotalReps

    return {
        ...currentStats,
        totalSets,
        totalReps,
        maxWeight: Math.max(currentStats.maxWeight, dailyStats.dailyMaxWeight),
        maxReps: Math.max(currentStats.maxReps, ...sets.map(set => set.reps)),
        averageWeight: totalSets > 0 ? dailyStats.dailyMaxWeight / totalSets : 0,
        averageReps: totalSets > 0 ? totalReps / totalSets : 0,
        lastWeight: lastSet?.weight ?? currentStats.lastWeight,
        lastReps: lastSet?.reps ?? currentStats.lastReps
    }
}

export const getMonthKey = (date: string): string =>
    format(parseISO(date), 'yyyy-MM') 