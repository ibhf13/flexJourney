import { useAuthContext } from '@/contexts/AuthContext'
import { useNotification } from '@/features/Feedback'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FirebaseError } from 'firebase/app'
import { fetchUserProfile, updateUserProfile } from '../api/profileService'
import type { UpdateProfileData, UserProfile } from '../types/ProfileTypes'

export const useProfile = () => {
    const { currentUser } = useAuthContext()
    const queryClient = useQueryClient()
    const { showNotification } = useNotification()

    const {
        data: profile,
        isLoading,
        error,
        refetch,
    } = useQuery<UserProfile | null>({
        queryKey: ['profile', currentUser?.uid],
        queryFn: async () => {
            if (!currentUser?.uid) return null

            return fetchUserProfile(currentUser.uid)
        },
        enabled: !!currentUser?.uid,
        retry: (failureCount, error) => {
            if (error instanceof FirebaseError && error.code === 'not-found') return false

            return failureCount < 3
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    })

    const {
        mutate: updateProfile,
        isPending: isUpdating,
        reset: resetMutation,
    } = useMutation({
        mutationFn: async (data: UpdateProfileData) => {
            if (!currentUser?.uid) throw new Error('User not authenticated')
            await updateUserProfile(currentUser.uid, data)

            return data
        },
        onSuccess: () => {
            showNotification({ message: 'Profile updated successfully', severity: 'success' })
            queryClient.invalidateQueries({ queryKey: ['profile', currentUser?.uid] })
        },
        onError: (error) => {
            showNotification({
                message: error instanceof Error ? error.message : 'Failed to update profile',
                severity: 'error',
            })
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