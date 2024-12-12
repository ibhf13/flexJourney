import { format } from 'date-fns'
import { TrainingHistoryEntry } from '../types/HistoryTypes'

interface GroupedWorkout {
  planName: string
  entry: TrainingHistoryEntry // Single consolidated entry
}

interface DayGroup {
  date: string
  workouts: GroupedWorkout[]
}

export const groupHistoryByDate = (history: TrainingHistoryEntry[]): DayGroup[] => {
  const grouped = history.reduce((acc, entry) => {
    const dateKey = format(new Date(entry.date), 'yyyy-MM-dd')

    if (!acc[dateKey]) {
      acc[dateKey] = {}
    }

    if (!acc[dateKey][entry.planName]) {
      acc[dateKey][entry.planName] = {
        ...entry,
        exercises: [...entry.exercises]
      }
    } else {
      acc[dateKey][entry.planName].exercises.push(...entry.exercises)
    }

    return acc
  }, {} as Record<string, Record<string, TrainingHistoryEntry>>)

  return Object.entries(grouped).map(([date, planGroups]) => ({
    date,
    workouts: Object.entries(planGroups).map(([planName, entry]) => ({
      planName,
      entry
    }))
  }))
}