import { auth } from '@/config/firebase/firebase'
import { useNotificationContext } from '@/features/Feedback'
import { signOut } from 'firebase/auth'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthError } from './useAuthError'

export const useLogout = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotificationContext()
  const { getErrorMessage } = useAuthError()

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth)
      showNotification({
        message: 'Logged out successfully',
        severity: 'success',
      })
      navigate('/login')
    } catch (error) {
      showNotification({
        message: getErrorMessage(error),
        severity: 'error',
      })
    }
  }, [navigate, showNotification, getErrorMessage])

  return { handleLogout }
}
