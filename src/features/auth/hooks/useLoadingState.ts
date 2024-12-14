import { useState } from "react"

export const useLoadingState = <T extends Record<string, boolean>>(initialStates: T) => {
    const [loadingStates, setLoadingStates] = useState<T>(initialStates)

    const setLoading = (key: keyof T, value: boolean) => {
        setLoadingStates(prev => ({ ...prev, [key]: value }))
    }

    const withLoading = async <R>(key: keyof T, operation: () => Promise<R>): Promise<R> => {
        try {
            setLoading(key, true)

            return await operation()
        } finally {
            setLoading(key, false)
        }
    }

    return { loadingStates, setLoading, withLoading }
} 