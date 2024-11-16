import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { Timestamp } from '@firebase/firestore'
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

    const defaultProfileData: UserProfile = {
        id: currentUser?.uid || '',
        email: currentUser?.email || '',
        displayName: currentUser?.displayName || 'Anonymous User',
        photoURL: currentUser?.photoURL || '',
        fitnessLevel: 'Beginner',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
    }
    const displayedProfile = profile || defaultProfileData

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