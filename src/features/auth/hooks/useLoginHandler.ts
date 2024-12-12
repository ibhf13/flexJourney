import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthError } from './useAuthError'

interface LoginCredentials {
  email: string
  password: string
}

export const useLoginHandler = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [authSuccess, setAuthSuccess] = useState(false)
  const { handleError, showMessage } = useErrorHandler()
  const { login, googleSignIn, currentUser } = useAuthContext()
  const navigate = useNavigate()
  const { getErrorMessage } = useAuthError()

  useEffect(() => {
    if (authSuccess && currentUser) {
      navigate('/')
      showMessage('Successfully logged in!', 'success')
      setAuthSuccess(false)
    }
  }, [authSuccess, currentUser, navigate, handleError, showMessage])

  const handleLogin = async (data: LoginCredentials) => {
    try {
      setIsLoading(true)
      await login(data.email, data.password)
      setAuthSuccess(true)
    } catch (error) {
      handleError(getErrorMessage(error), 'error')
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
      handleError(getErrorMessage(error), 'error')
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
