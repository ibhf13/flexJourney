import { ReactNode, useEffect } from 'react'
import { useErrorBoundary } from '../hooks/useErrorBoundary.ts'
import { useErrorHandler } from '../hooks/useErrorHandler.ts'
import { ErrorFallback } from './ErrorFallback'

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
    onError?: (error: Error) => void
}

export const ErrorBoundary = ({
    children,
    fallback,
    onError
}: ErrorBoundaryProps) => {
    const { error, resetError } = useErrorBoundary()
    const { handleError } = useErrorHandler()

    if (error) {
        if (onError) {
            onError(error)
        }

        if (fallback) {
            return <>{fallback}</>
        }

        return <ErrorFallback error={error} resetError={resetError} />
    }

    return (
        <ErrorEventHandler onError={handleError}>
            {children}
        </ErrorEventHandler>
    )
}

// Handle runtime errors
const ErrorEventHandler = ({
    children,
    onError
}: {
    children: ReactNode
    onError: (error: Error) => void
}) => {
    useEffect(() => {
        const errorHandler = (event: ErrorEvent) => {
            event.preventDefault()
            onError(event.error)
        }

        const promiseHandler = (event: PromiseRejectionEvent) => {
            event.preventDefault()
            onError(new Error(event.reason))
        }

        window.addEventListener('error', errorHandler)
        window.addEventListener('unhandledrejection', promiseHandler)

        return () => {
            window.removeEventListener('error', errorHandler)
            window.removeEventListener('unhandledrejection', promiseHandler)
        }
    }, [onError])

    return <>{children}</>
}