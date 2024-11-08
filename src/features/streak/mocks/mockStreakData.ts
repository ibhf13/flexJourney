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
    'TZ5qhIjQIphdxb8VlIFhZJJ1NKy2': {
        userId: 'TZ5qhIjQIphdxb8VlIFhZJJ1NKy2',
        streak: 99,
        highestStreak: 99,
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
            userId: 'TZ5qhIjQIphdxb8VlIFhZJJ1NKy2',
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