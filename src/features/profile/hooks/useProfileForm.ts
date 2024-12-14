import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { ErrorSeverity } from '@/features/errorHandling/types/errorTypes'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateUserProfile } from '../api/profileService'
import { ProfileFormData, UpdateProfileData, UserProfile } from '../types/ProfileTypes'
import { DEFAULT_FORM_VALUES } from '../utils/profileConstants'
import { profileSchema } from '../utils/profileValidationSchema'

interface UseProfileFormProps {
    initialData?: Partial<UserProfile>
    onSuccess?: () => void
}

export const useProfileForm = ({ initialData, onSuccess }: UseProfileFormProps = {}) => {
    const [isDirty, setIsDirty] = useState(false)
    const { currentUser } = useAuthContext()
    const queryClient = useQueryClient()
    const { handleError, showMessage } = useErrorHandler()

    const convertedInitialData: Partial<ProfileFormData> = {
        ...initialData,
        birthDate: initialData?.birthDate ? new Date(initialData.birthDate) : undefined,
        fitnessGoals: initialData?.fitnessGoals ?? [],
    }

    const methods = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            ...DEFAULT_FORM_VALUES,
            ...convertedInitialData,
        },
        mode: 'onChange',
    })

    const { mutate: submitForm, isPending } = useMutation({
        mutationFn: (data: UpdateProfileData) => {
            if (!currentUser?.uid) throw new Error('No user authenticated')

            return updateUserProfile(currentUser.uid, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
            showMessage('Profile updated successfully', ErrorSeverity.SUCCESS)
            setIsDirty(false)
            onSuccess?.()
        },
        onError: (error) => {
            handleError(error instanceof Error ? error.message : 'Failed to update profile', ErrorSeverity.ERROR)
        },
    })

    const handleSubmit = methods.handleSubmit((data: ProfileFormData) => {
        const formattedData: UpdateProfileData = {
            ...data,
            birthDate: data.birthDate?.toISOString(),
            updatedAt: new Date().toISOString(),
        }

        submitForm(formattedData)
    })

    const watchAllFields = methods.watch()

    useEffect(() => {
        if (Object.keys(methods.formState.dirtyFields).length > 0) {
            setIsDirty(true)
        }
    }, [watchAllFields, methods.formState.dirtyFields])

    const resetForm = () => {
        methods.reset(convertedInitialData)
        setIsDirty(false)
    }

    return {
        ...methods,
        handleSubmit,
        resetForm,
        isSubmitting: isPending,
        isDirty,
    }
}