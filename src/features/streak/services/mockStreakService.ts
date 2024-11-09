import { MOCK_STREAK_DATA, MockStreakData } from '../mocks/mockStreakData'

export const getMockStreakData = async (userId: string): Promise<MockStreakData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // If user doesn't exist, create default data
    if (!MOCK_STREAK_DATA[userId]) {
        MOCK_STREAK_DATA[userId] = createDefaultUserData(userId)
    }

    return MOCK_STREAK_DATA[userId]
}

export const updateMockStreakData = async (
    userId: string,
    workoutDate: string
): Promise<MockStreakData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // If user doesn't exist, create default data
    if (!MOCK_STREAK_DATA[userId]) {
        MOCK_STREAK_DATA[userId] = createDefaultUserData(userId)
    }

    const userData = MOCK_STREAK_DATA[userId]

    // Add the new date and update streak
    const newDates = [...new Set([...userData.dates, workoutDate])].sort()

    const updatedData = {
        ...userData,
        dates: newDates,
        lastWorkoutDate: workoutDate,
        lastUpdated: new Date().toISOString()
    }

    // Update the mock data store
    MOCK_STREAK_DATA[userId] = updatedData

    return updatedData
}

const createDefaultUserData = (userId: string): MockStreakData => ({
    userId,
    streak: 0,
    dates: [],
    lastWorkoutDate: null,
    badges: {
        userId,
        unlockedBadges: [],
        achievements: [],
        lastUpdated: new Date().toISOString()
    },
    highestStreak: 0,
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString()
})