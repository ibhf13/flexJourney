import { Badge } from '../types/streakTypes'

export const MOCK_BADGES: Badge[] = [
    {
        id: 'BEGINNER',
        name: 'Getting Started',
        description: 'Complete your first workout',
        icon: '🌱',
        level: 'bronze',
        requirement: 1,
    },
    {
        id: 'THREE_DAY_STREAK',
        name: 'Three Day Warrior',
        description: 'Maintain a 3-day streak',
        icon: '🔥',
        level: 'bronze',
        requirement: 3,
    },
    {
        id: 'WEEK_WARRIOR',
        name: 'Week Warrior',
        description: 'Complete a 7-day streak',
        icon: '⚔️',
        level: 'silver',
        requirement: 7,
    },
    {
        id: 'TWO_WEEK_MASTER',
        name: 'Fortnight Master',
        description: 'Maintain a 14-day streak',
        icon: '🏆',
        level: 'gold',
        requirement: 14,
    },
    {
        id: 'MONTH_CHAMPION',
        name: 'Monthly Champion',
        description: 'Complete a 30-day streak',
        icon: '👑',
        level: 'platinum',
        requirement: 30,
    },
    {
        id: 'DIAMOND_ACHIEVER',
        name: 'Diamond Achiever',
        description: 'Reach a 100-day streak',
        icon: '💎',
        level: 'diamond',
        requirement: 100,
    },
]