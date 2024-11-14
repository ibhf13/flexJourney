import { createDocument, deleteDocument, queryCollection, updateDocument } from '@/config/firebase/operations/database'
import { COLLECTIONS } from '@/config/firebase/types/collections'
import { getUserCollection } from '@/config/firebase/utils/helpers'
import { dateToTimestamp, timestampToDate } from '@/config/firebase/utils/transforms'
import { Timestamp } from 'firebase/firestore'
import { ExerciseLog, HistoryFilters, TrainingHistoryEntry } from '../types/HistoryTypes'

type FirestoreTrainingHistoryEntry = Omit<TrainingHistoryEntry, 'date' | 'exercises'> & {
    date: Timestamp
    exercises: (Omit<ExerciseLog, 'completedAt'> & { completedAt: Timestamp })[]
}

const convertToFirestoreData = (entry: TrainingHistoryEntry) => {
    return {
        ...entry,
        date: dateToTimestamp(new Date(entry.date)),
        exercises: entry.exercises.map(exercise => ({
            ...exercise,
            completedAt: dateToTimestamp(new Date(exercise.completedAt))
        }))
    }
}

const convertFromFirestoreData = (data: any): TrainingHistoryEntry => {
    return {
        ...data,
        date: timestampToDate(data.date).toISOString(),
        exercises: data.exercises.map((exercise: any) => ({
            ...exercise,
            completedAt: timestampToDate(exercise.completedAt).toISOString()
        }))
    }
}

export const historyService = {
    create: async (userId: string, entry: TrainingHistoryEntry) => {
        const collectionRef = getUserCollection(userId, COLLECTIONS.USERS.SUB_COLLECTIONS.TRAINING_HISTORY as 'TRAINING_HISTORY')
        const firestoreData = convertToFirestoreData(entry)

        const result = await createDocument<FirestoreTrainingHistoryEntry>(collectionRef, firestoreData)

        return result.id
    },

    getAll: async (userId: string, filters?: HistoryFilters) => {
        const collectionRef = getUserCollection(userId, COLLECTIONS.USERS.SUB_COLLECTIONS.TRAINING_HISTORY as 'TRAINING_HISTORY')
        const queryOptions: any = {
            orderBy: { field: 'date', direction: 'desc' }
        }

        if (filters) {
            const whereConditions = []

            if (filters.startDate) {
                whereConditions.push({
                    field: 'date',
                    operator: '>=',
                    value: dateToTimestamp(filters.startDate)
                })
            }

            if (filters.endDate) {
                whereConditions.push({
                    field: 'date',
                    operator: '<=',
                    value: dateToTimestamp(filters.endDate)
                })
            }

            if (filters.planId) {
                whereConditions.push({
                    field: 'planId',
                    operator: '==',
                    value: filters.planId
                })
            }

            queryOptions.where = whereConditions
        }

        const results = await queryCollection<any>(collectionRef, queryOptions)

        return results.map(convertFromFirestoreData)
    },

    delete: async (userId: string, entryId: string) => {
        const collectionPath = `${COLLECTIONS.USERS.COLLECTION}/${userId}/${COLLECTIONS.USERS.SUB_COLLECTIONS.TRAINING_HISTORY}`

        await deleteDocument(collectionPath, entryId)

        return entryId
    },

    update: async (userId: string, entryId: string, updates: Partial<TrainingHistoryEntry>) => {
        const collectionPath = `${COLLECTIONS.USERS.COLLECTION}/${userId}/${COLLECTIONS.USERS.SUB_COLLECTIONS.TRAINING_HISTORY}`
        const firestoreUpdates = {
            ...updates,
            updatedAt: new Date()
        }

        await updateDocument(collectionPath, entryId, firestoreUpdates)

        return entryId
    }
}