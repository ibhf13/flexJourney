export type FirebaseError = {
    code: string
    message: string
}

export const FIREBASE_ERROR_CODES = {
    PERMISSION_DENIED: 'permission-denied',
    NOT_FOUND: 'not-found',
    ALREADY_EXISTS: 'already-exists',
    UNAUTHENTICATED: 'unauthenticated',
} as const

export const FIREBASE_ERROR_MESSAGES = {
    [FIREBASE_ERROR_CODES.PERMISSION_DENIED]: 'You do not have permission to perform this action',
    [FIREBASE_ERROR_CODES.NOT_FOUND]: 'The requested resource was not found',
    [FIREBASE_ERROR_CODES.ALREADY_EXISTS]: 'This resource already exists',
    [FIREBASE_ERROR_CODES.UNAUTHENTICATED]: 'Please sign in to continue',
    'auth/wrong-password': 'Invalid email or password',
    'auth/user-not-found': 'No account found with this email',
    'auth/email-already-in-use': 'This email is already registered'
} as const

export const handleFirebaseError = (error: any): FirebaseError => {
    const firebaseError = error as FirebaseError

    return {
        code: firebaseError.code || 'unknown-error',
        message: firebaseError.message || 'An unexpected error occurred'
    }
}

export const isFirebaseError = (error: any): error is FirebaseError => {
    return 'code' in error && 'message' in error
}

export const getErrorMessage = (code: string): string => {
    return FIREBASE_ERROR_MESSAGES[code as keyof typeof FIREBASE_ERROR_MESSAGES] || 'An unexpected error occurred'
}