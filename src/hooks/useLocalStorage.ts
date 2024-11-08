
interface LocalStorage {
    getValue: <T>(key: string) => T | null
    setValue: (key: string, value: unknown) => void
    removeValue: (key: string) => void
    clearAll: () => void
    hasValue: (key: string) => boolean
}

export const useLocalStorage = (): LocalStorage => {
    const getValue = <T>(key: string): T | null => {
        try {
            const item = window.localStorage.getItem(key)

            return item ? JSON.parse(item) : null
        } catch (error) {
            console.error('Error reading from localStorage:', error)

            return null
        }
    }

    const setValue = (key: string, value: unknown): void => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error('Error writing to localStorage:', error)
        }
    }

    const removeValue = (key: string): void => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.error('Error removing from localStorage:', error)
        }
    }

    const clearAll = (): void => {
        try {
            window.localStorage.clear()
        } catch (error) {
            console.error('Error clearing localStorage:', error)
        }
    }

    const hasValue = (key: string): boolean => {
        return window.localStorage.getItem(key) !== null
    }

    return {
        getValue,
        setValue,
        removeValue,
        clearAll,
        hasValue,
    }
}