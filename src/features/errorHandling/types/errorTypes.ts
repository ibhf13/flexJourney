export type ErrorSeverity = 'error' | 'warning' | 'info' | 'success'

export interface ErrorOptions {
    duration?: number
    persist?: boolean
    id?: string
}

export interface ErrorState {
    message: string
    severity: ErrorSeverity
    options?: ErrorOptions
}

export interface ApiError {
    code: string
    message: string
    details?: Record<string, unknown>
}

export interface LoadingState {
    isLoading: boolean
    error: Error | null
}