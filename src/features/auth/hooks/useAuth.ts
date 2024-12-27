import { auth } from '@/config/firebase'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { ErrorSeverity } from '@/features/errorHandling/types/errorTypes'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { authApi } from '../api/AuthServices'
import { User } from '../types/AuthTypes'
import { useAuthError } from './useAuthError'

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [isInitializing, setIsInitializing] = useState(true)
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
                    provider: firebaseUser.providerData[0]?.providerId || 'email',
                })
                setIsAuthenticated(true)
            } else {
                setUser(null)
                setIsAuthenticated(false)
            }

            setIsInitializing(false)
        })

        return () => unsubscribe()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            setLoading(true)
            setError(null)
            const user = await authApi.login(email, password)

            setUser(user)
            setIsAuthenticated(true)
        } catch (error) {
            const errorMessage = getErrorMessage(error)

            setError(errorMessage)
            handleError(errorMessage, ErrorSeverity.ERROR)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const register = async (email: string, password: string, displayName: string) => {
        try {
            setLoading(true)
            setError(null)
            const user = await authApi.register(email, password, displayName)

            setUser(user)
            setIsAuthenticated(true)
        } catch (error) {
            const errorMessage = getErrorMessage(error)

            setError(errorMessage)
            handleError(errorMessage, ErrorSeverity.ERROR)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            await authApi.logout()
        } catch (error) {
            handleError(getErrorMessage(error), ErrorSeverity.ERROR)
            throw error
        }
    }

    const resetPassword = async (email: string) => {
        try {
            await authApi.resetPassword(email)
        } catch (error) {
            handleError(getErrorMessage(error), ErrorSeverity.ERROR)
            throw error
        }
    }

    const googleSignIn = async () => {
        try {
            setLoading(true)
            setError(null)
            const user = await authApi.googleSignIn()

            setUser(user)
            setIsAuthenticated(true)
        } catch (error) {
            const errorMessage = getErrorMessage(error)

            setError(errorMessage)
            handleError(errorMessage, ErrorSeverity.ERROR)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {
        user,
        currentUser: user,
        isLoading,
        isInitializing,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        resetPassword,
        googleSignIn,
    }
}