import { format } from 'date-fns'

export const calculateStreak = (dates: string[]): number => {
    if (dates.length === 0) return 0

    let currentStreak = 1
    const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    const today = new Date().toISOString().split('T')[0]

    if (sortedDates[0] !== today && sortedDates[0] !== new Date(Date.now() - 86400000).toISOString().split('T')[0]) {
        return 0
    }

    for (let i = 0; i < sortedDates.length - 1; i++) {
        const current = new Date(sortedDates[i])
        const prev = new Date(sortedDates[i + 1])
        const diffDays = Math.floor((current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24))

        if (diffDays === 1) {
            currentStreak++
        } else {
            break
        }
    }

    return currentStreak
}

export const formatWorkoutDate = (date: string): string => {
    return format(new Date(date), 'MMM dd, yyyy')
}