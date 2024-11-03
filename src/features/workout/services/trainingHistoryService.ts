import { db } from '@/config/firebase'
import {
    doc,
    setDoc,
    collection,
    query,
    where,
    getDocs,
    serverTimestamp
} from 'firebase/firestore'
import { TrainingHistoryEntry } from '../types/TrainingHistoryTypes'

export const trainingHistoryService = {
    async saveTrainingHistory(userId: string, entry: TrainingHistoryEntry): Promise<void> {
        try {
            const userTrainingHistoryRef = collection(db, 'users', userId, 'trainingHistory')
            const docRef = doc(userTrainingHistoryRef, entry.id)

            const entryWithTimestamp = {
                ...entry,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            }

            await setDoc(docRef, entryWithTimestamp, { merge: true })
        } catch (error) {
            console.error('Error saving training history:', error)
            throw new Error('Failed to save training history')
        }
    },

    async getTrainingHistory(userId: string): Promise<TrainingHistoryEntry[]> {
        try {
            const userTrainingHistoryRef = collection(db, 'users', userId, 'trainingHistory')
            const q = query(
                userTrainingHistoryRef,
                where('date', '>=', new Date().toISOString().split('T')[0])
            )

            const snapshot = await getDocs(q)
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as TrainingHistoryEntry))
        } catch (error) {
            console.error('Error fetching training history:', error)
            throw new Error('Failed to fetch training history')
        }
    }
}