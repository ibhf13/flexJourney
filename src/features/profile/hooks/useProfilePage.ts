import { COLLECTIONS } from '@/config/firebase/collections'
import { db } from '@config/firebase'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { Timestamp } from '@firebase/firestore'
import { useMediaQuery, useTheme } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { FitnessLevels, UserProfile } from '../types/ProfileTypes'
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
        baseInfo: {
            email: currentUser?.email || '',
            displayName: currentUser?.displayName || 'Anonymous User',
            photoURL: currentUser?.photoURL || '',
            firstName: '',
            lastName: '',
            bio: '',
            gender: undefined,
        },
        profileMetrics: {
            height: 0,
            weight: 0,
            targetWeight: 0,
            age: 0,
        },
        fitnessDetails: {
            fitnessLevel: FitnessLevels.BEGINNER,
            fitnessGoals: [],
        },
        timestampFields: {
            createdAt: Timestamp.now().toDate(),
            updatedAt: Timestamp.now().toDate()
        }
    }
    const displayedProfile = profile || defaultProfileData

    const handleEditClick = () => setIsEditing(true)
    const handleCloseEdit = () => setIsEditing(false)
    const handleEditSuccess = () => setIsEditing(false)

    const handleAvatarUpdate = async (avatarURL: string) => {
        if (!currentUser?.uid) return

        setIsUpdating(true)
        try {
            const userRef = doc(db, COLLECTIONS.USERS.COLLECTION, currentUser.uid)

            await updateDoc(userRef, {
                photoURL: avatarURL,
                updatedAt: Timestamp.now(),
                avatarUpdatedAt: new Date().toISOString()
            })
        } catch (error) {
            console.error('Error updating avatar:', error)
            throw new Error('Failed to update profile picture')
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
