import { useCallback } from 'react'
import { ErrorOptions, ErrorSeverity } from '../types/errorTypes'
import { getErrorMessage } from '../utils/errorUtils'
import { showToast } from '../utils/toastUtils'

interface ErrorHandler {
    handleError: (error: unknown, severity?: ErrorSeverity, options?: ErrorOptions) => void
    showMessage: (message: string, severity?: ErrorSeverity, options?: ErrorOptions) => void
}

export const useErrorHandler = (): ErrorHandler => {
    const handleError = useCallback((
        error: unknown,
        severity: ErrorSeverity = ErrorSeverity.ERROR,
        options?: ErrorOptions
    ): void => {
        const message = typeof error === 'string' ? error : getErrorMessage(error)

        showToast(message, severity, options)
    }, [])

    const showMessage = useCallback((
        message: string,
        severity: ErrorSeverity = ErrorSeverity.INFO,
        options?: ErrorOptions
    ): void => {
        showToast(message, severity, options)
    }, [])

    return {
        handleError,
        showMessage
    }
}