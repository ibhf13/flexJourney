
import { ApiError } from '../types/errorTypes'

export const isApiError = (error: unknown): error is ApiError => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        'message' in error
    )
}

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message
    }

    if (isApiError(error)) {
        return error.message
    }

    if (typeof error === 'string') {
        return error
    }

    return 'An unexpected error occurred'
}

export const getErrorCode = (error: unknown): string => {
    if (isApiError(error)) {
        return error.code
    }

    return 'UNKNOWN_ERROR'
}