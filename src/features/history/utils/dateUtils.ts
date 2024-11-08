import { format } from 'date-fns'
import { TrainingHistoryEntry } from '../types/HistoryTypes'

export const groupHistoryByDate = (history: TrainingHistoryEntry[]) => {
  const grouped = history.reduce((acc, entry) => {
    const dateKey = format(new Date(entry.date), 'yyyy-MM-dd')

    if (!acc[dateKey]) {
      acc[dateKey] = []
    }

    acc[dateKey].push(entry)

    return acc
  }, {} as Record<string, TrainingHistoryEntry[]>)

  return Object.entries(grouped).map(([date, entries]) => ({
    date,
    entries
  }))
}