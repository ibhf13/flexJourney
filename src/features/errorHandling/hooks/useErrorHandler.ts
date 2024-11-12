import { useCallback } from 'react'
import { ErrorOptions, ErrorSeverity } from '../types/errorTypes'
import { getErrorMessage } from '../utils/errorUtils'
import { showToast } from '../utils/toastUtils'

export const useErrorHandler = () => {
    const handleError = useCallback((
        error: unknown,
        severity: ErrorSeverity = 'error',
        options?: ErrorOptions
    ) => {
        const message = typeof error === 'string' ? error : getErrorMessage(error)

        showToast(message, severity, options)
    }, [])

    const showMessage = useCallback((
        message: string,
        severity: ErrorSeverity = 'info',
        options?: ErrorOptions
    ) => {
        showToast(message, severity, options)
    }, [])

    return {
        handleError,
        showMessage
    }
}