import { auth } from '@/config/firebase'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { authApi } from '../api/AuthServices'
import { User } from '../types/AuthTypes'
import { useAuthError } from './useAuthError'

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { handleError } = useErrorHandler()
    const { getErrorMessage } = useAuthError()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                })
                setIsAuthenticated(true)
            } else {
                setUser(null)
                setIsAuthenticated(false)
            }

            setLoading(false)
        })

        return unsubscribe
    }, [])

    const login = async (email: string, password: string) => {
        try {
            setError(null)
            await authApi.login(email, password)
        } catch (error) {
            const errorMessage = getErrorMessage(error)

            setError(errorMessage)
            handleError(errorMessage, 'error')
            throw error
        }
    }

    const register = async (email: string, password: string, displayName: string) => {
        try {
            setError(null)
            await authApi.register(email, password, displayName)
        } catch (error) {
            const errorMessage = getErrorMessage(error)

            setError(errorMessage)
            handleError(errorMessage, 'error')
            throw error
        }
    }

    const logout = async () => {
        try {
            await authApi.logout()
        } catch (error) {
            handleError(getErrorMessage(error), 'error')
            throw error
        }
    }

    const resetPassword = async (email: string) => {
        try {
            await authApi.resetPassword(email)
        } catch (error) {
            handleError(getErrorMessage(error), 'error')
            throw error
        }
    }

    const googleSignIn = async () => {
        try {
            await authApi.googleSignIn()
        } catch (error) {
            handleError(getErrorMessage(error), 'error')
            throw error
        }
    }

    return {
        user,
        currentUser: user,
        isLoading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        resetPassword,
        googleSignIn,
    }
}