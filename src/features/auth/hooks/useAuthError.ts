import { FirebaseError } from 'firebase/app';

const AUTH_ERROR_CODES: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-credential': 'Invalid credentials.',
    'auth/invalid-custom-token': 'Invalid custom token.',
    'auth/invalid-verification-code': 'Invalid verification code.',
    'auth/invalid-verification-id': 'Invalid verification ID.',
    'auth/invalid-password': 'Invalid password.',
};

export const useAuthError = () => {
    const getErrorMessage = (error: unknown) => {
        if (error instanceof FirebaseError) {
            return AUTH_ERROR_CODES[error.code] || error.message;
        }
        return 'An unexpected error occurred';
    };

    return { getErrorMessage };
};