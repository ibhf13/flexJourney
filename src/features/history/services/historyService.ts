import { db } from '@/config/firebase/firebase'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore'
import { HistoryFilters, TrainingHistoryEntry } from '../types/HistoryTypes'

const convertToISOString = (date: Timestamp | string | Date) => {
    if (date instanceof Timestamp) {
        return date.toDate().toISOString()
    }

    if (date instanceof Date) {
        return date.toISOString()
    }

    return date // If it's already a string, return as is
}

export const historyService = {
    async saveTrainingHistory(userId: string, entry: TrainingHistoryEntry) {
        try {
            const historyRef = collection(db, `users/${userId}/trainingHistory`)
            const firestoreEntry = {
                ...entry,
                date: Timestamp.fromDate(new Date(entry.date)),
                exercises: entry.exercises.map(exercise => ({
                    ...exercise,
                    completedAt: Timestamp.fromDate(new Date(exercise.completedAt))
                }))
            }

            await addDoc(historyRef, firestoreEntry)
        } catch (error) {
            console.error('Error saving training history:', error)
            throw new Error('Failed to save training history')
        }
    },

    async getTrainingHistory(userId: string, filters?: HistoryFilters) {
        try {
            const historyRef = collection(db, `users/${userId}/trainingHistory`)
            let q = query(historyRef, orderBy('date', 'desc'))

            if (filters?.startDate) {
                q = query(q, where('date', '>=', Timestamp.fromDate(filters.startDate)))
            }

            if (filters?.endDate) {
                q = query(q, where('date', '<=', Timestamp.fromDate(filters.endDate)))
            }

            if (filters?.planId) {
                q = query(q, where('planId', '==', filters.planId))
            }

            const querySnapshot = await getDocs(q)

            return querySnapshot.docs.map(doc => {
                const data = doc.data()
                
                return {
                    ...data,
                    id: doc.id,
                    date: convertToISOString(data.date),
                    exercises: data.exercises.map((exercise: any) => ({
                        ...exercise,
                        completedAt: convertToISOString(exercise.completedAt)
                    }))
                } as TrainingHistoryEntry
            })
        } catch (error) {
            console.error('Error fetching training history:', error)
            throw new Error('Failed to fetch training history')
        }
    },

    async deleteTrainingEntry(userId: string, entryId: string) {
        try {
            const entryRef = doc(db, `users/${userId}/trainingHistory/${entryId}`)

            await deleteDoc(entryRef)
        } catch (error) {
            console.error('Error deleting training entry:', error)
            throw new Error('Failed to delete training entry')
        }
    },

    async updateTrainingEntry(
        userId: string,
        entryId: string,
        updates: Partial<TrainingHistoryEntry>
    ) {
        try {
            const entryRef = doc(db, `users/${userId}/trainingHistory/${entryId}`)
            const { date, ...otherUpdates } = updates

            const firestoreUpdates = {
                ...otherUpdates,
                updatedAt: Timestamp.now()
            }

            await updateDoc(entryRef, firestoreUpdates)
        } catch (error) {
            console.error('Error updating training entry:', error)
            throw new Error('Failed to update training entry')
        }
    }
}