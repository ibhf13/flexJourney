import { useLocalStorage } from './useLocalStorage'

export const STORAGE_KEYS = {
    STREAK: 'streak-data',
    USER_PREFERENCES: 'user-preferences',
    WORKOUT_STATE: 'workout-state',
    AUTH_STATE: 'auth-state',
    EXERCISE_PROGRESS: 'exercise-progress',
} as const

interface UserPreferences {
    theme: 'light' | 'dark'
    language: string
    notifications: boolean
    unit: 'metric' | 'imperial'
}

interface AppStorage {
    getStreakData: <T>() => T | null
    setStreakData: <T>(data: T) => void
    getUserPreferences: () => UserPreferences | null
    setUserPreferences: (prefs: UserPreferences) => void
    clearAppData: () => void
    hasStoredData: (key: keyof typeof STORAGE_KEYS) => boolean
}

const DEFAULT_PREFERENCES: UserPreferences = {
    theme: 'dark',
    language: 'en',
    notifications: true,
    unit: 'metric',
}

export const useAppStorage = (): AppStorage => {
    const { getValue, setValue, clearAll, hasValue } = useLocalStorage()

    const getStreakData = <T>(): T | null => {
        return getValue<T>(STORAGE_KEYS.STREAK)
    }

    const setStreakData = <T>(data: T): void => {
        setValue(STORAGE_KEYS.STREAK, data)
    }

    const getUserPreferences = (): UserPreferences => {
        const prefs = getValue<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES)

        return prefs || DEFAULT_PREFERENCES
    }

    const setUserPreferences = (prefs: UserPreferences): void => {
        setValue(STORAGE_KEYS.USER_PREFERENCES, prefs)
    }

    const clearAppData = (): void => {
        clearAll()
    }

    const hasStoredData = (key: keyof typeof STORAGE_KEYS): boolean => {
        return hasValue(STORAGE_KEYS[key])
    }

    return {
        getStreakData,
        setStreakData,
        getUserPreferences,
        setUserPreferences,
        clearAppData,
        hasStoredData,
    }
}