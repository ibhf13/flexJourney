import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useAuthContext } from '../contexts/AuthContext'
import { AuthCredentials } from '../types/AuthTypes'
import { createAuthHandler } from '../utils/authErrorHandler'
import { useAuthError } from './useAuthError'
import { useAuthSuccess } from './useAuthSuccess'
import { useLoadingState } from './useLoadingState'

export const useLoginHandler = () => {
  const { loadingStates, withLoading } = useLoadingState({
    login: false,
    google: false
  })
  const { handleAuthSuccess } = useAuthSuccess()
  const { handleError } = useErrorHandler()
  const { login, googleSignIn } = useAuthContext()
  const { getErrorMessage } = useAuthError()

  const handleLogin = createAuthHandler<void, [AuthCredentials]>(
    async (credentials) => {
      await withLoading('login', () =>
        login(credentials.email, credentials.password)
      )
    },
    {
      handleError,
      getErrorMessage,
      onSuccess: () => handleAuthSuccess('LOGIN_SUCCESS')
    }
  )

  const handleGoogleSignIn = createAuthHandler<void, []>(
    async () => {
      await withLoading('google', googleSignIn)
    },
    {
      handleError,
      getErrorMessage,
      onSuccess: () => handleAuthSuccess('LOGIN_SUCCESS')
    }
  )

  return {
    isLoading: loadingStates.login,
    isGoogleLoading: loadingStates.google,
    handleLogin,
    handleGoogleSignIn
  }
}
