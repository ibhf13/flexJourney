import { auth } from '@/config/firebase'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { ErrorSeverity } from '@/features/errorHandling/types/errorTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword
} from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PasswordFormData } from '../types/ProfileTypes'
import { passwordSchema } from '../utils/profileValidationSchema'

export const usePasswordManagement = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { handleError, showMessage } = useErrorHandler()
    const hasPassword = auth.currentUser?.providerData.some(
        provider => provider.providerId === 'password'
    )

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    })

    const handlePasswordSubmit = handleSubmit(async (data) => {
        if (!auth.currentUser?.email) {
            handleError('No user email found', ErrorSeverity.ERROR)

            return
        }

        try {
            setIsLoading(true)

            if (hasPassword && data.currentPassword) {
                const credential = EmailAuthProvider.credential(
                    auth.currentUser.email,
                    data.currentPassword
                )

                await reauthenticateWithCredential(auth.currentUser, credential)
            }

            await updatePassword(auth.currentUser, data.newPassword)
            showMessage('Password updated successfully', ErrorSeverity.SUCCESS)
            reset()
        } catch (error) {
            handleError(error, ErrorSeverity.ERROR)
        } finally {
            setIsLoading(false)
        }
    })

    return {
        hasPassword,
        handlePasswordSubmit,
        isLoading,
        register,
        errors,
        reset,
    }
} 