import { db } from '@/config/firebase'
import { useAuthContext } from '@/contexts/AuthContext'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, updateDoc } from 'firebase/firestore'
import React, { createContext, useCallback, useContext, useState } from 'react'
import { ProfileStats, UserProfile } from '../types/ProfileTypes'
import { createInitialProfile } from '../utils/profileSeeder'

interface ProfileContextType {
    profile: UserProfile | null
    stats: ProfileStats | null
    loading: boolean
    error: string | null
    updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>
    refreshProfile: () => Promise<void>
}

const ProfileContext = createContext<ProfileContextType | null>(null)

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [stats, setStats] = useState<ProfileStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuthContext()

    const fetchProfile = useCallback(async () => {
        try {
            if (!user?.uid) return
            
            const userDoc = await getDoc(doc(db, 'users', user.uid))
            
            if (!userDoc.exists()) {
                await createInitialProfile(
                    user.uid,
                    user.email,
                    user.displayName
                )

                return fetchProfile()
            }

            const profileData = userDoc.data() as UserProfile

            setProfile(profileData)
            
            const trainingHistoryRef = collection(db, 'users', user.uid, 'trainingHistory')
            const trainingQuery = query(
                trainingHistoryRef,
                orderBy('date', 'desc'),
                limit(30)
            )
            
            const historySnapshot = await getDocs(trainingQuery)
            
            const newStats: ProfileStats = {
                totalWorkouts: historySnapshot.size,
                totalExercises: 0,
                streakDays: 0,
                weightProgress: []
            }
            
            historySnapshot.forEach(doc => {
                const workout = doc.data()

                newStats.totalExercises += workout.exercises?.length || 0
            })
            
            setStats(newStats)
        } catch (err) {
            setError('Failed to fetch profile data')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [user?.uid])

    const updateProfile = async (updates: Partial<UserProfile>) => {
        try {
            if (!user?.uid || !profile) return false
            
            const userRef = doc(db, 'users', user.uid)
            const updatedProfile = { ...profile, ...updates }
            
            await updateDoc(userRef, updates)
            setProfile(updatedProfile)
            
            return true
        } catch (err) {
            setError('Failed to update profile')
            console.error(err)

            return false
        }
    }

    React.useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    const value = {
        profile,
        stats,
        loading,
        error,
        updateProfile,
        refreshProfile: fetchProfile
    }

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfileContext = () => {
    const context = useContext(ProfileContext)

    if (!context) {
        throw new Error('useProfileContext must be used within a ProfileProvider')
    }

    return context
}