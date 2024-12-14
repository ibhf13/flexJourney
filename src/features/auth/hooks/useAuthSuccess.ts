import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { ErrorSeverity } from '@/features/errorHandling/types/errorTypes'
import { useNavigate } from 'react-router-dom'
import { AUTH_MESSAGES } from '../constants/authConstants'

export const useAuthSuccess = () => {
    const navigate = useNavigate()
    const { showMessage } = useErrorHandler()

    const handleAuthSuccess = (
        message: keyof typeof AUTH_MESSAGES,
        redirectPath = '/'
    ) => {
        navigate(redirectPath)
        showMessage(AUTH_MESSAGES[message], ErrorSeverity.SUCCESS)
    }

    return { handleAuthSuccess }
} 