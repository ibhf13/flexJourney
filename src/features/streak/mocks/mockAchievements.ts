import { Achievement } from '../types/streakTypes'
import { MOCK_BADGES } from './mockBadges'

export const MOCK_ACHIEVEMENTS: Achievement[] = [
    {
        id: 'BEGINNER_ACHIEVEMENT',
        name: 'First Steps',
        description: 'Start your fitness journey',
        progress: 1,
        maxProgress: 1,
        completed: true,
        completedAt: '2024-03-10T08:00:00Z',
        badge: MOCK_BADGES[0],
    },
    {
        id: 'THREE_DAY_ACHIEVEMENT',
        name: 'Three Day Challenge',
        description: 'Keep going for three days',
        progress: 3,
        maxProgress: 3,
        completed: true,
        completedAt: '2024-03-12T15:30:00Z',
        badge: MOCK_BADGES[1],
    },
    {
        id: 'WEEK_ACHIEVEMENT',
        name: 'Weekly Challenge',
        description: 'Complete a full week of workouts',
        progress: 5,
        maxProgress: 7,
        completed: false,
        badge: MOCK_BADGES[2],
    },
]