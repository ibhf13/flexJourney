export enum ErrorSeverity {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success'
}

export enum ErrorCode {
    NETWORK_ERROR = 'ERR_NETWORK',
    TIMEOUT = 'ERR_TIMEOUT',
    CANCELED = 'ERR_CANCELED',
    UNKNOWN = 'UNKNOWN_ERROR',
    SERVER_ERROR = 'SERVER_ERROR',
    INVALID_INPUT = 'INVALID_INPUT',
    REQUIRED_FIELD = 'REQUIRED_FIELD'
}

export interface ErrorOptions {
    readonly duration?: number
    readonly persist?: boolean
    readonly id?: string
}

export interface ErrorState {
    readonly message: string
    readonly severity: ErrorSeverity
    readonly options?: ErrorOptions
}

export interface ApiError {
    readonly code: ErrorCode | string
    readonly message: string
    readonly details?: Readonly<Record<string, unknown>>
}

export interface LoadingState {
    readonly isLoading: boolean
    readonly error: Error | null
}