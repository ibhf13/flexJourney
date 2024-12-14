import { auth } from '@/config/firebase/firebaseConfig'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { ErrorSeverity } from '@/features/errorHandling/types/errorTypes'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import { useAuthError } from './useAuthError'

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const { handleError, showMessage } = useErrorHandler()
  const { getErrorMessage } = useAuthError()

  const handleResetPassword = async (email: string) => {
    try {
      setIsLoading(true)
      await sendPasswordResetEmail(auth, email)
      setIsEmailSent(true)
      showMessage('Password reset email sent successfully!', ErrorSeverity.SUCCESS)
    } catch (error) {
      handleError(getErrorMessage(error), ErrorSeverity.ERROR)
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
