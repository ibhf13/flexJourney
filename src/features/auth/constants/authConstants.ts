export const AUTH_ROUTES = {
    LOGIN: '/login',
    SIGNUP: '/signup',
    RESET_PASSWORD: '/reset-password',
} as const

export const AUTH_MESSAGES = {
    LOGIN_SUCCESS: 'Successfully logged in!',
    SIGNUP_SUCCESS: 'Account created successfully!',
    LOGOUT_SUCCESS: 'Logged out successfully',
    PASSWORD_RESET_SUCCESS: 'Password reset email sent successfully!',
} as const 