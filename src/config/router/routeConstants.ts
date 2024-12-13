export const ROUTES = {
    AUTH: {
        LOGIN: '/login',
        SIGNUP: '/signup',
        RESET_PASSWORD: '/reset-password'
    },
    MAIN: {
        HOME: '/',
        PLANS: {
            ROOT: '/plans',
            DETAIL: '/plans/:planId',
            DAY: '/plans/:planId/day/:dayId'
        },
        HISTORY: '/history',
        EXERCISES: '/exercises',
        PROGRESS: '/progress',
        PROFILE: '/profile',
        STATISTICS: '/statistics',
        CALENDAR: '/calendar',
        COMMUNITY: '/community',
        SHOP: '/shop'
    }
} as const 