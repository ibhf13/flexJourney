import { db } from '@/config/firebase'
import { COLLECTIONS } from '@/config/firebase/collections'
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore'
import { ExerciseLog, HistoryFilters, TrainingHistoryEntry } from '../types/HistoryTypes'

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

const generateHistoryEntryId = (entry: TrainingHistoryEntry) => {
    const date = new Date(entry.date).toISOString().split('T')[0] // Format: YYYY-MM-DD

    return `${date}_${entry.dayId}_${entry.planId}`
}

export const historyService = {
    create: async (userId: string, entry: TrainingHistoryEntry) => {
        const historyRef = collection(db, 'users', userId, TRAINING_HISTORY_COLLECTION)
        const customId = generateHistoryEntryId(entry)

        // Sanitize the entry for Firestore
        const sanitizedExercises = entry.exercises.map(exercise => ({
            ...exercise,
            sets: exercise.sets.map(set => ({
                weight: set.weight || 0,
                reps: set.reps || 0,
                time: set.time || null,
                unit: set.unit
            })),
            completedAt: convertToTimestamp(exercise.completedAt)
        }))

        const firestoreEntry = {
            ...entry,
            exercises: sanitizedExercises,
            date: convertToTimestamp(entry.date),
            createdAt: convertToTimestamp(entry.createdAt),
            updatedAt: convertToTimestamp(entry.updatedAt)
        } as Record<string, any>

        // Use setDoc instead of addDoc to specify custom ID
        const docRef = doc(historyRef, customId)

        await setDoc(docRef, firestoreEntry)

        return customId
    },

    getAll: async (userId: string, filters?: HistoryFilters) => {
        const historyRef = collection(db, 'users', userId, TRAINING_HISTORY_COLLECTION)

        try {
            let baseQuery

            if (filters) {
                const { startDate, endDate, planId, dayId } = filters

                // Special case for finding today's entry
                if (startDate && endDate && planId && dayId) {
                    // Try the indexed query first
                    try {
                        baseQuery = query(
                            historyRef,
                            where('date', '>=', convertToTimestamp(startDate)),
                            where('date', '<=', convertToTimestamp(endDate)),
                            where('planId', '==', planId),
                            where('dayId', '==', dayId),
                            orderBy('date', 'desc'),
                            limit(1)
                        )

                        const snapshot = await getDocs(baseQuery)

                        return snapshot.docs.map(doc => ({
                            ...doc.data(),
                            id: doc.id,
                            date: convertToISOString(doc.data().date),
                            exercises: doc.data().exercises.map((exercise: ExerciseLog) => ({
                                ...exercise,
                                completedAt: convertToISOString(exercise.completedAt)
                            })),
                            _documentId: doc.id
                        })) as TrainingHistoryEntry[]
                    } catch (indexError) {
                        // Fallback to a simpler query if index isn't ready
                        console.warn('Index not ready, falling back to date-only query')
                        baseQuery = query(
                            historyRef,
                            where('date', '>=', convertToTimestamp(startDate)),
                            where('date', '<=', convertToTimestamp(endDate)),
                            orderBy('date', 'desc')
                        )
                    }
                } else {
                    // For other queries, use simple conditions
                    const conditions = []

                    if (startDate) conditions.push(where('date', '>=', convertToTimestamp(startDate)))
                    if (endDate) conditions.push(where('date', '<=', convertToTimestamp(endDate)))

                    baseQuery = query(
                        historyRef,
                        ...conditions,
                        orderBy('date', 'desc')
                    )
                }
            } else {
                baseQuery = query(historyRef, orderBy('date', 'desc'))
            }

            const snapshot = await getDocs(baseQuery)
            const entries = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                date: convertToISOString(doc.data().date),
                exercises: doc.data().exercises.map((exercise: ExerciseLog) => ({
                    ...exercise,
                    completedAt: convertToISOString(exercise.completedAt)
                })),
                _documentId: doc.id
            })) as TrainingHistoryEntry[]

            return entries
        } catch (error) {
            console.error('Error fetching history:', error)
            if (error instanceof Error && error.message.includes('requires an index')) {
                console.error('Missing index. Please create the required index in Firebase Console.')
            }

            throw error
        }
    },

    delete: async (userId: string, entryId: string) => {
        try {
            const entryRef = doc(
                db,
                'users',
                userId,
                TRAINING_HISTORY_COLLECTION,
                entryId
            )

            await deleteDoc(entryRef)

            return true
        } catch (error) {
            console.error('Error deleting history entry:', {
                error,
                userId,
                entryId,
                collection: TRAINING_HISTORY_COLLECTION
            })
            throw error
        }
    },

    update: async (userId: string, documentId: string, updates: Partial<TrainingHistoryEntry>) => {
        try {
            const docRef = doc(db, COLLECTIONS.USERS.COLLECTION, userId,
                COLLECTIONS.USERS.SUB_COLLECTIONS.TRAINING_HISTORY, documentId)

            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()) {
                throw new Error(`History entry with ID ${documentId} not found`)
            }

            const updatedData = {
                ...updates,
                updatedAt: new Date()
            }

            await updateDoc(docRef, updatedData)

            return true
        } catch (error) {
            console.error('Error updating history entry:', error)
            throw error
        }
    }
}