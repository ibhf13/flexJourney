import { db } from '@/config/firebase'
import {
    addDoc,
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    Timestamp,
    where
} from 'firebase/firestore'

interface WorkoutSessionData {
    userId: string
    date: Timestamp
    duration: number
    type: string
    exercises: {
        name: string
        sets: number
        reps: number
        weight?: number
    }[]
    calories: number
}

export const saveWorkoutSession = async (
    userId: string, 
    workoutData: Omit<WorkoutSessionData, 'userId'>
) => {
    try {
        const workoutSessionRef = collection(db, 'workoutSessions')
        const sessionData: WorkoutSessionData = {
            userId,
            ...workoutData
        }
        
        await addDoc(workoutSessionRef, sessionData)
    } catch (error) {
        console.error('Error saving workout session:', error)
        throw error
    }
}

export const fetchUserWorkoutSessions = async (userId: string) => {
    try {
        const workoutSessionRef = collection(db, 'workoutSessions')
        const q = query(
            workoutSessionRef,
            where('userId', '==', userId),
            orderBy('date', 'desc'),
            limit(20)
        )

        const querySnapshot = await getDocs(q)

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    } catch (error) {
        console.error('Error fetching workout sessions:', error)
        throw error
    }
}