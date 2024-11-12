import { auth } from '@/config/firebase/firebase'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
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
      showMessage('Logged out successfully', 'success')
      navigate('/login')
    } catch (error) {
      handleError(getErrorMessage(error), 'error')
    }
  }, [navigate, handleError, getErrorMessage, showMessage])

  return { handleLogout }
}
