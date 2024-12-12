import { db } from '@config/firebase'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { Timestamp } from '@firebase/firestore'
import { useMediaQuery, useTheme } from '@mui/material'
import { updateProfile, User } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { UserProfile } from '../types/ProfileTypes'
import { useProfile } from './useProfile'

export const useProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const { currentUser } = useAuthContext()
    const { profile, isLoading, error } = useProfile()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [isUpdating, setIsUpdating] = useState(false)

    const defaultProfileData: UserProfile = {
        id: currentUser?.uid || '',
        email: currentUser?.email || '',
        displayName: currentUser?.displayName || 'Anonymous User',
        photoURL: currentUser?.photoURL || '',
        fitnessLevel: 'Beginner',
        createdAt: Timestamp.now().toDate(),
        updatedAt: Timestamp.now().toDate()
    }
    const displayedProfile = profile || defaultProfileData

    const handleEditClick = () => setIsEditing(true)
    const handleCloseEdit = () => setIsEditing(false)
    const handleEditSuccess = () => setIsEditing(false)

    const handleAvatarUpdate = async (avatarURL: string) => {
        if (!currentUser) return

        setIsUpdating(true)
        try {
            await updateProfile(currentUser as User, {
                photoURL: avatarURL
            })

            const profileRef = doc(db, 'profiles', currentUser.uid)

            await updateDoc(profileRef, {
                photoURL: avatarURL,
                updatedAt: Timestamp.now()
            })

        } catch (error) {
            console.error('Error updating avatar:', error)
            throw error
        } finally {
            setIsUpdating(false)
        }
    }

    return {
        isEditing,
        isLoading,
        error,
        isMobile,
        displayedProfile,
        handleEditClick,
        handleCloseEdit,
        handleEditSuccess,
        isUpdating,
        handleAvatarUpdate
    }
}
