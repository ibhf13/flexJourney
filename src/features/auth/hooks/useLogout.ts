import { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '@/features/Feedback'
import { useAuthError } from './useAuthError'

export const useLogout = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
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
