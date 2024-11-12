import { useAuthContext } from '@/contexts/AuthContext'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthError } from './useAuthError'

interface SignupFormData {
  email: string
  password: string
  displayName: string
}

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const { register, googleSignIn, isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { handleError, showMessage } = useErrorHandler()
  const { getErrorMessage } = useAuthError()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSignup = async (data: SignupFormData) => {
    try {
      setIsLoading(true)
      await register(data.email, data.password, data.displayName)
      showMessage('Account created successfully!', 'success')
    } catch (error) {
      handleError(getErrorMessage(error), 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true)
      await googleSignIn()
      showMessage('Signed in successfully with Google!', 'success')
    } catch (error) {
      handleError(getErrorMessage(error), 'error')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return {
    isLoading,
    isGoogleLoading,
    handleSignup,
    handleGoogleSignIn,
  }
}
