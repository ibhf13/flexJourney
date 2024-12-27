import { db } from '@/config/firebase'
import { COLLECTIONS } from '@/config/firebase/collections'
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { User } from '../types/AuthTypes'

export const useUserData = () => {
    const [userData, setUserData] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useAuthContext()

    useEffect(() => {
        if (!user?.uid) {
            setUserData(null)
            setIsLoading(false)

            return
        }

        const userRef = doc(db, COLLECTIONS.USERS.COLLECTION, user.uid)

        const unsubscribe = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                setUserData(doc.data() as User)
            }

            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [user?.uid])

    return { userData, isLoading }
} 