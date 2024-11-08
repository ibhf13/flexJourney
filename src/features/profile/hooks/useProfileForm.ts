import { useAuthContext } from '@/contexts/AuthContext'
import { useNotification } from '@/features/Feedback'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateUserProfile } from '../api/profileService'
import { ProfileFormData, UpdateProfileData, UserProfile } from '../types/ProfileTypes'
import { profileSchema } from '../utils/validationSchema'

interface UseProfileFormProps {
    initialData?: Partial<UserProfile>
    onSuccess?: () => void
}

export const useProfileForm = ({ initialData, onSuccess }: UseProfileFormProps = {}) => {
    const [isDirty, setIsDirty] = useState(false)
    const { currentUser } = useAuthContext()
    const queryClient = useQueryClient()
    const { showNotification } = useNotification()

    // Convert the initial data to match the form data structure
    const convertedInitialData: Partial<ProfileFormData> = {
        ...initialData,
        birthDate: initialData?.birthDate ? new Date(initialData.birthDate) : undefined,
        fitnessGoals: initialData?.fitnessGoals || [],
    }

    // Define default values
    const defaultValues: ProfileFormData = {
        firstName: '',
        lastName: '',
        displayName: '',
        bio: '',
        height: 0,
        weight: 0,
        fitnessLevel: 'Beginner',
        gender: 'Prefer not to say', // Set a default value
        birthDate: undefined,
        phoneNumber: '',
        fitnessGoals: [],
        // Add any other required fields with default values
    }

    const methods = useForm<ProfileFormData>({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            ...defaultValues,
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
            showNotification({
                message: 'Profile updated successfully',
                severity: 'success',
            })
            setIsDirty(false)
            onSuccess?.()
        },
        onError: (error) => {
            showNotification({
                message: error instanceof Error ? error.message : 'Failed to update profile',
                severity: 'error',
            })
        },
    })

    const handleSubmit = methods.handleSubmit((data: ProfileFormData) => {
        // Convert form data to update data format
        const formattedData: UpdateProfileData = {
            ...data,
            birthDate: data.birthDate?.toISOString(),
            updatedAt: new Date().toISOString(),
        }

        submitForm(formattedData)
    })

    // Track form changes
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