import { useAuthContext } from '@/contexts/AuthContext'
import { useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { UserProfile } from '../types/ProfileTypes'
import { useProfile } from './useProfile'

export const useProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const { currentUser } = useAuthContext()
    const { profile, isLoading, error } = useProfile()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    // Create default profile data from auth user if no profile exists
    const displayedProfile = profile || {
        id: currentUser?.uid || '',
        email: currentUser?.email || '',
        displayName: currentUser?.displayName || 'Anonymous User',
        photoURL: currentUser?.photoURL,
        fitnessLevel: 'Beginner',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    } as UserProfile

    const handleEditClick = () => setIsEditing(true)
    const handleCloseEdit = () => setIsEditing(false)
    const handleEditSuccess = () => setIsEditing(false)

    return {
        isEditing,
        isLoading,
        error,
        isMobile,
        displayedProfile,
        handleEditClick,
        handleCloseEdit,
        handleEditSuccess,
    }
}