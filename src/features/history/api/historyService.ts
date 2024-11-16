import { db } from '@/config/firebase'
import { COLLECTIONS } from '@/config/firebase/collections'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore'
import { HistoryFilters, TrainingHistoryEntry } from '../types/HistoryTypes'

const TRAINING_HISTORY_COLLECTION = COLLECTIONS.USERS.SUB_COLLECTIONS.TRAINING_HISTORY

const convertToTimestamp = (date: string | Date) => {
    return Timestamp.fromDate(new Date(date))
}

const convertToISOString = (date: Timestamp | string | Date) => {
    if (date instanceof Timestamp) {
        return date.toDate().toISOString()
    }

    return date instanceof Date ? date.toISOString() : date
}

export const historyService = {
    create: async (userId: string, entry: TrainingHistoryEntry) => {
        const historyRef = collection(db, 'users', userId, TRAINING_HISTORY_COLLECTION)
        const firestoreEntry = {
            ...entry,
            date: convertToTimestamp(entry.date),
            exercises: entry.exercises.map(exercise => ({
                ...exercise,
                completedAt: convertToTimestamp(exercise.completedAt)
            }))
        }

        const docRef = await addDoc(historyRef, firestoreEntry)

        return docRef.id
    },

    getAll: async (userId: string, filters?: HistoryFilters) => {
        const historyRef = collection(db, 'users', userId, TRAINING_HISTORY_COLLECTION)
        let baseQuery = query(historyRef, orderBy('date', 'desc'))

        if (filters) {
            const { startDate, endDate, planId } = filters
            const conditions = []

            if (startDate) conditions.push(where('date', '>=', convertToTimestamp(startDate)))
            if (endDate) conditions.push(where('date', '<=', convertToTimestamp(endDate)))
            if (planId) conditions.push(where('planId', '==', planId))

            baseQuery = query(historyRef, ...conditions, orderBy('date', 'desc'))
        }

        const snapshot = await getDocs(baseQuery)

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: convertToISOString(doc.data().date),
            exercises: doc.data().exercises.map((exercise: any) => ({
                ...exercise,
                completedAt: convertToISOString(exercise.completedAt)
            }))
        })) as (TrainingHistoryEntry)[]
    },

    delete: async (userId: string, entryId: string) => {
        try {
            const entryRef = doc(
                db,
                'users',
                userId,
                'trainingHistory',
                entryId
            )

            const docSnap = await getDoc(entryRef)

            if (!docSnap.exists()) {
                throw new Error(`Document not found at path: ${entryRef.path}`)
            }

            await deleteDoc(entryRef)

            return entryId
        } catch (error) {
            console.error('Error deleting document:', {
                error,
                userId,
                entryId
            })
            throw error
        }
    },

    update: async (userId: string, entryId: string, updates: Partial<TrainingHistoryEntry>) => {
        const entryRef = doc(db, 'users', userId, TRAINING_HISTORY_COLLECTION, entryId)
        const { date, ...otherUpdates } = updates

        const firestoreUpdates = {
            ...otherUpdates,
            updatedAt: Timestamp.now()
        }

        await updateDoc(entryRef, firestoreUpdates)

        return entryId
    }
}