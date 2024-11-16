import { differenceInDays, isToday, isYesterday, startOfDay } from 'date-fns'

export const calculateStreak = (workoutDates: string[]): number => {
    if (!workoutDates.length) return 0

    const dates = workoutDates
        .map(date => startOfDay(new Date(date)))
        .sort((a, b) => b.getTime() - a.getTime())

    const mostRecent = dates[0]

    // If most recent workout isn't today or yesterday, streak is broken
    if (!isToday(mostRecent) && !isYesterday(mostRecent)) {
        return 0
    }

    let streak = 1

    for (let i = 0; i < dates.length - 1; i++) {
        const current = dates[i]
        const next = dates[i + 1]
        const daysDifference = Math.abs(differenceInDays(current, next))

        if (daysDifference === 1) {
            streak++
        } else {
            break
        }
    }

    return streak
}

export const getStreakMilestone = (streak: number): number | null => {
    const milestones = [3, 5, 7, 14, 21, 30, 50, 100]

    return milestones.find(milestone => streak === milestone) || null
}

export const getStreakMessage = (streak: number): string => {
    if (streak === 0) return "Start your streak today!"

    const milestone = getStreakMilestone(streak)

    if (milestone) {
        return `Congratulations! You've reached a ${milestone}-day streak! 🎉`
    }

    return `Keep it up! You're on a ${streak}-day streak! 🔥`
}