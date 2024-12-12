import { User } from 'firebase/auth'

const ADMIN_EMAILS = ['iebo@example.com']

export const isUserAdmin = (user: User | null): boolean => {
    if (!user) return false

    return ADMIN_EMAILS.includes(user.email || '')
} 