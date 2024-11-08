import { db } from '@/config/firebase/firebase'
import { useAuthContext } from '@/contexts/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { collection, getDocs, query, where } from 'firebase/firestore'

interface WorkoutStats {
    totalWorkouts: number
    currentStreak: number
    monthlyWorkouts: number
    averageWorkoutsPerWeek: number
    completionRate: number
    mostFrequentWorkout: string
    lastWorkoutDate: string | null
    workoutsByMonth: {
        month: string
        count: number
    }[]
}

const calculateStreak = (dates: string[]): number => {
    if (dates.length === 0) return 0

    let currentStreak = 1
    const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    const today = new Date().toISOString().split('T')[0]

    // If the last workout wasn't today or yesterday, streak is broken
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

export const useProfileStats = () => {
    const { currentUser } = useAuthContext()

    return useQuery({
        queryKey: ['profileStats', currentUser?.uid],
        queryFn: async (): Promise<WorkoutStats> => {
            if (!currentUser) throw new Error('No user authenticated')

            const startDate = startOfMonth(new Date())
            const endDate = endOfMonth(new Date())

            const workoutsRef = collection(db, 'users', currentUser.uid, 'trainingHistory')
            const monthlyQuery = query(
                workoutsRef,
                where('date', '>=', startDate.toISOString()),
                where('date', '<=', endDate.toISOString())
            )

            const allWorkoutsQuery = query(workoutsRef)

            const [monthlySnapshot, allWorkoutsSnapshot] = await Promise.all([
                getDocs(monthlyQuery),
                getDocs(allWorkoutsQuery)
            ])

            const allWorkouts = allWorkoutsSnapshot.docs.map(doc => ({
                date: doc.data().date,
                planId: doc.data().planId,
                planName: doc.data().planName,
            }))

            const workoutDates = [...new Set(allWorkouts.map(w => w.date.split('T')[0]))]
            const planCounts = allWorkouts.reduce((acc, workout) => {
                acc[workout.planName] = (acc[workout.planName] || 0) + 1

                return acc
            }, {} as Record<string, number>)

            const workoutsByMonth = allWorkouts.reduce((acc, workout) => {
                const month = format(new Date(workout.date), 'MMM yyyy')
                const existing = acc.find(m => m.month === month)

                if (existing) {
                    existing.count++
                } else {
                    acc.push({ month, count: 1 })
                }

                return acc
            }, [] as { month: string; count: number }[])

            const mostFrequentWorkout = Object.entries(planCounts)
                .sort(([, a], [, b]) => b - a)[0]?.[0] || 'None'

            const totalWeeks = Math.ceil(allWorkouts.length / 7)

            return {
                totalWorkouts: allWorkouts.length,
                currentStreak: calculateStreak(workoutDates),
                monthlyWorkouts: monthlySnapshot.size,
                averageWorkoutsPerWeek: totalWeeks > 0 ? allWorkouts.length / totalWeeks : 0,
                completionRate: (monthlySnapshot.size / new Date(endDate).getDate()) * 100,
                mostFrequentWorkout,
                lastWorkoutDate: workoutDates[0] || null,
                workoutsByMonth: workoutsByMonth.slice(-6), // Last 6 months
            }
        },
        enabled: !!currentUser?.uid,
    })
}