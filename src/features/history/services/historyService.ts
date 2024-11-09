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

const COLLECTION_NAME = 'trainingHistory'

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
        const historyRef = collection(db, 'users', userId, COLLECTION_NAME)
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
        const historyRef = collection(db, 'users', userId, COLLECTION_NAME)
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
            ...doc.data(),
            id: doc.id,
            date: convertToISOString(doc.data().date),
            exercises: doc.data().exercises.map((exercise: any) => ({
                ...exercise,
                completedAt: convertToISOString(exercise.completedAt)
            }))
        })) as TrainingHistoryEntry[]
    },

    delete: async (userId: string, entryId: string) => {
        const entryRef = doc(db, 'users', userId, COLLECTION_NAME, entryId)

        await deleteDoc(entryRef)

        return entryId
    },

    update: async (userId: string, entryId: string, updates: Partial<TrainingHistoryEntry>) => {
        const entryRef = doc(db, 'users', userId, COLLECTION_NAME, entryId)
        const { date, ...otherUpdates } = updates

        const firestoreUpdates = {
            ...otherUpdates,
            updatedAt: Timestamp.now()
        }

        await updateDoc(entryRef, firestoreUpdates)

        return entryId
    }
}