import { BaseDocument, WithUserId } from '@/config/firebase/types/firebaseTypes'

export type BadgeLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

export interface Badge {
    id: string
    name: string
    description: string
    icon: string
    level: BadgeLevel
    requirement: number
}

export interface UserBadges extends WithUserId {
    unlockedBadges: Badge[]
    achievements: string[]
}

export interface UserStats extends BaseDocument, WithUserId {
    streak: number
    dates: string[]
    lastWorkoutDate: Date | null
    badges: UserBadges
    highestStreak: number
}