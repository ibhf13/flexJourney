import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { ErrorSeverity } from '@/features/errorHandling/types/errorTypes'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateUserProfile } from '../api/profileService'
import { FitnessGoal, FitnessLevels, Genders, UserProfile } from '../types/ProfileTypes'
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

    const convertedInitialData: Partial<UserProfile> = {
        ...initialData,
        baseInfo: {
            firstName: initialData?.baseInfo?.firstName ?? '',
            lastName: initialData?.baseInfo?.lastName ?? '',
            displayName: initialData?.baseInfo?.displayName ?? '',
            bio: initialData?.baseInfo?.bio ?? '',
            photoURL: initialData?.baseInfo?.photoURL ?? '',
            gender: initialData?.baseInfo?.gender ?? Genders.MALE,
        },
        timestampFields: {
            updatedAt: initialData?.timestampFields?.updatedAt ?? new Date(),
        },
        profileMetrics: {
            height: initialData?.profileMetrics?.height ?? 0,
            weight: initialData?.profileMetrics?.weight ?? 0,
            targetWeight: initialData?.profileMetrics?.targetWeight ?? 0,
            age: initialData?.profileMetrics?.age ?? 0,
        },
        fitnessDetails: {
            fitnessGoals: initialData?.fitnessDetails?.fitnessGoals ?? [],
            fitnessLevel: initialData?.fitnessDetails?.fitnessLevel ?? FitnessLevels.BEGINNER,
        },
    }

    const methods = useForm<UserProfile>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            id: currentUser?.uid ?? '',
            ...DEFAULT_FORM_VALUES,
            ...convertedInitialData as Partial<UserProfile>,
        },
        mode: 'onChange',
    })

    const removeDuplicateGoals = (goals: FitnessGoal[]): FitnessGoal[] => {
        return Array.from(new Set(goals))
    }

    const { mutate: submitForm, isPending } = useMutation({
        mutationFn: (data: UserProfile) => {
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

    const handleSubmit = methods.handleSubmit((data: UserProfile) => {
        const formattedData: UserProfile = {
            ...data,
            baseInfo: {
                ...data.baseInfo,
                email: initialData?.baseInfo?.email ?? data.baseInfo.email,
                photoURL: data.baseInfo?.photoURL ?? '',
            },
            profileMetrics: {
                ...data.profileMetrics,
                height: data.profileMetrics?.height ?? 0,
                weight: data.profileMetrics?.weight ?? 0,
                targetWeight: data.profileMetrics?.targetWeight ?? 0,
                age: data.profileMetrics?.age ?? 0,
            },
            fitnessDetails: {
                ...data.fitnessDetails,
                fitnessLevel: data.fitnessDetails?.fitnessLevel ?? FitnessLevels.BEGINNER,
                fitnessGoals: removeDuplicateGoals(data.fitnessDetails?.fitnessGoals ?? []),
            },
            timestampFields: {
                ...data.timestampFields,
                updatedAt: new Date(),
            },
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