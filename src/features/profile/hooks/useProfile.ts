import { FIREBASE_ERROR_CODES } from '@/config/firebase/utils/errors'
import { useAuthContext } from '@/features/auth/contexts/AuthContext'
import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchUserProfile, updateUserProfile } from '../api/profileService'
import type { UpdateProfileData, UserProfile } from '../types/ProfileTypes'

const PROFILE_CACHE_TIME = 5 * 60 * 1000 // 5 minutes
const MAX_RETRIES = 3

export const useProfile = () => {
    const { currentUser } = useAuthContext()
    const queryClient = useQueryClient()
    const { handleError, showMessage } = useErrorHandler()

    const {
        data: profile,
        isLoading,
        error,
        refetch,
    } = useQuery<UserProfile | null>({
        queryKey: ['profile', currentUser?.uid],
        queryFn: () => currentUser?.uid ? fetchUserProfile(currentUser.uid) : null,
        enabled: !!currentUser?.uid,
        retry: (failureCount, error: any) => {
            if (error?.code === FIREBASE_ERROR_CODES.NOT_FOUND) return false

            return failureCount < MAX_RETRIES
        },
        staleTime: PROFILE_CACHE_TIME,
    })

    const {
        mutate: updateProfile,
        isPending: isUpdating,
        reset: resetMutation,
    } = useMutation({
        mutationFn: (data: UpdateProfileData) => {
            if (!currentUser?.uid) throw new Error('User not authenticated')

            return updateUserProfile(currentUser.uid, data)
        },
        onSuccess: () => {
            showMessage('Profile updated successfully', 'success')
            queryClient.invalidateQueries({ queryKey: ['profile', currentUser?.uid] })
        },
        onError: (error) => {
            handleError(error instanceof Error ? error.message : 'Failed to update profile')
        },
    })

    return {
        profile,
        isLoading,
        error,
        isUpdating,
        updateProfile,
        refetchProfile: refetch,
        resetProfileMutation: resetMutation,
    }
}