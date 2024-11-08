export type BadgeLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

export interface Badge {
    id: string
    name: string
    description: string
    icon: string
    level: BadgeLevel
    requirement: number
    unlockedAt?: string
}

export interface Achievement {
    id: string
    name: string
    description: string
    progress: number
    maxProgress: number
    completed: boolean
    completedAt?: string
    badge: Badge
}

export interface UserBadges {
    userId: string
    unlockedBadges: Badge[]
    achievements: Achievement[]
    lastUpdated: string
}