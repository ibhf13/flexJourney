import { useCallback, useState } from 'react'

interface UseLoadingErrorReturn {
    loading: boolean
    error: string | null
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    handleError: (error: unknown) => void
    resetState: () => void
}

export const useLoadingError = (initialLoading = false): UseLoadingErrorReturn => {
    const [loading, setLoading] = useState(initialLoading)
    const [error, setError] = useState<string | null>(null)

    const handleError = useCallback((error: unknown) => {
        const errorMessage = error instanceof Error 
            ? error.message 
            : 'An unexpected error occurred'

        setError(errorMessage)
        setLoading(false)
    }, [])

    const resetState = useCallback(() => {
        setLoading(false)
        setError(null)
    }, [])

    return {
        loading,
        error,
        setLoading,
        setError,
        handleError,
        resetState
    }
}