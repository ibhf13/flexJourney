import { auth } from '@/config/firebase/firebase'
import { useNotificationContext } from '@/features/Feedback'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import { useAuthError } from './useAuthError'

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const { showNotification } = useNotificationContext()
  const { getErrorMessage } = useAuthError()

  const handleResetPassword = async (email: string) => {
    try {
      setIsLoading(true)
      await sendPasswordResetEmail(auth, email)
      setIsEmailSent(true)
      showNotification({
        message: 'Password reset email sent successfully!',
        severity: 'success',
      })
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
    isEmailSent,
    handleResetPassword,
  }
}
