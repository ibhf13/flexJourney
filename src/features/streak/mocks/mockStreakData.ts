import { UserBadges } from '../types/streakTypes'
import { MOCK_ACHIEVEMENTS } from './mockAchievements'
import { MOCK_BADGES } from './mockBadges'

export interface MockStreakData {
    userId: string
    streak: number
    dates: string[]
    lastWorkoutDate: string | null
    badges: UserBadges
    highestStreak: number
    lastUpdated: string
    createdAt: string
}

export const MOCK_STREAK_DATA: Record<string, MockStreakData> = {
    'VvjUP3SpQGNwARNFQl1HjG725Ly1': {
        userId: 'VvjUP3SpQGNwARNFQl1HjG725Ly1',
        streak: 40,
        highestStreak: 40,
        dates: [
            '2024-03-10',
            '2024-03-11',
            '2024-03-12',
            '2024-03-13',
            '2024-03-14',
            '2024-03-15',
            '2024-03-16',
            '2024-03-17',
            '2024-03-18',
            '2024-03-19',
            '2024-03-20',
            '2024-03-21',
            '2024-03-22',
            '2024-03-23',
            '2024-03-24',
            '2024-03-25',
        ],
        lastWorkoutDate: '2024-03-18T10:30:00Z',
        badges: {
            userId: 'VvjUP3SpQGNwARNFQl1HjG725Ly1',
            unlockedBadges: [
                { ...MOCK_BADGES[0], unlockedAt: '2024-03-10T08:00:00Z' },
                { ...MOCK_BADGES[1], unlockedAt: '2024-03-12T15:30:00Z' }
            ],
            achievements: MOCK_ACHIEVEMENTS,
            lastUpdated: '2024-03-14T15:00:00Z'
        },
        lastUpdated: '2024-03-14T15:00:00Z',
        createdAt: '2024-03-10T08:00:00Z'
    },
}