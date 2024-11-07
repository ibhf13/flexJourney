import { db } from '@/config/firebase'
import { useAuthContext } from '@/contexts/AuthContext'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface TrainingSession {
    id: string
    date: string
    planId?: string
    exercises: Array<{
        id: string
        name: string
        sets: number
        reps: number
        weight?: number
    }>
}

export const useTrainingHistory = (limitCount = 10) => {
    const [history, setHistory] = useState<TrainingSession[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuthContext()

    const fetchHistory = async () => {
        try {
            if (!user?.uid) return
            
            const historyRef = collection(db, 'users', user.uid, 'trainingHistory')
            const historyQuery = query(
                historyRef,
                orderBy('date', 'desc'),
                limit(limitCount)
            )
            
            const snapshot = await getDocs(historyQuery)
            const historyData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as TrainingSession[]
            
            setHistory(historyData)
        } catch (err) {
            setError('Failed to fetch training history')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchHistory()
    }, [user?.uid, limitCount])

    return { history, loading, error, refreshHistory: fetchHistory }
}