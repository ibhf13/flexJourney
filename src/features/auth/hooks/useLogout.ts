import { auth } from '@/config/firebase/firebaseConfig'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { ErrorSeverity } from '@/features/errorHandling/types/errorTypes'
import { signOut } from 'firebase/auth'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthError } from './useAuthError'

export const useLogout = () => {
  const navigate = useNavigate()
  const { handleError, showMessage } = useErrorHandler()
  const { getErrorMessage } = useAuthError()

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth)
      showMessage('Logged out successfully', ErrorSeverity.SUCCESS)
      navigate('/login')
    } catch (error) {
      handleError(getErrorMessage(error), ErrorSeverity.ERROR)
    }
  }, [navigate, handleError, getErrorMessage, showMessage])

  return { handleLogout }
}
