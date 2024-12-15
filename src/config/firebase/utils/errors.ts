export type FirebaseError = {
    code: string
    message: string
}

export const FIREBASE_ERROR_CODES = {
    PERMISSION_DENIED: 'permission-denied',
    NOT_FOUND: 'not-found',
    ALREADY_EXISTS: 'already-exists',
    UNAUTHENTICATED: 'unauthenticated',
    WRONG_PASSWORD: 'wrong-password',
    USER_NOT_FOUND: 'user-not-found',
    EMAIL_ALREADY_IN_USE: 'email-already-in-use'
} as const

export const FIREBASE_ERROR_MESSAGES = {
    [FIREBASE_ERROR_CODES.PERMISSION_DENIED]: 'You do not have permission to perform this action',
    [FIREBASE_ERROR_CODES.NOT_FOUND]: 'The requested resource was not found',
    [FIREBASE_ERROR_CODES.ALREADY_EXISTS]: 'This resource already exists',
    [FIREBASE_ERROR_CODES.UNAUTHENTICATED]: 'Please sign in to continue',
    [FIREBASE_ERROR_CODES.WRONG_PASSWORD]: 'Invalid email or password',
    [FIREBASE_ERROR_CODES.USER_NOT_FOUND]: 'No account found with this email',
    [FIREBASE_ERROR_CODES.EMAIL_ALREADY_IN_USE]: 'This email is already registered'
} as const

export const handleFirebaseError = (error: unknown): FirebaseError => {
    if (isFirebaseError(error)) {
        return {
            code: error.code,
            message: error.message
        }
    }

    return {
        code: 'unknown-error',
        message: 'An unexpected error occurred'
    }
}

export const isFirebaseError = (error: unknown): error is FirebaseError => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        'message' in error
    )
}

export const getErrorMessage = (code: string): string => {
    return FIREBASE_ERROR_MESSAGES[code as keyof typeof FIREBASE_ERROR_MESSAGES] || 'An unexpected error occurred'
}