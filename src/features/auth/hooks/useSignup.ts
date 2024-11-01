import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useNotification } from '@/features/Feedback'
import { useAuthError } from './useAuthError'

interface SignupFormData {
  email: string
  password: string
  displayName: string
}

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const { register, googleSignIn } = useAuth()
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const { getErrorMessage } = useAuthError()

  const handleSignup = async (data: SignupFormData) => {
    try {
      setIsLoading(true)
      await register(data.email, data.password, data.displayName)
      showNotification({
        message: 'Account created successfully!',
        severity: 'success',
      })
      navigate('/dashboard')
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
      setIsGoogleLoading(true)
      await googleSignIn()
      showNotification({
        message: 'Signed in successfully with Google!',
        severity: 'success',
      })
      navigate('/dashboard')
    } catch (error) {
      showNotification({
        message: getErrorMessage(error),
        severity: 'error',
      })
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
