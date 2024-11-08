import { MOCK_STREAK_DATA } from '../mocks/mockStreakData'

export const getMockStreakData = async (userId: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const userData = MOCK_STREAK_DATA[userId]

    if (!userData) {
        throw new Error('User not found')
    }

    return userData
}

export const updateMockStreakData = async (
    userId: string,
    workoutDate: string
) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const userData = MOCK_STREAK_DATA[userId]

    if (!userData) {
        throw new Error('User not found')
    }

    // Add the new date and update streak
    const newDates = [...new Set([...userData.dates, workoutDate])].sort()

    return {
        ...userData,
        dates: newDates,
        lastWorkoutDate: workoutDate,
        lastUpdated: new Date().toISOString()
    }
}