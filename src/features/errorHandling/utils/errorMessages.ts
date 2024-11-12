export const ERROR_MESSAGES: Record<string, string> = {
    // API Errors
    'ERR_NETWORK': 'Network error. Please check your connection.',
    'ERR_TIMEOUT': 'Request timed out. Please try again.',
    'ERR_CANCELED': 'Request was canceled.',

    // Auth Errors
    'auth/user-not-found': 'Invalid email or password.',
    'auth/wrong-password': 'Invalid email or password.',
    'auth/email-already-in-use': 'This email is already registered.',

    // Validation Errors
    'INVALID_INPUT': 'Please check your input and try again.',
    'REQUIRED_FIELD': 'This field is required.',

    // General Errors
    'UNKNOWN_ERROR': 'An unexpected error occurred.',
    'SERVER_ERROR': 'Server error. Please try again later.',
}