import {
    doc,
    DocumentReference,
    writeBatch
} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { handleFirebaseError } from '../utils/errors'

type BatchOperation = {
    type: 'set' | 'update' | 'delete'
    ref: DocumentReference
    data?: any
}

export const executeBatch = async (
    operations: BatchOperation[]
): Promise<void> => {
    try {
        const batch = writeBatch(db)

        operations.forEach(({ type, ref, data }) => {
            switch (type) {
                case 'set':
                    batch.set(ref, data)
                    break
                case 'update':
                    batch.update(ref, data)
                    break
                case 'delete':
                    batch.delete(ref)
                    break
            }
        })

        await batch.commit()
    } catch (error) {
        throw handleFirebaseError(error)
    }
}

export const createBatchOperations = (
    collectionName: string,
    operations: Array<{
        type: 'set' | 'update' | 'delete'
        id: string
        data?: any
    }>
): BatchOperation[] => {
    return operations.map(({ type, id, data }) => ({
        type,
        ref: doc(db, collectionName, id),
        data
    }))
}