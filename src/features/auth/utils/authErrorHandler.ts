import { ErrorSeverity } from "@/features/errorHandling/types/errorTypes"

interface ErrorHandlerConfig {
    setError?: (error: string | null) => void
    handleError: (error: unknown, severity?: ErrorSeverity) => void
    getErrorMessage: (error: unknown) => string
    onSuccess?: () => void
}

export const createAuthHandler = <TResult, TParams extends unknown[]>(
    operation: (...args: TParams) => Promise<TResult>,
    config: ErrorHandlerConfig
) => {
    const { setError, handleError, getErrorMessage, onSuccess } = config

    return async (...args: TParams): Promise<TResult> => {
        try {
            setError?.(null)
            const result = await operation(...args)

            onSuccess?.()

            return result
        } catch (error) {
            const errorMessage = getErrorMessage(error)

            setError?.(errorMessage)
            handleError(error)
            throw error
        }
    }
} 