import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useNotification } from '@/features/Feedback'
import { useAuthError } from './useAuthError'

interface LoginCredentials {
  email: string
  password: string
}

export const useLoginHandler = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [authSuccess, setAuthSuccess] = useState(false)
  const { login, googleSignIn, currentUser } = useAuth()
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const { getErrorMessage } = useAuthError()

  useEffect(() => {
    if (authSuccess && currentUser) {
      navigate('/')
      showNotification({
        message: 'Successfully logged in!',
        severity: 'success',
      })
      setAuthSuccess(false)
    }
  }, [authSuccess, currentUser, navigate, showNotification])

  const handleLogin = async (data: LoginCredentials) => {
    try {
      setIsLoading(true)
      await login(data.email, data.password)
      setAuthSuccess(true)
    } catch (error) {
      showNotification({
        message: getErrorMessage(error),
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await googleSignIn()
      setAuthSuccess(true)
    } catch (error) {
      showNotification({
        message: getErrorMessage(error),
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    handleLogin,
    handleGoogleSignIn,
  }
}
