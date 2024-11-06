import { auth } from '@/config/firebase/firebase'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextType, User } from './types/AuthTypes'

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setCurrentUser(null)
        setIsAuthenticated(false)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      await signInWithEmailAndPassword(auth, email, password)
      setIsAuthenticated(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login')
      throw err
    }
  }

  const register = async (email: string, password: string, displayName: string) => {
    try {
      setError(null)
      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      await updateProfile(user, { displayName })
      setIsAuthenticated(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration')
      throw err
    }
  }

  const logout = async () => {
    try {
      setError(null)
      await signOut(auth)
      setIsAuthenticated(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during logout')
      throw err
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)
      await sendPasswordResetEmail(auth, email)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during password reset')
      throw err
    }
  }

  const googleSignIn = async () => {
    try {
      setError(null)
      const provider = new GoogleAuthProvider()

      await signInWithPopup(auth, provider)
      setIsAuthenticated(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed')
      throw err
    }
  }

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    currentUser,
    login,
    register,
    logout,
    resetPassword,
    googleSignIn,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}