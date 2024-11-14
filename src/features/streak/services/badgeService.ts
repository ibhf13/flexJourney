import { Badge, BadgeLevel, UserBadges } from '../types/streakTypes'

export const STREAK_BADGES: Badge[] = [
    {
        id: 'streak-beginner',
        name: 'Beginner Streak',
        description: 'Complete a 3-day workout streak',
        icon: '🔥',
        level: 'bronze',
        requirement: 3,
    },
    {
        id: 'streak-dedicated',
        name: 'Dedicated Athlete',
        description: 'Complete a 7-day workout streak',
        icon: '💪',
        level: 'silver',
        requirement: 7,
    },
    {
        id: 'streak-committed',
        name: 'Committed to Fitness',
        description: 'Complete a 14-day workout streak',
        icon: '🏃',
        level: 'gold',
        requirement: 14,
    },
    {
        id: 'streak-warrior',
        name: 'Fitness Warrior',
        description: 'Complete a 30-day workout streak',
        icon: '⚔️',
        level: 'platinum',
        requirement: 30,
    },
    {
        id: 'streak-legend',
        name: 'Fitness Legend',
        description: 'Complete a 100-day workout streak',
        icon: '👑',
        level: 'diamond',
        requirement: 100,
    },
]

export const getBadgeColor = (level: BadgeLevel): string => {
    const colors = {
        bronze: '#CD7F32',
        silver: '#C0C0C0',
        gold: '#FFD700',
        platinum: '#E5E4E2',
        diamond: '#B9F2FF',
    }

    return colors[level]
}

export const getBadgeForStreak = (streak: number): Badge | undefined => {
    return [...STREAK_BADGES]
        .reverse()
        .find(badge => streak >= badge.requirement)
}

export const getNextBadge = (streak: number): Badge | undefined => {
    return STREAK_BADGES.find(badge => streak < badge.requirement)
}

export const getProgressToNextBadge = (streak: number): number => {
    const nextBadge = getNextBadge(streak)

    if (!nextBadge) return 100

    const prevBadge = STREAK_BADGES[STREAK_BADGES.indexOf(nextBadge) - 1]
    const baseProgress = prevBadge ? prevBadge.requirement : 0
    const progressRange = nextBadge.requirement - baseProgress
    const currentProgress = streak - baseProgress

    return Math.min((currentProgress / progressRange) * 100, 100)
}

export const getUnlockedBadges = (streak: number): Badge[] => {
    return STREAK_BADGES.filter(badge => streak >= badge.requirement)
}

export const createInitialBadges = (userId: string): UserBadges => ({
    userId,
    unlockedBadges: [],
    achievements: []
})